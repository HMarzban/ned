const express = require('express');
const ip = require('ip');

const app = express();
const path = require('path');
const chalk = require('chalk');

const PORT = process.env.PORT || 600;

app.use('/', express.static(path.join(__dirname, 'app/src')));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.all('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, './app/src/index.html'));
});


app.listen(PORT, () => {
  console.info(`
            Server ready to serve,You Can access it:
            ------------------------------------
            External: ${chalk.blueBright(`http://${ip.address()}:${PORT}`)}
            Local:    ${chalk.blueBright(`http://localhost:${PORT}`)}
            ------------------------------------
        `);
});
