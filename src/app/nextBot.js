const { Telegraf } = require("telegraf");
require('dotenv')

const TOKEN = process.env.NEXT_PUBLIC_BOT_TOKEN;
// console.log(TOKEN,'--------------');
const bot = new Telegraf('7313216675:AAENDcBucJ2Pjltw9M7IMV_E2IjhfUr-8Cg');

const web_link = "https://tma-swipe.vercel.app/";

bot.start((ctx) =>
    ctx.reply("Welcome To the SFS :) ", {
        reply_markup: {
            keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
        },
    })
);

bot.launch();