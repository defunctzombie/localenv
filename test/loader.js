var assert = require('assert');

var loader = require('../lib/loader');

suite('loader');

test('should return empty object if file is not found', function() {
    assert.deepEqual(loader.load_env('/some/random/file/path/env'), Object.create(null));
});

test('should load a basic file', function() {
    assert.deepEqual(loader.load_env(__dirname + '/fixtures/basic.env'), {
        KEY: 'value',
        ZERO: 'value'
    });
});

test('should load and expand', function() {
    assert.deepEqual(loader.load_env(__dirname + '/fixtures/expand.env'), {
        KEY: 'value',
        FOO: 'magic',
        URL: 'magic'
    });
});
