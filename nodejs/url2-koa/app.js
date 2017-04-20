

// 导入koa，和koa 1.x 不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示：
const Koa = require('koa');


// 创建一个Koa对象表示web app本身：
const app = new Koa();

// 事先引入并绑定koa-bodyparser，用于解析request的body内容。如果有POST请求，必须事先引入这部分。
const bodyParser = require(`koa-bodyparser`);
app.use(bodyParser());

const controller = require('./controllers');

// log request URL 有请求才会执行
app.use(controller());


app.listen(3000);
console.log(`app started at port 3000...`);