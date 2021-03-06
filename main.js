const discord = require("discord.js");
const firebase = require("firebase");
const packageInfo = require("./package.json");
const config = require("./config");
const lang = require("./languages/th_TH.json");

// Show when bots start working To check that bots do not have a problem
console.log("\x1b[31m================================================================");
console.log("\x1b[33mCopyright (c) 2020-2021 Chaiwat Suwannarat. All rights reserved.");
console.group("\x1b[31m================================================================\x1b[0m");

const client = new discord.Client({
    "autoReconnect": true,
    "disableEveryone": false,
    "partials": ["MESSAGE", "CHANNEL", "REACTION"]
});

client.config = config;
client.lang = lang;
client.data = new Map();

["command", "event"].forEach(dirs => require("./handlers/" + dirs)(client));

// Check package version
console.log("\u001b[1mPackage\u001b[0m version: " + packageInfo.version);
console.log("\u001b[1mDiscord.js\u001b[0m version: " + discord.version);
console.log("\u001b[1mNode.js\u001b[0m version: " + process.version);

firebase.initializeApp(client.config.firebase);
client.login(client.config.token);