## Velocity Template Language (**VTL**)

**VTL** is meant to provide the easiest, simplest, and cleanest way to incorporate dynamic content in a web page.

- VTL uses *references* to embed dynamic content in a web site, and a variable is one type of reference.

- Variables are one type of reference that can refer to something defined in the Java code, or it can get its value from a VTL *statement* in the web page itself.  

- Here is an example of a VTL statement that could be embedded in an HTML document:

  ```velocity
  #set( $a = "Velocity" )
  ```

  - begin with `#`

  - contains a directive: `set`

    - The `set` directive uses an expression (*enclosed in brackets*) -- an equation that assigns a value to a variable.
    - The variable begins with the `$` character.
    - String values are always enclosed in quotes, either single or double quotes.
      - *single quotes* will ensure that the quoted value will be assigned to the reference as is.
      - *double quotes* allow you to use velocity references an directives to interpolate, such as `"Hello $name"`

    > When an online visitor requests your web page, the Velocity Templating Engine will search through your web page to find all *#*characters, then determine which mark the beginning of VTL statements, and which of the *#* characters that have nothing to do with VTL. 

**References begin with `$` and are used to get something. Directives begin with `#` and are used to do something.**

- In the example above, `#set` is used to assign a value to a variable. The variable, `$a`, can then be used in the template to output "Velocity".



Once a value has been assigned to a variable, you can reference the variable anywhere in your HTML document.

- Example:

  ```velocity
  <html>
    <body>
    #set($foo = "Velocity")
    Hello $foo world!
    </body>
  </html>
  ```



## Comments

```velocity
## This is a single line comment.
#*
 This is 
 a multi-line 
 comment.
*#
```

VTL comment block:

```velocity
#**
  This is a VTL comment block and 
  may be used to store such information
  as the document author and versioning
  information:
  	@author John Doe
  	@version 5
*#
```

## References

There are three types of references in the VTL: 

- variables
- properties
- methods

#### Variables

The shorthand notation of a variable consists of a leading `$` character followed by a VTL *Identifier*.

- A VTL Identifier must start with an alphabetic character (a..z or A..Z). The rest of the characters are limited to the following types of characters:
  - alphabetic (`a..z, A..Z`)
  - numeric (`0..9`)
  - hyphen (`-`)
  - underscore (`_`)
- When VTL references a variable, such as `$foo`, the variable can get its value from either a `set` directive in the template, or from the Java code. 

#### Properties

For example:

```velocity
$customer.Address
$purchase.Total
```

> `$customer.Address` could be an abbreviated way of writing `$customer.getAddress()`. When your page is requested, Velocity will determine which of these two possibilities makes sense, and then return the appropriate value. 

#### Methods

A method is defined in the Java code and is capable of doing something useful.

For example:

```velocity
$customer.getAddress()
$purchase.getTotal()
$page.setTitle( "My Home Page" )
$person.setAttributes( ["Strange", "Weird", "Excited"] )
```

*VTL Properties can be used as a shorthand notation for VTL Methods*. 

- The Property `$customer.Address` has the exact same effect as using the Method `$customer.getAddress()`. 
- It is generally preferable to use a Property when available. The main difference between Properties and Methods is that you can specify a parameter list to a Method. 

#### Property Lookup Rules

As was mentioned earlier, properties often refer to methods of the parent object. Velocity is quite clever when figuring out which method corresponds to a requested property. 

- It tries out different alternatives based on several established naming conventions. 
- The exact lookup sequence depends on whether or not the property name starts with an upper-case letter. 
  -  For lower-case names, such as `$customer.address`, the sequence is 
    1. `getaddress()`
    2. `getAddress()`
    3. `get("address")`
    4. `isAddress()`
  - For upper-case property names like `$customer.Address`, it is slightly different:
    1. `getAddress()`
    2. `getaddress()`
    3. `get("Address")`
    4. `isAddress()`

#### Rendering

The final value resulting from each and every reference *is converted to a String object* when it is rendered into the final output.

- If there is an object that represents `$foo` (such as an integer object), then Velocity will call its `.toString()` method to resolve the object into a String.

#### Index Notation

???



## Formal Reference Notation

Formal notation for references, which is demonstrated below:

```velocity
${mudSlinger}
${customer.Address}
${purchase.getTotal()}
```

> In almost all cases you will use the shorthand notation for references, but in some cases the formal notation is required for correct processing.  For example:
>
> ```velocity
> ## this will equal to $vice+'maniac'
> Jack is a ${vice}maniac.
> 
> ## if you use shorthand notation on this, Velocity assumes that the reference is $vicemaniac, if it can't find value for $vicemaniac, it will return literally $vicmaniac.
> Jack is a $vicemaniac.
> ```

Formal notation is often useful when references are directly adjacent to text in a template.



## Quiet Reference Notation

When Velocity encounters an undefined reference, its normal behavior is to output the image of the reference.

- For example, suppose the following reference appears as part of a VTL template. 

  ```velocity
  <input type="text" name="email" value="$email"/>
  ```

- When the form initially loads, the variable reference `$email` has no value, but you prefer a blank text field to one with a value of `"$email"`. Using the quiet reference notation circumvents Velocity's normal behavior; instead of using `$email` in the VTL you would use `$!email`. So the above example would look like the following: 

  ```velocity
  <input type="text" name="email" value="$!email"/>
  ```

  Now when the form is initially loaded and *$email* still has no value, an empty string will be output instead of "$email". 

- Formal and quiet reference notation can be used together, as demonstrated below. 

  ```velocity
  <input type="text" name="email" value="$!{email}"/>
  ```



## Strict Reference Mode

Activated by setting the velocity configuration property 'runtime.references.strict' to `true`.

**Intent**: make Velocity behave more strictly in cases that are undefined or ambiguous, similar to a programming language, which may be more appropriate for some uses of Velocity. In such undefined or ambiguous cases Velocity will throw an exception. 



- With this setting references are required to be either placed explicitly into the context or defined with a #set directive or Velocity will throw an exception. 
-  References that are in the context with a value of null will not produce an exception. 
- if an attempt is made to call a method or a property on an object within a reference that does not define the specified method or property then Velocity will throw an exception. This is also true if there is an attempt to call a method or property on a null value. 

Example:

```velocity
## In the following examples $bar is defined but $foo is not, and all these statements will throw an exception:
$foo		## Exception
#set($bar = $foo)	##Exception
#if($foo == $bar)#end	##Exception
#foreach($item in $foo)#end	##Exception

## The following statements show examples in which Velocity will throw an exception when attempting to call methods or properties that do not exist. In these examples $bar contains an object that defines a property 'foo' which returns a string, and 'retnull' which returns null.
$bar.bogus		## $bar does not provide property bogus, Exception
$bar.foo.bogus	## $bar.foo does not provide property bogus, Exception
$bar.retnull.bogus	## cannot call a property on null, Exception</pre>
```



- In general strict reference behavior is true for all situations in which references are used except for a special case within the `#if` directive. 
  - *If a reference is used within a `#if` or `#elseif` directive without any methods or properties, and if it is not being compared to another value,then undefined references are allowed.*
  - This behavior provides an easy way to test if a reference is defined before using it in a template.
  - For example:

  ```velocity
  #if ($foo) #end		## False
  #if ( ! $foo) #end	## True
  #if ($foo && $foo.bar)#end      ## False and $foo.bar will not be evaluated
  #if ($foo && $foo == "bar")#end ## False and $foo == "bar" wil not be evaluated
  #if ($foo1 || $foo2)#end        ## False $foo1 and $foo2 are not defined
  ```



- Strict mode requires that comparisons of `>`, `<`, `>=` or `<=` within an `#if` directive makes sense. 
- *Also, the argument to `#foreach` must be iterable (this behavior can be modified with the property `directive.foreach.skip.invalid`).* 
- *Finally, undefined macro references will also throw an exception in strict mode. ???*



- References that Velocity attempts to render but evaluate to null will cause an Exception. To simply render nothing in this case the reference can be preceded by `$!` instead of `$`, similar to non strict mode. Keep in mind this is different from the reference not existing in the context which will always throw an exception when attempting to render it in strict mode. For example, below `$foo` has a value of null in the context 

  ```velocity
  this is $foo	## throws an exception because $foo is null
  this is $!foo	## renders to "this is " without an exception
  this is $!bogus	## bogus is not in the context so throws an exception
  ```

  

