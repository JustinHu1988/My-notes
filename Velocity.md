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



