const path = require('path');
const environment_mode = process.env.WebPack_ENV;

module.exports = {
    
    mode: environment_mode,
    entry: "./app/dist/_nedInit.js",
    output: {
        path: path.resolve(__dirname, './app/src/assets/js'),
        filename: 'ned_bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
};