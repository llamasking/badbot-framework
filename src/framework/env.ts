import { ActivityType } from 'discord.js';
import 'dotenv/config';

interface Env {
    TOKEN: string;
    COMMAND_PREFIX: string;
    PRESENCE_NAME?: string;
    PRESENCE_TYPE?: ActivityType;
    PRESENCE_STREAM_URL?: string;
}

export const env: Env = {
    TOKEN: process.env.TOKEN || '',
    COMMAND_PREFIX: process.env.COMMAND_PREFIX || '!!',
    PRESENCE_NAME: process.env.PRESENCE_NAME,
    PRESENCE_TYPE: process.env.PRESENCE_TYPE as ActivityType,
    PRESENCE_STREAM_URL: process.env.PRESENCE_STREAM_URL,
};
