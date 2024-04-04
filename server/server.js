const express = require('express');
const path = require('path');
const ReactDOMServer = require('react-dom/server');
const App = require('../client/App');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('*', (req, res) => {
  const context = {};

  const appMarkup = ReactDOMServer.renderToString(App);
    if (context.url) {
        res.redirect(context.url);
    } else {
      res.status(200).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <title>SSR Chess App</title>
          <link rel="stylesheet" href="/stylesheets/styles.css">
      </head>
      <body>
          <div id="root">${appMarkup}</div>
          <script src="/bundle.js" defer></script>
      </body>
      </html>
      `);
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
