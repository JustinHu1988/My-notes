Node.js 是js的一个执行环境。

> （与浏览器的console运行环境类似，但全局变量不同。例如，浏览器里有window、document等全局对象；*Node.js 这个执行环境有着自己的全局变量， 例如：`global`, `process`*



#### Commonjs 规范：

???



#### 模块的分类（modules）

- 核心模块
- 文件模块
- 第三方模块

Nodejs里，可以通过文件路径来引用模块，也可以通过模块名来引用。

- 如果用名称引用非核心模块，node会把模块名映射到对应的模块文件路径。
- 包含node核心函数的核心模块，会在node启动时，预先加载。
- 非核心模块包括：通过npm安装的第三方模块，以及自行创建的本地模块。



#### 创建和使用模块

模块的流程：

- 创建模块
- 导出模块
- 加载模块
- 使用模块

首先记住：

- `exports`可以将一个js文件中编写的对象暴露给外界其他文件调用。
- `require`用于引入另一个文件所暴露的对象。
- 各文件之间，命名空间互不干扰。

Example:

1. 先创建一个文件，命名为`student.js`.

   ```javascript
   function add(student){
       console.log('Add Student:' + student);
   }
   // 将add函数添加为对象方法（这个对象将暴露给其他文件进行调用）
   exports.add = add
   ```

2. 同理，再创建一个名为`teacher.js`的文件：

   ```javascript
   function add(teacher){
       console.log('Add Student:' + teacher);
   }
   // 将add函数添加为对象方法（这个对象将暴露给其他文件进行调用）
   exports.add = add
   ```

3. 创建一个名为`klass.js`的文件，（会调用整合上述两个文件exports对象的方法）：

   ```Javascript
   // 用常量student、teacher分别存储student.js和teacher.js文件导出的对象
   const student = require('./student');
   const teacher = require('./teacher');

   function add(teacherName, students){
     teacher.add(teacherName);
     
     students.forEach(function(item, index){
       student.add(item);
     })
   }

   exports.add = add
   ```

4. 再创建一个`index.js`，作为入口文件：

   ```Javascript
   const klass = require('./klass')

   klass.add('Scott', ['白富美', '高富帅'])
   ```

5. 接下来，在命令行里切换到当前目录，并输入`node index`执行index.js：

   ```shell
   node index

   # index的执行结果如下:
   Add Teacher:Scott
   Add Student:白富美
   Add Student:高富帅
   ```





#### 解析URL地址：url module

```shell
# 进入node环境
node
# 输入url，将会显示url对象的内容
> url
{ Url: [Function: Url],
  parse: [Function: urlParse],
  resolve: [Function: urlResolve],
  resolveObject: [Function: urlResolveObject],
  format: [Function: urlFormat],
  URL: [Function: URL],
  URLSearchParams: [Function: URLSearchParams],
  domainToASCII: [Function: domainToASCII],
  domainToUnicode: [Function: domainToUnicode] }

#url.resolve 拼合地址，注意斜线
url.resolve('http://imooc.com/', '/course/list')
'http://imooc.com/course/list'
```



###### url.parse()

**`url.parse(urlString[, parseQueryString[, slashesDenoteHost]])`**

```shell
# 进入node环境
node

#url.parse可以将url地址解析成对象，  
> url.parse('https://nodejs.org:8080/api/url.html?from=scott&course=node#url_urlobject_path')
Url {
  protocol: 'https:',
  slashes: true, #是否有双斜线
  auth: null,
  host: 'nodejs.org:8080',
  port: '8080',
  hostname: 'nodejs.org',
  hash: '#url_urlobject_path', #锚点
  search: '?from=scott&course=node', #查询字符串
  query: 'from=scott&course=node',
  pathname: '/api/url.html',
  path: '/api/url.html?from=scott&course=node',
  href: 'https://nodejs.org:8080/api/url.html?from=scott&course=node#url_urlobject_path' }
  
# 如果第二个参数传入true， 解析出来的query属性将会成为一个对象
> url.parse('https://nodejs.org:8080/api/url.html?from=scott&course=node#url_urlobject_path', true)
Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'nodejs.org:8080',
  port: '8080',
  hostname: 'nodejs.org',
  hash: '#url_urlobject_path',
  search: '?from=scott&course=node',
  query: { from: 'scott', course: 'node' }, # 变成一个对象，存储键值对
  pathname: '/api/url.html',
  path: '/api/url.html?from=scott&course=node',
  href: 'https://nodejs.org:8080/api/url.html?from=scott&course=node#url_urlobject_path' }
  
# 如果第三个参数传入true， 会对没有协议信息的url地址进行正确解析，对比下方：
> url.parse('//imooc.com/course/list', true)
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '',
  query: {},
  pathname: '//imooc.com/course/list',
  path: '//imooc.com/course/list',
  href: '//imooc.com/course/list' }
> url.parse('//imooc.com/course/list', true, true)
Url {
  protocol: null,
  slashes: true, #
  auth: null,
  host: 'imooc.com', #
  port: null,
  hostname: 'imooc.com', #
  hash: null,
  search: '',
  query: {},
  pathname: '/course/list', #
  path: '/course/list', #
  href: '//imooc.com/course/list' }
```



###### url.format()

**`url.format(urlObject)`**

```shell
# 进入node环境
node

#url.format可以将对象合成url地址
> url.format({
...   protocol: 'https:',
...   slashes: true,
...   auth: null,
...   host: 'nodejs.org:8080',
...   port: '8080',
...   hostname: 'nodejs.org',
...   hash: '#url_urlobject_path',
...   search: '?from=scott&course=node',
...   query: 'from=scott&course=node',
...   pathname: '/api/url.html',
...   path: '/api/url.html?from=scott&course=node',
...   href: 'https://nodejs.org:8080/api/url.html?from=scott&course=node#url_urlobject_path' })
'https://nodejs.org:8080/api/url.html?from=scott&course=node#url_urlobject_path'
```



###### url.resolve(from, to)

```shell
# 进入node环境
node

#url.resolve 拼合地址，注意斜线
> url.resolve('http://imooc.com/', '/course/list')
'http://imooc.com/course/list'
```

比如我在一个js文件中使用url.resolve:

```javascript
const url = require('url');
url.resolve('/one/two/three', 'four');         // '/one/two/four'
url.resolve('http://example.com/', '/one');    // 'http://example.com/one'
url.resolve('http://example.com/one', '/two'); // 'http://example.com/two'
```



#### querystring

###### querystring.stringify()

**`querystring.stringify(obj[, sep[, eq[, options]]])`**

- 将查询对象转换为url中需要的字符串：The `querystring.stringify()` method produces a URL query string from a given `obj` by iterating through the object's "own properties".

  ```shell
  node
  > querystring.stringify({name:'scott', course:['jade', 'node'], from:''})
  'name=scott&course=jade&course=node&from='
  ```


- 参数解析：
  - `obj`<Object> The object to serialize into a URL query string
  - `sep` <string> The substring used to delimit key and value pairs in the query string. **Default:** `'&'`.
  - `eq` <string> The substring used to delimit keys and values in the query string. **Default:** `'='`.
  - options
    - `encodeURIComponent` <Function> The function to use when converting URL-unsafe characters to percent-encoding in the query string. **Default:** `querystring.escape()`.



###### querystring.parse()

**`querystring.parse(str[, sep[, eq[, options]]])`**

- 将url格式的查询字符串转换为对象：The `querystring.parse()` method parses a URL query string (`str`) into a collection of key and value pairs.

  ```shell
  node
  > querystring.parse('name=scott&course=jade&course=node&from=');
  { name: 'scott', course: [ 'jade', 'node' ], from: '' }
  ```

- 参数解析：

  - `str` <string>The URL query string to parse
  - `sep`<string> The substring used to delimit key and value pairs in the query string. **Default:** `'&'`.
  - `eq`<string>. The substring used to delimit keys and values in the query string. **Default:** `'='`.
  - options  <Object>
    - `decodeURIComponent`  The function to use when decoding percent-encoded characters in the query string. **Default:** `querystring.unescape()`.
    - `maxKeys`  Specifies the maximum number of keys to parse. Specify `0` to remove key counting limitations. **Default:** `1000`.



###### querystring.escape()

**`querystring.escape(str)`**

```shell
node
> querystring.escape('<哈哈>')
'%3C%E5%93%88%E5%93%88%3E'
```



###### querystring.unescape()

**`querystring.unescape(str)`**

```shell
node
> querystring.unescape('%3C%E5%93%88%E5%93%88%3E')
'<哈哈>'
```



####  HTTP

###### *打开网页时的机制*

- 域名解析（查找IP地址）

  1. chrome搜索自身的DNS缓存 （缓存时间短，查看方法-输入网址：chrome://net-internals/#dns）

  2. 若浏览器找不到缓存或者缓存已经失效，搜索操作系统自身的DNS缓存 

  3. 若操作系统DNS缓存中也找不到，读取本地的HOST文件

  4. 若HOST文件里也没有，浏览器发起一个DNS的一个系统调用：

     1. 宽带运营商服务器查看本身缓存

     2. 若找不到，运营商服务器会发起一个迭代DNS解析的请求（请求顺序：根域DNS服务器-二级域名DNS服务器-…直到请求到ip地址）

        地址请求成功后，运营商服务器把结果缓存起来，并发送给本地操作系统内核

        操作系统内核把结果返回浏览器

- 浏览器获得域名对应的IP地址后，向服务器发起TCP三次握手；

- TCP/IP连接建立成功后，浏览器就可以向服务器发送HTTP请求了。

- 服务器端接收到相应的HTTP请求，根据路径参数，经过后端的一些处理之后，把处理后的结果数据返回给浏览器例如一个html页面。

- 浏览器得到服务器返回的内容，例如一个html页面后，在解析和渲染这个页面的过程中，需要向服务器请求相应的css、js、图片资源等，这些也都是http请求。

- 当所有资源都渲染完毕，完整的页面也就呈现出来了。



###### 请求方法：

- `get`
- `post`
- `put`
- `delete`
- `head`
- `trace`
- `options`
- ...



###### 状态码

- 1xx
- 2xx
  - `200` 请求成功
- 3xx
- 4xx
  - `400` 请求有语法错误，无法理解
  - `401` 请求没有授权 
  - `403` 服务端拒绝服务
  - `404` 找不到资源
- 5xx
  - `500` 服务端出了不可预测的错误
  - `503` 服务端当前无法处理这个请求 



#### HTTP module

First, let's look at an example:

```javascript
var http = require('http')

http
	.createServer(function(req, res){
		res.writeHead(200, {'Content-Type': 'text/plain'})
		res.write('Hello Nodejs')
		res.end()
	})
	.listen(2015)
```

- `http.createServer([requestListener])`
  - `requestListener`<Function>
    - The `requestListener` is a function which is automatically added to the [`'request'`](https://nodejs.org/dist/latest-v8.x/docs/api/http.html#http_event_request) event.
  - Returns: <http.Server>
    - *Returns a new instance of [`http.Server`](https://nodejs.org/dist/latest-v8.x/docs/api/http.html#http_class_http_server).*





????



## Global Objects



## Modules

In the Node.js module system, *each file is treated as a separate module*.

Variables local to the module will be private, because the module is wrapped in a function by Node.js (see [module wrapper](https://nodejs.org/dist/latest-v8.x/docs/api/modules.html#modules_the_module_wrapper)). 

#### Accessing the main module[#]

When a file is run directly from Node.js, `require.main` is set to its `module`. That means that it is possible to determine whether a file has been run directly by testing `require.main === module`.

For a file `foo.js`, this will be `true` if run via `node foo.js`, but `false` if run by `require('./foo')`.

Because `module` provides a `filename` property (normally equivalent to `__filename`), the entry point of the current application can be obtained by checking `require.main.filename`.



...???



#### The module wrapper

Before a module's code is executed, Node.js will wrap it with a function wrapper that looks like the following:

```js
(function(exports, require, module, __filename, __dirname){
    //Module code actually lives in here
})
```

*By doing this, Node.js achieves a few things:* 

- It keeps top-level variables (defined with `var`, `const` or `let`) scoped to the module rather than the global object. 
- It helps to provide some global-looking variables that are actually specific to the module, such as: 
  - The `module` and `exports` objects that the implementor can use to export values from the module. 
  - The convenience variables `__filename` and `__dirname`, containing the module's absolute filename and directory path.

#### The module scope

- **`__dirname`** : The directory name of the current module.

  - the same as the `path.dirname(__filename)`.

- **`__filename`** : The file name of the current module.

  ```js
  console.log(__filename);
  // Prints: /Users/mjr/example.js
  console.log(__dirname);
  // Print: /Users/mjr
  ```

- `module.exports`

- `module`

- `require()`

- `require.cache`



## path

The `path` module provides utilities for working with file and directory paths. It can be accessed using:

```js
const path = require('path')
```







## HTTP

To use the HTTP server and client one must `require('http')`. 

In order to support the full spectrum of possible HTTP applications, Node.js's HTTP API is very low-level.

- It deals with stream handling and message parsing only. 
-  It parses a message into headers and body but it does not parse the actual headers or the body. 



```js
// Include http module
let http = require('http')

// Create the server. 
// Function passed as parameter is called on every request made.
// request variable holds all request parameters
// response variable allows you to do anything with response sent to the client.
http.createServer(function(request, response){
    // Attach listener on end event.
    // This event is called when client sent all data and is waiting for response.
    request.on('end', function(){
        // Write headers to the response.
        // 200 is HTTP status code (this one means success)
        // Second parameter holds header fields in object
        // We are sending plain text, so Content-Type should be text/plain
        responce.writeHead(200, {
            'Content-Type': 'text/plain'
        })
        // Send data and end response
        response.end('Hello HTTP!')
    })
// Listen on the 8080 port
}).listen(8080)
```

You can send more data to the client by using the `response.write()` method, but you have to call it before calling `response.end()`



#### Handling URL Parameters

We have to do everything ourselves in Node, including parsing request arguments.

```js
// Include http module
let http = require('http')

// And url module, which is very helpful in parsing request parameters.
let url = require('url')

// Create the server
http.createServer(function(req, res){
    // Attach listener on end event
    request.on('end', function(){
        // Parse the request for arguments and store them in _get variable
        // This function parses the url from request and returns object representation
        let _get = url.parse(req.url, true).query
        // Write headers to the response
        response.writeHead(200, {
            'Content-Type': 'text/plain'
        })
        // Send data and end response
        response.end('Here is your data: ' + _get['data'])
    })
// Listen on the 8080 port
}).listen(8080)
```

This code uses the `parse()` method of the `url` module, to convert the request's URL to an object.

- The returned object has a `query` property, which retrieves the URL's parameters.

Save this file as `get.js` and execute it with the following command:

```js
node get.js
```

Then, navigate to `http://localhost:8080/?data=put_some_text_here` in your browser. Naturally, changing the value of the `data` parameter will not break the script.



#### Reading and Writing Files

To manage files in Node, we use the *fs* module.

- We read and write files using the `fs.readFile()` and `fs.writeFile()` methods, respectively.

```js
// Include http module
let http = require('http')
// and fs module
let fs = require('fs')

// Create the http server
http.createServer(function(req, res){
    // Attach listener on end event
    req.on('end', function(){
        // Read the file
        fs.readFile("text.txt", "utf-8", function(error, data){
            // write headers
            res.writeHead(200,{
                'Content-Type': 'text/plain'
            })
            // Increment the number obtained from file
            data = parseInt(data)+1
            // Write incremented number to file
            fs.writeFile('test.txt', data)
            // End response with some nice message
            res.end("This page was refreshed " + data + ' times!')
        })
    })
// Listen on the 8080 port
}).listen(8080)
```

Save this as *files.js*. Before you run this script, create a file named *test.txt* in the same directory as *files.js*.

This code demonstrates the `fs.readFile()` and `fs.writeFile()` methods. Every time the server receives a request, the script reads a number from the file, increments the number, and writes the new number to the file. The `fs.readFile()` method accepts three arguments: the name of file to read, the expected encoding, and the callback function.

Writing to the file, at least in this case, s much more simple.

- We don't need to wait for any results, although you would check for errors in a real application.
-  The `fs.writeFile()` method accepts the file name and data as arguments. It also accepts third and fourth arguments (both are optional) to specify the encoding and callback function, respectively. 

Now, let's run this script with the following command:

```
node files.js
```

Open it in browser (`http://localhost:8080`) and refresh it a few times. Now, you may think that there is an error in the code because it seems to increment by two. This isn't an error. Every time you request this URL, *two requests are sent to the server.* The first request is automatically made by the browser, which requests *favicon.ico*, and of course, the second request is for the URL (`http://localhost:8080`).

- Even though this behavior is technically not an error, it is behavior that we do not want. We can fix this easily by checking the request URL.:

  ```js
  // Include http module
  let http = require('http')
  // and fs module
  let fs = require('fs')
  
  // Create the http server
  http.createServer(function(req, res){
      // Attach listener on end event
      req.on('end', function(){
          // Check if user requests /
          if(req.url === '/'){
              // Read the file
              fs.readFile('test.txt', 'utf-8', function(error, data){
                  // Write headers
                  res.writeHead(200, {
                      'Content-Type': 'text/plain'
                  })
                  // Increment the number obtained from file
                  data = parseInt(data)+1
                  // Write incremented number to file
                  fs.writeFile('test.txt', data)
                  // End response with some nice message
                  response.end('This page was refreshed ' + data + ' times!')
              })
          }else{
              // Indicate that requested file was not found
              response.writeHead(404)
              // And end request without sending any data
              response.end()
          }
      })
  // Listen on the 8080 port
  }).listen(8080)
  ```



#### Accessing MySQL Databases

Most traditional server-side technologies have a built-in means o connecting to and querying a database.

With Node.js, you have to install a library. 

- For example, navigate to the directory where you've stored your scripts, and execute the following command:

  ```shell
  npm install mysql@2.0.0-alpha2
  ```

   This downloads and installs the module, and it also creates the `node_modules` folder in the current directory.

Now let's use it:

```js
// Include http module
let http = require('http')
// And mysql module you've just installed
let mysql = require('mysql')

// Create the connection  installation and should be changed according to your configuration. 
let connection = mysql.createConnection({
    user: 'root',
    password: '',
    database: 'db_name'
})

// Create the http server
http.createServer(function(req, res){
    // Attach listener on end event
    request.on('end', function(){
        // Query the database
        connection.query('SELECT * FROM your_table;', function(error, rows, fields){
            response.writeHead(200,{
                'Content-Type': 'x-application/json'
            })
            // Send data as JSON string
            // Rows variabble holds the result of the query
            response.end(JSON.stringify(rows))
        })
    })
// Listen on the 8080 port
}).listen(8080)
```

Querying the database with this library is easy; simply enter the query string and callback function.

- In a real application, you should check if there were errors (the `error` parameter will not be `undefined` if errors occurred) and send response codes dependent upon the success or failure of the query.
- Also note that we have set the `Content-type` to `x-application/json`, which is the valid MIME type for JSON.
- The `rows` parameter contains the result of the query, and we simply convert the data in `rows` to a JSON structure using the `JSON.stringify()` method. 

Save this file as *mysql.js*, and execute it (if you have MySQL installed, that is):

```
node mysql.js
```

Navigate to `http://localhost:8080` in your browser, and you should be prompted to download the JSON-formatted file.

#### Conclusion

Every function in Node.js is asynchronous.

Node.js requires extra work, but the payoff of a fast and robust application is worth it. If you don't want to do everything on the lowest level, you can always pick some framework, such as *Express*, to make it easier to develop applications.







## Util

Provide many useful APIs that nodejs can use.





