require('dotenv').config()
const { Client: Bot, RichEmbed } = require('discord.js');
const Tail = require('tail').Tail;
var Rcon = require('simple-rcon');
var fs = require('fs');

// Factorio Direct Connect through RCON
const {
  DISCORD_BOT_TOKEN,
  DISCORD_FACTORIO_CHANNEL_ID,
  FACTORIO_HOST,
  FACTORIO_PORT,
  FACTORIO_PASSWORD
} = process.env

var factorio = new Rcon({
    host: FACTORIO_HOST,
    port: FACTORIO_PORT, // port factorio listens after RCON connections on
    password: FACTORIO_PASSWORD, // RCON password
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
    } else if (msg.content.includes('')) {
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

bot.login(DISCORD_BOT_TOKEN)
.catch(err => {
  console.log('login to discord error', err)
});


// Reading log file
const filepath = "C:/Users/User/Documents/writetesting.txt"
if (fs.existsSync('/etc/file')) {
  console.log('Found file');
  var tail = new Tail(filepath);
  tail.watch()
  tail.on("line", data => {
    if (data.includes('[CHAT]') || data.includes('[LEAVE]') || data.includes('[JOIN]')) {
      bot.channels.get(DISCORD_FACTORIO_CHANNEL_ID).send(data);
    }
  });
}

console.log('done')
