var nodemon = require('nodemon');

nodemon({
  script: 'app.js',
  ext: 'js json html css scss'
});





const   gulp = require('gulp'),
        concatCss = require('gulp-concat-css'),
        uglify = require('gulp-uglify'),
        cleanCSS = require('gulp-clean-css'),
        sourcemaps = require('gulp-sourcemaps'),
        sass = require('gulp-sass');
        concat = require('gulp-concat');







nodemon.on('start', function () {
  console.log('App has started');
}).on('quit', function () {
  console.log('App has quit');
  process.exit();
}).on('restart', function (files) {
  console.log('App restarted due to: ', files);
});