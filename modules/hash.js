/*
 * Command: Hash
 * Description: Useful for verifying what version of the code the bot is running.
 * 
 * This is pretty much a direct rip from the startup of bot.js with some additions on it.
 */

 // Load some things needed
const fs = require('fs');
const hashthis = require('../framework/hashthis.js');
const activated = require('../activated.json');

var responseText ='';

// Get the hash of all the modules
var modhashes = [];
const mods = fs.readdirSync('./modules', 'utf-8');
mods.forEach(mod => {
  var i = modhashes.push(hashthis(fs.readFileSync('./modules/' + mod)));
  responseText += `Module: ${mod} - Hash: ${modhashes[i -1]} - Activated: ${activated[mod.slice(0, -3)]}\n`;
});

// Toss it all in a pot and get the has of that pot.
const botjshash = hashthis(fs.readFileSync('./bot.js'));
const totalhash = hashthis(modhashes.toString() + botjshash);

responseText += `
Bot.js Hash: ${botjshash}
Total Hash: ${totalhash}
`;

module.exports = (message) => {
  message.channel.send(responseText, { code: true });
};