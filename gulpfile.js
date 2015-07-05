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


// delete module.
// http://whiskers.nukos.kitchen/2014/12/08/gulp-del.html
gulp.task('cleanPublic', function() {
  return gulp.src('public/javascripts/behavior.*js').pipe(vinylPaths(del))
})


// this module is like a main method of Java, so it is needed.
// write TODO task names.
gulp.task('default', function() {
  return runSequence('cleanPublic')
})
