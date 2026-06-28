const {

    EmbedBuilder

} = require("discord.js");

const config = require("../config");

function createCasinoEmbed({

    title,

    description,

    color,

    footer

}){

    return new EmbedBuilder()

        .setColor(color || config.colors.casino)

        .setTitle(title)

        .setDescription(description)

        .setFooter({

            text: footer || "PSCOIN CASINO"

        })

        .setTimestamp();

}

module.exports={

    createCasinoEmbed

};
