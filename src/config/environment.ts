import './env';
import * as env from 'env-var';

export class Environment {
    static discordToken = env.get('TOKEN').required().asString()
    static watchTogetherApiKey = env.get('WATCHTOGETHERAPIKEY').required().asString()
    static slashCommandsGuildId = env.get('SLASH_COMMANDS_GUILD_ID').required().asString()
    static nodeEnv = env.get('NODE_ENV').required().asString()
}