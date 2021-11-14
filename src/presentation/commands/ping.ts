import { CommandInteraction } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { injectable } from "tsyringe";
import Logger from "../../core/logging/logger";
import { PingProvider } from "./pingprovider";

@Discord()
@injectable()
class Ping {

    constructor(private pingProvider: PingProvider) {
    }

    @Slash("ping")
    private async ping(
        @SlashOption("message", { description: "Message you want the bot to say.", required: true })
        message: string,
        interaction: CommandInteraction) {

        Logger.info('Ping was called.');
        await interaction.reply(this.pingProvider.respond(message));

        await interaction.followUp("This is a followup");

        const testError = new Error("das ist ein test.")
        Logger.error("hilfe!", testError)
    }
}