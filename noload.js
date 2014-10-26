// don't autoload anything into the environment
// just return module for manual use
module.exports = require('./lib/loader');
module.exports.parser = require('./lib/parser');
