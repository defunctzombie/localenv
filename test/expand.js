var assert = require('assert');
var expand = require('../lib/expand');

suite('expand')

test('should not change block when nothing to expand', function() {
    var block = {
        KEY: 'value',
        FOO: 'bar'
    };

    assert.deepEqual(expand(block, {}), {
        KEY: 'value',
        FOO: 'bar'
    });
});

test('should expand based on known value from block', function() {
    var block = {
        KEY: 'value',
        FOO: '$KEY'
    };

    assert.deepEqual(expand(block, {}), {
        KEY: 'value',
        FOO: 'value'
    });
});

test('should expand based on known value from env', function() {
    var block = {
        FOO: '$KEY'
    };

    assert.deepEqual(expand(block, { KEY: 'value' }), {
        FOO: 'value'
    });
});

test('should expand to blank when no value found', function() {
    var block = {
        FOO: '$KEY'
    };

    assert.deepEqual(expand(block, {}), {
        FOO: ''
    });
});

test('should support escape from expanding', function() {
    var block = {
        FOO: '\\$KEY'
    };

    assert.deepEqual(expand(block, { KEY: 'value' }), {
        FOO: '$KEY'
    });
});
