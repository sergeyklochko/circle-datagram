const gulp = require('gulp');
const pug = require('gulp-pug');
const concat = require('gulp-concat');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const flatten = require('gulp-flatten');
const sass = require('gulp-sass');
const gcmq = require('gulp-group-css-media-queries');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');

//'use strict';

sass.compiler = require('node-sass');

var destdir = './build';

function buildHTML() {
  return gulp.src('./src/*.pug')
  .pipe(pug({
    // Your options in here.
  }))
  .pipe(gulp.dest(destdir));
}

const imgFiles = [
  './src/**/*.ico',
  './src/**/*.jpg',
  './src/**/*.jpeg',
  './src/**/*.svg',
  './src/**/*.png'
];


function buildImages(){
  return gulp.src(imgFiles)
  .pipe(flatten())
  .pipe(gulp.dest(destdir+'/img'));
}

function buildJS(){
  return gulp.src('./src/**/*.js')
  //.pipe(uglify())  
  .pipe(flatten())
  .pipe(gulp.dest(destdir+'/js'));
}

const cssFiles = [
  './src/**/*.css'
];

const sassFiles = [
  './src/**/*.scss',
  './src/**/*.sass'
];

function buildCSS() {
  console.log('Target directory: '+destdir);
  return gulp.src(sassFiles)
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(concat('all.css'))
    .pipe(gcmq())
    .pipe(autoprefixer({
      browsers: ['last 15 versions', '> 0.1%', 'ie 9', 'ie 7'],
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(gulp.dest(destdir+'/css'));
}

function build() {
  clean();
  buildCSS();
  buildHTML();
  buildImages();
  buildJS();
}

function buildProject(done){
  build();
  done();
}

function publish(done){
  destdir = './docs';
  build();
  done();
}

function clean(){
  return del([destdir+'/*']);
}

function watch(){
/*	browserSync.init({
        server: {
            baseDir: "./build"
        },
        // tunnel: true
    });
*/
	gulp.watch(sassFiles, buildCSS);
  gulp.watch('./**/*.pug', buildHTML);
  gulp.watch(imgFiles, buildImages);
  gulp.watch('./src/**/*.js', buildJS);
}

function autocompile(){
  gulp.watch(sassFiles, buildCSS);
  gulp.watch('./**/*.pug', buildHTML);
  gulp.watch(imgFiles, buildImages);
  gulp.watch('./src/**/*.js', buildJS);
}
  
gulp.task('watch', watch);
gulp.task('autcompile', autocompile);
gulp.task('styles', buildCSS); // process CSS
gulp.task('pug', buildHTML); //process HTML
gulp.task('img', buildImages); // process images
gulp.task('build', buildProject); // build for local test
gulp.task('publish', publish); // publish it to GitPages
 
gulp.task('sass:watch', function () {
  gulp.watch('./src/**/*.sass', gulp.series ('sass'));
});
