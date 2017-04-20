const nunjucks = require('nunjucks');

// 编写使用Nunjucks的函数render
function createEnv(path, opts){
    var autoescape = opts.autoescape && true,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnundefined || false,
        // env表示一个Nunjucks模板对象，它有一个render(view, model)方法，正好传入view和model两个参数，并返回字符串。
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path, {
                noCache: noCache,
                watch: watch
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if(opts.filters){
        for(var f in opts.filters){
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

var env = createEnv(`views`, {
    watch: true,
    filters: {
        hex: function(n){
            return '0x' + n.toString(16);
        }
    }
});


var s = env.render('hello.html', { name: '小明' });
console.log(s);

