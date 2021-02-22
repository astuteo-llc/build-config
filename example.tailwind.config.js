let project = require('./config/mix/project-config');

module.exports = {
    purge: project.purge,
    prefix: '',
    important: false,
    separator: ':',
    corePlugins: {},
    plugins: [],
    theme: {
        extend: {
        }
    }
}