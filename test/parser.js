var assert = require('assert');
var parser = require('../lib/parser');

suite('parser')

test('should parse key/value line', function() {
    assert.deepEqual(parser.parse_line('KEY=value'), ['KEY', 'value']);
});

test('should ignore comments', function() {
    assert.deepEqual(parser.parse_line('# COMMENT=value'), null);
});

test('should ignore blank lines', function() {
    assert.deepEqual(parser.parse_line(''), null);
});

test('should handle empty values', function() {
    assert.deepEqual(parser.parse_line('KEY='), ['KEY', '']);
});

test('should strip away single quotes', function() {
    assert.deepEqual(parser.parse_line('KEY=\'value\''), ['KEY', 'value']);
});

test('should strip away double quotes', function() {
    assert.deepEqual(parser.parse_line('KEY="value"'), ['KEY', 'value']);
});

test('should expand newlines in double quotes', function() {
    // use \\n to avoid js converting the literal \n into a newline
    // when parsing an env file, we will actually encounter both characters \n
    assert.deepEqual(parser.parse_line('KEY="expand\\nnewlines"'), ['KEY', 'expand\nnewlines']);
});

test('should not expand newlines in single quotes', function() {
    // use \\n to avoid js converting the literal \n into a newline
    // when parsing an env file, we will actually encounter both characters \n
    assert.deepEqual(parser.parse_line('KEY=\'expand\\nnewlines\''), ['KEY', 'expand\\nnewlines']);
});

test('should not expand newlines with no quotes quotes', function() {
    // use \\n to avoid js converting the literal \n into a newline
    // when parsing an env file, we will actually encounter both characters \n
    assert.deepEqual(parser.parse_line('KEY=expand\\nnewlines'), ['KEY', 'expand\\nnewlines']);
});

test('should handle \\$ in values', function() {
    assert.deepEqual(parser.parse_line('KEY=\\$VALUE'), ['KEY', '\\$VALUE']);
});

test('should handle support = in values', function() {
    assert.deepEqual(parser.parse_line('KEY=='), ['KEY', '=']);
});

test('should retain inner quotes', function() {
    assert.deepEqual(parser.parse_line('KEY={"foo": "bar"}'), ['KEY', '{"foo": "bar"}']);
});

test('should retain inner quotes when single quoted', function() {
    assert.deepEqual(parser.parse_line('KEY=\'{"foo": "bar"}\''), ['KEY', '{"foo": "bar"}']);
});

test('should retain inner quotes when double quoted', function() {
    assert.deepEqual(parser.parse_line('KEY="{"foo": "bar"}"'), ['KEY', '{"foo": "bar"}']);
});
