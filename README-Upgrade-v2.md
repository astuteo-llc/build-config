## Upgrade from Version 2

Changes to be aware of:
- The version of Webpack is multiple versions newer. This may not play well with jQuery plugins
- PurgeCSS will only purge Tailwind styles and anything wrapped in a @layer. If this causes a problem, you can comment out the project-config.js purge object for mode
- The project banner now uses the package.json. Be sure to set: `project`, `author` and `version` in the package.json if not already.

### Update project config:
#### Copy example configurations

`cp ./node_modules/@astuteo/build-config/config/mix/example.project-config.js ./config/mix/project-config.js`

`cp ./node_modules/@astuteo/build-config/config/mix/example.safelist.js ./config/mix/safelist.js`

`cp ./node_modules/@astuteo/build-config/config/mix/sample-local-config.js ./config/mix/sample-local-config.js`

In the config/mix/project-config.js file, adjust all the paths to match config/build/path-config.json. For more flexibility, these will not be 1:1 key names.

### Update package.json
Add "@astuteo/build-config": "^5.0.0", as a dependency and remove any dependencies from previous build system.


### Copy webpack.config.js 

`cp ./node_modules/@astuteo/build-config/example.webpack.mix.js ./webpack.mix.js`


Follow the rest of the instructions in the readme.md. Once you confirm the system is working well with the Mix version, you can remove the directory `config/build/`.

### Update bin/deploy
The deploy process will need to be updated, possibly along with the server's version of nodejs. This could possibly cause issues where multiple sites on different build systems are on the same server.
