import { Client } from 'discord.js';
import { readdirSync, readFileSync } from 'fs';
import { hashThis } from './framework/hashThis';
import type { ModuleType } from './framework/ModuleType';
import { env } from './framework/env';
const client = new Client();

type ModuleList = {
    names: string[];
    hashes: string[];
    onExecs: string[];
    onReadies: ((client: Client) => Promise<void>)[];
    //onReadies: typeof ModuleType.onReady[];
};

// List detected modules at bot startup
const moduleList: ModuleList = { names: [], hashes: [], onExecs: [], onReadies: [] };
readdirSync(__dirname + '/modules', 'utf-8').forEach(async (mod) => {
    moduleList.names.push(mod);
    moduleList.hashes.push(hashThis(readFileSync(`${__dirname}/modules/${mod}`)));

    //console.log(`Detected Module: ${mod} - Hash: ${moduleList.hashes[moduleList.hashes.length - 1]} - Activated: ${activated[mod.slice(0, -3)]}`);
    console.log(`Detected Module: ${mod} - Hash: ${moduleList.hashes[moduleList.hashes.length - 1]}`);

    // Ready various functions.
    const _mod: { default: typeof ModuleType } = await import(`${__dirname}/modules/${mod}`);
    if (typeof _mod.default.onInit === 'function') {
        _mod.default.onInit(client);
    }
    if (typeof _mod.default.onReady === 'function') {
        moduleList.onReadies.push(_mod.default.onReady);
    }
    if (typeof _mod.default.onExecute === 'function') {
        moduleList.onExecs.push(mod.replace(/\.(?:ts|js)$/, ''));
    }
});

// When bot is ready to receive commands, log details about bot.
client.on('ready', async () => {
    if (!client.user) {
        throw new Error('Client user is undefined!');
    }

    console.log(
        `\nLogged in as ${client.user.tag}.\n` +
        `Hash: ${hashThis(moduleList.hashes.toString() + readFileSync(__filename))}\n` +
        `Time: ${new Date()}\n`,
    );

    client.user.setPresence({
        activity: {
            name: env.PRESENCE_NAME,
            type: env.PRESENCE_TYPE,
            url: env.PRESENCE_STREAM_URL,
        },
    });

    // If a module has an "onReady" function, run it.
    moduleList.onReadies.forEach((f) => {
        // This is safe as the
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        f!(client);
    });
});

client.on('message', async (message) => {
    if (!client.user) throw new Error('Client user is undefined!');

    // Filter out bots and group chats/dms.
    if (message.author.bot || !message.guild) return;

    // @Bot *help* and @Bot *commands*
    if (
        message.mentions.has(client.user, { ignoreEveryone: true, ignoreRoles: true }) &&
        /help|commands/.test(message.content)
    ) {
        const mod = await import(`./modules/help`);
        mod.default.onExecute(client, message);
        return;
    }

    // Cut out commands not starting with the bots command prefix.
    if (!message.content.startsWith(env.COMMAND_PREFIX)) return;

    // Split message into command and arguments
    const args = message.content.slice(env.COMMAND_PREFIX.length).trim().split(/ +/g);
    const cmd = args.shift()?.toLowerCase();

    // Handles the weird edge case where a message is exclusively the bots prefix.
    if (!cmd || moduleList.onExecs.indexOf(cmd) !== -1) return;

    // * \\ WARNING: Typescript does not properly verify that modules fully implement ModuleType.
    // * \\ *If* a function is implemented, TS does verify it is implemented as it should be.
    // * \\ However, it does not throw an error if a function marked as required does not exist.
    const mod: { default: typeof ModuleType } = await import(`${__dirname}/modules/${cmd}`);
    if (typeof mod.default.onExecute === 'function') {
        mod.default.onExecute(client, message, args);
    }
});

client.login(env.TOKEN);
