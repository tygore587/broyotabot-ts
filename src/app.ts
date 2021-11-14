import "reflect-metadata"; // required for reflection, don't remove
import { Intents, Interaction } from 'discord.js';
import { Client, DIService } from 'discordx';
import { Environment } from './config/environment';
import { container } from "tsyringe";


const start = async () => {

    setupDependencyInjection();

    const client = new Client({
        classes: [
            // glob string to load the classes. If you compile your bot, the file extension will be .js
            `${__dirname}/presentation/commands/**/*.{ts,js}`
        ],
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
        ],
        botGuilds: [Environment.slashCommandsGuildId],
        silent: false,
    });

    client.once("ready", async () => {
        console.log(">> Bot started");

        // to create/update/delete discord application commands
        await client.clearApplicationCommands(Environment.slashCommandsGuildId);
        await client.initApplicationCommands({
            guild: { log: true }

        });
        await client.initApplicationPermissions();
    });

    client.on("interactionCreate", (interaction: Interaction) => {
        client.executeInteraction(interaction);
    });

    await client.login(Environment.discordToken);
}

const setupDependencyInjection = () => {
    DIService.container = container;
}

start()