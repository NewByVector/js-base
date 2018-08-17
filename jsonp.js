//实现jsonp功能
(function (window) {
    var id = 0;
    var head = document.getElementsByTagName('head')[0];

    function jsonp (options) {
        if (!options || !options.url) return;

        var scriptNode = document.createElement('script'),
            data = options.data || {},
            url = options.url,
            callback = options.callback,
            fnName = 'jsonp' + (id++);

        data['callback'] = fnName;

        //拼接url
        var params = [];
        for (var key in data) {
            params.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
        url = url.indexOf('?') > 0 ? (url + '&') : (url + '?');
        url += params.join('&');
        scriptNode.src = url;

        //暴露全局方法
        window[fnName] = function (ret) {
            callback && callback(ret);
            head.removeChild(scriptNode);
            delete window[fnName];
        };

        //出错处理
        scriptNode.onerror = function () {
            callback && callback({error: 'error'});
            head.removeChild(scriptNode);
            window[fnName] && delete window[fnName];  
        };

        scriptNode.type = 'text/javascript';
        head.appendChild(scriptNode);
    }
    window.jsonp = jsonp;

})(window);