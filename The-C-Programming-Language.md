# Introduction

C is a general-purpose programming language.


Many of the important ideas of C stem from the language BCPL, the influence of BCPL on C proceeded indirectly through the language B.

### Type

BCPL and B are "typeless" languages. By contrast, C provides a variety of data types:

- The fundamental types are characters, integers and floating-point numbers of several sizes
- In addition, there is a hierarchy of derived data types created with `pointers`, `arrays`, `structures`, and `unions`.
- Expressions are formed from operators and operands; any expression, including an assignment or a function call, can be a statement. 
  - Pointers provide for machine-independent address arithmetic.	

### Control-flow 

C provides the fundamental control-flow constructions required for well-structured programs:

- statement grouping
- decision making (if-else)
- selecting one of a set of possible cases (switch)
- looping with the termination test at the top (while, for) or at the bottom (do)
- early loop exit (break).

### Function 

Functions may return values of basic types, structures, unions, or pointers.

Any function may be called recursively. 

Local variables are typically "automatic," or created anew with each invocation. 

*Function definitions may not be nested but variables may be declared in a block-structured fashion.???*

The functions of a C program may exist in separate source files that are compiled separately. 

Variables may be: 

- internal to a function
- external but known only within a single source file
- visible to the entire program

  ​		

### Preprocessing

A preprocessing step performs macro substitution on program text, inclusion of other source files, and conditional compilation.

​		
​		

### Relatively "Low level"	

C is a relatively "low level" language. This characterization is not pejorative; it simply means that C deals with the same sort of objects that most computers do, namely characters, numbers, and addresses. These may be combined an moved about with the arithmetic and logical operators implemented by real machines.



- C provides no operations to deal directly with composite objects such as character strings, sets, lists or arrays.


- There are no operations that manipulate an entire `array` or `string`, although `structures` may be copied as a unit.
- The languages does not define any storage allocation facility other than **static definition** and the **stack discipline** provided by the local variables of functions;
- There is no **heap** or **garbage collection**.
- C itself provides no input/output facilities. There are no `READ` or `WRITE` statements, and no built-in file access methods.


*All of these higher-level mechanisms must be provided by* **explicitly-called functions (显示调用的函数).**

Most C implementations have included a reasonably standard collection of such functions.

##### Single-thread control flow

Similarly, C offers only straightforward, single-thread control flow: tests, loops, grouping, and subprograms, but not **multiprogramming (多道程序设计)**, **parallel operations (并行操作)**, **synchronization (同步)**, or **coroutines (协同例程)**.



### benefits for small

*Although the absence of some of these features may seem like a grave deficiency* ("You mean I have to call a function to compare two character strings?"), *keeping the language down to modest size has real benefits.*

- Since C is relatively small, it can be described in a small space, and learned quickly. A programmer can reasonably expect to know and understand and indeed regularly use the entire language.

  ​







# 1. A Totorial Introduction

### 1.1 Getting Started

```c
#include <stdio.h>
int main()
{
    printf("hello, world\n");
}	
```

```c
#include <stdio.h> //tells the compiler to include information about the standard input/output library; This line arrpears at the beginning of many C source files.
int main() //define a function named main, receives no arguments. see Note-001.
{ //the statements fo a function are enclosed in braces {}.
    printf("hello, world\n"); // calls library function printf to print this sequence of character; "\n" represents the newline character. see Note-002.
}
```

> Note-001:
>
> Normally you are at liberty to give functions whatever names you like, but `main` is special — your *program begins executing at the beginning of `main`.* This means that every program must have a `main` some-where.
>
> `main` will usually call other functions to help perform its job, some that you wrote, and others from libraries that are provided for you.

> Note-002:
>
> - A function is called by naming it, followed by a parenthesized list of arguments, so this calls the function `printf` with the argument `"hello, world\n"`. `printf` is a library function that prints output, in this case the string of characters between the quotes.
>
> - A sequence of characters in double quotes, like "hello, world\n", is called a character string or **string constant**.
>
> - `\n`:
>
>   - The sequence `\n` in the string is C notation for the newline character, which when printed advances the output to the left margin on the next line.
>
>   - If you leave out the `\n`, you will find that there is no line advance after the output is printed.
>
>   - You must use `\n` to include a newline character in the printf argument; if you try something like:
>
>     ```C
>     printf("hello, world
>            ");
>     ```
>
>     the C compiler will produce an *error* message.
>
>   - *`printf` never supplies a newline automatically, so several calls may be used to build up an output line in stages.* Our first program could just as well have been written:
>
>     ```C
>     #include <stdio.h>
>     int main()
>     {
>       printf("hello, ");
>       printf("world");
>       printf("\n");
>     }			
>     ```
>
>   - Notice that *`\n` represents only a single character.*
>
>     An **escape sequence (转义序列)** like `\n` provides a general and extensible mechanism for representing hard-to-typeor invisible characters. Among the others that C provides are `\t` for tab, `\b` for backspace, `\n` for the double quote, and `\\` for the backslash itself. Thereis a complete list in Section 2.3.

​			

### 1.2 Variables and Arithmetic Expressions		

The next program uses the formula $^{\circ}C=(5/9)(^{\circ}F-32)$

```c
#include <stdio.h>

/* print Fahrenheit-Celsius table
for fahr = 0, 20, ..., 300 */
main()
{
	int fahr, celsius;
	int lower, upper, step;

	lower = 0;
	upper = 300;
	step = 20;

	fahr = lower;
	while (fahr <= upper) {
		celsius = 5 * (fahr - 32) / 9;
		printf("%d\t%d\n", fahr, celsius);
		fahr = fahr + step;
	}
}
```

```c
#include <stdio.h>

/* print Fahrenheit-Celsius table
for fahr = 0, 20, ..., 300 */  // this two line are a comment.
main()
{
	int fahr, celsius;  // In C, all variables must be declared before they are used, usually at the beginning of the function before any executable statements.
	int lower, upper, step; // int means that the variable listed are integers, by contrast with float, which means floating point. See Note-003.

	lower = 0;  // assignment statements, set the variables to their initial values. Individual statements are terminated by semicolons.
	upper = 300;
	step = 20;
	fahr = lower;
  
	while (fahr <= upper) { // while loop, see Note-004.
		celsius = 5 * (fahr - 32) / 9;
		printf("%d\t%d\n", fahr, celsius);
		fahr = fahr + step;
	}
}
```

> Note-003: 
>
> - The range of both `int` and `float` depends on the machine you are using.
>
>   - 16-bit ints, which lie between -32768 and +32767
>   - A float number is typically a 32-bit quantity, with at least six significant digits and magnitude generally between about 10^-38^ and 10^38^.
>
> - C provides several other basic **data types** besides `int` and `float`, including:
>
>   - `char`: character -- a single byte
>   - `short`: short integer
>   - `long`: long integer
>   - `double`: double-precision floating point
>
>   The **size** of these objects are also machine-dependent.
>
>   There are also `arrays`, `structures` and `unions` of these basic types, `pointers` to them, and `functions` that return them, all of which we will meet in due course.

> Note-004
>
> - ​

​			
​		
​	