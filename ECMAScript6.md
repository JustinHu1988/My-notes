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

you can also name class expressions:

```javascript
let PersonClass = class PersonClass2 {
  	// equivalent of the PersonType constructor
    constructor(name) {
        this.name = name
    }
    // equivalent of PersonType.prototype.sayName
    sayName() {
        console.log(this.name)
    }
}
console.log(typeof PersonClass) 	// "function"
console.log(typeof PersonClass2)	// "undefined"
```

In this example, the class expression is named `PersonClass2`. The `PersonClass2`identifier exists only within the class definition so that it can be used inside the class methods (such as the `sayName()` method in this example). Outside the class, `typeof PersonClass2` is `"undefined"` because no `PersonClass2` binding exists there. To understand why this is, look at an equivalent declaration that doesn't use classes:

```javascript
// direct equivalent of PersonClass named class expression
let PersonClass = (function() {

    "use strict"

    const PersonClass2 = function(name) {

        // make sure the function was called with new
        if (typeof new.target === "undefined") {
            throw new Error("Constructor must be called with new.")
        }

        this.name = name
    }

    Object.defineProperty(PersonClass2.prototype, "sayName", {
        value: function() {

            // make sure the method wasn't called with new
            if (typeof new.target !== "undefined") {
                throw new Error("Method cannot be called with new.")
            }

            console.log(this.name)
        },
        enumerable: false,
        writable: true,
        configurable: true
    });

    return PersonClass2
}());
```

Creating a named class expression slightly changes what’s happening in the JavaScript engine. For class declarations, the outer binding (defined with `let`) has the same name as the inner binding (defined with `const`). A named class expression uses its name in the `const` definition, so `PersonClass2` is defined for use only inside the class.



## Classes as First-Class Citizens

#### Definition 

In programming, something is said to be a *first-class citizen* when it can be used as a value, meaning it can be passed into a function, returned from a function, and assigned to a variable.

-  JavaScript functions are first-class citizens (sometimes they're just called first class functions), and that’s part of what makes JavaScript unique.
- ECMAScript 6 continues this tradition by making classes first-class citizens as well. That allows classes to be used in a lot of different ways.

#### Usage

- passed into functions as arguments:

  ```javascript
  function createObject(classDef){
    return new classDef()
  }

  let obj = createObject(class {
      sayHi(){
          console.log("Hi")
      }
  })
  obj.sayHi()		// "Hi"
  ```

  ​

- creating singletons by immediately invoking the class constructor: (you must use `new` with a class expression and include parentheses at the end)

  ```javascript
  let person = new class {
    constructor(name){
        this.name = name
    }
    sayName(){
        console.log(this.name)
    }
  }('Nicholas')
  person.sayName();	// "Nicholas"
  ```

  ​

## Accessor Properties

classes allow you to define accessor properties on the prototype.

```javascript
class CustomHTMLElement {
    
  constructor(element){
      this.element = element
  }
  get html(){
      return this.element.innerHTML
  }
  set html(value){
      this.element.innerHTML = value;
  }
  
}
```

This accessor property is created on the CustomHTMLElement.prototype and, just like any other method would be, is created as non-enumerable. The equivalent non-class representation is:

```javascript
// direct equivalent to previous example
let CustomHTMLElement = (function() {

    "use strict";

    const CustomHTMLElement = function(element) {

        // make sure the function was called with new
        if (typeof new.target === "undefined") {
            throw new Error("Constructor must be called with new.");
        }

        this.element = element;
    }

    Object.defineProperty(CustomHTMLElement.prototype, "html", {
        enumerable: false,
        configurable: true,
        get: function() {
            return this.element.innerHTML;
        },
        set: function(value) {
            this.element.innerHTML = value;
        }
    });

    return CustomHTMLElement;
}());
```



## Computed Member Names

The similarities between object literals and classes aren't quite over yet. Class methods and accessor properties can also have computed names. 

Instead of using an identifier, use square brackets around an expression, which is the same syntax used for object literal computed names.

```Javascript
let methodName = "sayName";
class PersonClass {
    constructor(name){
        this.name = name
    }
  [methodName](){
      console.log(this.name)
  }
}
let me = new PersonClass("Nicholas")
me.sayName()	// 'Nicholas'
```

Accessor properties can use computed names in the same way, like this:

```javascript
let propertyName = "html";

class CustomHTMLElement {

    constructor(element) {
        this.element = element;
    }

    get [propertyName]() {
        return this.element.innerHTML;
    }

    set [propertyName](value) {
        this.element.innerHTML = value;
    }
}
```

