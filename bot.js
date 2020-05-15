// Load and prep Discord and client.
const Discord = require('discord.js');
const client = new Discord.Client();

// Load FS and framework module(s)
const fs = require('fs');
const hashthis = require('./framework/hashthis.js');

// Load configs.
const config = require('./config.json');
const activated = require('./activated.json');

// List detected modules at bot startup
var modhashes = [];
fs.readdirSync('./modules', 'utf-8').forEach(mod => {
  modhashes.push(hashthis(fs.readFileSync('./modules/' + mod)));
  console.log(`Detected Module: ${mod} - Hash: ${modhashes[modhashes.length - 1]} - Activated: ${activated[mod.slice(0, -3)]}`);
});

// When bot is ready to recieve commands, log details about bot.
client.on('ready', () => {
  console.log(`
    Logged in as ${client.user.tag}.
    Bot.js hash: ${hashthis(fs.readFileSync('./bot.js'))}
    Total hash: ${hashthis(modhashes.toString() + hashthis(fs.readFileSync('./bot.js')))}
    Time: ${new Date()}\n`);

  client.user.setPresence(config.presence);
});

client.on('guildCreate', (guild) => console.log(`Joined new server: ${guild.name} with ${guild.memberCount - 1} members.`));
client.on('guildDelete', (guild) => console.log(`Left server: ${guild.name} with ${guild.memberCount  - 1} members.`));

client.on('message', async (message) => {
  // Filter out bots and group chats/dms.
  if (message.author.bot) return;
  if (message.guild === null) return;

  // @Bot *help* and @Bot *commands*
  if (message.mentions.has(client.user) && message.content.includes('help' || 'commands')) {
    require('./modules/help.js')(message, args);
    return;
  }

  // Cut out commands not starting with the bot's command prefix.
  if (!message.content.startsWith(config.prefix)) return;

  // Split message into command and arguments
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  switch (cmd) {
    // ONLY FOR USE WITH COMMANDS THAT DO NOT PLAY WELL AS A MODULE

    // Exec command: Executes command on host system [VERY DANGEROUS IF LEFT UNPROTECTED]
    case 'exec': {
      // Checks if the message author is the owner. If not, ignore it.
      if (message.author.id !== config.ownerID) return;

      // Notify user command has been seen.
      message.react('👍');

      // Exec what was given
      require('child_process').exec(message.content.slice(7), (err, stdout, stderr) => {
        if (err || stderr) {
          message.channel.send(`Error! \`\`\`${stderr}\`\`\``);
        } else {
          message.channel.send(`\`\`\`${stdout}\`\`\``);
        }
      });

      break;
    }

    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    case 'ping': {
      const m = await message.channel.send('Testing ping!');
      m.edit(`Latency is ${m.createdTimestamp - message.createdTimestamp}ms.`);
      break;
    }

    // If not above, check if the command is an activated module and if so, load it.
    default: {
      // Ignore disabled modules
      if (!activated[cmd]) return;

      require(`./modules/${cmd}.js`)(message, args);
    }
  }
});

client.login(config.token);