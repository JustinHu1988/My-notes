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







## Regular Expressions

Regular expressions are patterns used to match character combinations in strings.

In JavaScript, regular expressions are also objects.

- These patterns are used with the `exec` and `test` methods of `RegExp`, and with the `match`, `replace`, `search`, and `split` methods of `String`.

#### Creating a regular expression

You construct a regular expression in one of two ways:

1. *regular expression literal* (consists of a pattern enclosed between slashes): 

   ```javascript
   var re = /ab+c/;
   ```

   - Regular expression literals provide compilation of the regular expression *when the script is loaded*. If the regular expression remains constant, using this can improve performance.

2. *calling the constructor function of the `RegExp` object*:

   ```javascript
   var re = new RegExp('ab+c');
   ```

   - Using the constructor function provides *runtime compilation* of the regular expression.
   - Use the constructor function when you know the regular expression pattern will be changing, or you don't know the pattern and are getting it from another source, such as user input.

#### Writing a regular expression pattern

A regular expression pattern is composed of 

- simple characters, such as `/abc/`, 
- or a combination of simple and special characters, such as `/ab*c/` or `/Chapter(\d+)\.\d*/`. The last example includes parentheses which are used as a memory device. The match made with this part of the pattern is remembered for later use, as described in [Using parenthesized substring matches](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Using_parenthesized_substring_matches).

###### Using simple patterns

Simple patterns are constructed of characters for which you want to find a direct match. 

###### Using special characters

The following table provides a complete list and description of the special characters that can be used in regular expressions.

- **`\`**

  Matches according to the following rules:

  - A backslash that precedes a non-special character indicates that the next character is special and is not to be interpreted literally. 
    - For example, a '`b`' without a preceding '\' generally matches lowercase 'b's wherever they occur. But a '`\b`' by itself doesn't match any character; it forms the special [word boundary character](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#special-word-boundary).
  - A backslash that precedes a special character indicates that the next character is not special and should be interpreted literally. 
    - For example, the pattern `/a*/` relies on the special character '`*`' to match 0 or more a's. By contrast, the pattern `/a\*/` denotes the '`*`'  as not special, enabling matches with strings like 'a*'.
  - Do not forget to escape `\` itself while using the RegExp("pattern") notation because `\` is also an escape character in strings.

- **`^`**

  Matches beginning of input. 

  - If the multiline flag is set to true, also matches immediately after a line break character.

- **`$`**

  Matches end of input.

  - If the multiline flag is set to true, also matches immediately before a line break character.

- **`*`**

  Matches the preceding expression 0 or more times.

  - Equivalent to `{0,}`.

- **`+`**

  Matches the preceding expression 1 or more times.

  - Equivalent to `{1,}`

- **`?`**

  Matches the preceding expression 0 or 1 time.

  - Equivalent to `{0,1}`
  - If used immediately after any of the quantifiers *, +, ?, or {}, makes the quantifier non-greedy (matching the fewest possible characters), as opposed to the default, which is greedy (matching as many characters as possible). For example, applying `/\d+/` to "123abc" matches "123". But applying `/\d+?/` to that same string matches only the "1". ???
  - Also used in lookahead assertions, as described in the `x(?=y)` and `x(?!y)` entries of this table.

- **`.`**

  Matches any single character except the newline character.

- **`(x)`**

  Matches 'x' and remembers the match, as the following example shows. The parentheses are called *capturing parentheses*.

  - The '`(foo)`' and '`(bar)`' in the pattern `/(foo) (bar) \1 \2/` match and remember the first two words in the string "foo bar foo bar". The `\1` and `\2` in the pattern match the string's last two words. Note that `\1`, `\2`, ..., `\n` are used in the matching part of the regex. In the replacement part of a regex the syntax `$1`, `$2`, ..., `$n` must be used, e.g.: `'bar foo'.replace(/(...) (...)/, '$2 $1')`.  `$&` means the whole matched string. ???

- **`(?:x)`**

  Match 'x' but does not remember the match. The parentheses are called *non-capturing parentheses*, and let you define subexpressions for regular expression operators to work with.

  - Consider the sample expression `/(?:foo){1,2}/`. 
    - If the expression was `/foo{1,2}/`, the `{1,2}` characters would apply only to the last 'o' in 'foo'.
    - With the non-capturing parentheses, the `{1,2}` applies to the entire word 'foo'.
    - For more information, see [Using parentheses](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Using_parentheses) below.

- **`x(?=y)`**

  Matches 'x' only if 'x' is followed by 'y'. This is called a *lookahead*.

  - For example: 
    - `/Jack(?=Sprat)/` matches 'Jack' only if it is followed by 'Sprat'.
    - `/Jack(?=Spart|Frost)/` matches 'Jack' only if it is followed by 'Sprat' or 'Frost'. However, neither 'Sprat' nor 'Frost' is part of the match results.

- **`x(?!y)`**

  Matches 'x' only if 'x' is not followed by 'y'. This is called a *negated lookahead*.

  - For example: 
    - `/\d+(?!\.)/` matches a number only if it is not followed by a decimal point.
    - The regular expression `/\d+(?!\.)/.exec("3.141")` matches '141' but not '3.141'.

- **`x|y`**

  Matches 'x', or 'y' (if there is no match for 'x').

  - For example: `/green|red/` matches 'green' in 'green apple' and 'red' in 'red apple'.
  - The order of 'x' and 'y' matters. 
    - For example, `a*|b` matches the empty string in 'b', but `b|a*` matches 'b' in the same string.

- **`{n}`**

  Matches exactly `n` occurrences of the preceding expression. `n` must be a positive integer.

  - For example, `/a{2}/`

- **`{n,}`**

  Matches at least `n` occurrences of the preceding expression. `n` must be a positive integer.

  For example, `/a{2,}/`

- **`{n,m}`**

  Where `n` and `m` are positive integers and `n <= m`. Matches at least `n` and at most `m` occurrences of the preceding expression. When `m` is omitted, it's treated as ∞.

- **`[xyz]`**

  *Character set*. This pattern type matches any one of the characters in the brackets, including [escape sequences](https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Values,_variables,_and_literals#Unicode_escape_sequences).

  - Special characters like the dot(`.`) and asterisk (`*`) are not special inside a character set, so they don't need to be escaped. You can specify a range of characters by using a hyphen `-`, as the following examples illustrate.
  - The pattern `[a-d]`, which performs the same match as `[abcd]`, matches the 'b' in "brisket" and the 'c' in "city".
  - The patterns `/[a-z.]+/` and `/[\w.]+/` match the entire string "test.i.ng".

- **`[^xyz]`**

  *A negated or complemented character set.* That is, it matches anything that is not enclosed in the brackets.

  - You can specify a range of characters by using a hyphen. Everything that works in the normal character set also works here.
  - For example, `[^abc]` is the same as `[^a-c]`. They initially match 'r' in "brisket" and 'h' in "chop".

- **`[\b]`**

  Matches a *backspace* (U+0008). You need to use square brackets if you want to match a literal backspace character. (Not to be confused with `\b`).

- **`\b`**

  Matches a *word bounary*. 

  - A word boundary matches the position where a word character is not followed or preceded by another word-character.

  - Note that *a matched word boundary is not include in the match*. In other words, the length of a matched word boundary is zero.

  - Examples:

    - `/\bm/` matches the 'm' in "moon";

    - `/oo\b/` does not match the 'oo' in "moon";

    - `/oon\b/` matches the 'oon' in "moon".

    - *`/\w\b\w/` will never match anything*, because a word character can never be followed by both a non-word and a word character.

      > **Note:** JavaScript's regular expression engine defines a [specific set of characters](http://www.ecma-international.org/ecma-262/5.1/#sec-15.10.2.6) to be **"word" characters**. Any character not in that set is considered a word break. This set of characters is fairly limited: it consists solely of the Roman alphabet in both upper- and lower-case, decimal digits, and the underscore character. Accented characters, such as "é" or "ü" are, unfortunately, treated as word breaks.

- **`\B`**

  Matches a *non-word boundary*. This matches the following cases:

  - Before the first character of the string, if the first character is not a word character.
  - After the last character of the string, if hte last character is not a word character.
  - Between two word characters.
  - Between two non-word characters.
  - The empty string.

  *The beginning and end of a string are considered non-words.*

  - For example, `/\B../` matches 'oo' in "noonday", and `/y\B./` matches 'ye' in "possibly yesterday".

- **`\cX`**

  Where `X` is a character ranging from `A` to `Z`. Matches a control character in a string.

  - For example, `/\cM/` matches control-M (U+000D) in a string.

- **`\d`**

  Matches a digit character. Equivalent to `[0-9]`.

  - For example, `/\d/`  or `/[0-9]/` matches '2' in "B2 is the suite number".

- **`\D`**

  Matches a non-digit character. Equivalent to `[^0-9]`.

  - For example, `/\D/` or `/[^0-9]/` matches 'B' in "B2 is the suite number".

- **`\f`**

  Matches a form feed (U+000C).

- **`\n`**

  Matches a line feed (U+000A).

- **`\r`**

  Matches a carriage return (U+000D).

- **`\s`**

  Matches a single white space character, including space, tab, form feed, line feed.

  - Equivalent to `[\f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]`.
  - For example, `/\s\w*/` matches 'bar' in "foo bar".

- **`\S`**

  Matches a single character other than white space.

  - Equivalent to `[^ \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]`.
  - For example, `/\S*/` matches 'foo' in "foo bar".

- **`\t`**

  Matches a tab (U+0009).

- **`\v`**

  Matches a vertical tab (U+000B).

- **`\w`**

  Matches any alphanumeric character including the underscore.

  - *Equivalent to `[A-Za-z0-9_]`.*
  - For example, `/\w/` matches 'a' in "apple", '5' in "$5.28", and '3' in "3D".

- **`\W`**

  Matches any non-word character. 

  - *Equivalent to `[^A-Za-z0-9_]`.*
  - For example, `/\W/` or `/[^A-Za-z0-9_]/` matches '%' in "50%".

- ***`\n`***

  Where `n`  is a positive integer, a back reference to the last substring matching the `n` parenthetical in the regular expression (counting left parentheses).

  - For example, `/apple(,)\sorange\1/` matches 'apple, orange,' in "apple, orange, cherry, peach".

- **`\0`**

  Matches a `NULL`(U+0000) character.

  - *Do not follow this with another digit, because `\0<digits>` is an octal  [escape sequence](https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Values,_variables,_and_literals#Unicode_escape_sequences). Instead use `\x00`.*

- **`\xhh`**

  Matches the character with the code `hh`(two hexadecimal digits).

- **`\uhhhh`**

  Matches the character with the code `hhhh`(four hexadecimal digits).

- **`\u{hhhh}`**

  (Only when u flag is set) Matches the character with the Unicode value `hhhh`(hexadecimal digits).




*Escaping user input that is to be treated as a literal string within a regular expression — that would otherwise be mistaken for a special character — can be accomplished by simple replacement: ???*

```Javascript
function escapeRegExp(string){
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); //  $& means the whole matched string
}
```

The `g` after the regular expression is an option or flag that performs a global search, looking in the whole string and returning all matches.



###### Using parentheses

Parentheses around any part of the regular expression pattern causes that part of the matched substring to be remembered. *Once remembered, the substring can be recalled for other use*, as described in [Using Parenthesized Substring Matches](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Using_parenthesized_substring_matches).

- For example, the pattern `/Chapter (\d+)\.\d*/` :
  - This pattern is found in "Open Chapter 4.3, paragraph 6" and '4' is remembered.

To match a substring without causing the matched part to be remembered, within the parentheses preface the pattern with `?:`. 

-  For example, `(?:\d+)` matches one or more numeric characters but does not remember the matched characters.



#### Working with regular expressions

Regular expressions are used with the `RegExp` methods `test` and `exec` and with the `String` methods `match`, `replace`, `search`, and `split`. These methods are explained in detail in the [JavaScript reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference).

*Methods that use regular expressions:*

- **`exec`** - `RegExp.prototype.exec()`

  - The `exec()` method executes a search for a match in a specified string. 

  - *Return*: a result array, or `null`.

  - Example:

    ```javascript
    const regex1 = RegExp('foo*', 'g')
    const str1 = 'table football, foosball'
    let array1;

    while((array1=regex1.exec(str1)) !== null){
      console.log(`Found ${array1[0]}. Next starts at ${regex1.lastIndex}`)
    }
    // expected output: "Found foo. Next starts at 9."
    // expected output: "Found foo. Next starts at 19."
    ```

    ​

- **`test`** - `RegExp.prototype.test()`

  - The `test()` method executes a search for a match between a regular expression and a specified string.

  - *Return*: `true` or `false`

  - Example:

    ```javascript
    const regex1 = RegExp('foo*')
    const regex2 = RegExp('foo*', 'g')
    const str1 = 'table football'
    const str2 = 'table football'

    console.log(regex1.test(str1))  // true
    console.log(regex1.test(str1))  // true
    console.log(regex2.test(str1))  // true
    console.log(regex2.test(str2))  // false
    ```

- **`match`** - `String.prototype.match(regexp)`

  - The `match()` method retrieves the matches when matching a *string* against a *regular expression*. 

- **`search`**

- **`replace`**

- **`split`**







































