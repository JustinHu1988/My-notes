const http = require('http')
const cheerio = require('cheerio')
const url = 'http://www.imooc.com/learn/348'


function filterChapters(html){
    let $ = cheerio.load(html)

    let chapters = $('.chapter')

    // ;[{
    //     chapterTitle: '',
    //     videos:[
    //         title: '',
    //         id: ''
    //     ]
    // }]
    let courseData = []
    chapters.each(function(item){
        console.log('1')
        let chapter = $(this)
        let chapterTitle = chapter.find('strong').text()
        let videos = chapter.find('.video').children('li')
        let chapterData = {
            chapterTitle: chapterTitle,
            videos: []
        }
        videos.each(function(){
            let video = $(this).find('.J-media-item')
            let videoTitle = video.text()
            let id = video.attr('href').split('video/')[1]
            chapterData.videos.push({
                title: videoTitle,
                id: id
            })
        })
        courseData.push(chapterData)
        
    })

    return courseData
}

function printCourseInfo(courseData){
    
    courseData.forEach(function(item){
        let chapterTitle = item.chapterTitle
        console.log(chapterTitle + '\n')
        item.videos.forEach(function(video){
            console.log(' [' + video.id + '] ' + video.title + '\n')
        })
    })
}

http.get(url, function(res){
    let html = ''

    res.on('data', function(data){
        html+=data
    })

    res.on('end', function(){
        let courseData = filterChapters(html)
        
        printCourseInfo(courseData)
    })
}).on('error', function(){
    console.log('获取课程数据出错')
})