/*
 * Command: Credits
 * Description: Print credits for the bot.
 */
const Discord = require('discord.js');

module.exports = (message) => {
    var embed = new Discord.MessageEmbed()
        .setTitle('Credits Example')
        .addField('→ llamasking: https://github.com/llamasking/', 'Creator of the BadBot Framework.');
        
    message.channel.send({ embed });
};
