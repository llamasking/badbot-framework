/*
 * Command: Hash
 * Description: Useful for verifying if a remote server, such as heroku, is running an updated version of your bot.
 *
 * This is pretty much a direct rip from the startup of bot.js with some additions on it.
 */

 // Load some things needed
const fs = require('fs');
const hashthis = require('../framework/hashthis.js');
const activated = require('../activated.json');
const Discord = require('discord.js');

// Set up the embed
var embed = new Discord.MessageEmbed()
  .setTitle('Hashes:')
  .setColor('#7289DA');

// Get the hash of all the modules
var modhashes = [];
fs.readdirSync('./modules', 'utf-8').forEach(mod => {
  // Adds the hash of the module to the modhashes array
  modhashes.push(hashthis(fs.readFileSync('./modules/' + mod)));

  // Adds the module, if it's activated, and it's hash to the embed
  embed.addField(mod + ` [${activated[mod.slice(0, -3)]}]`, modhashes[modhashes.length - 1]);
});

// Add embed fields for bot.js and the total hash of all hashes
embed.addField('Bot.js Hash', hashthis(fs.readFileSync('./bot.js')));
embed.addField('Total Hash', hashthis(modhashes.toString() + hashthis(fs.readFileSync('./bot.js'))));

module.exports = (message) => {
  // Send the embed
  message.channel.send(embed);
};