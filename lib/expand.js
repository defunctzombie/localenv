function expand(block, obj) {
    // replace references
    Object.keys(block).forEach(function(key) {
        var value = block[key];

        // variable in value starts with a $
        if (value.charAt(0) === '$') {
            var ref_field = value.substring(1);
            value = block[ref_field] || obj[ref_field] || '';
        }
        // varaible can be escaped with a \$
        else if (value.substring(0,2) === '\\$') {
            value = value.substring(1);
        }

        block[key] = value;
    });

    return block;
};

module.exports = expand;
