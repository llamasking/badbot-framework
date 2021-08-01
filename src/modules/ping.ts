import { Client, Message } from 'discord.js';
import { ModuleType } from '../framework/ModuleType';

export default class implements ModuleType {
    /**
     * Triggers when this command (identified by file name) is ran by the user.
     * @param client Bot Client
     * @param message The message that initiated this command
     * @param args Any arguments passed to the command
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async onExecute(client: Client, message: Message, args?: string[]): Promise<void> {
        const m = await message.channel.send('Testing ping!');
        m.edit(`Latency is ${m.createdTimestamp - message.createdTimestamp}ms.`);
    }
}
