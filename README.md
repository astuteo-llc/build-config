## Build system 5.0
Config now uses Laravel Mix 6.x. Behind the scenes the system is much different from versions 2.x and earlier and a direct upgrade may not be possible without significant configuration work. Please see Upgrade from Version 2 notes.

### Commands
dev: `npx mix watch`
production: `npx mix --production`

### New project, quick setup. 
All commands are run from project root

#### Step 1:
Copy example webpack config

`cp ./node_modules/@astuteo/build-config/example.package.json ./package.json`


#### Step 2:
Copy example webpack config

`cp ./node_modules/@astuteo/build-config/example.webpack.mix.js ./webpack.mix.js`


#### Step 3:
Copy example configuration

`cp ./node_modules/@astuteo/build-config/config/mix/example.project-config.js ./config/mix/project-config.js`

`cp ./node_modules/@astuteo/build-config/config/mix/example.safelist.js ./config/mix/safelist.js`

`cp ./node_modules/@astuteo/build-config/config/mix/sample-local-config.js ./config/mix/sample-local-config.js`

#### Step 4 (optional):
Copy .nvmrc, this will inform which version of nodejs the project should run.

`cp ./node_modules/@astuteo/build-config/example.nvmrc ./.nvmrc`

## About the files

#### About package.json

The `"@astuteo/build-config"` dependency includes Mix, the Mix plugins and Prettier config that we use across our projects. This should bet set to `^5.0.0`. This does not include tailwind or any javascript libraries that we use on the frontend.

The first time that you run Mix it will install additional dependencies. At this time, we are excluding those from our config to make sure it has the latest version of each that works with the latest version of Mix.

This process can be a bit quirky, and you may need to run `yarn` to install the dependencies if it seems Mix is going in a loop attempting to add the same packages more than once.

#### About webpack.mix.js
Avoid modifying this with any project specific configuration if at all possible. The goal is to keep this completely replaceable when we go to upgrade a project.

#### About config/mix/project-config.js
This file contains a project javascript object and where all project specific settings should go. Be sure to edit and commit this on a per-project basis.

#### About config/mix/safelist.js
Selectors that PurgeCSS will ignore regardless if it's in our code or not. 
NOTE: We are now using the default behavior of Tailwind's built-in PurgeCSS. Only Tailwind files and Sass code wrapped in @layer will be purged. This should ease issues with third-party libraries.

#### About config/mix/sample-local-config.js
If you rename a copy of this to local-config.js you can override the default local project.




