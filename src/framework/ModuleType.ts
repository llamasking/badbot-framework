import { Client, Message } from 'discord.js';

export declare class ModuleType {
    /**
     * Triggers immediately upon startup, after a client is created prior logging in.
     * @param client
     */
    static onInit?(client: Client): Promise<void>;

    /**
     * Triggers after the bot is ready to start taking commands.
     * @param client Bot Client
     */
    static onReady?(client: Client): Promise<void>;

    /**
     * Triggers when this command (identified by file name) is ran by the user.
     * @param client Bot Client
     * @param message The message that initiated this command
     * @param args Any arguments passed to the command
     */
    static onExecute?(client: Client, message: Message, args?: string[]): Promise<void>;
}
