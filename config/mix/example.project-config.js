let safelist = []
try {
    safelist = require('./safelist.js');
} catch(e) {
    console.info('Project does not have custom safelist.js');
}
module.exports = {
    defaultDomain: 'http://local-domain.test',
    dir: {
        public: 'public_html/site-assets',
        css: 'css',
        js: 'js',
        images: 'images',
        fonts: 'fonts'
    },
    jsFiles: [
        'src/js/app.js',
        'src/js/test.js'
    ],
    sassFiles: [
        'src/sass/app.scss',
    ],
    imageDirectories: [
        'src/images'
    ],
    fontDirectories: [
        'src/fonts'
    ],
    staticDirectories: [
        { src: 'src/static/**/*.*', dest: 'public_html/static/' }
    ],
    watchFiles: [
        'templates/**/**.*',
        'public_html/site-assets/**/**.*'
    ],
    purge: {
        content: [
            './src/js/**/*.js',
            './templates/**/*.twig',
            './templates/**/*.html'
        ],
        // mode: 'all', // Mode all is the old behavior. Default is to purge only tailwind @layer
        options: {
            safelist: safelist
        }
    },
    tailwindconfig: './tailwind.config.js'
}

