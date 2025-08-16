// server.js - AGGIORNATO PER USARE L'URL DI PRODUZIONE

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// Abilita CORS per permettere alla tua app React di comunicare con questo proxy
app.use(cors());

// Definisci gli URL di n8n
const N8N_BASE_URL = 'https://dnart.app.n8n.cloud';

// Crea un proxy per l'endpoint di ingestione file (URL di PRODUZIONE)
// /webhook/ingest-file -> https://dnart.app.n8n.cloud/webhook/ingest-file
app.use('/webhook/ingest-file', createProxyMiddleware({
  target: N8N_BASE_URL,
  changeOrigin: true,
}));

// Crea un proxy per l'endpoint di query (questo era già corretto)
// /webhook/query-document -> https://dnart.app.n8n.cloud/webhook/query-document
app.use('/webhook/query-document', createProxyMiddleware({
  target: N8N_BASE_URL,
  changeOrigin: true,
}));

// Avvia il server
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Il tuo proxy è in ascolto sulla porta ' + listener.address().port);
});
