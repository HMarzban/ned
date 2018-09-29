const gulp = require("gulp"),
        sass = require("gulp-sass"),
        autoprefixer = require("gulp-autoprefixer"),
        nodemon = require("gulp-nodemon"),
        concat = require('gulp-concat');
        uglify = require('gulp-uglify'),
        del = require('del');


// gulp.task('clean',function(){
//     return del([
//         "app/dist/**/*.scss",
//         "app/dist/**/*.js"
//       ]);
// });

// gulp.task('files',function(_done){
//     return gulp.src([
//         //"app/index.html",
//         //"app/favicon.ico",
//         "app/src/*.*", 
//         "app/src/**/*.*",     
//     ])
//     .pipe(gulp.dest('app/dist'))
// });

// gulp.task('js',function(_done){
//     return gulp.src([
//         "app/src/assets/js/**/*.js",
//         "app/src/component/**/*.js",
//         "app/src/pages/**/*.js"
//     ])
//     //.pipe(gulp.dest('app/dist'))
//     .pipe(gulp.dest(function (file) {
//         let path = file.base
//         return path.replace('src','dist');
//     }));
// });

// gulp.task('scss',function(_done){
//     return gulp.src([
//         "app/src/assets/style/**/*.scss",
//         "app/src/component/**/*.scss",
//         "app/src/pages/**/*.scss"
//     ])
//     .pipe(sass())
//     .pipe(autoprefixer())
//     .pipe(gulp.dest(function (file) {
//         let path = file.base
//         return path.replace('src','dist');
//      }));
// });

// gulp.task('watch',function(){

//     gulp.watch([
//         "app/src/assets/style/**/*.scss",
//         "app/src/component/**/*.scss",
//         "app/src/pages/**/*.scss"
//     ], gulp.parallel('scss'));

//     gulp.watch([
//         "app/src/*.*", 
//         "app/src/**/*.*", 
//     ], gulp.parallel('files'));

//     gulp.watch([
//         "app/src/assets/js/**/*.js",
//         "app/src/component/**/*.js",
//         "app/src/pages/**/*.js"
//     ], gulp.parallel('js'));
    
// });

// gulp.task('nodemon',function(){

//     // do more stuff
//     return nodemon({
//         script: 'app.js',
//         ext: '.html .scss .json .js .jpg .png .eot .ttf .woff .woff2 .svg .gif',
//         watch:[
//             'app/src',
//             //'app/src/index.html'
//         ],
//         ignore:[
//             'app/dist'
//         ]
//         //tasks:['sass']
//       }).on('start', function () {
//         //it must be here
//       }).on('restart', function (e) {
//         console.log(e)
//         //console.log('Nodemon restarted!');
//       });
// })

// gulp.task('start', gulp.series('files', 'clean','scss','js',function(done) {

//      // do more stuff
//      return nodemon({
//         script: 'app.js',
//         ext: '.html .scss .json .js .jpg .png .eot .ttf .woff .woff2 .svg .gif',
//         watch:[
//             'app/src',
//             //'app/src/index.html'
//         ],
//         ignore:[
//             'app/dist'
//         ],
//        // tasks:['watch']
//       }).on('start', function () {
//         done();

//         gulp.watch([
//             "app/src/assets/style/**/*.scss",
//             "app/src/component/**/*.scss",
//             "app/src/pages/**/*.scss"
//         ], gulp.parallel('scss'));
    
//         // gulp.watch([
//         //     "app/src/*.*", 
//         //     "app/src/**/*.*", 
//         // ], gulp.parallel('files'));
    
//         gulp.watch([
//             "app/src/assets/js/**/*.js",
//             "app/src/component/**/*.js",
//             "app/src/pages/**/*.js"
//         ], gulp.parallel('js'));

//         //it must be here
        
//       }).on('restart', function (e) {
//         console.log(e)
      
//         //console.log('Nodemon restarted!');
//       });
    
// }));