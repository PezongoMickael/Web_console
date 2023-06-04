const express = require('express');
const { spawn } = require('node-pty');
const cors = require('cors');
const ansiHTML = require('ansi-html');
const { encode } = require('html-entities');


const app = express();
app.use(express.json())
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
const port = 5001;

const term = spawn('msfconsole', [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env
});
console.log('msfconsole a été lancé');
term.onData((data) => {
    console.log(data);
});

app.get('/command', (req, res) => {

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    const command = req.query.command;
    let output = '';
    let responseSent = false; 
    const handleResponse = (data) => {
      if (!responseSent) {
        output += data;
      }
    };
    term.on('data', handleResponse);
    term.write(command + '\r');
    req.connection.on('close', () => {
      if (!responseSent) {
        responseSent = true;
        const Output1 = ansiHTML(output)
        res.send(Output1);
      }
    });
    setTimeout(() => {
      if (!responseSent) {
        responseSent = true;
        const Output1 = ansiHTML(output)
        res.send(Output1);
      }
    }, 2000);
  });

  app.listen(port, () => {
    console.log(`Serveur web démarré sur le port ${port}`);
  });