//柯里化与函数绑定

//柯里化
function curry (fn) {
    var slice = Array.prototype.slice;
    var args = slice.call(arguments, 1);
    
    return function () {
        return fn.apply(null, args.concat(slice.call(arguments)));
    }
}

function add (num1, num2) {
    return num1 + num2;
}

var curryAdd = curry(add, 1);
console.log(curryAdd(8));

//函数绑定
function bind (fn, context) {
    return  function () {
        return fn.apply(context, arguments);
    }
}