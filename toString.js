const dogName = 'Fluffy';
dogName.toString();  //'Fluffy' (String.prototype.toString called here)
Object.prototype.toString.call(dogName);  //'[object String]'

const dog = {name: 'Fluffy'};
dog.toString();  //'[object Object]'
dog[Symbol.toStringTag] = 'Dog';
dog.toString();  //'[object Dog]'

const Dog = function (name) {
    this.name = name;
};
Dog.prototype[Symbol.toStringTag] = 'Dog';
const dog = new Dog('Fluffy');
dog.toString();  //'[object Dog]'

class Dog {
    constructor (name) {
        this.name = name;
    }
    get [Symbol.toStringTag]() {
        return 'Dog';
    }
}
const dog = new Dog('Fluffy');
dog.toString();  //'[object Dog]'
