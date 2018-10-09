## What is PHP?

**PHP** : (recursive acronym for *PHP: Hypertext Preprocessor*)

- a widely-used open source general-purpose scripting language that is especially suited for web development and can be embedded into HTML.

- For example:

  ```php+HTML
  <!DOCTYPE html>
  <html>
      <head>
          <title>Example</title>
      </head>
      <body>
          <?php
          	echo "Hi, I'm a PHP script!"
          ?>
      </body>
  </html>
  ```

  

Instead of lots of commands to output HTML (as seen in C or Perl), PHP pages contain HTML with embedded code that does "something" (in this case, output "Hi, I'm a PHP script!"). The PHP code is enclosed in special [start and end processing instructions `<?php` and `?>` ](http://php.net/manual/en/language.basic-syntax.phpmode.php) that allow you to jump into and out of "PHP mode." 

*What distinguishes PHP from something like client-side JavaScript is that the code is executed on the server, generating HTML which is then sent to the client*. *The client would receive the results of running that script, but would not know what the underlying code was*. You can even configure your web server to process all your HTML files with PHP, and then there's really no way that users can tell what you have up your sleeve. 



## What can PHP do?

Three main areas where PHP scripts are used:

- *Server-side scripting.*
  - This is the most traditional and main target field for PHP. 
  - You need three things to make this work:
    1. the PHP parser (CGI or server module)
    2. a web server
    3. a web browser.
  - You need to run the web server, with a connected PHP installation. You can access the PHP program output with a web browser, viewing the PHP page through the server. 
  - All these can run on your home machine if you are just experimenting with PHP programming. See the [installation instructions](http://php.net/manual/en/install.php) section for more information. 
- *Command line scripting.*
  - You can make a PHP script to run it without any server or browser. 
  - You only need the PHP parser to use it this way. 
  - This type of usage is ideal for scripts regularly executed using cron (on *nix or Linux) or Task Scheduler (on Windows).  
  - These scripts can also be used for simple text processing tasks. See the section about [Command line usage of PHP](http://php.net/manual/en/features.commandline.php) for more information. 
- *Writing desktop applications.*
  - PHP is probably not the very best language to create a desktop application with a graphical user interface, but if you know PHP very well, and would like to use some advanced PHP features in your client-side applications you can also use *PHP-GTK* to write such programs. 
  -  You also have the ability to write cross-platform applications this way. PHP-GTK is an extension to PHP, not available in the main distribution. If you are interested in PHP-GTK, visit [» its own website](http://gtk.php.net/). 



With PHP, you have the freedom of choosing an operating system and a web server. Furthermore, you also have the choice of using procedural programming or object oriented programming (OOP), or a mixture of them both. 

With PHP you are not limited to output HTML. PHP's abilities includes outputting images, PDF files and even Flash movies (using libswf and Ming) generated on the fly. You can also output easily any text, such as XHTML and any other XML file. PHP can autogenerate these files, and save them in the file system, instead of printing it out, forming a server-side cache for your dynamic content. 

One of the strongest and most significant features in PHP is its support for a [wide range of databases](http://php.net/manual/en/refs.database.php). Writing a database-enabled web page is incredibly simple using one of the database specific extensions (e.g., for [mysql](http://php.net/manual/en/book.mysqli.php)), or using an abstraction layer like [PDO](http://php.net/manual/en/book.pdo.php), or connect to any database supporting the Open Database Connection standard via the [ODBC](http://php.net/manual/en/book.uodbc.php) extension. Other databases may utilize [cURL](http://php.net/manual/en/book.curl.php) or [sockets](http://php.net/manual/en/book.sockets.php), like CouchDB. 

PHP also has support for talking to other services using protocols such as LDAP, IMAP, SNMP, NNTP, POP3, HTTP, COM (on Windows) and countless others. You can also open raw network sockets and interact using any other protocol. PHP has support for the WDDX complex data exchange between virtually all Web programming languages. Talking about interconnection, PHP has support for instantiation of Java objects and using them transparently as PHP objects. 

PHP has useful [text processing](http://php.net/manual/en/refs.basic.text.php) features, which includes the Perl compatible regular expressions ([PCRE](http://php.net/manual/en/book.pcre.php)), and many extensions and tools to [parse and access XML documents](http://php.net/manual/en/refs.xml.php). PHP standardizes all of the XML extensions on the solid base of [libxml2](http://php.net/manual/en/book.libxml.php), and extends the feature set adding [SimpleXML](http://php.net/manual/en/book.simplexml.php), [XMLReader ](http://php.net/manual/en/book.xmlreader.php)and [XMLWriter ](http://php.net/manual/en/book.xmlwriter.php)support.

And many other interesting extensions exist, which are categorized both [alphabetically](http://php.net/manual/en/extensions.php) and by [category](http://php.net/manual/en/funcref.php). And there are additional PECL extensions that may or may not be documented within the PHP manual itself, like [» XDebug](http://xdebug.org/).

As you can see this page is not enough to list all the features and benefits PHP can offer. Read on in the sections about [installing PHP](http://php.net/manual/en/install.php), and see the [function reference](http://php.net/manual/en/funcref.php) part for explanation of the extensions mentioned here.

## A simple tutorial

#### 搭建LNMP环境

???



#### First PHP-enabled page

Create a file named hello.php and put it in your web server's root directory (DOCUMENT_ROOT) with the following content: 

```php+HTML
<html>
 <head>
  <title>PHP Test</title>
 </head>
 <body>
 <?php echo '<p>Hello World</p>'; ?> 
 </body>
</html>
```

If everything is configured correctly in your server, When you ask this file from the server, this file will be parsed by PHP and the following output will be sent to your browser: 

```html
<html>
 <head>
  <title>PHP Test</title>
 </head>
 <body>
 <p>Hello World</p>
 </body>
</html>
```

> 处理过程：
>
>  *==>* 用户通过browser访问或请求特定uri 
>
>  *==>* server接收到该uri后，找到指定文件
>
>  *==>* 如果该文件格式为php，server将其转给PHP parser进行处理，PHP parser处理后将结果返还给server
>
>  *==>* server将PHP parser处理生成的内容发给browser



>  A linefeed that follows immediately after a closing *`?>`*will be removed by PHP.  



#### Get system information from PHP

**`phpinfo()`** function will show you a lot of useful information about your system and setup such as available [predefined variables](http://php.net/manual/en/language.variables.predefined.php), loaded PHP modules, and [configuration](http://php.net/manual/en/configuration.php) settings. 

```php+HTML
<?php phpinfo(); ?>
```



#### Something useful

- *Check what sort of browser the visitor is using*:

  - For this, we check the user agent string the browser sends as part of the HTTP request.

  - This information is stored in a [variable](http://php.net/manual/en/language.variables.php) . Variables always start with a dollar-sign in PHP. The variable we are interested in right now is `$_SERVER['HTTP_USER_AGENT']`.

    > Note: **`$_SERVER`** is a special reserved PHP variable that contains all web server information. It is known as a superglobal.

    > **Superglobal**: built-in variables that are always available in all scopes.
    >
    > These superglobal variables are:  `$GLOBALS`, `$_SERVER`, `$_GET`, `$_POST`, `$_FILES`, `$_COOKIE`, `$_SESSION`, `$_REQUEST`, `$ENV` 

  - To display this variable, you can simply do:

    ```php
    echo $_SERVER['HTTP_USER_AGENT'];
    # Sample Output:
    # Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36
    ```

    

http://php.net/manual/en/tutorial.useful.php



???