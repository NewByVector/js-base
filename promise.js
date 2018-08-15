//实现promise
function createPromise() {
    return {
        value: null,
        state: 'pending',  //pending fulfilled rejected
        dependencies: []
    }
}
function depend(promise, onSuccess, onError) {
    var result = createPromise();

    if (promise.state === 'pending') {
        promise.dependencies.push({
            fulfilled: function (value) {
                depend(onSuccess(value), 
                function (newValue) {
                    fulfil(result, newValue);
                    return createPromise();
                }, function (newError) {
                    reject(result, newError);
                    return createPromise();
                });
            },
            rejected: function (value) {
                depend(onError(value), 
                function (newValue) {
                    fulfil(result, newValue);
                    return createPromise();
                }, function (newError) {
                    reject(result, newError);
                    return createPromise();
                });
            }
        });
    } else {
        if (promise.state === 'fulfilled') {
            depend(onSuccess(promise.value),
            function (newValue) {
                fulfil(result, newValue);
                return createPromise();
            }, function (newError) {
                reject(result, newError);
                return createPromise();
            });
        }
    }

    return result;
}
function fulfil(promise, value) {
    if (promise.state !== 'pending') {
        throw new Error('Trying to reject a non-pending promise!');
    } else {
        promise.value = value;
        promise.state = 'fulfilled';
        var dependencies = promise.dependencies;
        promise.dependencies = [];
        dependencies.forEach(function (pattern) {
            pattern.fulfilled(value);
        });
    }
}
function reject(promise, error) {
    if (promise.state !== 'pending') {
        throw new Error('Trying to reject a non-pending promise!');
    } else {
        promise.value = error;
        promise.state = 'rejected';
        var dependencies = promise.dependencies;
        promise.dependencies = [];
        dependencies.forEach(function (pattern) {
            pattern.rejected(error);
        });
    }
}

//测试
var readFile = function () {
    var promise = createPromise();
    setTimeout(function () {
        //fulfil(promise, 'ABC');
        reject(promise, 32);
    }, 2000);
    return promise;
};
var writeFile = function (txt) {
    var promise = createPromise();
    setTimeout(function () {
        fulfil(promise, console.log('write file success! content is ' + txt));
    }, 1000);
    return promise;
};
var errorHandle = function (error) {
    var promise = createPromise();
    fulfil(promise, console.log('ErroCode: ' + error));
    return promise;
};
depend(readFile(), writeFile, errorHandle);