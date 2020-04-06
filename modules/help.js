/*
 * Command: Help
 * Description: Example help command that uses embeds.
 */

const Discord = require('discord.js');

module.exports = (message) => {
    var embed = new Discord.RichEmbed()
        .setTitle('Command Help Example')
        .addField('!!commands / !!help', 'This command.')
        .addField('!!credits', 'Shameless self promotion!')
        .addField('!!ping', 'Pong!')
        .setColor(0x7289DA)
        .setFooter('This is an example help command.');
    message.channel.send({ embed });
};