const { spawn } = require('child_process');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.get('/api/console/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  const command = req.query.command;
  const childProcess = spawn(command, {
    shell: true,
    detached: true
  });

  childProcess.stdout.on('data', (data) => {
    const lines = data.toString().trim().split('\n');
    lines.forEach((line) => {
      res.write(`data: ${line}\n\n`);
    });
  });

  childProcess.stderr.on('data', (data) => {
    const lines = data.toString().trim().split('\n');
    lines.forEach((line) => {
      res.write(`data: ${line}\n\n`);
    });
  });

  childProcess.on('close', (code) => {
    if (code !== 0) {
      const lines = code.toString().trim().split('\n');
    lines.forEach((line) => {
      res.write(`data: code de l'erreur = ${line}\n\n`);
    });
    }
    res.end();
  });

  req.setTimeout(0); // Désactiver le timeout de la requête

  // Fermer la connexion SSE lorsque la connexion client est terminée
});

const port = 5000;
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
