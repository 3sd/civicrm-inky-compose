gulp = require('gulp')

gulp.task('build', function () {
    gulp.src([
      'node_modules/civinky/dist/civinky.bundle.js',
      'bower_components/ace-builds/src-min-noconflict/ace.js',
      './bower_components/angular-ui-ace/ui-ace.js'
    ])
    .pipe(gulp.dest('js/'))

});
