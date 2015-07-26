'use strict'

var del = require('del')
var gulp = require('gulp')
var react = require('gulp-react')
var rename = require('gulp-rename')
var uglify = require('gulp-uglify')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var vinylPaths = require('vinyl-paths')
var runSequence = require('run-sequence')
//var reactify = require('reactify')

// delete module.
// http://whiskers.nukos.kitchen/2014/12/08/gulp-del.html
gulp.task('cleanPublic', function() {
  return gulp.src('public/js/*js')
  				.pipe(vinylPaths(del))
})
gulp.task('cleanBuild', function() {
  return gulp.src('react/build')
  				.pipe(vinylPaths(del))
})

// compile *.jsx file to *.js
// http://eflorenzano.com/blog/2014/04/10/react-part-2-build-system/
gulp.task('buildjs', function() {
  return gulp.src('react/src/*.jsx')
  				// Turn React JSX syntax into regular javascript
  				.pipe(react())
  				// Output each file into the ./build/javascript/ directory
  				.pipe(gulp.dest('react/build'))
  				// Optimize each JavaScript file
			    //.pipe(uglify())
			    // Add .min.js to the end of each optimized file
			    //.pipe(rename({suffix: '.min'}))
			    // Output each optimized .min.js file into the ./build/javascript/ dir
			    //.pipe(gulp.dest('build/javascript/'));
})

// http://yutapon.hatenablog.com/entry/2014/03/09/205231
// http://qiita.com/cognitom/items/4c63969b5085c90639d4
// http://qiita.com/trapple/items/8be91a346deccc31f7c5
gulp.task('bundle', function() {
  return browserify('./react/build/propState.js')
  				// bundle() works "convert node.js file to client side javascript"
  				.bundle()
  				// file name (filename is required)
  				.pipe(source('propState.js'))
  				// save dir
  				.pipe(gulp.dest('public/js'))
})


//http://qiita.com/masato/items/35b0900e3a7282b33bf8
//http://www.cultofmetatron.io/gulp-browserify-and-famo-us-for-great-justice/
//reactify works for *.jsx -> *.js & ServerSideJS -> ClientSideJS
gulp.task('browserify', function(){
  var b = browserify({
    entries: ['./react/src/propState.jsx'],
    transform: [["reactify", {"es6": true}]]
  });
  return b.bundle()
    .pipe(source('propState.js'))
    .pipe(gulp.dest('./public/js'));
});

// this module is like a main method of Java, so it is needed.
// write TODO task names.
gulp.task('default', function() {
  //return runSequence('cleanPublic', 'cleanBuild', 'buildjs', 'bundle')
  return runSequence('cleanPublic', 'cleanBuild', 'browserify')
})
