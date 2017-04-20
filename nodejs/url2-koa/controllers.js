// 先导入fs模块
const fs = require('fs');
// 用readdirSync列出文件，这里可以用sync因为启动时只运行一次，不存在性能问题。
var files = fs.readdirSync(__dirname + '/controllers');

// 过滤.js文件：
var js_files = files.filter((f) => {
    return f.endsWith('.js');
});

// 处理每个js文件：
// for of 适合遍历数组， for in适合遍历对象
function addMapping(router){
    for(var f of js_files){
        console.log(`process controller: ${f}...`);
        // 导入js文件：
        let mapping = require(__dirname + '/controllers/' + f);
        for(var url in mapping){
            if(url.startsWith('GET')){
                var path = url.substring(4);
                router.get(path, mapping[url]);
                console.log(`register URL mapping: GET ${path}`);
            }else if(url.startsWith('POST')){
                var path = url.substring(5);
                router.post(path, mapping[url]);
            }else{
                console.log(`invalid URL:${url}`);
            }
        }
    }
}


module.exports = function(dir){
    let controllers_dir = dir || 'controllers',
        router = require('koa-router')();
    addMapping(router);
    return router.routes();
};
