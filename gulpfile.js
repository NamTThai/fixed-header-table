var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var merge = require('merge-stream');
var path = require('path');
var fs = require('fs');
var glob = require('glob');

gulp.task('scripts-debug', function() {
  return gulp.src('public/javascripts/*.js')
    .pipe($.sourcemaps.init())
    .pipe($.concat('scripts.js'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('build/javascripts'));
});

gulp.task('copy', function () {
  var root = gulp.src(['public/*', '!public/precache.json'], {
    dot: true
  }).pipe(gulp.dest('build'));

  var components = gulp.src(['public/components/*', '!public/components/components.html'])
    .pipe(gulp.dest('build/components'));

  return merge(root, components);
});

gulp.task('vulcanize', function () {
  var DEST_DIR = 'build/components';

  return gulp.src('public/components/components.html')
    .pipe($.rename('/components.vulcanized.html'))
    .pipe(gulp.dest('build/components'))
    .pipe($.vulcanize({
      dest: DEST_DIR,
      strip: true,
      inlineCss: true,
      inlineScripts: true
    }))
    .pipe(gulp.dest(DEST_DIR));
});

// Placeholder for precache service worker
gulp.task('precache', function (callback) {
  glob('{components,javascripts,stylesheets}/**/*.*', {cwd: 'build'}, function(error, files) {
    if (error) {
      callback(error);
    } else {
      files.push('./', 'bower_components/webcomponentsjs/webcomponents-lite.min.js');
      fs.writeFile('build/precache.json', JSON.stringify(files), callback);
    }
  });
});

// Clean Output Directory
gulp.task('clean', del.bind(null, ['build/**', '!build', '!build/bower_components/**']));
gulp.task('clean-deep', del.bind(null, ['build', 'logs', 'node_modules']));

gulp.task('serve', ['default-debug'], function (){
  gulp.watch(['public/components/*', '!public/components/components.html'], ['copy']);
  gulp.watch(['public/stylesheets/*.scss'], ['styles-debug']);
  gulp.watch(['public/javascripts/*.js'], ['scripts-debug']);
  gulp.watch(['public/images/*'], ['images']);
  gulp.watch(['public/components/components.html'], ['vulcanize']);

  return $.nodemon({
    script: 'server',
    ext: 'js ejs json',
    ignore: ['public', 'build']
  });
});

gulp.task('default-debug', ['clean'], function (callback) {
  runSequence(
    ['copy', 'scripts-debug'],
    'vulcanize', 'precache',
    callback);
});
