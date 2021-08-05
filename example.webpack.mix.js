/**
 * CORE ASTUTEO BUILD SYSTEM
 * Version 5.3.0 | Updated: 2/2020
 *
 * Astuteo Laravel Mix Config
 * Requires Laravel Mix 6.x
 *
 * 1. Include external dependencies
 * 2. Generate project banner
 * 3. Laravel Mix Config
 *    a. Javascript config and files as defined in config/mix/project-config
 *    b. Include Sass files as defined in config/mix/project-config
 *    c. Copy image files as defined in config/mix/project-config
 *    d. Copy font files as defined in config/mix/project-config
 *    e. Copy any static directories as defined in config/mix/project-config
 *    f. Browsersync settings as defined in config/mix/project-config
 */

/**
 * 1. INCLUDE EXTERNAL DEPENDENCIES
 */
const project = require('./config/mix/project-config')
const mix = require('laravel-mix')
const pkg = require('./package.json')

require('laravel-mix-polyfill')
require('laravel-mix-banner')

let domain = project.defaultDomain
try {
  domain = require('./config/mix/local-config').domain
} catch (e) {
  console.log(`local-config.js not found, using default ${domain}`)
}

/**
 * 2. GENERATE PROJECT BANNER
 */
Date.prototype.mmddyyyy = function () {
  const mm = this.getMonth() + 1 // getMonth() is zero-based
  const dd = this.getDate()
  return [
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd,
    this.getFullYear(),
  ].join('')
}
let date = new Date()
date = date.mmddyyyy()

if (typeof pkg.project === 'undefined') {
  console.warn('[WARNING] missing project key in package.json')
}
if (typeof pkg.author === 'undefined') {
  console.warn('[WARNING] missing author key in package.json')
}
if (typeof pkg.version === 'undefined') {
  console.warn('[WARNING] missing version key in package.json')
}
const banner = [
  '/**',
  ` * @project        ${pkg.project}`,
  ` * @author         ${pkg.author}`,
  ` * @date           ${date}`,
  ` * @release        ${pkg.version}`,
  ' */',
  '',
]

/**
 * 3. LARAVEL MIX CONFIG
 */
mix.setPublicPath(project.dest.public)
/**
 * 3A. JAVASCRIPT
 */
mix
  .js(project.jsFiles, project.dest.js)
  .polyfill({
    enabled: true,
    debug: false,
    useBuiltIns: 'usage',
    targets: false, // setting to false will cause it to read from .browserslistrc
  })
  .sourceMaps()

/**
 * 3B. SASS
 */
project.sassFiles.forEach((file) => {
  mix.sass(file, project.dest.css, {}).options({
    postCss: [require('tailwindcss')(project.tailwindconfig)],
  })
})
/**
 * 3C. IMAGES
 */
project.imageDirectories.forEach((directory) => {
  mix.copyDirectory(directory, `${project.dest.public}/${project.dest.images}`)
})
/**
 * 3D. FONTS
 */
if (
  typeof project.fontDirectories !== 'undefined' &&
  project.fontDirectories.length > 0
) {
  project.fontDirectories.forEach((directory) => {
    mix.copyDirectory(
      directory.src,
      `${project.dest.public}/${project.dest.fonts}`,
    )
  })
}
/**
 * 3E. STATIC DIRECTORIES
 */
if (
  typeof project.staticDirectories !== 'undefined' &&
  project.staticDirectories.length > 0
) {
  project.staticDirectories.forEach((directory) => {
    mix.copyDirectory(directory.src, directory.dest)
  })
}
/**
 * 3F. STATIC DIRECTORIES
 */
mix.browserSync({
  proxy: domain,
  files: project.watchFiles,
})

/**
 * 3G: PRODUCTION
 */
if (mix.inProduction()) {
  mix.banner({
    banner: (function () {
      return banner.join('\n')
    })(),
    raw: true,
  })
  mix.options({
    terser: {
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
  })
  mix.version()
}
