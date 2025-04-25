const express = require('express');
const app = express();

app.all('/', (req, res) => {
  res.send('Bot is alive!');
});

function keepAlive() {
  app.listen(3000, '0.0.0.0', () => {
    console.log('KeepAlive server is running.');
  });
}

module.exports = keepAlive;