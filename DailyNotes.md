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

  - *Special characters like the dot(`.`) and asterisk (` *`) are not special inside a character set*, so they don't need to be escaped. You can specify a range of characters by using a hyphen `-`, as the following examples illustrate.
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

  - Parameters: `regexp`

    - A regular expression object. 
    - If a non-RegExp object `obj` is passed, it is implicitly converted to a `RegExp` by using `new RegExp(obj)`.
    - If you don't give any parameter and use the match() method directly, you will get an `Array` with an empty string: `[""]`.

  - Return value: 

    - If the string matches the expression, it will return an `Array` containing the entire matched string as the first element, followed by any results captured in parentheses.
    - If there were no matches, `null` is returned.

  - Example:

    ```javascript
    const str = 'For more information, see Chapter 3.4.5.1'
    const re = /see (chapter \d+(\.\d)*)/i
    let found = str.match(re)
    console.log(found)
    // logs [ 'see Chapter 3.4.5.1',
    //        'Chapter 3.4.5.1',
    //        '.1',
    //        index: 22,
    //        input: 'For more information, see Chapter 3.4.5.1' ]
    // 'see Chapter 3.4.5.1' is the whole match.
    // 'Chapter 3.4.5.1' was captured by '(chapter \d+(\.\d)*)'.
    // '.1' was the last value captured by '(\.\d)'.
    // The 'index' property (22) is the zero-based index of the whole match.
    // The 'input' property is the original string that was parsed.

    /** Using global and ignore case flags with match() **/
    const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const regexp = /[A-E]/gi
    const matches_array = str.match(regexp)
    console.log(matches_array)
    // ['A', 'B', 'C', 'D', 'E', 'a', 'b', 'c', 'd', 'e']

    /** Using match() with no parameter **/
    const str = "Nothing will come of nothing."
    str.match() // returns [""]

    /** A non-RegExp object as the parameter **/
    const str1 = "NaN means not a number. Infinity contains -Infinity and +Infinity in JavaScript.",
        str2 = "My grandfather is 65 years old and My grandmother is 63 years old.",
        str3 = "The contract was declared null and void."
    str1.match("number")	// "number" is a string, returns ["number"]
    str1.match(NaN)			// the type of NaN is the number, returns ["NaN"]
    str1.match(Infinity)	// the type of Infinity is the number, returns ["Infinity"]
    str1.match(+Infinity)	// returns ["Infinity"]
    str1.match(-Infinity)	// returns ["-Infinity"]
    str2.match(65)			// returns ["65"]
    str2.match(+65)			// A number with a positive sign. return ["65"]
    str3.match(null)		// return ["null"]
    ```

- **`search`** - `String.prototype.search(regexp)`

  The `search()` method executes a search for a match between a regular expression and this `String` object.

  - Return: The index of the first match between the regular expression and the given string; if not found, return `-1`.

  - Example:

    ```javascript
    const str = "hey JudE"
    const re = /[A-Z]/g
    const re2 = /[.]/g
    console.log(str.search(re))  // returns 4, which is the index of the first capital letter "J"
    console.log(str.search(re2)) // returns -1 cannot find '.' dot punctuation
    ```

    ​

- **`replace`** - `String.prototype.replace(regexp|substr, newSubstr|function)`

  The `replace()` method returns a new string with some or all matches of a `pattern` replaced by a `replacement`. The `pattern` can be a string or a `RegExp`, and the `replacement` can be a string or a function to be called for each match.

  - Parameters: 

    - `regexp`(pattern)
      - A `RegExp` object or literal. The match or matches are replaced with `newSubStr` or the value returned by the specified `function`.
    - `substr`(pattern)
      - A `String` that is to be replaced by `newSubstr`. It is treated as a verbatim string and is not interpreted as a regular expression. Only the first occurrence will be replaced.
    - `newSubStr` (replacement)
      - The `String` that replaces the substring specified by the specified `regexp` or `substr` parameter. A number of special replacement patterns are supported; see the "[Specifying a string as a parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_string_as_a_parameter)" section below.
    - `function` (replacement)
      - A function to be invoked to create the new substring to be used to replace the matches to the given `regexp` or `substr`. The arguments supplied to this function are described in the "[Specifying a function as a parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_function_as_a_parameter)" section below.

  - Return value:

    - This method does not change the `String` object it is called on. It simply returns a new string.
    - A new string with some or all matches of a pattern replaced by a replacement.

  - Specifying a string as a parameter :

    - The replacement string can include the following special replacement patterns:

      | Pattern | Inserts                                  |
      | ------- | ---------------------------------------- |
      | `$$`    | Inserts a "$".                           |
      | `$&`    | Inserts the matched substring.           |
      | ``$` `` | Inserts the portion of the string that precedes the matched substring. |
      | `$'`    | Inserts the portion of the string that follows the matched substring. |
      | *`$n`*  | Where *`n`* is a positive integer less than 100, inserts the *n*th parenthesized submatch string, provided the first argument was a [`RegExp`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) object. Note that this is 1-indexed. |

  - Specifying a function as a parameter :

    - You can specify a function as the second parameter.

    - In this case, the function will be invoked after the match has been performed. The function's result (return value) will be used as the replacement string. (Note: The above-mentioned special replacement patterns do *not* apply in this case.)

    - Note that the function will be invoked multiple times for each full match to be replaced if the regular expression in the first parameter is global.

    - *The arguments to the function are as follows*:

      | Possible name | Supplied value                           |
      | ------------- | ---------------------------------------- |
      | `match`       | The matched substring. (Corresponds to `$&` above.) |
      | `p1, p2, ...` | The *n*th parenthesized submatch string, provided the first argument to `replace()` was a [`RegExp`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) object. (Corresponds to `$1`, `$2`, etc. above.) For example, if `/(\a+)(\b+)/`, was given, `p1` is the match for `\a+`, and `p2` for `\b+`. |
      | `offset`      | The offset of the matched substring within the whole string being examined. (For example, if the whole string was `'abcd'`, and the matched substring was `'bc'`, then this argument will be 1.) |
      | `string`      | The whole string being examined.         |

      (The exact number of arguments will depend on whether the first argument was a `RegExp` object and, if so, how many parenthesized sub matches it specifies.)

    - The following example will set `newString` to `'abc - 12345 - #$*%'`:

      ```javascript
      function replacer(match, p1, p2, p3, offset, string){
        // p1 is nondigits, p2 digits, and p3 non-alphanumerics
        console.log(match) // 'abc12345#$*%'
        return [p1,p2,p3].join(' - ')
      }
      const newString = 'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer)
      console.log(newString) // abc - 12345 - #$*%
      ```

  - Examples:

    - Defining the regular expression in `replace()`

      ```javascript
      const str = 'Twas the night before Xmas...'
      const newstr = str.replace(/xmas/i, 'Christmas')
      console.log(newstr)  // Twas the night before Christmas...
      ```

    - Using `global` and `ignore` with `replace()`

      ```javascript
      const re = /apples/gi
      const str = 'Apples are round, and apples are juicy.'
      const newstr = str.replace(re, 'oranges')
      console.log(newstr)  // oranges are round, and oranges are juicy.
      ```

    - *Switching words in a string:*

      ```javascript
      const re = /(\w+)\s(\w+)/
      const str = 'John Smith'
      const newstr = str.replace(re, '$2, $1')
      console.log(newstr)  // 'Smith John'
      ```

    - *Using an inline function that modifies the matched characters*

      - In this example, all occurrences of capital letters in the string are converted to lower case, and a hyphen is inserted just before the match location.
      - The important thing here is that additional operations are needed on the matched item before it is given back as a replacement.
      - The replacement function accepts the matched snippet as its parameter, and uses it to transform the case and concatenate the hyphen before returning.

      ```javascript
      function styleHyphenFormat(propertyName){
        function upperToHyphenLower(match, offset, string){
          return (offset > 0 ? '-' : '') + match.toLowerCase()
        }
        return propertyName.replace(/[A-Z]/g, upperToHyphenLower)
      }
      styleHyphenFormat('borderTop') // "border-top"
      ```

      - Because we want to further transform the *result* of the match before the final substitution is made, we must use a function.

    - *Replacing a Fahrenheit degree with its Celsius equivalent ???*

      ```javascript
      function f2c(x){
        function convert(str, p1, offset, s){
          return ((p1 - 32) * 5/9) + 'C'
        }
        const s = String(x)
        const test = /(-?\d+(?:\.\d*)?)F\b/g
        return s.replace(test, convert)
      }
      f2c('212F')  // "100C"
      f2c('0F')  // "-17.77777777777778C"
      ```

    - *Use an inline function with a regular expression to avoid `for` loops*

      The following example takes a string pattern and converts it into an array of objects.

      - Input: A string made out of the characters `x`, `-` and `_`.

      ```
      x-x_
      x---x---x---x---
      x-xxx-xx-x-
      x_x_x___x___x___
      ```

      - Output: An array of objects. An `'x'` denotes an `'on'` state, a `'_'`(hyphen) denotes an `'off'` state and an `'_'`(underscore) denotes the length of an `'on'` state.

      ```javascript
      [
        {on: true, length: 1},
        {on: false, length: 1},
        {on: true, length: 2},
        ...
      ]
      ```

      - Snippet:

      ```javascript
      const str = 'x-x_'
      const retArr = []
      str.replace(/(x_*)|(-)/g, function(match, p1, p2){
        if(p1){ retArr.push({ on:true, length: p1.length}) }
        if(p2){ retArr.push({ on:false, length: 1}) }
      })
      console.log(retArr)
      ```

      ​

- **`split`** - `String.prototype.split([separator[, limit]])`

  The `split()` method splits a `String` object into an array of strings by separating the string into substrings, using a specified separator string to determine where to make each split.

  > If an empty string("") is used as the separator, the string is split between each character.

  - Parameters: 

    - `separator`
      - Specifies the string which denotes the points at which each split should occur.
      - The `separator` is treated as a string or as a regular expression.
      - If `separator` is omitted or does not occur in `str`, the array returned contains one element consisting of the entire string.
      - If `separator` is an empty string, `str` is converted to an array of characters.
    - `limit`
      - Integer specifying a limit on the number of splits to be found.

  - Return value: An `Array` of strings split at each point where the separator occurs in the given string.

  - Example:

    - Using `split()`

      ```javascript
      function splitString(stringToSplit, separator){
        const arrayOfStrings = stringToSplit.split(separator)
        
        console.log('The original string is: "' + stringToSplit + '"')
        console.log('The separator is: "' + separator + '"')
        console.log('The array has ' + arrayOfStrings.length + ' elements: ' + arrayOfStrings.join(' / '))
      }
      const tempestString = 'Oh brave new world that has such people in it.'
      const monthString = 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'

      const space = ' '
      const comma = ','

      splitString(tempestString, space)
      splitString(tempestString)
      splitString(monthString, comma)

      /**Output:
      The original string is: "Oh brave new world that has such people in it."
      The separator is: " "
      The array has 10 elements: Oh / brave / new / world / that / has / such / people / in / it.

      The original string is: "Oh brave new world that has such people in it."
      The separator is: "undefined"
      The array has 1 elements: Oh brave new world that has such people in it.

      The original string is: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec"
      The separator is: ","
      The array has 12 elements: Jan / Feb / Mar / Apr / May / Jun / Jul / Aug / Sep / Oct / Nov / Dec
      **/
      ```

    - Removing spaces from a string:

      ```javascript
      const names = 'Harry Trump ;Fred Barney; Helen Rigby ; Bill Abel ;Chris Hand '
      const re = /\s*;\s*/
      const nameList = names.split(re)

      console.log(nameList) // [ "Harry Trump", "Fred Barney", "Helen Rigby", "Bill Abel", "Chris Hand " ]
      ```

    - Returning a limited number of splits

      ```javascript
      const myString = 'Hello World. How are you doing?'
      const splits = myString.split(' ', 3)
      console.log(splits);  // ["Hello", "World.", "How"]
      ```

    - Splitting with a `RegExp` to include parts of the separator in the result:

      *If `separator` is a regular expression that contains capturing parentheses `()`, matched results are included in the array:*

      ```javascript
      const myString = 'Hello 1 word. Sentence number 2.'
      const splits = myString.split(/(\d)/)
      console.log(splits)  // [ "Hello ", "1", " word. Sentence number ", "2", "." ]
      ```

    - Splitting with an array as separator:

      ```javascript
      let myString = 'this|is|a|Test'
      let splits = myString.split(['|'])
      console.log(splits)  //["this", "is", "a", "Test"]

      myString = 'ca,bc,a,bca,bca,bc'
      splits = myString.split(['a','b'])
      console.log(splits)  //["c", "c,", "c", "c", "c"]
      ```

    - Reversing a String using `split()`

      ```javascript
      const str = 'asdfghjkl';
      const strReverse = str.split('').reverse().join('') // 'lkjhgfdsa'
      // split() returns an array on which reverse() and join() can be applied
      ```

      *This doesn't work if the string contains grapheme clusters, even when using a unicode aware split (use [esrever](https://github.com/mathiasbynens/esrever) instead).*

      ```javascript
      var str = 'résumé';
      var strReverse = str.split(/(?:)/u).reverse().join('');
      // => "́emuśer"
      ```

      > **Bonus:** *use [`===`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Identity_strict_equality_(===)) operator to test if the original string was palindrome.*

???







## JSONP

JSONP(JSON with Padding or JSON-P) is *used to request data from a server residing in a different domain than the client.*

- JSONP enables sharing of data bypassing same-origin policy.











## AJAX

AJAX stands for *Asynchronous JavaScript And XML*.

- In a nutshell, it is the use of the `XMLHttpRequest` object to communicate with servers.
- It can send and receive information in various formats, including JSON, XML, HTML, and text files.
- AJAX's most appealing characteristic is its "asynchronous" nature, which means it can communicate with the server, exchange data, and update the page without having to refresh the page.



The two major features of AJAX allow you to do the following:

- Make requests to the server without reloading the page;
- Receive and work with data from the server.



#### 1. How to make an HTTP request

In order to make an [HTTP](https://developer.mozilla.org/en/HTTP) request to the server with JavaScript, you need an instance of an object with the necessary functionality. 

- This is where `XMLHttpRequest` comes in. 
- Its predecessor originated in Internet Explorer as an ActiveX object called `XMLHTTP`. 
- Then, Mozilla, Safari, and other browsers followed, implementing an **`XMLHttpRequest`** object that supported the methods and properties of Microsoft's original ActiveX object. Meanwhile, Microsoft implemented `XMLHttpRequest` as well. 

```js
// Old compatibility code, no longer needed
if(window.XMLHttpRequest){  // Mozilla, Safari, IE7+ ...
    httpRequest = new XMLHttpRequest()
} else if (window.ActiveXObject){  // IE 6 and older
    httpRequest = new ActiveXObject("Microsoft.XMLHTTP")
}
```

After making a request, you will receive a response back. At this stage, you need to tell the XMLHttp request object which JavaScript function will handle the response, by setting the **`onreadystatechange`** property of the object: 

```js
httpRequest.onreadystatechange = function(){
    // Process the server response here.
};
```

Next, after declaring what happens when you receive the response, you need to actually make the request, by calling the **`open()`** and **`send()`** methods of the HTTP request object, like this: 

```js
httpRequest.open("GET", "http://www.example.org/some.file")
httpRequest.send()
```

- The first parameter of the call to `open()` is the HTTP request method – GET, POST, HEAD, or another method supported by your server. Keep the method all-capitals as per the HTTP standard, otherwise some browsers (like Firefox) might not process the request. For more information on the possible HTTP request methods, check the [W3C specs](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html).
- The second parameter is the URL you're sending the request to. *As a security feature, you cannot call URLs on 3rd-party domains by default*. Be sure to use the exact domain name on all of your pages or you will get a "permission denied" error when you call `open()`. A common pitfall is accessing your site by `domain.tld`, but attempting to call pages with `www.domain.tld`. *If you really need to send a request to another domain, see [HTTP access control (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).*
- The optional third parameter sets whether the request is asynchronous. If `true` (the default), JavaScript execution will continue and the user can interact with the page while the server response has yet to arrive. This is the first A in AJAX.



*The parameter to the `send()` method can be any data you want to send to the server if  **`POST`**-ing the request.*

- *Form data should be sent in a format that the server can parse*, like a **query string**:

  ```js
  "name=value&anothername="+encodeURIComponent(myVar)+"&so=on"
  ```

  or other formats, like **`multipart/from-data`**, **JSON**, **XML**, and so on.

- *Note that if you want to `POST` data, you may have to set the MIME type of the request*.

  - For example, use the following before calling `send()` for form data sent as a query string:

    ```js
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    ```

    



#### 2. Handling the server response

When you sent the request, you provided the name of a JavaScript function to handle the response:

```js
httpRequest.onreadystatechange = nameOfTheFunction;
```

- First, the function needs to *check the request's state* **`.readyState`**. 

  - If the state has the value of `XMLHttpRequest.DONE` (corresponding to 4), that means that the full server response was received and it's OK for you to continue processing it. 

    ```js
    if(httpRequest.readyState === 4){
        // Everything is good, the response was received.
    }else{
        // Not ready yet.
    }
    ```

  - The full list of the `readyState` values is documented at [XMLHTTPRequest.readyState](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState) and is as follows:

    - `0` (uninitialized) or (request not initialized)
    - `1` (loading) or (server connection established)
    - `2` (loaded) or (request received)
    - `3` (interactive) or (processing request)
    - `4` (complete) or (request finished and response is ready)

- Next, *check the [HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) of the HTTP response* **`.status`**. 

  ```js
  if (httpRequest.status === 200) {
      // Perfect!
  } else {
      // There was a problem with the request.
      // For example, the response may have a 404 (Not Found)
      // or 500 (Internal Server Error) response code.
  }
  ```

- After checking the state of the request and the HTTP status code of the response, *you can do whatever you want with the data the server sent*. 

  *You have two options to access that data*:

  - **`.responseText`** :  returns the server response as a string of text;
  - **`.responseXML`** :  returns the response as an `XMLDocument` object you can traverse with JavaScript DOM functions.



#### 3. A simple example

```html
<button id="ajaxButton" type="button">Make a request</button>

<script>
(function() {
  var httpRequest;
  document.getElementById("ajaxButton").addEventListener('click', makeRequest);

  function makeRequest() {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('GET', 'test.html');
    httpRequest.send();
  }

  function alertContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        alert(httpRequest.responseText);
      } else {
        alert('There was a problem with the request.');
      }
    }
  }
})();
</script>
```

> **Note**: If you're sending a request to a piece of code that will return XML, rather than a static HTML file, you must set response headers to work in Internet Explorer. If you do not set header `Content-Type: application/xml`, IE will throw a JavaScript "Object Expected" error after the line where you tried to access an XML element. 

> **Note 2**: If you do not set header `Cache-Control: no-cache` the browser will cache the response and never re-submit the request, making debugging challenging. You can also add an always-different GET parameter, like a timestamp or random number (see [bypassing the cache](https://developer.mozilla.org/en/DOM/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache)) 

> **Note 3**: *If the `httpRequest` variable is used globally, competing functions calling  `makeRequest()` can overwrite each other, causing a race condition*. Declaring the `httpRequest `variable local to a [closure](https://developer.mozilla.org/en/JavaScript/Guide/Closures) containing the AJAX functions avoids this. 

In the event of a communication error (such as the server going down), an exception will be thrown in the `onreadystatechange` method when accessing the response status. To mitigate this problem, you could wrap your `if...then` statement in a **`try...catch`**: 

```js
function alertContents() {
  try {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        alert(httpRequest.responseText);
      } else {
        alert('There was a problem with the request.');
      }
    }
  }
  catch( e ) {
    alert('Caught Exception: ' + e.description);
  }
}
```



#### 4. Working with the XML response

In the previous example, after receiving the response to the HTTP request we used the request object's `responseText` property , which contained the contents of the `test.html`file. Now let's try the `responseXML` property. 

First off, let's create a valid XML document that we'll request later on. The document (`test.xml`) contains the following:

```xml
<?xml version="1.0" ?>
<root>
    I'm a test.
</root>
```

In the script we only need to change the request line to:

```
...
onclick="makeRequest('test.xml')">
...
```

Then in `alertContents()`, we need to replace the line `alert(httpRequest.responseText);` with:

```js
var xmldoc = httpRequest.responseXML;
var root_node = xmldoc.getElementsByTagName('root').item(0);
alert(root_node.firstChild.data);
```

This code takes the `XMLDocument` object given by `responseXML` and uses DOM methods to access some of the data contained in the XML document. You can see the `test.xml` [here](http://www.w3clubs.com/mozdev/test.xml) and the updated test script [here](http://www.w3clubs.com/mozdev/httprequest_test_xml.html).



#### 5. Working with data

Finally, let's send some data to the server and receive a response.

Our JavaScript will request a dynamic page this time : `test.php`, which will take the data we send and return a "computed" string - "Hello, [user data]!" - which we'll `alert()`.

- First, we'll add a text box to our HTML so the user can enter their name:

  ```html
  <label>Your name:
  	<input type="text" id="ajaxTextbox" />
  </label>
  <span id="ajaxButton" style="cursor: pointer; text-decoration: underline">
  	Make a request
  </span>
  ```

- We'll also add a line to our event handler to get the user's data from the text box and send it to the `makeRequest()` function along with the URL of our server-side script:

  ```js
  document.getElementById("ajaxButton").onclick = function(){
      let userName = document.getElementById("ajaxTextbox").value
      makeRequest('test.php', userName)
  }
  ```

- We need to modify `makeRequest()` to accept the user data and pass it along to the server.

  ```js
  function makeRequest(url, userName){
      ...
      
      httpRequest.onreadystatechange = alertContents
      httpRequest.open('POST', url)
      httpRequest.setRequestHeader('Content-Type', 'application/x-www-from-urlencoded')
      httpRequest.send('userName=' + encodeURIComponent(userName))
  }
  ```

- The function `alertContents()` can be written the same way it was in Step 3 to alert our computed string, if that's all the server returns.

  However, let's say the server is going to return both the computed string and the original user data. So if our user typed "Jane" in the text box, the server's response would look like this:

  `{"userData":"Jane","computedString":"Hi, Jane!"}`

- To use this data within `alertContents()`, we can't just alert the `responseText`, we have to parse it and alert `computedString`, the property we want:

  ```js
  function alertContent(){
      if(httpRequest.readyState === XMLHttpRequest.DONE){
          if(httpRequest.status === 200){
              var response = JSON.parse(httpRequest.responseText)
              alert(response.computedString)
          }else{
              alert('There was a problem with the request.')
          }
      }
  }
  ```

- The `test.php` file should contain the following:

  ```php
  $name = (isset($_POST['userName'])) ? $_POST['userName'] : 'no name';
  $computedString = "Hi, " . $name . "!";
  $array = ['userName' => $name, 'computedString' => $computedString];
  echo json_encode($array);
  ```

  

  







## CORS

**Cross-Origin Resource Sharing** : 

- User agents commonly apply *same-origin restrictions* to network requests.
  - These restrictions prevent a client-side Web application running from one origin from obtaining data retrieved from another origin, and also limit unsafe HTTP requests that can be automatically launched toward destinations that differ from the running application's origin.
- In user agents that follow this pattern, network requests typically include user credentials with cross-origin requests, including HTTP authentication and cookie information.



Cross-Origin Resource Sharing (CORS) is a mechanism that uses *additional HTTP headers* to tell a browser to let a web application running at one origin (domain) have permission to access selected resources from a server at a different origin.

- A web application makes a *cross-origin HTTP request* when it requests a resource that has **a different origin (domain, protocol, and port)** than its own origin.

> different origin means: domain/protocol/port, either one is different

- *For security reasons, browsers restrict cross-origin HTTP requests initiated from within scripts.*
  - For example, [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) and the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) follow the [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy).  
  - This means that a web application using those APIs can only request HTTP resources from the same origin the application was loaded from, *unless the response from the other origin includes the right CORS headers.* 
  - The CORS mechanism supports secure cross-origin requests and data transfers between browsers and web servers. Modern browsers use CORS in an API container such as [`XMLHttpRequest `](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)or [Fetch ](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)to help mitigate the risks of cross-origin HTTP requests. 
- Modern browsers handle the client-side components of cross-origin sharing, including headers and policy enforcement. But this new standard means servers have to handle new request and response headers. 



*This [cross-origin sharing standard](https://fetch.spec.whatwg.org/#http-cors-protocol) is used to enable cross-site HTTP requests for:*

- Invocations of the [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) or [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) APIs in a cross-site manner, as discussed above.
- Web Fonts (for cross-domain font usage in `@font-face` within CSS), [so that servers can deploy TrueType fonts that can only be cross-site loaded and used by web sites that are permitted to do so.](https://www.w3.org/TR/css-fonts-3/#font-fetching-requirements)
- [WebGL textures](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Using_textures_in_WebGL).
- Images/video frames drawn to a canvas using `drawImage`.
- Stylesheets (for [CSSOM](https://developer.mozilla.org/en-US/docs/Web/CSS/CSSOM_View) access).
- Scripts (for unmuted exceptions).

#### Functional overview











## XMLHttpRequest

Use `XMLHttpRequest`(XHR) objects to interact with servers. You can retrieve data from a URL without having to do a full page refresh.

- Despite its name, `XMLHttpRequest` can be used to retrieve any type of data, not just XML, and it supports protocols other than HTTP (including `file` and `ftp`)

- If your communication needs involve receiving event or message data from the server, consider using  [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)  through the [`EventSource`](https://developer.mozilla.org/en-US/docs/Web/API/EventSource) interface. For full-duplex communication,  [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) may be a better choice. 

  > **WebSocket** API is an advanced technology that makes it possible to open a two-way interactive communication session between the user's browser and a server.

#### Constructor

`XMLHttpRequest()` : creates a new `XMLHttpRequest`.

```js
var request = new XMLHttpRequest()
```

- return value: A new [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) object. The object must be prepared by at least calling [`open()`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/open) to initialize it before calling [`send()`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send) to send the request to the server. 

#### Basic using

```js
// create an XMLHttpRequest object
var request = new XMLHttpRequest()

// initialize the request
request.open("GET", "http://www.example.org/example.txt")

// send the request
request.send()

// After the transaction completes, the object will contain useful information such as the response body and the HTTP status of the result.
```



#### Event handlers (Monitoring progress)

**`onreadystatechange`** as a property of the `XMLHttpRequest` instance is supported in all browsers. 

Since then, a number of additional event handlers have been implemented in various browsers (`onload`, `onerror`, `onprogress`, etc.). 

More recent browsers, including Firefox, also support listening to the `XMLHttpRequest`events via standard `addEventListener()` APIs in addition to setting `on*` properties to a handler function. 



`XMLHttpRequest` provides the ability to listen to various events that can occur while the request is being processed. This includes periodic progress notifications, error notifications, and so forth.

The actual events you can monitor to determine the state of an ongoing transfer are: 

- `progress` : The amount of data that has been retrieved has changed. (是否可以用来做下载进度条)
- `load` : The transfer is complete, all data is now in the `response`.

```js
var request = new XMLHttpRequest()

request.addEventListener("progress", updateProgress)
request.addEventListener("load", transferComplete)
request.addEventListener("error", transferFailed)
request.addEventListener("abort", transferCanceled)

request.open()
// ...
```

> Note: *You need to add the event listeners before calling `open()` on the request.* Otherwise these events will not fire. ???

Progress events exist for both download and upload transfers.

- The download events are fired on the `XMLHttpRequest` object itself as shown in the above sample.

- The upload events are fired on the `XMLHttpRequest.upload` object, as shown below:

  ```js
  var oReq = new XMLHttpRequest();
  
  oReq.upload.addEventListener("progress", updateProgress);
  oReq.upload.addEventListener("load", transferComplete);
  oReq.upload.addEventListener("error", transferFailed);
  oReq.upload.addEventListener("abort", transferCanceled);
  
  oReq.open();
  // ...
  ```

  > Note: Progress events are not available for the `file:` protocol. 

One can also detect all three load-ending conditions (`abort`, `load` or `error`) using the `loadend` event:

```js
req.addEventListener("loadend", loadEnd);

function loadEnd(e) {
  console.log("The transfer finished (although we don't know if it succeeded or not).");
}
```



#### Submitting forms and uploading files

Instances of `XMLHttpRequest` can be used to submit forms in two ways:

- *using the `FromData` API*
  - Using the `FromData` API is the simplest the fastest, but has the disadvantage that data collected can not be stringified.
- *using only AJAX*
  - Using only AJAX is more complex, but typically more flexible and powerful.



###### Using nothing but `XMLHttpRequest` (only AJAX)

Submitting forms without the `FormData` API does not require other APIs for most use cases. The only case case where you need an additional API is *if you want to upload one or more files*, where you use `FileReader` API.

**A brief introduction to the submit methods**:

- *An html `<form>` can be sent in four ways:*

  - using the `POST` method and setting the `enctype` attribute to `application/x-www-form-urlencoded` (default);
  - using the `POST` method and setting the `enctype` attribute to `text/plain`;
  - using the `POST` method and setting the `enctype` attribute to `multipart/form-data`;
  - using the `GET` method (the `enctype` will be ignored).

- Now, consider the submission of a form containing only two fields, named `foo` and `baz`. 

  -  If you are using the `POST` method the server will receive a string similar to one of the following three examples, depending on the encoding type you are using: 

    - Method: `POST`; Encoding type: `application/x-www-form-urlencoded` (default): 

      ```
      Content-Type: application/x-www-form-urlencoded
      
      foo=bar&baz=The+first+line.%0D%0AThe+second+line.%0D%0A
      ```

    - Method: `POST`; Encoding type: `text/plain`: 

      ```
      Content-Type: text/plain
      
      foo=bar
      baz=The first line.
      The second line.
      ```

    - Method: `POST`; Encoding type: `multipart/form-data`: 

      ```
      Content-Type: multipart/form-data; boundary=---------------------------314911788813839
      
      -----------------------------314911788813839
      Content-Disposition: form-data; name="foo"
      
      bar
      -----------------------------314911788813839
      Content-Disposition: form-data; name="baz"
      
      The first line.
      The second line.
      
      -----------------------------314911788813839--
      ```

  - However, if you are using the `GET` method, a string like the following will be simply added to the URL:

    ```
    ?foo=bar&baz=The%20first%20line.%0AThe%20second%20line.
    ```



**A little vanilla framework** : 

All these effects are done automatically by the web browser whenever you submit a [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form). 

If you want to perform the same effects using JavaScript you have to instruct the interpreter about *everything*. 

Therefore, how to send forms in *pure* AJAX is too complex to be explained here in detail. For this reason, here we place **a complete (yet didactic) framework**, able to use all four ways to *submit*, and to **upload files**: 

```html
//....
```



......



###### Using FromData objects

The `FormData` constructor lets you compile a set of key/value pairs to send using `XMLHttpRequest`.

...... ???

https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest





#### Get last modified date

```js
function getHeaderTime(){
    console.log(this.getResponseHeader("Last-Modified"))   /* A valid GMTString date or null */
}

var req = new XMLHttpRequest()
req.open('HEAD' /*use HEAD if you only need the headers!*/, "yourpage.html")
// the HEAD emthod asks for a response identical to that of a `GET` request, but without the response body.
req.onload = getHeaderTime
req.send()
```

###### Do something when last modified date changes

Let's create two functions:









https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest



## WebSocket







## 非编 h5










