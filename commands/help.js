const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "help",

    async execute(client, message) {

        const embed = new EmbedBuilder()
            .setColor("#8A2BE2")
            .setAuthor({
                name: "🎰 PSCOIN CASINO",
                iconURL: client.user.displayAvatarURL()
            })
            .setTitle("✨ Trung tâm điều khiển")
            .setDescription(
`Chào <@${message.author.id}> 👋

🎮 Chào mừng đến với **PSCOIN CASINO**.

> Trải nghiệm Casino • Mini Game • Kinh tế • Ma Sói`
            )

            .addFields(

                {
                    name:"🎲 CASINO",
                    value:
`> 🎲 .taixiu
> 🎰 .slot
> 🃏 .blackjack
> 🎯 .roulette
> 🎲 .sicbo
> 💣 .mines`,
                    inline:true
                },

                {
                    name:"🎮 MINI GAME",
                    value:
`> 🐺 .masoi
> 🧩 .doitu
> ❓ .dovui
> 🎡 .wheel`,
                    inline:true
                },

                {
                    name:"💰 KINH TẾ",
                    value:
`> 💰 .coin
> 🎁 .daily
> 🏦 .bank
> 👤 .profile`,
                    inline:false
                }

            )

            .setThumbnail(client.user.displayAvatarURL())

            .setImage("https://i.imgur.com/0F6GQ9E.png")

            .setFooter({
                text:"PSCOIN CASINO • Version 2.0"
            })

            .setTimestamp();

        message.reply({
            embeds:[embed]
        });

    }
  }
