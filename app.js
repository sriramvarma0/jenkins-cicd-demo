const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// health check endpoint
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// serve static html from /views
app.use(express.static(path.join(__dirname, 'views')));
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
