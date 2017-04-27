var fn_index = async (ctx, next) => {
    ctx.render('index.html', {title: "Welcome"});
};//koa并没有在ctx对象上提供render方法，因此还需要自建函数


var fn_signin = async (ctx, next) => {
    var email = ctx.request.body.email || ``,
        password = ctx.request.body.password || ``;

    if(email === 'admin@example.com' && password === '123456'){
        ctx.render(`signin-ok.html`, {
            title: `Sign In Successed`,
            name: `Mr ${email}`
        });
    }else{
        ctx.render(`signin-failed.html`, {
            title: `Sign In Failed`
        });
    }
}

module.exports = {
    'GET /':fn_index,
    'POST /signin':fn_signin
};
