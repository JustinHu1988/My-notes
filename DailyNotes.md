## CPU 架构

- **CISC** - Complex Instruction Set Computing
  - Example: 
    - x86 (from Intel 8086)
- **RISC** - Reduced Instruction Set Computing
  - Example:
    - PowerPC
    - ARM



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



