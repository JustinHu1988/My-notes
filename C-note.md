# Chapter 3 :  Data and C

## 3.1 Basic

The contents of Chapter 3:

 - Keywords:
    - `int`, short, long, unsigned, char, float, double, _Bool, _Complex, _Imaginary
 - Operator
    - `sizeof`
 - Function
    - `scanf()`
 - The basic data types that C uses
 - The distinctions between integer types and floating-point types
 - Writing constants and declaring variables of those types
 - How to use the printf() and scanf() functions to read and write values of different types
 - in this chatper, you practice manipulating data, not just read data.




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

### 3.4.1 int

C integer types vary in the range of values offered and in wherher negative numbers can be used.

#### `int`

- the `int` type is a signed integer, can be positive, negative or zero.
- The range in possible values depends on the computer system.
- Typically, **an int uses one machine word for storage**.
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

####  Printing int Values

`%d` notation is called a "format specifier", it indicates the form that `printf()` uses to display a value.

```C
#include <stdio.h>
int main(void){
  int x = 10;
  printf("The value of x is: %d.\n", x); // The value of x is: 10.
}
```

**If you make mistake on `printf()`:**

Example

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

**Note**: 

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









