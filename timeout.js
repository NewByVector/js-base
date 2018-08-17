//定时器完成一些效果

//当一个函数需要花50ms以上时间完成,可以考虑分割任务，使之不会阻塞页面
function chunk (array, process) {
    var items = array.concat();

    setTimeout(function () {
        var start = +new Date();

        do {
            process(items.shift());
        } while(items.length > 0 && (+new Date() - start < 50));
        
        if (array.length > 0) {
            setTimeout(arguments.callee, 25);
        }
        
    }, 25);
}

//防抖
//var fn = debounce(add);
function debounce(method) {
    var tId = null;
    return function () {
        clearTimeout(tId);
        tId = setTimeout(function () {
            method.apply(null, arguments);
        }, 100);
    }

}

//节流
//var fn = throttle(add, 100);
function throttle (method, delay) {
    var last = 0;
    return function () {
        var curr = +new Date();
        if (curr - last > delay) {
            method.apply(null,arguments);
            last = curr;
        }
    }
}