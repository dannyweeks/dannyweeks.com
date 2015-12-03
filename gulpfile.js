var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

var sassPaths = [
    //'scss/vendor/foundation/foundation.scss'
];

gulp.task('sass', function() {
  return gulp.src('./assets/scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('./source/css'));
});

gulp.task('scripts', function() {
    var sources = [
        './node_modules/anchor-js/anchor.js',
        './assets/javascript/gallery.js',
        './assets/javascript/app.js',
    ];
    return gulp.src(sources)
        .pipe($.concat('all.js'))
        .pipe(gulp.dest('./source/js/'));
});

gulp.task('default', ['sass', 'scripts'], function() {
  gulp.watch(['./assets/scss/**/*.scss'], ['sass']);
  gulp.watch(['./assets/javascript/**/*.js'], ['scripts']);
});
