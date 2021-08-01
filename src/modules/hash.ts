import { Client, Message, MessageEmbed } from 'discord.js';
import { hashThis } from '../framework/hashThis';
import type { ModuleType } from '../framework/ModuleType';
import { readdirSync, readFileSync } from 'fs';

export default class implements ModuleType {
    /**
     * Triggers when this command (identified by file name) is ran by the user.
     * @param client Bot Client
     * @param message The message that initiated this command
     * @param args Any arguments passed to the command
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async onExecute(client: Client, message: Message, args?: string[]): Promise<void> {
        const embed = new MessageEmbed().setTitle('Hashes').setColor(0x7289da);

        const moduleHashes: string[] = [];
        readdirSync(__dirname, 'utf-8').forEach((mod) => {
            const thisHash = hashThis(readFileSync(`${__dirname}/${mod}`));
            moduleHashes.push(thisHash);
            embed.addField(mod, thisHash);
        });

        embed.addField('Total Hash', hashThis(moduleHashes.toString() + readFileSync(__filename)));

        message.channel.send({ embed });
    }
}
