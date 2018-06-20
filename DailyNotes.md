## CPU 架构

- **CISC** - Complex Instruction Set Computing
  - Example: 
    - x86 (from Intel 8086)
- **RISC** - Reduced Instruction Set Computing
  - Example:
    - PowerPC
    - ARM




## javascript 知识点


#### js分号规则

- 以`(`, `[`, `+`, `-`, `/`开头的语句，将会与上一行语句连接起来解释，因此有必要加前置分号。


- `continue`, `return`, `break`, `throw`, `++`, `--`后若直接换行，所在行会自动插入分号，需要注意。



#### js变量声明

- 不使用`var`, `let`, `const` 声明的变量，不论在哪里声明，都会变成*全局变量*。（strict模式可以对此报错）



#### JSON.parse / JSON.stringify

 **JSON.parse()** method parses a JSON string, constructing the JavaScript value or object described by the string.

The **JSON.stringify()** method converts a JavaScript value to a JSON string



#### Object.keys()

The `Object.keys(obj)` method returns an array of a given object's property **names**, in the same order as we get with a normal loop.

- Return value: An array of strings that represent all the enumerable properties of the given object.



#### for ... in

The **for...in statement** iterates over the [enumerable properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties) of an object. For each distinct property, statements can be executed.

```javascript
var string1 = ''
var object1 = {a:1, b:2, c:3}

for (let property1 in object1){
    string1 = string1 + object1[property1]
}
console.log(string1) // '123'
```



#### enumerable properites

Enumerable properties are those properties whose internal [[Enumerable]] flag is set to true, which is the default for properties created via simple assignment or via a property initializer (properties defined via [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) and such default [[Enumerable]] to false). Enumerable properties show up in [for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) loops unless the property's name is a [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol). 



#### *Getter / setter (access property)*

```javascript
var obj = {
  log: ['a', 'b', 'c'],
  get latest() {
    if (this.log.length == 0) {
      return undefined;
    }
    return this.log[this.log.length - 2];
  },
  set latest(value){
  	this.log.push(value)
  }
}
console.log(obj.latest); // "b"
obj.latest = "d";
console.log(obj.latest); // "c"
```



#### `super`



#### `static`

Static method calls are made directly on the class and are not callable on instances of the class. Static methods are often used to create utility functions.

In order to call a static method within another static method of the same class, you can use the `this` keyword.

```javascript
class StaticMethodCall {
  static staticMethod() {
    return 'Static method has been called';
  }
  static anotherStaticMethod() {
    return this.staticMethod() + ' from another static method';
  }
}
StaticMethodCall.staticMethod(); 
// 'Static method has been called'

StaticMethodCall.anotherStaticMethod(); 
// 'Static method has been called from another static method'
```



#### rest parameter



#### `new.target`

- When a function's `[[Construct]]` method is called, `new.target` is filled with the target of the `new` operator. That target is typically the constructor of the newly created object instance that will become `this` inside the function body.
- If `[[Called]]` is executed, then `new.target` in this function is `undefined`.

Usage:

- *This new metaproperty allows you to safely detect if a function is called with `new` by checking whether `new.target` is defined.*

Example:

```javascript
function Person(name){
    if(typeof new.target !== 'undefined'){
        this.name = name; // using new
    }else{
        throw new Error('You must use new with Person.')
    }
}
var person = new Person('Nicholas');
var notAPerson = Person.call(person, 'Michael'); // error
```

```javascript
function Person(name){
    if(new.target === Person){
        this.name = name; // using new
    }else{  
      throw new Error("You must use new with Person.")
    }
}
function AnotherPerson(name){
    Person.call(this,name);
}
var person = new Person("Nicholas");
var anotherPerson = new AnotherPerson("Nicholas");  // error!
```

The Example 2 throw an error, because `new.target` is still `undefined` inside of the Person constructor.

> Warning: Using `new.target` outside of a function is a syntax error.

#### Block-Level Functions







#### Symbol



#### Generator



#### Promise



#### 原生dom操作

- `Element.querySelector()`
  - Returns the first element that is a descendant of the element on which it is invoked that matches the specified group of selectors.





#### `bind()`, `call()`, `apply()`

bind后函数不会执行，而只是返回一个改变了上下文的函数副本（新函数），而call和apply是直接执行函数。

The `bind()` method creates a new function that, when called, has its `this` keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.



#### `instanceof`

The `instanceof` operator tests whether the `prototype` property of a constructor appears anywhere in the prototype chain of an object.

```javascript
class Car{
  constructor(make, model, year){
    this.make = make;
  	this.model = model;
  	this.year = year;
  }
}
let auto = new Car('Honda', 'Accord', 1998);

console.log(auto instanceof Car);		// true
console.log(auto instanceof Object);	// true
```

#### `Object.prototype`

The `Object.prototype` property represents the [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) prototype object.

#### `Object.prototype.__proto__`

The `__proto__` property of [`Object.prototype`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype) is an accessor property (a getter function and a setter function) that exposes the internal `[[Prototype]]` (either an object or [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)) of the object through which it is accessed.

#### `Object.getPrototypeOf()`

The `Object.getPrototypeOf()` method returns the prototype (i.e. the value of the internal `[[Prototype]]` property) of the specified object.

```javascript
const prototype1 = {}
const object1 = Object.create(prototype1);

console.log(Object.getPrototypeOf(Object1) === prototype1);
// expected output: true
```

#### `Object.setPrototypeOf()`

The `Object.setPrototypeOf()` method sets the prototype (i.e., the internal `[[Prototype]]` property) of a specified object to another object or [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null).

> Warning: Changing the `[[Prototype]]` of an object is, by the nature of how modern JavaScript engines optimize property accesses, a very slow operation, in **every** browser and JavaScript engine.

#### `Object.create()`

The `Object.create()` method creates a new object, using an existing object to provide the newly created object's `__proto__` . (see browser console for visual evidence.)



