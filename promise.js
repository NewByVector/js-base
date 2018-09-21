//实现promise功能

//创建promise对象
function createPromise() {
    return {
        value: null,
        state: 'pending',
        dependencies: [],
        then: function (onSuccess, onError) {
            return depend(this, onSuccess, onError);
        }
    };
}

//定义依赖关系
function depend(promise, onSuccess, onError) {
    let result = createPromise();

    if (promise.state === 'pending') {
        promise.dependencies.push({
            fulfilled: function (value) {
                depend(onSuccess(value), function (newValue) {
                    resolve(result, newValue);
                    return createPromise();
                }, function (newError) {
                    reject(result, newError);
                    return createPromise();
                });
            },
            rejected: function (value) {
                depend(onError(value), function (newValue) {
                    resolve(result, newValue);
                    return createPromise();
                }, function (newError) {
                    reject(result, newError);
                    return createPromise();
                });
            }
        });
    } else {
        if (promise.state === 'fulfilled') {
            depend(onSuccess(promise.value), function (newValue) {
                resolve(result, newValue);
                return createPromise();
            }, function (newError) {
                reject(result, newError);
                return createPromise();
            });
        } else if (promise.state === 'rejected') {
            depend(onError(promise.value),function (newValue) {
                resolve(result, newValue);
                return createPromise();
            }, function (newError) {
                reject(result, newError);
                return createPromise();
            });
        }
    }

    return result;
}

//resolve
function resolve(promise, value) {
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

//reject
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

//promise.all
function waitAll(promises, onSuccess, onError) {
    var values = new Array(promises.length);
    var pending = values.length;
    var result = createPromise();
    var resolved = false;

    depend(result, onSuccess, onError);

    promises.forEach(function (promise, index) {
        depend(promise, function (value) {
            if (!resolved) {
                values[index] = value;
                pending = pending - 1;
                if (pending === 0) {
                    resolved = true;
                    resolve(result, values);
                }
            }
            return createPromise();
        }, function (error) {
            if (!resolved) {
                resolved = true;
                reject(result, error);
            }
            return createPromise();
        })
    });

    return result;
}

let readFile = function () {
    let promise = createPromise();
    setTimeout(function () {
        console.log('read file over');
        resolve(promise, 'abc');
    }, 2000);
    return promise;
};
let writeFile = function () {
    let promise = createPromise();
    setTimeout(function () {
        console.log('write file over');
        resolve(promise,'def');
    }, 3000);
    return promise;
}
// readFile().then(function (resp) {
//     return writeFile(resp);
// }, function (error) {
//     console.log(error);
//     return createPromise();
// })
// .then(function () {
//     console.log('on success!');
//     return createPromise();
// }, function () {
//     console.log('on error!');
//     return createPromise();
// });

waitAll([readFile(), writeFile()], function (values) {
    console.log(values);
    return createPromise();
}, function (error) {
    console.log(error);
    return createPromise();
});