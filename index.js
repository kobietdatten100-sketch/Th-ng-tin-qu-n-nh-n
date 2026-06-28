const {
    Client,
    Collection,
    GatewayIntentBits,
    Partials
} = require("discord.js");

const fs = require("fs");
const path = require("path");

const config = require("./config");

const client = new Client({

    intents: [

        GatewayIntentBits.Guilds,

        GatewayIntentBits.GuildMessages,

        GatewayIntentBits.MessageContent,

        GatewayIntentBits.DirectMessages

    ],

    partials: [

        Partials.Channel

    ]

});

client.commands = new Collection();

client.buttons = new Collection();

client.modals = new Collection();

client.selectMenus = new Collection();

client.games = new Collection();
// =====================
// LOAD COMMANDS
// =====================

const commandPath = path.join(__dirname, "commands");

if (fs.existsSync(commandPath)) {

    const commandFiles = fs.readdirSync(commandPath)
        .filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {

        const command = require(`./commands/${file}`);

        client.commands.set(command.name, command);

    }

}
// =====================
// BOT READY
// =====================

client.once("clientReady", () => {

    console.log("========================");

    console.log(`${client.user.tag} Online`);

    console.log("========================");

});
// =====================
// PREFIX COMMAND
// =====================

client.on("messageCreate", async message => {

    if (message.author.bot) return;

    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content
        .slice(config.prefix.length)
        .trim()
        .split(/ +/);

    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);

    if (!command) return;

    try {

        await command.execute(client, message, args);

    } catch (err) {

        console.error(err);

        message.reply("❌ Đã xảy ra lỗi.");

    }

});
// =====================
// INTERACTION
// =====================

client.on("interactionCreate", async interaction => {

    try {

        // BUTTON
        if (interaction.isButton()) {

            const button = client.buttons.get(interaction.customId);

            if (button) {

                return button.execute(interaction, client);

            }

        }

        // MODAL
        if (interaction.isModalSubmit()) {

            const modal = client.modals.get(interaction.customId);

            if (modal) {

                return modal.execute(interaction, client);

            }

        }

        // SELECT MENU
        if (interaction.isStringSelectMenu()) {

            const menu = client.selectMenus.get(interaction.customId);

            if (menu) {

                return menu.execute(interaction, client);

            }

        }

    } catch (err) {

        console.error(err);

        if (!interaction.replied) {

            interaction.reply({

                content: "❌ Đã xảy ra lỗi.",

                ephemeral: true

            });

        }

    }

});
// =====================
// LOAD EVENTS
// =====================

const eventFolder = path.join(__dirname, "events");

if (fs.existsSync(eventFolder)) {

    const eventFiles = fs
        .readdirSync(eventFolder)
        .filter(file => file.endsWith(".js"));

    for (const file of eventFiles) {

        const event = require(`./events/${file}`);

        if (event.once) {

            client.once(event.name, (...args) =>
                event.execute(...args, client)
            );

        } else {

            client.on(event.name, (...args) =>
                event.execute(...args, client)
            );

        }

    }

}
// =====================
// LOAD GAME HANDLERS
// =====================

const gameFolder = path.join(__dirname, "games");

if (fs.existsSync(gameFolder)) {

    const folders = fs.readdirSync(gameFolder);

    for (const folder of folders) {

        const folderPath = path.join(gameFolder, folder);

        if (!fs.lstatSync(folderPath).isDirectory()) continue;

        const files = fs.readdirSync(folderPath);

        for (const file of files) {

            if (!file.endsWith(".js")) continue;

            const game = require(`./games/${folder}/${file}`);

            if (game.name) {

                client.games.set(game.name, game);

            }

        }

    }

                                 }
// =====================
// LOGIN
// =====================

client.login(config.token);
