let express = require('express');
let fs = require('fs');
let bodyParser = require('body-parser');
let app = express();
const PORT = 3000

app.use(bodyParser.urlencoded({extended:true}));
app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/index.html')
})
app.use(express.static(__dirname + '/public'));



const TelegramBot = require('node-telegram-bot-api');
const token = '6003971957:AAG-FfQUxFVLN4taU0NV91OQuWAQq5YOrvk';
const bot = new TelegramBot(token, {polling: true})

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log(chatId)
    bot.sendMessage(chatId, 'Received your message');
  });

app.listen(PORT, ()=>{
    console.log(`server is running on port: ${PORT}`);
})