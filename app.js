const express = require('express')
const app = express()
const path = require('path');
const chalk = require('chalk');
var ip = require('ip');



app.use('/', express.static(path.join(__dirname, 'app/src')))


// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, './app/src/index.html'));
});


app.listen(600,()=>{
    console.log(`
        Server ready to serve,You Can access it Throw:
        ------------------------------------
        External: ${chalk.blueBright(`http://${ip.address()}:600`)}
        Local:    ${chalk.blueBright('http://localhost:600')}
        ------------------------------------
    `);
})