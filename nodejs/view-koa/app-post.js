// 导入koa，和koa 1.x 不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示：
const Koa = require('koa');

// 注意require(`koa-router`)返回的是函数
const router = require(`koa-router`)();

const bodyParser = require(`koa-bodyparser`);


// 创建一个Koa对象表示web app本身：
const app = new Koa();



// log request URL 有请求才会执行
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// add url-route
// 我们使用router.get('/path', async fn)来注册一个GET请求。可以在请求路径中使用带变量的/hello/:name，变量可以通过ctx.params.name访问。
router.get(`/`, async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
});
// 疑问，submit按钮是如何发送post请求的，所带body内容的格式又是什么？

router.post(`/signin`, async (ctx, next)=>{
    var name = ctx.request.body.name || ``,
        password = ctx.request.body.password || ``;
    
    console.log(`signin with name: ${name}, password: ${password}`);
    if(name===`koa` && password===`12345`){
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else{
        ctx.response.body = `<h1>Login failed!</h1>
            <p><a href="/">Try again</a></p>`;
    }

});

// koa-bodyparser必须在router之前被注册到app对象上
app.use(bodyParser());

// add router middleware
app.use(router.routes());

app.listen(3000);
console.log(`app started at port 3000...`);