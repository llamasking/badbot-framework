import { Client, Message, MessageEmbed } from 'discord.js';
import type { ModuleType } from '../framework/ModuleType';

export default class implements ModuleType {
    /**
     * Triggers when this command (identified by file name) is ran by the user.
     * @param client Bot Client
     * @param message The message that initiated this command
     * @param args Any arguments passed to the command
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async onExecute(client: Client, message: Message, args?: string[]): Promise<void> {
        const embed = new MessageEmbed()
            .setTitle('Credits Example')
            .addField('→ llamasking: https://github.com/llamasking/', 'Creator of the BadBot Framework.');

        message.channel.send({ embed });
    }
}
