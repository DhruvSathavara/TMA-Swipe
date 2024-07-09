const { Telegraf } = require("telegraf");
require('dotenv')

// console.log(TOKEN,'--------------');
const bot = new Telegraf('7313216675:AAENDcBucJ2Pjltw9M7IMV_E2IjhfUr-8Cg');

const web_link = "https://tma-swipe.vercel.app/";

bot.start((ctx) =>
    ctx.reply("Welcome To the App :) ", {
        reply_markup: {
            keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
        },
    })
);

bot.launch();