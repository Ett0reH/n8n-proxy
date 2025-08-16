// server.js - Da copiare nel tuo progetto Glitch

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// Abilita CORS per permettere alla tua app React di comunicare con questo proxy
app.use(cors());

// Definisci gli URL di n8n
const N8N_INGEST_URL = 'https://dnart.app.n8n.cloud';
const N8N_QUERY_URL = 'https://dnart.app.n8n.cloud';

// Crea un proxy per l'endpoint di ingestione file
// /ingest-file -> https://dnart.app.n8n.cloud/webhook-test/ingest-file
app.use('/webhook-test/ingest-file', createProxyMiddleware({
  target: N8N_INGEST_URL,
  changeOrigin: true,
  // Non è necessario riscrivere il path perché corrisponde
}));

// Crea un proxy per l'endpoint di query
// /query-document -> https://dnart.app.n8n.cloud/webhook/query-document
app.use('/webhook/query-document', createProxyMiddleware({
  target: N8N_QUERY_URL,
  changeOrigin: true,
  // Non è necessario riscrivere il path perché corrisponde
}));

// Avvia il server
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Il tuo proxy è in ascolto sulla porta ' + listener.address().port);
});

// package.json - File necessario per le dipendenze

/*
Copia e incolla questo contenuto nel file package.json del tuo progetto Glitch:
{
  "name": "n8n-cors-proxy",
  "version": "1.0.0",
  "description": "A simple CORS proxy for n8n webhooks",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "http-proxy-middleware": "^2.0.6",
    "cors": "^2.8.5"
  },
  "engines": {
    "node": "16.x"
  }
}
*/
