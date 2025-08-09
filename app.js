const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('views'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 App running at http://localhost:${PORT}`);
});
