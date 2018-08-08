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

  

## Case Substitution

Velocity references take advantage of some Java principles that template designers will find easy to use. For example:

```velocity
$foo

$foo.getBar()
## is the same as
$foo.Bar

$data.setUser("jon")
## is the same as
#set( $data.User = "jon")

$data.getRequest().getServerName()
## is the same as
$data.Request.ServerName
## is the same as
${data.Request.ServerName}
```

... ???



## Directives

- Directives always begin with a `#`.

- Like references, the name of the directive may be bracketed by a `{` and a `}` symbol. This is useful with directives that are immediately followed by text.

  - For example, the following produces an error:

    ```velocity
    #if ($a==1)true enough#elseno way!#end
    ```

  - In such a case, use the brackets to separate `#else` from the rest of the line.

    ```velocity
    #if($a==1)true enough#{else}no way!#end
    ```

    

#### Set

The `#set` directive is used for setting the value of a reference.

- For example:

  ```velocity
  #set( $primate = "monkey")
  #set( $customer.Behavior = $primate )
  ```

- The left hand side (LHS) of the assignment must be a variable reference or a property reference. 

- The right hand side (RHS) can be one of the following types: 

  - Variable reference
  - String literal
  - Property reference
  - Method reference
  - Number literal
  - ArrayList
  - Map

- These examples demonstrate each of the aforementioned types:

  ```velocity
  #set( $monkey = $bill )  	## varible reference
  #set( $monkey.Firend = "monica" )  ## string literal
  #set( $monkey.Blame = $whitehouse.Leak )  ## property reference
  #set( $monkey.Plan = $spindoctor.weave($web) ) ## method reference
  #set( $monkey.Number = 123 )  ##number literal
  #set( $monkey.Say = ["Not", $my, "fault"] )  ##ArrayList
  #set( $monkey.Map = {"banana" : "good", "roast beef" : "bad"})  ## Map
  ```

  > NOTE: For the ArrayList example the elements defined with the [..] operator are accessible using the methods defined in the ArrayList class. So, for example, you could access the first element above using `$monkey.Say.get(0)`. 
  >
  > Similarly, for the Map example, the elements defined within the `{}` operator are accessible using the methods defined in the Map class. For example, you could access the first element above using $monkey.Map.get("banana") to return a String 'good', or even `$monkey.Map.banana` to return the same value.

- The RHS can also be a simple arithmetic expression:

  ```velocity
  #set( $value = $foo + 1)
  #set( $value = $bar - 1)
  #set( $value = $foo * $bar)
  #set( $value = $foo / $bar)
  ```

- *If the RHS is a property or method reference that evaluates to null, it will **not** be assigned to the LHS.*

  - Depending on how Velocity is configured, it is usually not possible to remove an existing reference from the context via this mechanism. 

    For example:

    ```velocity
    #set( $result = $query.criteria("name") )
    The result of the first query is $result
    
    #set( $result = $query.criteria("address"))
    The result of the second query is $result
    ```

    If `$query.criteria("name")` returns the string `"bill"`, and `$query.criteria("address")` returns `null`,  the above VTL will render as the following:

    ```velocity
    The result of the first query is bill
    The result of the second query is bill
    ```

  - This tends to confuse newcomers who construct `#foreach` loops that attempt to `#set` a reference via a property or method reference, then immediately test that reference with an `#if` directive. For example: 

    ```velocity
    #set( $criteria = ["name", "address"])
    #foreach( $criterion in $criteria)
    	#set( $result = $query.criteria($criterion))
    	#if($result)
    		Query was successful
    	#end
    #end
    ```

    In the above example, it would not be wise to rely on the evaluation of `$result` to determine if a query was successful. After `$result` has been `#set` (added to the context), it cannot be set back to `null` (removed from the context).

  - *One solution to this would be to pre-set `$result` to `false`. Then if the `$query.criteria()` call fails, you can check.*

    ```velocity
    #set( $criteria = ["name", "address"])
    #foreach( $criterion in $criteria)
    	#set($result = false)
    	#set($result = $query.criteria($criterion))
    	
    	#if($result)
    		Query was successful
        #end
    #end
    ```

- `#set` directive does not have an `#end` statement.

- **Literals**: 

  - When using the `#set` directive, *string literals that are enclosed in double quote characters will be parsed and rendered*,  as shown:

    ```velocity
    #set( $directoryRoot = "www")
    #set( $templateName = "index.vm")
    #set( $template = "$directoryRoot/$templateName")
    $template
    ```

    The output will be:

    ```html
    www/index.vm
    ```

  - However, when the string literal is enclosed in single quote characters, it will not be parsed:

    ```velocity
    #set( $foo = "bar")
    $foo
    #set($blargh = '$foo')
    $blargh
    ```

    This renders as:

    ```html
    bar
    $foo
    ```

  - *By default, this feature of using single quotes to render unparsed text is available in Velocity.* This default can be changed by editing `velocity.properties` such that `stringliterals.interpolate=false`. 

- Alternately, *the **`#[[don't parse me!]]#`** syntax allows the template designer to easily use large chunks of uninterpreted and unparsed content in VTL code.*

  -   This can be especially useful in place of [escaping](http://velocity.apache.org/engine/1.7/user-guide.html#EscapingVTLDirectives) multiple directives or escaping sections which have content that would otherwise be invalid (and thus unparseable) VTL.

    ```velocity
    #[[
    #foreach ($woogie in $boogie)
      nothing will happen to $woogie
    #end
    ]]#
    ```

    Render as:

    ```html
    #foreach ($woogie in $boogie)
      nothing will happen to $woogie
    #end
    ```



#### Conditionals

- **If / ElseIf / Else**

  -  **`#if`** : allows for text to be included when the web page is generated, on the conditional that the if statement is true. For example:

    ```velocity
    #if( $foo )
      <strong>Velocity!</strong>
    #end
    ```

    - *`true` for:  not `true` and not `null`* 

      > Remember that the Velocity context only contains Objects, so when we say 'boolean', it will be represented as a Boolean (the class). This is true even for methods that return `boolean` - the introspection infrastructure will return a `Boolean` of the same logical value. 

    - The content between the *`#if`* and the *`#end`* statements become the output if the evaluation is true. 

  - An **`#elseif`** or **`#else`** element can be used with an `#if` element. 

    >  Note that the Velocity Templating Engine will stop at the first expression that is found to be true. 

    - For example:

      ```velocity
      ## suppose $foo=15 and $bar=6
      #if($foo<10)
      	**Go North**
      #elseif($foo == 10)
      	**Go East**
      #elseif($bar == 6)
      	**Go South**
      #else
      	**Go West**
      #end
      ## output: Go South
      ```

  - Relational and Logical Operators

  - Velocity uses the equivalent operator to determine the relationships between variables. Here is a simple example to illustrate how the equivalent operator is used. 

    ```velocity
    #set ($foo = "deoxyribonucleic acid")
    #set ($bar = "ribonucleic acid")
    
    #if ($foo == $bar)
      In this case it's clear they aren't equivalent. So...
    #else
      They are not equivalent and this will be the output.
    #end
    ```

    > *Note that the semantics of `==` are slightly different than Java where `==` can only be used to test object equality.* 
    >
    > In Velocity the equivalent operator can be used to directly compare numbers, strings, or objects. When the objects are of different classes, the string representations are obtained by calling `toString()` for each object and then compared. 

- **Relational and logical Operators**

  - logical **`&&`**, **`||`** and **`!`** operators.

    ```velocity
    ## logical AND
    #if( $foo && $bar)
      ** This AND that **
    #end
    
    ## logical OR
    #if( $foo || $bar)
      **This OR that**
    #end
    
    ## logical NOT
    #if(!$foo)
      **NOT that**
    #end
    ```

  - There are text versions of all logical operators, including *eq*, *ne*, *and*, *or*, *not*, *gt*, *ge*, *lt*, and *le*. ???

  - One more useful note. When you wish to include text immediately following a *#else* directive you will need to use curly brackets immediately surrounding the directive to differentiate it from the following text. (Any directive can be delimited by curly brackets, although this is most useful for *#else*). 

    ```velocity
    #if($foo == $bar) it's true!#{else}it's not!#end
    ```

    

#### Loops

- **Foreach Loop**

  - The **`#foreach`** element allows for looping. For example:

    ```velocity
    <ul>
    #foreach($product in $allProducts)
    	<li>$product</li>
    #end
    </ul>
    ```

    - The contents of the `$allProducts` variable is a *Vector*, a *Hashtable* or an *Array*. 

    - The value assigned to the `$product` variable is a Java Object and can be referenced from a variable as such. For example, if `$product` was really a Product class in Java, its name could be retrieved by referencing the `$product.Name` method (ie: `$Product.getName()`).

      Lets say that `$allProducts` is a Hashtable. If you wanted to retrieve the key values for the Hashtable as well as the objects within the Hashtable, you can use code like this:

      ```velocity
      <ul>
      #foreach( $key in $allProducts.keySet() )
      	<li>Key: $key -> Value: $allProducts.get($key)</li>
      #end
      </ul>
      ```

    - *Velocity provides an easy way to get the loop counter*(**`$foreach.count`**) so that you can do something like the following: 

      ```velocity
      <table>
      #foreach( $customer in $customerList )
          <tr><td>$foreach.count</td><td>$customer.Name</td></tr>
      #end
      </table>
      ```

    - Velocity also now provides an easy way to tell if you are *on the last iteration of a loop* **`$foreach.hasNext`**: 

      ```velocity
      #foreach( $customer in $customerList )
          $customer.Name#if( $foreach.hasNext ),#end
      #end
      ```

    - *If you want a zero-based index of the `#foreach` loop, you can just use **`$foreach.index`** instead of `$foreach.count`.*

    - Likewise, **`$foreach.first`** and **`$foreach.last`** are provided to compliment `$foreach.hasNext`. If you want to access these properties for an outer `#foreach` loop, you can reference them directly through the **`$foreach.parent`** or **`$foreach.topmost`** properties (e.g. `$foreach.parent.index` or `$foreach.topmost.hasNext`). 

    - *It's possible to set a maximum allowed number of times that a loop may be executed*. 

      - By default there is no max (indicated by a value of 0 or less), but this can be set to an arbitrary number in the `velocity.properties` file. This is useful as a fail-safe. 

        ```
        # The maximum allowed number of loops.
        directive.foreach.maxloops = -1
        ```

    - If you want to stop looping in a foreach from within your template, you can now use the **`#break`** directive to stop looping at any time: 

      ```velocity
      ## list first 5 customers only
      #foreach( $customer in $cusromerList)
        #if($foreach.count > 5)
          #break
        #end
        $customer.Name
      #end
      ```

      

#### Include

The **`#include`** script element allows the template designer to *import a local file*, which is then inserted into the location where the `#include` directive is defined. 

- The contents of the file are *not rendered through the template engine*.  
- For security reasons, the file to be included may only be under *TEMPLATE_ROOT*. ??? 

```velocity
## The file to which the #include directive refers is enclosed in quotes
#include("one.txt")

## If more than one file will be included, they should be separated by commas.
#include("one.gif", "two.txt", "three.htm")
```

- The file being included need not be referenced by name; in fact, it is often preferable to use a variable instead of a filename. This could be useful for targeting output according to criteria determined when the page request is submitted. Here is an example showing both a filename and a variable. 

  ```velocity
  #include("greetings.txt", $seasonalstock)
  ```

  

#### Parse

The **`#parse`** script element allows the template designer to import a local file that contains VTL. Velocity will parse the VTL and render the template specified. 

```velocity
#parse("me.vm")
```

- Like the `include` directive, `#parse` can take a variable rather than a template. 
- Any templates to which `#parse` refers must be included under TEMPLATE_ROOT. 
- *Unlike the `#include` directive, `#parse` will only take a single argument.* 

VTL templates can have `#parse` statements referring to templates that in turn have `#parse` statements.  

- By default set to 10, the **`directive.parse.max.depth`** line of the `velocity.properties` allows users to customize maximum number of `#parse` referrals that can occur from a single template. 

- Note: If the `directive.parse.max.depth` property is absent from the `velocity.properties` file, Velocity will set this default to 10.

- Recursion is permitted, for example, if the template `dofoo.vm` contains the following lines: 

  ```velocity
  Count down.
  #set($count = 8)
  #parse("parsefoo.vm")
  All done with dofoo.vm!
  ```

  It would reference the template `parsefoo.vm`, which might contain the following VTL:

  ```velocity
  $count
  #set($count = $count - 1)
  #if($count > 0)
    #parse("parsefoo.vm")
  #else
    All done with parsefoo.vm
  #end
  ```

  After "Count down." is displayed, Velocity passes through `parsefoo.vm`, counting down from 8. When the count reaches 0, it will display the "All done with parsefoo.vm!" message. At this point, Velocity will return to `dofoo.vm` and output the "All done with dofoo.vm!" message. 

#### Break

The `#break` directive stops any further rendering of the current execution scope.  

 An "*execution scope*" is essentially any directive with content (i.e. `#foreach`, `#parse`, `#evaluate`, `#define`, `#macro`, or `#@somebodymacro`) or any "root" scope (i.e. `template.merge(...)`, `Velocity.evaluate(...)` or `velocityEngine.evaluate(...)`). Unlike `#stop`, `#break` will only stop the innermost, immediate scope, not all of them. 

If you wish to break out of a specific execution scope that is not necessarily the most immediate one, then you can pass the scope control reference (i.e. `$foreach`, `$template`, `$evaluate`, `$define`, `$macro`, or `$somebodymacro`) as an argument to #break. (e.g. `#break($macro)`). *This will stop rendering of all scopes up to the specified one.* 

- When within nested scopes of the same type, remember that you can always access the parent(s) via `$.parent` or `$.topmost` and pass those to #break instead (e.g. `#break($foreach.parent`) or `#break($macro.topmost)`). 

#### Stop

The **`#stop`** directive stops any further rendering and execution of the template. 

-  This is true even when the directive is nested within another template accessed through `#parse` or located in a velocity macro. 
-  The resulting merged output will contain all the content up to the point the #stop directive was encountered. *This is handy as an early exit from a template*. 
- For debugging purposes, you may provide a message argument (e.g. `#stop('$foo was not in context')` ) that will be written to the logs (DEBUG level, of course) upon completion of the stop command. 

#### Evaluate

The **`#evaluate`** directive can be used to dynamically evaluate VTL.

- *This allows the template to evaluate a string that is created at render time.*

- Such a string might be used to internationalize the template or to include parts of a template from a database. 

- The example below will display `abc`:

  ```velocity
  #set($source1 = "abc")
  #set($select = "1")
  #set($dynamicsource = "$source$select")
  ## $dynamicsource is now the string '$source1'
  #evaluate($dynamicsource)
  ```

  

#### Define

The **`#define`** directive lets one assign a block of VTL to a reference.

The example below will display `Hello World!`

```velocity
#define($block)Hello $who#end
#set($who = 'world!')
$block
```



#### Velocimacros

*The **`#macro`** script element allows template designers to define a repeated segment of a VTL template.*

- Velocimacro is created for the sole purpose of *saving keystrokes* and *minimizing typographic errors*.

For example:

```velocity
## define
#macro(d)
<tr><td></td></tr>
#end

## call
#d()
```

When this template is called, Velocity would replace #d() with a row containing a single, empty data cell.

*If we want to put something in that cell, we can alter the macro to allow for a body:*

```velocity
#macro(d)
<tr><td>$!bodyContent</td></tr>
#end

## call (a bit differently)
#@d() Hello!#end
```

Using **`#@`** before the name and providing a body and `#end` to the call, then Velocity will render the body when it gets to the **`$!bodyContent`**.

> You can still call the macro as you did before, and since we used the silent reference notation for the body reference (`$!bodyContent` instead of `$bodyContent`), it will still render a row with a single, empty data cell. 

###### Arguments

A Velocimacro can also take any number of arguments -- even zero arguments, as demonstrated in the first example, is an option -- but when the Velocimacro is invoked, it must be called with the same number of arguments with which it was defined. 

For example:

```velocity
#macro( tablerows $color $somelist )
#foreach( $something in $somelist )
	<tr><td bgcolor=$color>$something</td></tr>
#end
#end
```

The Velocimacro being defined in this example, `tablerows`, takes two arguments. The first argument takes the place of `$color`, and the second argument takes the place of `$somelist`. 

*Anything that can be put into a VTL template can go into the body of a Velocimacro.*  

```velocity
#set( $greatlakes = ["Superior", "Michigan", "Huron", "Erie", "Ontario"])
#set( $color = "blue" )
<table>
	#tablerows( $color $greatlakes )
```

When the `#tablerows` Velocimacro is called in this situation, the following output is generated:

```html
<table>
    <tr><td bgcolor="blue">Superior</td></tr>
    <tr><td bgcolor="blue">Michigan</td></tr>
    <tr><td bgcolor="blue">Huron</td></tr>
    <tr><td bgcolor="blue">Erie</td></tr>
    <tr><td bgcolor="blue">Ontario</td></tr>
</table>
```

> Velocimacros can be defined *inline* in a Velocity template, meaning that it is unavailable to other Velocity templates on the same web site. Defining a Velocimacro such that it can be shared by all templates has obvious advantages: it reduces the need to redefine the Velocimacro on numerous templates, saving work and reducing the chance of error, and ensures that a single change to a macro available to more than one template. 



*Velocimacros can take as arguments any of the following VTL elements*:

- Reference : anything that starts with `$`
- String literal: something like `"$foo"` or `"hello"`
- Number literal : `1`, `2` etc
- IntegerRange: `[1..2]` or `[$foo .. $bar]`
- ObjectArray: `["a", "b", "c"]`
- boolean value `true`
- boolean value `false`

When passing references as arguments to Velocimacros, please note that *references are passed 'by name'.* 

- This means that their value is *'generated' at each use* inside the Velocimacro.

  For example:

  ```velocity
  #macro( callme $a)
  	$a $a $a
  #end
  
  #callme( $foo.bar() )
  ```

  results in the method `bar()` of the reference `$foo` being called 3 times.

- If you need to circumvent this feature, you can always just get the value from the method as a new reference and pass that:

  ```velocity
  #set( $myval = $foo.bar() )
  #callme( $myval )
  ```

###### Velocimacro Properties:

Several lines in the `velocity.properties` file allow for flexible implementation of Velocimacros.

> Note that these are also documented in the [Developer Guide](http://velocity.apache.org/engine/1.7/developer-guide.html). 

- **`velocimacro.library`**:  A comma-separated list of all Velocimacro template libraries. 
  - By default, Velocity looks for a single library: `VM_global_library.vm`. The configured template path is used to find the Velocimacro libraries. 
- **`velocimacro.permissions.allow.inline`** : `true` or `false`, determines whether Velocimacros can be defined in regular templates.
  -  The default, `true`, allows template designers to define Velocimacros in the templates themselves. 
- `velocimacro.permissions.allow.inline.to.replace.global` :  With possible values of true or false, this property allows the user to specify if a Velocimacro defined inline in a template can replace a globally defined template, one that was loaded on startup via the `velocimacro.library` property. The default, `false`, prevents Velocimacros defined inline in a template from replacing those defined in the template libraries loaded at startup. 
- `velocimacro.permissions.allow.inline.local.scope` - This property, with possible values of true or false, defaulting to false, controls if Velocimacros defined inline are 'visible' only to the defining template.  
- `velocimacro.library.autoreload` - This property controls Velocimacro library autoloading. The default value is `false`. When set to `true` the source Velocimacro library for an invoked Velocimacro will be checked for changes, and reloaded if necessary. This allows you to change and test Velocimacro libraries without having to restart your application or servlet container, just like you can with regular templates. This mode only works when caching is *off*in the resource loaders (e.g. `file.resource.loader.cache = false` ). This feature is intended for development, not for production. 





## Getting Literal

VTL uses special characters, such as *$* and *#*, to do its work, so some added care should be taken where using these characters in your templates. This section deals with escaping these characters. 

#### Currency

a VTL identifier always begins with an upper- or lowercase letter, so `$2.50` would not be mistaken for a reference. 

#### Escaping Valid VTL References

*Escaping* special characters , you can use backslash(`\`). for example:

```velocity
## The following line defines $email in this template:
#set( $email = "foo" )
$email
\$email
```

will renders as:

```html
foo
$email
```

If, for some reason, you need a backslash before either line above, you can do the following: 

```velocity
## The following line defines $email in this template:
#set( $email = "foo" )
\\$email
\\\$email
```

will renders as

```html
\foo
\$email
```

*The bind-from-left rule causes `\\$email` to render as`\$email`.*  

*Compare these examples to those in which `$email` is not defined.*

```
$email
\$email
\\$email
\\\$email
```

renders as

```
$email
\$email
\\$email
\\\$email
```

Notice Velocity handles references that are defined differently from those that have not been defined. Here is a set directive that gives *$foo* the value *gibbous*.

```
#set( $foo = "gibbous" )
$moon = $foo
```

The output will be: *$moon = gibbous* -- where *$moon* is output as a literal because it is undefined and *gibbous* is output in place of *$foo*.

???

#### Escaping Invalid VTL References

Sometimes Velocity has trouble parsing your template when it encounters an "invalid reference" that you never intended to be a reference at all.

 *Escaping* special characters is, again, the best way to handle these situations, but in these situations, the backslash will likely fail you. Instead of simply trying to escape the problematic `$` or `#`, you should probably just replace this:

```
${my:invalid:non:reference}
```

with something like this

```velocity
#set( $D = '$' )
${D}{my:invalid:non:reference}
```

You can, of course, put your `$` or `#` string directly into the context from your java code (e.g. `context.put("D","$");`) to avoid the extra #set() directive in your template(s). Or, if you are using [VelocityTools](http://velocity.apache.org/tools/devel), you can just use the EscapeTool like this:

```velocity
${esc.d}{my:invalid:non:reference}
```

Escaping of both valid and invalid VTL directives is handled in much the same manner; this is described in more detail in the Directives section.

???

#### *Escaping VTL Directives*

VTL directives can be escaped with the backslash character ("\") in a manner similar to valid VTL references.

```velocity
## #include( "a.txt" ) renders as <contents of a.txt>
#include( "a.txt" )

## \#include( "a.txt" ) renders as #include( "a.txt" )
\#include( "a.txt" )

## \\#include ( "a.txt" ) renders as \<contents of a.txt>
\\#include ( "a.txt" )
```

Extra care should be taken when escaping VTL directives that contain multiple script elements in a single directive (such as in an if-else-end statements). Here is a typical VTL if-statement:

```velocity
#if( $jazz )
    Vyacheslav Ganelin
#end
```

If *$jazz* is true, the output is

```html
Vyacheslav Ganelin
```

If *$jazz* is false, there is no output. Escaping script elements alters the output. Consider the following case:

```velocity
\#if( $jazz )
    Vyacheslav Ganelin
\#end
```

This causes the directives to be escaped, but the rendering of *$jazz* proceeds as normal. So, if *$jazz* is true, the output is

```html
#if( true )
     Vyacheslav Ganelin
 #end
```

Suppose backslashes precede script elements that are legitimately escaped:

```velocity
\\#if( $jazz )
   Vyacheslav Ganelin
\\#end
```

In this case, if *$jazz* is true, the output is

```html
\ Vyacheslav Ganelin
\
```

To understand this, note that the `#if( arg )` when ended by a newline (return) will omit the newline from the output. Therefore, the body of the `#if()` block follows the first '\', rendered from the '\' preceding the `#if()`. The last \ is on a different line than the text because there is a newline after 'Ganelin', so the final \, preceding the `#end` is part of the body of the block.

If *$jazz* is false, the output is

```html
\
```

Note that things start to break if script elements are not properly escaped.

```velocity
\\\#if( $jazz )
    Vyacheslave Ganelin
\\#end
```

Here the *#if* is escaped, but there is an *#end* remaining; having too many endings will cause a parsing error.



## VTL: Formatting Issues

Although VTL in this user guide is often displayed with newlines and whitespaces, the VTL shown below

```velocity
#set( $imperial = ["Munetaka","Koreyasu","Hisakira","Morikune"] )
#foreach( $shogun in $imperial )
    $shogun
#end
```

is equally valid as the following snippet that Geir Magnusson Jr. posted to the Velocity user mailing list to illustrate a completely unrelated point:

```velocity
Send me #set($foo=["$10 and ","a pie"])#foreach($a in $foo)$a#end please.
```

Velocity's behaviour is to gobble up excess whitespace. The preceding directive can be written as:

```velocity
Send me
#set( $foo = ["$10 and ","a pie"] )
#foreach( $a in $foo )
$a
#end
please.
```

or as

```velocity
Send me
#set($foo       = ["$10 and ","a pie"])
                 #foreach           ($a in $foo )$a
         #end please.
```

In each case the output will be the same.



## Other Features and Miscellany

#### Math

Velocity has a handful of built-in mathematical functions that can be used in templates with the *set* directive. The following equations are examples of addition, subtraction, multiplication and division, respectively: 

```velocity
#set( $foo = $bar + 3 )
#set( $foo = $bar - 4 )
#set( $foo = $bar * 6 )
#set( $foo = $bar / 2 )
```

*When a division operation is performed between two integers, the result will be an integer, as the fractional portion is discarded.* Any remainder can be obtained by using the modulus (`%`) operator. 

```velocity
#set( $foo = $bar % 5 )
```

#### Range Operator

The range operator can be used in conjunction with `#set` and `#foreach` statements. Useful for its ability to produce an object array containing integers:

```velocity
[n..m]
```

- *Both `n` and `m` must either be or produce integers.*

- Whether *m* is greater than or less than *n* will not matter; in this case the range will simply count down. 

```velocity
First example:
#foreach( $foo in [1..5])
$foo
#end

Second example:
#foreach( $bar in [2..-2])
$bar
#end

Third example:
#set( $arr = [0..1])
#foreach( $i in $arr )
$i
#end

Fourth example:
[1..3]
```

Produces the following output:

```html
First example:
1 2 3 4 5

Second example:
2 1 0 -1 -2

Third example:
0 1

Fourth example:
[1..3]
```

*Note that the range operator only produces the array when used in conjunction with `#set` and `#foreach` directives, as demonstrated in the fourth example.* 



#### Advanced Issues: Escaping and `!`

When a reference is silenced with the `!` character and the `!` character preceded by an `\` escape character, the reference is handled in a special way. 

Note the differences between regular escaping, and the special case where `\` precedes `!` follows it:  

```velocity
#set( $foo = "bar" )
$\!foo
$\!{foo}
$\\!foo
$\\\!foo
```

This renders as:

```html
$!foo
$!{foo}
$\!foo
$\\!foo
```

Contrast this with regular escaping, where `\` precedes `$`: 

```velocity
\$foo
\$!foo
\$!{foo}
\\$!{foo}
```

This renders as:

```html
$foo
$!foo
$!{foo}
\bar
```



#### Velocimacro Miscellany

This section is a mini-FAQ on topics relating to Velocimacros.

- Can I use a directive or another VM as an argument to a VM? Example: `#center(#bold("hello"))`

  - No.  A directive isn't a valid argument to a directive, and for most practical purposes, a VM is a directive. 

  - However, there are things you can do.  One easy solution is to take advantage of the fact that 'doublequote' (`"`) renders its contents. So you could do something like :

    ```velocity
    #set($stuff = "#bold('hello')" )
    #center( $stuff )
    ```

    you can save a step:

    ```velocity
    #center("#bold('hello')")
    ```

  - Please note that in the latter example the arg is evaluated *inside* the VM, not at the calling level. In other words, the argument to the VM is passed in in its entirety and evaluated within the VM it was passed into. This allows you to do things like : 

    ```velocity
    #macro( inner $foo )
    	inner : $foo
    #end
    
    #macro( outer $foo )
    	#set($bar = "outerlala")
    	outer : $foo
    #end
    
    #set($bar = 'calltimelala')
    #outer("#inner($bar)")
    ```

    *the output is:*

    ```html
    outer : inner : outerlala
    ```

    *because the evaluation of the `"#inner($bar)"` happens inside `#outer()`, so the `$bar` value set inside `#outer()` is the one that's used.* 

  - This is an intentional and jealously guarded feature - args are passed 'by name' into VMs, so you can hand VMs things like stateful references such as

    ```velocity
    #macro( foo $color )
      <tr bgcolor=$color><td>Hi</td></tr>
      <tr bgcolor=$color><td>There</td></tr>
    #end
    
    #foo( $bar.rowColor() )
    ```

    And have rowColor() called repeatedly, rather than just once. To avoid that, invoke the method outside of the VM, and pass the value into the VM.

    ```velocity
    #set($color = $bar.rowColor())
    #foo( $color )
    ```

- Can I register Velocimacros via `#parse()`?

  - *Yes! This became possible in Velocity 1.6.*
  - If you are using an earlier version, your Velocimacros must be defined before they are first used in a template. This means that your `#macro()` declarations should come before using the Velocimacros. 
  - This is important to remember if you try to `#parse()` a template containing inline `#macro()` directives. Because the `#parse()` happens at runtime, and the parser decides if a VM-looking element in the template is a VM at parsetime, `#parse()`-ing a set of VM declarations won't work as expected. To get around this, simply use the `velocimacro.library` facility to have Velocity load your VMs at startup. ???

- What is Velocimacro Autoreloading?

  - There is a property, meant to be used in *development*, not production :

    ```
    `velocimacro.library.autoreload`
    ```

    which defaults to false. When set to true *along with*

    ```
    `<type>.resource.loader.cache = false`
    ```

    (where is the name of the resource loader that you are using, such as 'file') then the Velocity engine will automatically reload changes to your Velocimacro library files when you make them, so you do not have to dump the servlet engine (or application) or do other tricks to have your Velocimacros reloaded.

    Here is what a simple set of configuration properties would look like.

    ```
    file.resource.loader.path = templates
    file.resource.loader.cache = false
    velocimacro.library.autoreload = true
    ```

    Don't keep this on in production.

#### String Concatenation

A common question that developers ask is *How do I do String concatenation? Is there any analogue to the '+' operator in Java?*.

To do concatenation of references in VTL, you just have to 'put them together'. The context of where you want to put them together does matter, so we will illustrate with some examples.

- In the regular 'schmoo' of a template (when you are mixing it in with regular content): 

  ```velocity
  #set($size = "Big")
  #set($name = "Ben")
  
  The clock is $size$name.
  ```

  and the output will render as 'The clock is BigBen'.

- For more interesting cases, such as when you want to concatenate strings to pass to a method, or to set a new reference, just do

  ```velocity
  #set( $size = "Big" )
  #set( $name = "Ben" )
  
  #set($clock = "$size$name" )
  
  The clock is $clock.
  ```

- Which will result in the same output. As a final example, when you want to mix in 'static' string with your references, you may need to use 'formal references':

  ```velocity
  #set( $size = "Big" )
  #set( $name = "Ben" )
  #set($clock = "${size}Tall$name")
  
  The clock is $clock.
  ```

  Now the output is 'The clock is BigTallBen'. The formal notation is needed so the parser knows you mean to use the reference '$size' versus '$sizeTall' which it would if the '{}' weren't there. 















