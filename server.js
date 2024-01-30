const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { Client, Intents } = require('discord.js');
const fs = require('fs');
const app = express();
const port = 3000;
require('dotenv').config();
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ],
});

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const filePath = 'C:\\Users\\joe\\image api with discord\\data:image\\png;base64,iVBORw0...';

if (fs.existsSync(filePath)) {

} else {
    console.error('File does not exist:', filePath);
}

app.post('/send-drawing', (req, res) => {
    const drawing = req.body.drawing;
    const channelId = '1200072567055192075';
    D

    const channel = client.channels.cache.get(channelId);

    if (channel && channel.isText()) {
        channel.send(`Drawing from the website: ${drawing}`)
            .then(() => {
                console.log('Drawing sent to Discord!');
                res.status(200).send('Drawing sent to Discord!');
            })
            .catch((error) => {
                console.error('Error sending drawing to Discord:', error);
                res.status(500).send('Error sending drawing to Discord!');
            });
    } else {
        res.status(500).send('Error: Invalid Discord channel or not a text channel.');
    }
});



client.login(process.env.TOKEN);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});