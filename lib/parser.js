// return a [key, value] from a line
// return null if the line is invalid, blank, or a comment
function parse_line(line) {
    var key_value_array = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/);
    if (!key_value_array) {
        return null;
    }

    var key = key_value_array[1];
    var value = key_value_array[2];

    if (typeof value === 'undefined'){
        value = '';
    }

    if (value.charAt(0) === '"' && value.charAt(value.length-1) == '"') {
        value = value.replace(/\\n/gm, '\n');
    }

    value = value.replace(/(^['"]|['"]$)/g, ''); // replace first and last quotes only

    return [key, value];
}

function parse_block(data) {
    var obj = Object.create(null);

    data.trim()
    .split('\n')
    .filter(Boolean)
    .map(parse_line)
    .filter(Array.isArray)
    .forEach(function(pair) {
        var key = pair[0];
        var value = pair[1];
        obj[key] = value.trim();
    });

    return obj;
}

module.exports.parse_line = parse_line;
module.exports.parse_block = parse_block;
