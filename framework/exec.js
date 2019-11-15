/*
// Command: Exec
// Description: Executes a command in shell. 
*/

module.exports = (message) => {
    // Notify user command has been seen.
    message.react('👍');

    // Exec what was given
    require('child_process').exec(message.content.slice(7), (err, stdout, stderr) => {
        if (err || stderr) {
            message.channel.send(`Error! \`\`\`${stderr}\`\`\``);
        } else {
            message.reply(`\`\`\`${stdout}\`\`\``);
        }
    });
};
