import { CommandInteraction } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";

@Discord()
class Ping {
    @Slash("ping")
    private async ping(
        @SlashOption("message", { description: "Message you want the bot to say.", required: true })
        message: string,
        interaction: CommandInteraction) {
        await interaction.reply(`You said ${message}. Pong!`)

        await interaction.followUp("This is a followup")
    }
}