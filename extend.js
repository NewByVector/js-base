//js继承

//原型继承(老)
//中间加嫁接层F,保证child.prototype里面不会被添加实例属性
function  inherit(parent, child) {
    var F = function () {};
    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
}

var Animation = function (name) {
    this.name = name;
};
Animation.prototype.sayName = function () {
    console.log(this.name);
};
var Cat = function (name, age) {
    Animation.call(this, name);
    this.age = age;
};
inherit(Animation, Cat);
//记得增加原型方法要在继承之后
Cat.prototype.sayAge = function () {
    console.log(this.age);  
};

var cat = new Cat('vector', 25);
cat.sayName();
cat.sayAge();

//原型继承(新)
var parent = {
    name: 'vector',
    sayName: function () {
        console.log(this.name);
    }
};
var child = Object.create(parent, {
    age: {
        value: 25,
        writable: true,
        configurable: true,
        enumerable: true,
    },
    sayAge: {
        get: function () {
            return this.age + 1;
        }
    }
});
child.sayName();

//拷贝继承
function extend(newObj, oldObj, deep) {
    var i;
    newObj = newObj || {};

    for (i in oldObj) {
        if (deep && typeof oldObj[i] === 'object') {
            newObj[i] = Array.isArray(oldObj[i]) ? [] : {};
            extend(newObj[i], oldObj[i], true);
        } else {
            newObj[i] = oldObj[i];
        }
    }

    return newObj;
}