import { CommandInteraction } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { injectable } from "tsyringe";
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
        await interaction.reply(this.pingProvider.respond(message))

        await interaction.followUp("This is a followup")
    }
}