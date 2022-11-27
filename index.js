const { REST, Routes } = require("discord.js")
const { Client, GatewayIntentBits } = require("discord.js")
const process = require("dotenv")
process.config()

// Bei den Intents musst du vielleicht später was hinzufügen (kommt darauf an was du noch machen willst)
const TOKEN = process.env.TOKEN
const client = new Client({ intents: [GatewayIntentBits.Guilds] })

// Hier deine commands
const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
]

// Die commands werden bei Discord regestriert
const rest = new REST({ version: "10" }).setToken(TOKEN)
;(async () => {
  try {
    console.log("Started refreshing application (/) commands.")

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands })

    console.log("Successfully reloaded application (/) commands.")
  } catch (error) {
    console.error(error)
  }
})()

// Wird aufgerufen wenn der Bot online geht
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

// Wird aufgerufen, wenn eine Interaktion (z.B. Chatnachicht oder Reaktion von einem User getätigt wird)
client.on("interactionCreate", async (interaction) => {
  // wenn es kein command ist, passiert nichts
  if (!interaction.isChatInputCommand()) return

  // hier kommt hin, was passieren soll, wenn ein bestimmer command geschickt wird ("ping" mit deinem command namen ersetzen)
  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!")
  }
})

client.login(TOKEN)
