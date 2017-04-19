// 导入koa，和koa 1.x 不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示：
const Koa = require('koa');

// 注意require(`koa-router`)返回的是函数
const router = require(`koa-router`)();
/**
 * 相当于：
 * const fn_router = require('koa-router');
 * const router = fn_router();
 */

// 创建一个Koa对象表示web app本身：
const app = new Koa();

// log request URL 有请求才会执行
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// add url-route
// 我们使用router.get('/path', async fn)来注册一个GET请求。可以在请求路径中使用带变量的/hello/:name，变量可以通过ctx.params.name访问。
router.get(`/hello/:name`, async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

router.get(`/`, async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>`;
});

// add router middleware
app.use(router.routes());

app.listen(3000);
console.log(`app started at port 3000...`);