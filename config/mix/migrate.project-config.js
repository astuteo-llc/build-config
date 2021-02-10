let safelist = []
try {
    safelist = require('./safelist.js');
} catch(e) {
    console.info('Project does not have custom safelist.js');
}
module.exports = {
    defaultDomain: '{{localDomain}}',
    dest: {
        public: '{{destPublic}}',
        css: '{{destCss}}',
        js: '{{destJs}}',
        images: '{{destImages}}',
        fonts: '{{destFonts}}'
    },
    jsFiles: [
        {{jsFiles}}
    ],
    sassFiles: [
        {{sassFiles}}
    ],
    imageDirectories: [
        {{imageDirectories}}
    ],
    fontDirectories: [
        {{fontDirectories}}
    ],
    staticDirectories: [
        {{staticDirectories}}
    ],
    watchFiles: [
        {{watchFiles}}
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

