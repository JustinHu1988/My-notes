# Classes

## Class-like Structures in ES5

The closest equivalent to a class was creating a constructor and then assigning methods to the constructor's prototype, an approach typically called creating a custom type.

```javascript
function PersonType(name){
    this.name = name
}
PersonType.prototype.sayName = function(){
    console.log(this.name)
}
let person = new PersonType('Nicholas')
person.sayName()	// 'Nicholas'

console.log(person instanceof PersonType)	// true
console.log(person instanceof Object)	// true
```

This basic pattern underlies a lot of the class-mimicking JavaScript libraries, and that's where ECMAScript 6 classes start.



## Class Declarations

The simplest class form in ECMAScript 6 is the class declaration.

#### A Basic Class Declaration

Begin with `class` keyword, followed by the name of the class. The rest of the syntax looks similar to concise methods in object literals, without requiring commas between them.

```javascript
class PersonClass {
  // equivalent of the PersonType constructor
  constructor(name){
    this.name = name
  }
  // equivalent of PersonType.prototype.sayName
  sayName(){
    console.log(this.name)
  }
}

let person = new PersonClass('Nicholas')
person.sayName()	// 'Nicholas'

console.log(person instanceof PersonClass)     // true
console.log(person instanceof Object)          // true

console.log(typeof PersonClass)                    // "function"
console.log(typeof PersonClass.prototype.sayName)  // "function"
```

- The class declaration `PersonClass` behaves quite similarly to `PersonType` from the previous example. But instead of defining a function as the constructor, class declarations allow you to define the constructor directly inside the class with the special `constructor` method name. 
- Since class methods use the concise syntax, there's no need to use the `function` keyword. 
- All other method names have no special meaning, so you can add as many methods as you want.

> *Own properties*, properties that occur on the instance rather than the prototype, can only be created inside a class constructor or method. In this example, `name` is an own property.



Interestingly, *class declarations are just syntactic sugar on top of the existing custom type declarations*.



#### Why to Use the Class Syntax

Despite the similarities between classes and custom types, there are some *important differences* to keep in mind:

1. Class declarations, unlike function declarations, are *not hoisted*. Class declarations act *like `let` declarations* and so exist in the temporal dead zone until execution reaches the declaration.
2. All code inside of class declarations runs *in strict mode* automatically. There’s no way to opt-out of strict mode inside of classes.
3. All *methods are non-enumerable*. This is a significant change from custom types, where you need to use `Object.defineProperty()` to make a method non-enumerable.
4. All methods lack an internal `[[Construct]]` method and will throw an error if you try to call them with `new`.
5. Calling the class constructor without `new` throws an error.
6. Attempting to overwrite the class name within a class method throws an error.

With all of this in mind, *the `PersonClass` declaration from the previous example is directly equivalent to the following code, which doesn't use the class syntax:*

```javascript
// direct equivalent of PersonClass
let PersonType2 = (function(){
  'use strict'
  
  const PersonType2 = function(name){
    // make sure the function was called with new
    if(typeof new.target === 'undefined'){
      throw new Error('Constructor must be called with new.')
    }
    this.name = name
  }
  
  Object.defineProperty(PersonType2.prototype, 'sayName', {  
    value: function(){
      // make sure the method wasn't called with new
      if(typeof new.target !== 'undefined'){
          throw new Error('Method cannot be called with new.')
      }
      console.log(this.name)
    },
    enumerable:false,
    writable:true,
    configurable:true
  })
  return PersonType2
})()
```



**Constant Class Names:**

The name of a class is only specified as if using `const` inside of the class itself. That means you can overwrite the class name outside of the class but not inside a class method. For example:

```javascript
class Foo{
    constructor(){
        Foo = 'bar'	// throws an error when executed
    }
}
// but this is okay after the class declaration
Foo = 'baz'
```



## Class Expressions

#### A basic class expression

```javascript
let PersonClass = class{
  constructor(name){
      this.name = name
  }   
  sayName(){
      console.log(this.name)
  }
}

let person = new PersonClass('Nicholas')
person.sayName()	// outputs 'Nicholas'


```

Aside from the syntax, class expressions are functionally equivalent to class declarations.

Whether you use class declarations or class expressions is mostly *a matter of style*. Unlike function declarations and function expressions, both class declarations and class expressions are not hoisted, and so the choice has little bearing on the runtime behavior of the code.



#### Named Class Expressions

