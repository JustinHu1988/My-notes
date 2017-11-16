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

The next program is a temperature conversion, uses the formula $^{\circ}C=(5/9)(^{\circ}F-32)$

```c
#include <stdio.h>

/* print Fahrenheit-Celsius table
for fahr = 0, 20, ..., 300 */
int main()
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
int main()
{
	int fahr, celsius;  // In C, all variables must be declared before they are used, usually at the beginning of the function before any executable statements.
	int lower, upper, step; // int means that the variable listed are integers, by contrast with float, which means floating point. See Note-003.

	lower = 0;  // assignment statements, set the variables to their initial values. Individual statements are terminated by semicolons.
	upper = 300;
	step = 20;
	fahr = lower;
  
	while (fahr <= upper) { // while loop, see Note-004.
		celsius = 5 * (fahr - 32) / 9; // see Note-005.
		printf("%d\t%d\n", fahr, celsius);  // see Note-006.
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
> - The body of a `while` can be one or more statements enclosed in braces, as in the temperature converter, or a single statement without braces:
>
>   ```C
>   while (i < j)
>     i = 2*i;
>   ```
>
>   In either case, we will always indent the statements controlled by the `while` by one tab stop so you can see at a glance which statements are inside the loop.

> Note-005
>
> ```C
> celsius = 5 * (fahr - 32) / 9;
> ```
>
> The reason for multiplying by 5 and then dividing by 9 instead of just multiplying by 5/9 is that in C, as in many languages, *integer division* **truncates** *: any fractional part is discarded*.
>
> *Since 5 and 9 are integers, 5/9 would be truncated to zero* and so all the Celsius temperatures would be reported as zero.

> Note-006
>
> `printf` is a general-purpose output formatting function.
>
> - Its first argument is a string of characters to be printed, with *each `%` indicating where one of the other (second, third, ...) arguments is to be substituted, and in what form it is to be printed*. 
> - Each `%` construction and the corresponding argument must match up properly by number and type.
>
> `printf` is not part of the C language; there is no input or output defined in C itself. `printf` is just a useful function from the standard library of functions that are normally accessible to C programs. (ANSI standard)

There are a couple of problems with the temperature conversion program. 

- the output isn't very pretty because the numbers are not *right-justified*. That's easy to fix; if we augment each `%d` in the `printf` statement *with a width*, the numbers printed will be right-justified in their fields. For example:

  ```C
  printf("%3d %6d\n", fahr, celsius);
  ```

- Because we have used integer arithmetic, the Celsius temperatures are not very accurate.

  - *To get more accurate answers, we should use floating-point arithmetic instead of integer.* This requires some changes in the program:

    ```C
    #include <stdio.h>

    /* print Fahrenheit-Celsius table
    for fahr = 0, 20, ..., 300; floating-point version */
    int main()
    {
    	float fahr, celsius;
    	int lower, upper, step;

    	lower = 0;
    	upper = 300;
    	step = 20;

    	fahr = lower;
    	while (fahr <= upper) {
    		celsius = (5.0/9.0) * (fahr - 32.0);
    		printf("%3.0f %6.1f\n", fahr, celsius);
    		fahr = fahr + step;
    	}
    }
    ```

  - In this version, `fahr` and `celsius` are declared to be `float`, and the formula for conversion is written in a more natural way.

  - A decimal point in a constant indicates that it is floating point, *so 5.0/9.0 is not truncated because it is the ratio of two floating-point values.*

    - If an arithmetic operator has integer operands, an integer operation is performed.
    - If an arithmetic operator has one floating-point operand and one integer operand, *the integer will be converted to floating point before teh operation is done*. So in this example, we can write `fahr - 32` and the result is still a float-point.
    - Nevertheless, writing floating-point constants with explicit decimal points even when they have integral values emphasizes their floating-point nature for human readers.
    - The detailed rules for when integers are converted to floating point are in Chapter 2, *for now, notice that the assignment `fahr = lower;` and the test `while (fair <= upper)` also convert int to float before the operation is done in this example.*

  - The `printf` conversion specification :

    - *`%3.0f` says that a floating-point number is to be printed at least three characters wide, with no decimal point and no fraction digits*. 
    - *`%6.1f` describes another number that is to be printed at least six characters wide, with 1 digit after the decimal point.*

    *Width and precision may be omitted from a specification*: 

    - *`%6f` says that the number is to be at least six characters wide, but the precision is not constrained.*
    - *`%.2f` specifies two characters after the decimal point, but the width is not constrained.* 
    - `%f` merely says to print the number as floating point.
    - `%o` for octal
    - `%x` for hexadecimal
    - `%c` for character
    - `%s` for character string
    - `%%` for `%` itself.

      ​
      ​

  ### 1.3 The For statement



```C
#include <stdio.h>

/* print Fahrenheit-Celsius table */
int main()
{
    int fahr;
  	for(fahr = 0; fahr <= 300; fahr = fahr + 20)
      printf("%3d %6.1f\n", fahr, (5.0/9.0)*(fahr-32));
}
```

```C
#include <stdio.h>

/* print Fahrenheit-Celsius table */
int main()
{
    int fahr;
  	for(fahr = 0; fahr <= 300; fahr = fahr + 20)  // See Note-008
      printf("%3d %6.1f\n", fahr, (5.0/9.0)*(fahr-32));  // See Note-007
}
```

> Note-007
>
> **A general rule** — *in any context where it is permissible to use the value of a variable of some type, you can use a more complicated expression of that type*.
>
> - Since the third argument of `printf` must be a floating-point value to match the `%6.1f`, any floating-point expression can occur there.

> Note-008
>
> `for` loop, as with the `while`, the body of the loop can be a single statement, or a group of statements enclosed in braces. The initialization, condition, and increment can be any expressions.
>
> The choice between `while` and `for` is arbitrary, based on which seems clearer.
>
> ​			

### 1.4 Symbolic Constants		

*It's bad practice to bury "magic numbers" like `300` and `20` in a program:* 

- they *convey little information* to someone who might have to read the program later.
- and they are *hard to change* in a systematic way.

*One way to deal with magic numbers is to give them meaningful names*:

##### #define

A **`#define`** line defines a **symbolic name(符号名)** or **symbolic constant(符号常量)** to be a particular string of characters:

```C
#define   name   replacement text
```

Thereafter, any occurrence of `name` will be replaced by the corresponding `replacement text`.

- The `name` has the same form as a variable name; a sequence of letters and digits that begins with a letter.
- The `replacement text` can be any sequence of characters; it is not limited to numbers.

```C
#include <stdio.h>

#define LOWER 0
#define UPPER 300
#define STEP 20

/* print Fahrenheit-Celsius table */
int main()
{
  int fahr;
  
  for (fahr = LOWER; fahr <= UPPER; fahr = fahr + STEP)
    printf("%3d %6.1f\n", fahr, (5.0/9.0)*(fahr-32));
}
```

The quantities `LOWER`, `UPPER` and `STEP` are symbolic constant, not variables, so they do not appear in declarations.

*Symbolic constant names are conventionally written in upper case* so they can be readily distinguished from lower case variable names.

Notice that there is *no semicolon at the end of a `#define` line*.



### 1.5 Character Input and Output

Text input or output, is dealt with as streams of characters.

A **text stream (文本流)** is a sequence of characters divided into lines; each line consists of zero or more characters followed by a newline character.

- It is the responsibility of the library to make each input or output stream conform to this model. The C programmer using the library need not worry about how lines are represented outside the program.



The standard library provides several functions for reading or writing one character at a time, of which **`getchar`** and **`putchar`** are the simplest. **对于getchar的工作原理，还不太了解????**

- Each time it is called, `getchar` reads the next input character from a text stream and returns that as its value. That is, *after*

  ```C
  c = getchar()
  ```

  *the variable `c` contains the next character of input.* The characters normally come from the keyboard; input from files is discussed in Chapter 7.

- The function `putchar` prints a character each time it is called:

  ```C
  int c = 90;
  putchar(c);  // output "Z"
  ```

  *Prints the contents of the **integer variable** `c` as a character usually on the screen*.

  Calls to `putchar` and `printf` may be interleaved; the output will appear in the order in which the call are made.

Given `getchar` and `putchar`, you can write a surprising amount of useful code without knowing anything more about input and output.

##### 1.5.1 File Copying

The simplest example is a program that copies its input to its output one character at a time:

```
read a character
while (character is not end-of-file indicator)
	output the character just read
	read a character
```

Converting this into C gives:

```c
#include <stdio.h>

/* copy input to output; 1st version */
int main()
{
  int c; // 
  
  c = getchar();
  while (c != EOF){ 
    putchar(c);
    c = getchar();
  }
}
```

*What appears to be a character on the keyboard or screen is of course, like everything else, stored internally just as a bit pattern.*

The type `char` is specifically meant for storing such character data, but any integer type can be used. We used `int` for a subtle but important reason:

- *The problem is distinguishing the end of the input from valid data.*
- The solution is that `getchar` returns a distinctive value when there is no more input; a value that cannot be confused with any real character.
- This value is called `EOF`, for "end of file".
- We must declare `c` to be a type big enough to hold any value that `getchar` returns.
- *We can't use `char` since `c` must be big enough to hold `EOF` in addition to any possible `char`. Therefore we use `int`.*
- `EOF` is an integer defined in `<stdio.h>`, but the specific numeric value doesn't matter as long as it is not the same as any `char` value.
- *By using the symbolic constant, we are assured that nothing in the program depends on the specific numeric value.*



​		
The program for copying would be written *more concisely* by experienced C programmers. In C, any assignment, such as

```C
c = getchar();
```

*is an expression and has a value, which is the value of the left hand side after the assignment*.

**This means that an assignment can appear as part of a larger expression**. If the assignment of a character to `c` is put inside the test part of a `while` loop, the copy program can be written this way:

```c
#include <stdio.h>

/* copy input to output; 2nd version */
int main()
{
  int c;
  
  while ((c = getchar()) != EOF)  // assignment will execute, then the value of c will compare with EOF, see Note-009
    putchar(c);
}
```

*The `while` gets a character, assigns it to `c`, and then tests whether the character was the end-of-file signal.*

- if it was not, the body of the `while` is executed, printing the character. The `while` then repeats. When the end of the input is finally reached, the `while` terminates and so does `main`.

This version centralizes the input -- there is now only one reference to `getchar` -- and shrinks the program. The resulting program is more compact, and, once the idiom is mastered, easier to read. You'll see this style often. (It's possible to get carried away and create impenetrable code, however, a tendency that we will try to curb).

> Note-009:
>
> *The parentheses around the assignment within the condition are necessary:*
>
> - *Because the precedence of `!=` is higher than that of `=`.*



##### 1.5.2 Character Counting

```c
#include <stdio.h>
/* count characters in input; 1st version */
int main()
{
  long nc;  // long integers are at least 32bits.
  nc = 0;
  while (getchar() != EOF)
    ++nc; // ++, means increment by one. See Note-010
  printf("%ld\n", nc); // The conversion specification %ld tells printf that the corrsponding argument is a long integer.
}
```

> Note-010:
>
> - Instead write `nc=nc+1`, `++nc` is more concise and often more efficient.
> - There is a corresponding operator `--` to decrement by `1`.
> - The operators `++` and `--` can be either prefix(`++nc`) operators or postfix(`nc++`);
>   - These two forms have different value in expressions
>   - but they both increment `nc`.



It may be possible to cope with even bigger numbers by using a `double`. We will also use a `for` statement instead of a `while`, to illustrate another way to write a loop.

```c
#include <stdio.h>
/* count characters in input; 2nd version */
int main()
{
  double nc;
  for (nc = 0; getchar() != EOF; ++nc)
    ;  // see Note-011
  printf("%.0f\n", nc);  // printf uses %f for both float and double. %.0f suppresses printing of the decimal point and the fraction part, which is zero
}
```

> Note-011:
>
> - The body of this for loop is empty, because all of the work is done in the test and increment parts. 
> - But the grammatical rules of C require that a `for` statement have a body. The isolated semicolon, called a **null statement (空语句)**, is there to satisfy that requirement.
> - We put it on a separate line to make it visible.



Observe that if the input contains no characters, the while or for test fails on the very first call to `getchar`, and the program produces `0`, the right answer. This is important. One of the nice things about `while` and `for` is that they test at the top of the loop, before proceeding with the body. If there is nothing to do, nothing is done, even if that means never going through the loop body. 

Programs should act intelligently when given zero-length input. The `while` and `for` statements help ensure that programs *do reasonable things with boundary conditions*.



##### 1.5.3 Line Counting

```c
#include <stdio.h>
/* count lines in input */
int main()
{
  int c, nl;
  nl = 0;
  while ((c=getchar()) != EOF)
    if (c=='\n')  // see Note-012
      ++nl;
  printf("%d\n", nl);
}
```

> Note-012
>
> - `if` statement tests the parenthesized condition, and if the condition is true, executes the statement (or group of statements in braces) that follows.
> - double equal sign `==` is the C notation for "is equal to". This symbol is used to distinguish the equality test from the single `=` that C uses for assignment.
> - **A character written between single quotes represents an integer value equal to the numerical value of the character in the machine's character set.** This is called a **character constant (字符常量)**, although it is just another way to write a small integer. 
>   - for example: 'A' is a character constant; in the ASCII character set its value is 65, the internal representation of the character A. Of course 'A' is to be preferred over 65: its meaning is obvious, and it is independent of a particular character set.
> - The escape sequences used in string constants are also legal in character constants, so '\n' stands for the value of the newline character, which is 10 in ASCII.
>   - note carefully that '\n' is a single character, and in expressions is just an integer.
>   - On the other hand, '\n' is a string constant that happens to contain only one character.

##### 1.5.4 Word Counting

```c
#include <stdio.h>
#define IN 1 /* inside a word */
#define OUT 0 /* outside a word */

/* count lines, words, and characters in input */
int main()
{
  int c, nl, nw, nc, state;
  
  state = OUT;
  nl = nw = nc = 0;  // sets all three variables to zero
  while ((c=getchar()) != EOF){
    ++nc;
    if(c=='\n'){
        ++nl;
    }
    if(c==' ' || c=='\n' || c=='\t') // see Note-013
      state = OUT;
    else if (state == OUT) {
      state = IN;
      ++nw;
    }
  }
  printf("%d %d %d\n", nl, nw, nc);
}
```

> Note-013
>
> - operator `||` means OR.
>   - It is guaranteed that evaluation will stop as soon as the truth or falsehood is known.
> - and there is a corresponding operator `&&` for AND.
> - Precedence: *`&&` is higher than `||`.*



Exercise 1-12: *练习题初期答案和标准答案之间的对比：*

not optimized:

```C
#include <stdio.h>
#define IN 1 /* inside a word */
#define OUT 0 /* outside a word */
/* prints its input one word per line (not optimized) */
int main()
{
    int c, state, count;
    state = IN;
    count = 0;

    while ((c=getchar()) != EOF){
        if(c==' ' || c=='\t'){
            if(count == 0){
            }else{
             state = OUT;
            }
        }
        else if(c=='\n' && state==IN){
            putchar('\n');
            count = 0;
        }
        else if (state == OUT) {
            state = IN;
            putchar('\n');
            if(c != '\n'){
             putchar(c);
            } else{
             count = 0;
            }  
        }else if(state == IN){
            if(count == 0) {
                count++;
            }
            putchar(c);
        }
    }
}
```

**Optimized**:

```C
#include <stdio.h>
#define IN 1 /* inside a word */
#define OUT 0 /* outside a word */

/* prints its input one word per line (optimized) */
int main()
{
    int c, state;
    state = OUT;
  
    while ((c=getchar()) != EOF){
        if(c==' ' || c=='\t' || c=='\n'){
            if(state==IN){
                putchar('\n');
                state = OUT;
            }
        }
        else if (state == OUT) {
            state = IN;
            putchar(c);
        }else if(state == IN){
            putchar(c);
        }
    }
}
```

*预先的逻辑架构要清晰，才可以得出较为优化的判定结构。*





### 1.6 Arrays



```C
#include <stdio.h>
/* count digits, white space, others */
int main()
{
  int c, i, nwhite, nother;
  int ndigit[10];
  
  nwhite = nother = 0;
  for (i = 0; i < 10; ++i)
    ndigit[i] = 0;
  
  while ((c = getchar()) != EOF)
    if (c >= '0' && c <= '9')
      ++ndigit[c-'0'];
    else if (c == ' ' || c == '\n' || c == '\t')
      ++nwhite;
  	else
      ++nother;
  
  printf("digits = ");
  for (i = 0; i < 10; ++i)
    printf("%d", ndigit[i]);
  printf(", white space = %d, other = %d\n", nwhite, nother);
}
```

```C
#include <stdio.h>
/* count digits, white space, others */
int main()
{
  int c, i, nwhite, nother;
  int ndigit[10];  // declares `ndigit` to be an array of 10 integers. See Note-014
  
  nwhite = nother = 0;
  for (i = 0; i < 10; ++i)
    ndigit[i] = 0;
  
  while ((c = getchar()) != EOF)
    if (c >= '0' && c <= '9')  // See Note-015
      ++ndigit[c-'0'];
    else if (c == ' ' || c == '\n' || c == '\t')
      ++nwhite;
  	else
      ++nother;
  
  printf("digits = ");
  for (i = 0; i < 10; ++i)
    printf("%d", ndigit[i]);
  printf(", white space = %d, other = %d\n", nwhite, nother);
}
```



> Note-014
>
> A subscript can be any integer expression, which includes integer variables like `i`, and integer constants.

> Note-015
>
> This particular program relies on the properties of the character representation of the digits. For example, the test:
>
> ```c
> if (c >= '0' && c <= '9')...
> ```
>
> determines whether the character in `c` is a digit. If it is, the numeric value of that digit is: `c-'0'`.
>
> This works only if '0', '1', …, '9' have consecutive increasing values. Fortunately, this is true for all character sets.

*By definition, `char`s are just small integers, so `char` variables and constants are identical to `int`s in arithmetic expressions*.

This is natural and convenient; for example, `c-'0'` is an integer expression with a value between 0 and 9 corresponding to the character '0' to '9' stored in `c`, and is thus a valid subscript for the array `ndigit`.



*Note: Exercise 1-14 is still not write.???*



### 1.7 Functions

With properly designed functions, it is possible to ignore how a job is done, knowing what is done is sufficient.

For illustration, let's see an example:

```C
#include <stdio.h>

int power(int m, int n);

/* test power function */
int main(){
  int i;
  for (i = 0; i < 10; ++i)
  	printf("%d %d %d\n", i, power(2,i), power(-3,i));
  return 0; 
}
/* power: raise base to n-th power; n>=0 */
int power(int base, int n)
{
  int i,p;
  
  p = 1;
  for (i = 1; i <= n; ++i)
    p = p * base;
  return p;
}
```

A function definition has this form:

```
return-type function-name(parameter declarations, if any)
{
  declarations
  statements
}
```

*Function definitions can appear in any order, and in one source file or several, although no function can be split between files.*

- If the source program appears in several files, you may have to say more to compile and load it than if it all appears in one, but that is an operating system matter, not a language attribute.

For the moment, we will assume that both functions are in the same file, so whatever you have learned about running C programs will still work.



```C
#include <stdio.h>

int power(int m, int n);  // a function prototype, See Note-020

/* test power function */
int main(){
  int i;
  for (i = 0; i < 10; ++i)
  	printf("%d %d %d\n", i, power(2,i), power(-3,i));  // See Note-016
  return 0; // See Note-019
}
/* power: raise base to n-th power; n>=0 */
int power(int base, int n)  // See Note-017
{
  int i,p;
  
  p = 1;
  for (i = 1; i <= n; ++i)
    p = p * base;
  return p; // See Note-018
}
```

> Note-016
>
> Each call passes two arguments to `power`, which each time returns an integer to be formatted and printed.

> Note-017
>
> This line declares the parameter types and names, and the type of the result that the function returns.
>
> The names used by `power` for its parameters are local to `power`, and are not visible to any other function: other routines can use the same names without conflict. This is also true of the variables `i` and `p`: the `i` in `power` is unrelated to the `i` in `main`.
>
> We will generally use **parameter** for a variable named in the parenthesized list in a function definition, and **argument** for the value used in a call of the function. The terms **formal argument** and **actual argument** are sometimes used for the same distinction.

> Note-018
>
> The value that `power` computes is returned to `main` by the `return` statement.
>
> Any expression may follow `return`:
>
> ```
> return expression;
> ```
>
> - A function need not return a value;
>
> - A `return` statement with no expression causes control, but no useful value, to be returned to the caller, as does "falling off the end" of a function by reaching the terminating right brace.
>
>   And the calling function can ignore a value returned by a function.

> Note-019
>
> Since `main` is a function like any other, it may return a value to its caller, which is in effect the environment in which the program was executed.
>
> - *Typically, a return value of zero implies normal termination;*
> - *Non-zero values signal unusual or erroneous termination conditions.*

> Note-020
>
> **Function prototype (函数原型)**:
>
> - the prototype need to *agree with the definition and uses of the same function name*. Otherwise it is an error.
>
> - *Parameter names need not agree*. Indeed, parameter names are *optional* in a function prototype, so for prototype we could have written:
>
>   ```c
>   int power(int, int);
>   ```
>
>   However, *well-chosen names are good documentation, so we will often use them*.
>
> *This (relatively) new syntax of function prototypes makes it much easier for a compiler to detect errors in the number of arguments or their types.*
>
> 

### 1.8 Arguments — *Call by Value*

In C, all function arguments are passed "by value".

This means that the called function is given the values of its arguments in temporary variables rather than the originals.













