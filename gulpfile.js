var gulp = require('gulp');
var elixir = require('laravel-elixir');

elixir.config.assetsPath = 'assets';
elixir.config.publicPath = 'source';
elixir.config.sourcemaps = false;
elixir.config.production = true;

elixir(function(mix) {
    mix.sass('app.scss')
        .scripts([
        './.sculpin/components/jquery/jquery.js',
        './.sculpin/components/foundation/js/foundation.min.js',
        './.sculpin/components/masonry/masonry.pkgd.js',
        './.sculpin/components/highlightjs/highlight.pack.js',
        './node_modules/anchor-js/anchor.js',
        './assets/javascript/gallery.js',
        './assets/javascript/spoilers.js',
        './assets/javascript/app.js'
    ], 'source/js/all.js')
        .exec('sculpin generate', ['./source/**/*', '!./source/_assets/**/*'])
        .browserSync({
            reloadDelay: 2500,
            reloadDebounce: 2500,
            injectChanges: false,
            server: {
                baseDir: 'output_dev'
            },
            port: 1989,
            proxy: null,
            files: [ 'output_dev/**/*' ]
        });
});