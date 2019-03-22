require('dotenv').config()
const { Client: Bot, RichEmbed } = require('discord.js');
const Tail = require('tail').Tail;
var Rcon = require('simple-rcon');


// Factorio Direct Connect through RCON
const {
  DISCORD_BOT_TOKEN,
  DISCORD_FACTORIO_CHANNEL_ID
} = process.env

var factorio = new Rcon({
    host: 'localhost',
    port: instanceconfig.clientPort, // port factorio listens after RCON connections on
    password: instanceconfig.clientPassword, // RCON password
    timeout: 0
});
setTimeout(() => { factorio.connect(); }, 5000);
 
factorio.on('authenticated', function() {
    console.log('Authenticated!');
}).on('connected', function() {
    console.log('Connected!');
}).on('disconnected', function() {
    console.log('Disconnected!');
    // now reconnect
    factorio.connect();
});
// Now do whatever you want!
// silent-command doesn't show up in chat, nice to avoid spam :)
//factorio.exec("/silent-command remote.call('clusterio', 'doStuff', 'Some data of some kind')");



// Discord Bot Setup
const bot = new Bot();

bot.on('ready', () => {
  console.log("I'm in");
  console.log(bot.user.username);
});

bot.on('message', msg => {
  if (msg.author.id != bot.user.id) {
    console.log('got a new message from someone else');
    if (msg.content.includes('paul')) {
      msg.channel.send('I heard she is so fineeeee');
    } else {
        msg.channel.send(msg.content.split('').reverse().join(''));
    }
  }
});

bot.on('disconnected', function() {
  // Relog again here
  console.log('trying to relogin');
});

bot.on('error', error => {
  console.log('discord bot error: ', error);
  console.log('current bot: ', bot);
});

bot.login(DISCORD_BOT_TOKEN);


// Reading log file
var tail = new Tail("C:/Users/User/Documents/writetesting.txt");
tail.watch()
tail.on("line", data => {
  if (data.includes('[CHAT]') || data.includes('[LEAVE]') || data.includes('[JOIN]')) {
    bot.channels.get(DISCORD_FACTORIO_CHANNEL_ID).send(data);
  }
});

console.log('done')
