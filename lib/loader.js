var fs = require('fs');

var expand = require('./expand');
var parser = require('./parser');

// load from file and return key/values
module.exports.load_env = function load_env(filepath) {
    try {
        var data = fs.readFileSync(filepath, 'utf8');
        var block = parser.parse_block(data);
        return expand(block, process.env);
    }
    catch (err) {
        if (err.code === 'ENOENT') {
            return Object.create(null);
        }

        // rethrow anything that is not a file not found
        throw err;
    }

    return Object.create(null);
};

// inject the env file at filepath into the process.env
// if the key already exists in the environment, a new value will not be injected
module.exports.inject_env = function inject_env(filepath) {
    var obj = module.exports.load_env(filepath);
    Object.keys(obj).forEach(function(key) {
        process.env[key]  = process.env[key] || obj[key];
    });
};
