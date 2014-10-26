var loader = require('./lib/loader');

var env = process.env.NODE_ENV || 'development';

// no auto loading in production
// makes it ok to check in your .env.development files
// don't check in your .env.local file tho :)
if (env === 'production') {
    return;
}

loader.inject_env('.env.local');
loader.inject_env('.env');
