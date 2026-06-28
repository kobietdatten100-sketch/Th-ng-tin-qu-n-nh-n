require("dotenv").config();

module.exports = {

    token: process.env.TOKEN,

    prefix: process.env.PREFIX || ".",

    owner: process.env.OWNER_ID,

    colors: {

        success: 0x2ecc71,

        error: 0xe74c3c,

        info: 0x3498db,

        casino: 0x8e44ad,

        warning: 0xf1c40f

    },

    casino: {

        startCoin: 50000,

        maxBet: 100000000,

        minBet: 100

    },

    werewolf: {

        maxPlayers:16,

        minPlayers:5

    }

};
