import { Client, Message } from 'discord.js';
import type { ModuleType } from '../framework/ModuleType';

export default class implements ModuleType {
    /**
     * Triggers immediately upon startup, after a client is created prior logging in.
     * @param client
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async onInit(client: Client): Promise<void> { };

    /**
     * Triggers upon the bot being ready to start taking commands.
     * @param client Bot Client
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async onReady(client: Client): Promise<void> { };

    /**
     * Triggers when this command (identified by file name) is ran by the user.
     * @param client Bot Client
     * @param message The message that initiated this command
     * @param args Any arguments passed to the command
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static async onCommand(message: Message, args?: string[]): Promise<void> { }
}
