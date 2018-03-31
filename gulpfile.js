/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are split into several files in the gulp directory
 *  because putting it all here was too long
 */

'use strict';

var fs = require('fs');
var gulp = require('gulp');
var rename = require('gulp-rename')
var environments = require('gulp-environments')
var gulpNgConfig = require('gulp-ng-config');


/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
fs.readdirSync('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});


function buildConfigForEnvironment(environment) {
  gulp.src('src/app/config/config-' + environment.$name + '.json')
    .pipe(gulpNgConfig('taxiManagement', {
      createModule: false
    }))
    .pipe(rename('config.js'))
    .pipe(gulp.dest('src/app/config'))
}


//Available environments
var production = environments.production
var local = environments.make('local')
var dev = environments.make('dev')
var test = environments.make('test')
var uat = environments.make('uat')
var prod = environments.make('prod')

gulp.task('build-config', function () {
  buildConfigForEnvironment(environments.current())
})

/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
