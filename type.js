var types = ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Object', 'Error', 'JSON'];
var class2type = {};
var core_toString = Object.prototype.toString;
var name;

for (var i = 0, len = types.length; i < len; i++) {
    name = types[i];
    class2type['[object ' + name + ']'] = name.toLowerCase();
}

function type (obj) {
    if (obj == null) {
        return String(obj);
    }
    if (typeof obj === 'object' || typeof obj === 'function') {
        return class2type[core_toString.call(obj)] || 'object';
    } else {
        return typeof obj;
    }
}

