var gulp = require('gulp');
var elixir = require('laravel-elixir');

elixir.config.assetsPath = 'assets';
elixir.config.publicPath = 'source';
elixir.config.sourcemaps = false;

elixir(function(mix) {
    mix.sass('app.scss')
        .scripts([
        './node_modules/anchor-js/anchor.js',
        './assets/javascript/gallery.js',
        './assets/javascript/spoilers.js',
        './assets/javascript/app.js'
    ], 'source/js/all.js')
        .exec('sculpin generate', ['./source/**/*', '!./source/_assets/**/*'])
        .browserSync({
            reloadDelay: 2500,
            injectChanges: false,
            server: {
                baseDir: 'output_dev'
            },
            port: 1989,
            proxy: null,
            files: [ 'output_dev/**/*' ]
        });
});

//var gulp = require('gulp');
//var $    = require('gulp-load-plugins')();
//
//var sassPaths = [
//    //'scss/vendor/foundation/foundation.scss'
//];
//
//gulp.task('sass', function() {
//  return gulp.src('./assets/scss/app.scss')
//    .pipe($.sass({
//      includePaths: sassPaths
//    })
//      .on('error', $.sass.logError))
//    .pipe($.autoprefixer({
//      browsers: ['last 2 versions', 'ie >= 9']
//    }))
//    .pipe(gulp.dest('./source/css'));
//});
//
//gulp.task('scripts', function() {
//    var sources = [
//        './node_modules/anchor-js/anchor.js',
//        './assets/javascript/gallery.js',
//        './assets/javascript/spoilers.js',
//        './assets/javascript/app.js',
//    ];
//    return gulp.src(sources)
//        .pipe($.concat('all.js'))
//        .pipe(gulp.dest('./source/js/'));
//});
//
//gulp.task('default', ['sass', 'scripts'], function() {
//  gulp.watch(['./assets/scss/**/*.scss'], ['sass']);
//  gulp.watch(['./assets/javascript/**/*.js'], ['scripts']);
//});
