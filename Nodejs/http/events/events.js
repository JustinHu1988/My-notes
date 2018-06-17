let EventEmitter = require('events').EventEmitter //event.js对外暴露的EventEmitter

let life = new EventEmitter()

// addEventListener
life.on('求安慰', function(who){
    console.log('给 ' + 'who' + ' 倒水')
})
life.emit('求安慰', '汉子')

