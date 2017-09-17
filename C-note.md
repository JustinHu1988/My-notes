œ# Chapter 3 :  Data and C

## 3.1 Basic

The contents of Chapter 3:

 - Keywords:
    - `int`, `short`,`long`, `unsigned`, `char`, `float`, `double`, `_Bool`,` _Complex`, `_Imaginary`
 - Operator
    - `sizeof`
 - Function
    - `scanf()`
 - The basic data types that C uses
 - The distinctions between *integer types* and *floating-point types*
 - Writing constants and declaring variables of those types
 - How to use the `printf()` and `scanf()` functions to read and write values of different types
 - in this chapter, you practice *manipulating data*, not just read data.




## 3.2 Data Variables and Constants

**constant**: types of data are preset before a program is used and keep their values unchanged throughout the life of the program.

**variable**: types of data may change or be assigned values as the program runs.

## 3.3 Data: Data-Type Keywords

### 3.3.1 C Data Keywords:
 - `int`
 - `long`
 - `short`
 - `unsigned`
 - `char`
 - `float`
 - `double`
 - `signed`  (C90)
 - `void`  (C90)
 - `_Bool`  (C99)
 - `_Complex` (C99)
 - `_Imaginary` (C99)

The types created with these keywords can be divided into two families on the basis of how they are stored in the computer:
 - **integer types**
 - **floating-point types**

### 3.3.2 Bits, Bytes and Words
- **bit**: the smallest unit of memory.
- **byte**: usual unit of computer memory, 8 bits.
- **word**: natural unit of memory for a given computer design.
   - For 8-bit microcomputer, a word is just 8 bits.
   - Since then, personal computers moved up to 16-bit words, 32-bit words, and, at the present, 64-bit words. Larger word sizes enable faster transfer of data and allow more memory to be accessed.

### 3.3.3 Integer vs Floating-Point Types

#### Integer
In C, an integer is never written with a decimal point.
#### Floating-Point Number
- adding a decimal point can makes a value a floating-point value. 
    - For example: 7 is an integer type but 7.00 is a floating-point type.
- **e-notation**: 3.16E7 = 3.16*10^7
- **store**: Floating-point representation involves breaking up a number into *a fractional part* and *a exponent part*.
    - so, 7.00 would not be stored in the same manner as the integer 7, even though both have the same value.
    - The decimal analogy would be to write 7.0 as 0.7E1, 0.7 is the fractional part, and the 1 is the exponent part. (A computer would use binary numbers and powers of two instead of powers of 10 for internal storage. See more in *Chapter 15*).

#### Practical differences:

- An integer has no fractional part; A floating-point number can have a fractional part.

- Floating-point numbers can represent a much larger range of values than integers can.

- For some arithmetic operations, such as subtracting one large number from another, floating-point numbers are subject to greater loss of precision.

- Computer floating-point numbers can't represent all the values in a range. Instead, floating-point values are often approximations  of a true value. (Because there is an infinite number of real numbers in any range.)  For example, 7.0 might be stored as a 6.99999 float value.

- Floating-point operations were once much slower than integer operations. However, today many CPUs incorporate floating-point processors that close the gap.

  ​


## 3.4 Basic C Data Types

### 3.4.1 **`int`**

C integer types vary in the range of values offered and in wherher negative numbers can be used.

#### `int`

- the `int` type is a signed integer, can be positive, negative or zero.
- The range in possible values depends on the computer system.
- Typically, **an `int` uses one machine word for storage**.
  - if word is 16-bit, will allow a range in values from -32768 to 32767.
  - now the personal computer have 64-bit processors, so the range is huge.
- ISO C specifies that the minimum range for type `int` should be from -32768 to 32767.
- systems represent signed integers by using the value of a particular bit to indicate the sign.(Chapter 15)

#### Declare, Assignment, Initializing

* Declare an int variable
  * example: `int erns`; `int hogs, cows, goats`;
* Assignment:
  * example: `cows = 112`;
* Initializing:
  * example: `int hogs = 21`;
  * create and label the storage for the variables and assign starting value.

#### Type `int` Constants

When you write a number without a decimal point and without an exponent, C recongnizes it as an integer.

####  **Printing** `int` Values

`%d` notation is called a "format specifier", it indicates the form that `printf()` uses to display a value.

```C
#include <stdio.h>
int main(void){
  int x = 10;
  printf("The value of x is: %d.\n", x); // The value of x is: 10.
}
```

*If you make mistake on `printf()`, for example:*

 ```C
#include <stdio.h>
int main(void)
{
  int ten = 10; int two = 2;
  printf("Doing it wrong: ");
  printf("%d minus %d is %d\n", ten ); // forgot 2 arguments
  return 0;
}
/*This may print:
Doing it wrong: 10 minus 16 is 1650287143
*/
 ```

*Note*: 

* the program used ten to provide a value for the first `%d` and used whatever values happened to be lying around in memory for the next two!
* The number you get could be different from those shown here. Not only might the menory contents be different, but different compilers will manage memory locations differently.

#### Octal and Hexadecimal

Special prefixes indicate which number base you are using:

* Hexadecimal: prefix - `0x` or `0X`
* Octal: prefix - `0`
  * Example: `0x10 = 16`,`020 = 16`

Different number systems don't affect how the number is stored ( in binary code).

#### Displaying Octal and Hexadecimal

- `%o`: for Octal;
- `%x`: for Hexadecimal;
- If you want to display the C prefixes: you can use `%#o`, `%#x` and `%#X` to generate the "0", "0x" and "0X" prefixes respectively.

```C
#include <stdio.h>
int main(void){    
  int x = 100;
  printf("dec= %d; octal = %o, hex = %x\n", x,x,x);
  printf("dec= %d; octal = %#o, hex = %#x\n", x,x,x);
}
  /*
  this section will print:
  dec= 100; octal = 144, hex = 64
  dec= 100; octal = 0144, hex = 0x64
  */
```

Note that the `0` and `0x` prefixes are not displayed in the output unless you include the `#` as part of the specifier.

### 3.4.2 Other Integer Types

C offers three adjective keywords to modify the basic integer type:

- `short`
- `long`
- `unsigned`

#### Range

Normally Range:

- `short`: 16 bits
- `int`:  16 bits or 32bits
- `long`: 32 bits
- `long long`: 64 bits

Minimum range for each basic data type (C standard):

- `short`/`int`: `[–32,767 -- 32,767]`
- `unsigned short`/`unsigned int`/`unsigned`: `[0 -- 65,535]`
- `long` :  `[–2,147,483,647 -- 2,147,483,647]`
- `unsigned long`：`[0 -- 4,294,967,295]`
- `long long`:  `[–9,223,372,036,854,775,807 -- 9,223,372,036,854,775,807]`
- `unsigned long long`: `[0 -- 18,446,744,073,709,551,615]`

*Why use different integer types?*

- If you are writing code on a machine for which `int` and `long` are the same size, and you do need 32-bit integers, you should use `long` instead of `int` so that the program will function correctly if transferred to a 16-bit machine.
- use `long long` if you need 64-bit integer values.
- saving storage space is important *only if* your program uses arrays of integers that are large in relation to a system's available memory, Use `short` to save storage space.
- Another reason to use `short` is that it may correspond in size to hardware registers used by particular components in a computer.

##### Integer Overflow

- When it reaches its maximum value, it starts over at the beginning.

```c
// Example:
int i = 2147483647;
unsigned int j = 4294967295;
printf("%d, %d, %d\n", i, i+1, i+2);  // 2147483647 -2147483648 -2147483647
printf("%d, %d, %d\n", j, j+1, j+2);  // 4294967295 0 1
```

#### `long` Constants and `long long` Constants

- Decimal, Octal and hexadecimal constants are treated as type `int` unless the value is too large.
- if the value is larger than `int` maximum, then the compiler tries in order `unsigned int` -> `long` -> `unsigned long` -> `long long` -> `unsigned long long`.

*Sometimes you might want the compiler to store a small number as a `long` integer*:

1. Programming that involves explicit use of memory addresses on an IBM PC, for instance, can create such a need. 

2. Some standard C functions require type long values.

   ​

- `l`/`L`: To cause a small constant to be treated as type `long`, you can append an `l` (lowercase L) or `L` as a suffix.
- `ll`/`LL`: Similarly, you can use an `ll` or `LL` suffix to indicate a long long value.
- `u`/`U`: unsigned.

Example: `3ll`, `5ull`, `9llu`, `10lu`, `020l`, `0x10l`

#### **Printing** `short`, `long`, `long long` and `unsigned` Types

- `%u`: `unsigned int`
- `%ld`: `long int`
- `%lx`: long integer in hexadecimal format
- `%lo`: long integer in octal format
- `%h`: `short int`
- `%ho`: short integer in octal format
- `%lu`: `unsigned long int`
- `%lld`: signed long long type
- `%llu`: `unsigned long long`

```c
// Example:
unsigned un = 3000000000; /* system with 32-bit int */
short end = 200; /* and 16-bit short */
long big = 65537;
long long verybig = 12345678908642;
printf("un = %u and not %d\n", un, un);  // un = 3000000000 and not -1294967296
printf("end = %hd and %d\n", end, end);  // end = 200 and 200
printf("big = %ld and not %hd\n", big, big);  // big = 65537 and not 1
printf("verybig = %lld and not %ld\n", verybig, verybig);  // verybig = 12345678908642 and not 1942899938
// note: for 64-bits system, this is not the answer
```

*Note*: 

- although C allows both uppercase and lowercase letters for constant suffixes, these format specifiers use just lowercase.
- the `int` type is intended to be the integer size that the computer handles most efficiently.



### 3.4.3 Using Characters: Type **`char`**

**`char` is an integer type**: 

- `char` type is used for storing characters such as letters and punctuation mark, but technically it is an integer type.
- Because the `char` type actually stores integers, not characters.
- To handle characters, the computer uses a *"numerical code"* in which certain integers represent certain characters.

**Numerical code**:

- ASCII code
- Unicode
- ...

*The C language defines a byte to be the number of bits used by type `char`*, so one can have a system with a 16-bit or 32-bit byte and `char` type.

#### 3.4.3.1 Declaring Type `char` Variables

```c
// Example:
char response;
char itable, latan;
```

#### 3.4.3.2 Character Constants and Initialization

*Character表示规则*:

- 如果单独表示字符常量／转义字符，需要加单引号。
- 如果在双引号的字符串里添加转义字符，则不需要再加单引号。

##### Character Constants

A single character contained between *single quotes* is a C character constant. Such as `'A'`, `'B'`, etc. When the compiler sees `'A'`, it converts the `'A'` to the proper code value.

```c
// Example:
char broiled;   // declare a char variable
broiled = 'T';  // OK, 'T' is a Character Constant
broiled = T;    // no, thinks T is a variable
broiled = "T";  // no, thinks "T" is a string
broiled = '\077' // represent a character by its octal ASCII code.
```

Because characters are really stored as numeric values, you can also use the numerical code to assign values:

```c
char grade = 65;    // ok for ASCII, but poor style
```

In this example, 65 is type `int`, but, because the value is smaller than the maximum char size, it can be assigned to grade without any problems. Because 65 is the ASCII code for the letter `A`, this example assigns the value `A` to grade.

Note, however, that this example assumes that the system is using ASCII code.

*Using `'A'` instead of 65 produces code that works on any system.* Therefore, it's much better to use character constants than numeric code values.

Note: Oddly, *C treats character constants as type `int` rather than type `char`.* For example, on an ASCII system with a 32-bit `int` and an 8-bit `char`, the code:

```c
char grade = 'B';
```

represents `'B'` as the numerical value 66 stored in a 32-bit unit, but `grade` winds up with `66` stored in an 8-bit unit. This characteristic of character constants makes it possible to define a character constant such as 'FATE', with four separate 8-bit ASCII codes stored in a 32-bit unit. However, attempting to assign such a character constant to a `char` variable results in only the last 8 bits being used, so the variable gets the value 'E'. *(???????????????)*



#### 3.4.3.3 Nonprinting Characters

C offers three ways to represent nonprinting characters:

1. use the ASCII code.
2. use special symbol sequences --- **escape sequences**. 

| Sequence | Meaning            | Sequence | Meaning                                  |
| -------- | ------------------ | -------- | ---------------------------------------- |
| `\a`     | Alert(ANSI C)      | `\v`     | Vertical tab                             |
| `\b`     | Backspace          | `\\`     | Backslash(`\`)                           |
| `\f`     | Form feed          | `\'`     | Single quote(`'`)                        |
| `\n`     | Newline            | `\"`     | Double quote(`"`)                        |
| `\r`     | Carriage return    | `\0oo`   | Octal value(`o` represents an octal digit) |
| `\t`     | Horizontal tab     | `\xhh`   | Hexadecimal value. (`h` represents a hexadecimal digit) |
| `\?`     | Question mark(`?`) |          |                                          |

 - when assigned to a character variable, escape sequences must be enclosed in single quotes.

```c
char nerf = '\n';  // newline
```

- `\a`: alert. Using the alert character in a program displayed on a screen should produce a beep without moving the screen cursor.
- `\b`,`\f`,`\n`,`\r`,`\t`,`\v`: common output device control characters.
- `\0oo`: special representations of the ASCII code. To represent a character by its octal ASCII code.

3. `\xhh`: using a hexadecimal form for character constants

 When you use ASCII code, note the *difference between "number characters" and "numbers"*. the character `4` is represented by ASCII code value `52`.



##### Q&A:

1. when should use single quotes for characters(including escape sequences), when shouldn't?

   When a character, be it an escape sequence or not, is part of a string of characters enclosed in double quotes, don't enclose it in single quotes.

2. *when should I use the ASCII code, and when should I use the escape sequences?*

   If you have a choice between using one of the special escape sequences, say `\f`, or an equivalent ASCII code, say `\014`, use the `\f`, this is more mnemonic, and more portable.

3. If I need to use numeric code, why use, say, `\032` instead of `032`? (both octal)

   Using `\032` makes it clear to the code reader that you intend to represent a character code. and, an escape sequence such as `\032` can be embedded in part of C string.



#### 3.4.3.4 **Printing** Characters

`%c`: The `printf()` function uses `%c` to indicate that a character should be printed.

Recall that a character variable is stored as a 1-byte integer value. Therefore, *if you print the value of a `char` variable with the usual `%d` specifier, you get an integer*.

```c
// Example
char ch;
printf("Please enter a character:\n");
scanf("%c", &ch);
printf("The code for %c is %d.\n", ch, ch);
/*
Please enter a character:
a
The code for a is 97.
*/
// the ampersand (&) causes the character to be assigned to the variable ch.
```

#### 3.4.3.5 Signed or Unsigned?

Some C implementations make `char` a signed type. This means a `char` can hold values typically in the range –128 through 127. Other implementations make `char` an unsigned type, which provides a range of 0 through 255. Your compiler manual should tell you which type your char is, or you can check the `limits.h` header file, discussed in the next chapter.

As of C90, C enabled you to use the keywords `signed` and `unsigned` with `char`. Then, regardless of what your default `char` is, `signed char` would be signed, and `unsigned char` would be unsigned. These versions of char are useful if you're using the type to handle small integers. For character use, just use the standard char type without modifiers.



### 3.4.4 the `_Bool` Type

In C99, the `_Bool` type is added to represent Boolean values:

- `1` for `true`;
- `0` for `false`;

The `_Bool` type really is just *an integer type*, but one that *only requires 1 bit of memory*.

*Program use Boolean values to choose which code to execute next*.



### 3.4.5 Portable Types: `stdint.h` and `inttypes.h`

#### `stdint.h`

C define some new names for integer types in a header file called `stdint.h` that can *have the same meaning regardless of the system*.

- exact-width integer type:

  - `int32_t` ...

  > What if a system can't support exact-width types (such as a system don't support 32-bit)?  We can use minimum width type.

- minimum width type:
  - `int_least8_t` : an alias for the smallest available type that can hold an 8-bit signed integer value. If the smallest type on a particular system were 16 bits, the `int8_t`type would not be defined, but `int_least8_t` type would be available, perhaps implemented as a 16-bit integer.
  - `int_fast8_t` will be defined as an alternative name for the integer type on your system that allows the fastest calculations for 8-bit signed values

  > Some people are more concerned with speed than with space. So there is also a fastest type

- fastest minimum width type:
  - `int_fast8_t ` : will be defined as an alternative name for teh integer type on your system that allows the fastest calculations for 8-bit signed values. 

- biggest possible integer type on a system:
  - `intmax_t`: the largest available signed integer type;
  - `uintmax_t`: the largest available unsigned integer type;

  > These types cloud be bigger than `long long` and `unsigned long` because C implementations are permitted to define types beyond the required ones.

#### **`inttypes.h`**

C99 and C11  also provide assistance with input and output.

*`printf()` requires specific specifiers for particular types*, such as how to display a `int32_t` value?

We will *need `inttypes.h` header file*. (It includes `stdint.h`, so the program only needs to include `inttypes.h`)

- current standard provides some string macros to be used to display the portable types.(see Chapter 4).
- for example, `inttypes.h` will define `PRId32` as a string represent the appropriate specifier(`d` or `l`) for a 32-bit signed value. 


```c
/* altnames.c -- portable names for integer types */
#include <stdio.h>
#include <inttypes.h>  // supports portable types
int main(void){
    int32_t me32; // me32 is a 32-bit signed variable
    me32 = 45933945;
    printf("First, assume int32_t is int: ");
    printf("me32 = %d\n", me32);
    printf("Next, let's not make any assumptions.\n");
    printf("Instead, us a \"macro\" from inttypes.h: ");
    printf("me32 = %" PRId32 "\n", me32);
    
    return 0;
}
/* output:
First, assume int32_t is int: me32 = 45933945
Next, let's not make any assumptions.
Instead, us a "macro" from inttypes.h: me32 = 45933945
*/
```

In the final `printf()` argument, the `PRId32` is replaced by its `inttypes.h` definition of "`d`", making the line this:

```c
printf("me16 = %" "d" "\n", me16);
```

But *C combines consecutive quoted strings into a single quoted string*, making the line this:

```c
printf("me16 = %d\n", me16);
```

> Reference Section VI "Extended Integer Types" in Appendix B

### 3.4.6 Types `float`, `double` and `long double`

Financial and mathematically oriented programs often make use of *floating-point* numbers.

In C, such numbers are called type `float`, `double`, or `long double`.

Floating-point enables you to represent a much greater range of numbers, including decimal fractions.

- *Representation:* use **exponential notation**, similar to *scientific notation*.

| Number        | Scientific Notation | Exponential Notation |
| ------------- | ------------------- | -------------------- |
| 1,000,000,000 | $= 1.0\times{10^9}$ | =1.0e9               |
| 123,000       | $=1.23\times{10^5}$ | =1.23e5              |
| 322.56        | $=3.2256\times10^2$ | =3.2256e2            |
| 0.000056      | $=5.6\times10^{-5}$ | =5.6e-5              |

- *Range* (minimum range in C standard): 
  1. `float`:  represent *at least six significant figures* and allow a range of *at least $10^{-37}$ to $10^{37}$*. 
  2. `double`(for double precision) : has *at least ten significant figures* and allow a range of at least $10^{-37}$ to $10^{37}$ .
  3. `long double`: intent to provide for even more precision than `double`. But C only guarantees that `long double` is at least as precise as `double`.
- *Store:* 
  - `float`: Often, systems use *32 bits* to store a floating-point number.
    - *8 bits* are used to give the exponent its value and sign
    - *24 bits* are used to represent the non exponent part (called the *mantissa* or *significand*) and its sign.
  - `double`: use *64 bits*.
    - Some systems use all 32 additional bits for the non exponent part. This increases hte number of significant figures and reduces round-off errors;
    - Other systems use some of the bits to accommodate a larger exponent, this increases the range of numbers that can be accommodated.
    - Either approach leads to *at least 13 significant figures*, more than meeting the minimum standard.

#### 3.4.6.1 Declaring Floating-Point Variables

Use the same manner as their integer cousins.

```c
// example:
float noah, jonah;
double trouble;
float planck = 6.63e-34;
long double gnp;  
```

#### 3.4.6.2 Floating-Point Constants (Literals)

**Basic forms**:

- Right: `-1.56E+12`, `2.87e-3`, `3.14159`, `.2`, `4e16`, `.8E-5`, `100.`, `2.3f`, `9.11E9F`, `54.3l`, `4.32e4L` ...

- Worng:  ~~`1.56 E+12`~~

  Don't use spaces in a floating-point constant.

*By default, the compiler assumes floating-point constants are `double` precision*.

For example, `some` is a `float` variable and that you have the following statement:

```c
some = 4.0 * 2.0;
```

Then 4.0 and 2.0 are stored as `double`, typically using 64 bits for each. The product is calculated using double precision arithmetic, and only then is the answer trimmed to regular `float` size. This ensures greater precision for your calculations, but it can slow down a program.

*C enables you to override this default by using an `f` or `F` suffix to make the compiler treat a floating-point constant as type `float`.*

Example: `2.3f`, `9.11E9F`.

*An `l` or `L` suffix mess a number type `long double`.*

Example: `54.3l`, `4.32e4L`.

If the floating-point number has no suffix, it is type `double`.

**Hexadecimal Form**:

- Since C99, C can use *a hexadecimal prefix*(`0x` or `0X`) with *hexadecimal digits*, a *`p` or `P`* instead of `e` or `E`, and *an exponent that is a power of 2* instead of a power of 10.
- Example: `0xa.1fp10` (=10364.0 in base 10 notation)

#### 3.4.6.3 Printing Floating-Point values

- `%f`:print `float` and `double` numbers *in decimal notation*
- `%e`:print `float` and `double` *in exponential notation*.
- `%a`:print `float` and `double` *in hexadecimal format* (if system support).
- `%Lf`,`%Le`,`%La`: `long double` type for every notation.

*C automatically expands type `float` values to type `double` when they are passed as arguments to any function, such as `printf()`, that does't explicitly prototype the argument type.*

So, both `float` and `double` use `%f`,`%e`,`%a` for output.

```c
/* showf_pt.c -- displays float value in two ways */
#include <stdio.h>
int main(void){
  float aboat = 32000.0;
  double abet = 2.14e9;
  long double dip = 5.32e-5;
  
  printf("%f can be written %e\n", aboat, aboat);
  // next line requires C99 or later compliance
  printf("And it's %a in hexadecimal, powers of 2 notation\n", aboat);
  printf("%f can be written %e\n", abet, abet);
  printf("%Lf can be written %Le\n", dip, dip);
  return 0;
}
/** output:
32000.000000 can be written 3.200000e+04
And it's 0x1.f4p+14 in hexadecimal, powers of 2 notation
2140000000.000000 can be written 2.140000e+09
0.000053 can be written 5.320000e-05
*/
```

This example illustrates the default output. (Next chapter discusses how to control the appearance of this output).

#### 3.4.6.4 Floating-Point Overflow and Underflow

**Overflow**:

```c
// Example:
float toobig = 3.4E38 * 100.0f;
long double nottoobig = 3.4E38 * 100.0f;
printf("%e\n %Le\n", toobig, nottoobig);
/* output
inf
3.400000e+40
*/
```

This is an example of *overflow* (for `toobig`). 

Now C specifies that `toobig` gets assigned a special value that stands for *infinity* and that `printf()` display either `inf` or `infinity` for the value.

**Underflow**: 

A  `float` number is stored as:

1. an exponent part
2. an value part, or mantissa（尾数）

There will be some small  `float` number that has the smallest possible exponent and also the smallest value that still uses all the bits available to represent the mantissa. So, for a certain `float` number `x` like this, it will be the smallest number that still is represented to the full precision available.

Now divide `x` by 2. Normally , this reduces the exponent, but the exponent already is as small as it can get. So, instead, *the computer moves the bits in the mantissa over, vacating the first position and losing the last binary digit*.

**Subnormal**:

- C refers to floating-point values that have lost the full precision of the type as *subnormal*. So dividing the smallest positive normal floating-point value by 2 results in a subnormal value.
- The *C library now provides functions that let you check whether your computations are producing subnormal values*. 

**`NaN`**: not-a-number.

- another special floating-point value.
- `printf()` display as `nan`, `NaN` or something similar.

###### Floating-Point Round-off Errors

```c
// Example
/* floaterr.c--demonstrates round-off error */
#include <stdio.h>
int main(void)
{
    float a,b;
    b = 2.0e20 + 1.0;
    a = b - 2.0e20;
    printf("%f \n", a);
    return 0;
}
/* The output is this:
4008175468544.000000
*/
```

The reason for these odd results is that the computer doesn't keep track of enough decimal places to do the operation correctly. 

###### Floating-Point Representation

Institute of Electrical and Electronics Engineers (*IEEE*) developed a standard for floating-point representation and computation.



### 3.4.7 Complex and Imaginary Types

Many computations in science and engineering use complex and imaginary numbers.

There are three complex types:

- `float _Complex`
- `double _Complex`
- `long double _Complex`

A `float _Complex` variable would contain two `float` values, one representing the real part of a complex number and one representing the imaginary part.

Similarly, there are three imaginary types:

- `float _Imaginary`
- `double _Imaginary`
- `long double _Imaginary`

**`complex.h`**:

Including the `complex.h` header file lets you substitute the word:

-  `complex` for `_Complex` 
-  `imaginary` for `_Imagiary`, 
-  and it allow you to use the symbol `I` to represent the square root of -1. 



### 3.4.8 Beyond the Basic Types

C doesn't have one, but it can still deal quite well with strings. 

C does have other types derived from the basic types. These types include `arrays`, `pointers`, `structures`, and `unions`.

For instance, a `pointer` points to the location of a variable or other data object. The `&` prefix used with the `scanf()` function creates a pointer telling `scanf()` where to place information.



### Summary: The Basic Data Types

###### Summary 01: The Basic Data Types

- Keyword:

  - The basic data types are set up using 11 keywords:

    `int`, `long`, `short`, `unsigned`, `char`, `float`, `double`, `signed`, `_Bool`, `_Complex` and `_Imaginary`.

- Signed Integers:

  - These can have positive or negative values:
    - `int`
    - `short int` or `short``
    - ``long` or `long int`
    - long long` or `long long int`

- Unsigned Integers:

  These have zero or positive values only.

- Characters: `char`.

- Boolean: `_Bool`.

- Real Floating Point:

  These can have positive or negative values:

  - `float`
  - `double`
  - `long double`

- Complex and Imaginary Floating Point:

  The imaginary types are optional, the real and imaginary components are based on the corresponding real types:

  - `float _Complex`
  - `double _Complex`
  - `long double _Complex`
  - `float _Imaginary`
  - `double _Imaginary`
  - `long double _Imaginary`

###### Summary 02: How to Declare a Simple Variable

1. Choose the type you need.

2. Choose a name for the variable using the allowed characters.

3. Use the following format for a declaration statement:

   ```
   type-specifier variable-name;
   ```

   The `type-specifier` is formed from one or more of the type keywords; here are examples of declarations:

   ```
   int erest;
   unsigned short cash;
   ```

4. You can declare more than one variable of the same type by separating the variable names with commas. Here's an example:

   ```
   char ch, init, ans;
   ```

5. You can initialize a variable in a declaration statement:

   ```
   float mass = 6.0E24;
   ```

   ​

### 3.4.9 Type Sizes

What type sizes does your system use? c99 provides a %zd specifier for sizes.

C has a built-in operator called `sizeof` that gives sizes in bytes, C99 and C11 provide a `%zd` specifier for this type used by `sizeof`. Noncompliant compilers may require `%u` or `%lu` instead.

```c
// The typesize.c Program
#include <stdio.h>
int main(void){
  /* c99 provides a %zd specifier for sizes */
  printf("Type int has a type of %zd bytes.\n", sizeof(int));
  printf("Type char has a type of %zd bytes.\n", sizeof(char));
  printf("Type long has a type of %zd bytes.\n", sizeof(long));
  printf("Type long long has a type of %zd bytes.\n", 
         sizeof(long long));
  printf("Type double has a type of %zd bytes.\n", 
         sizeof(double));
  printf("Type long double has a type of %zd bytes.\n", 
         sizeof(long double));
  return 0;
}
/*
Type int has a type of 4 bytes.
Type char has a type of 1 bytes.
Type long has a type of 8 bytes.
Type long long has a type of 8 bytes.
Type double has a type of 8 bytes.
Type long double has a type of 16 bytes.
*/
//notice in the last few lines how a printf() statement can be spread over two lines. You can do this as long as the break does not occur in the quoted section or in the middle of a word
```

*You can check the `limits.h` and `float.h` header files for more detailed information on type limits.*



## 3.5 Using Data Types

When you develop a program, note teh variables you need and which type they should be.

When you initialize a variable of one numeric type to a value of a different type, C converts the value to match the variable. This means you may lose some data. For example :

```c
int cost = 12.99;  // cost will be 12
float pi = 3.1415926536;  // 3.141593, a float is guaranteed to represent only the first six digits, so `pi` may lose some data.
```

## 3.6 Arguments and Pitfalls

Arguments:





