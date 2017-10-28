/**
 * Created by justinhu on 23/10/2017.
 */

let totalPoints=0, remainGiftPoints=0;
console.log(dataArr[0].english);



let dataMainBasic = {math:480, economics:15, computer:10800, physics:1200, physicalExercise:270,
    english:{hearing:0,reading:0,seeing:0,writing:0,grammar:0,word:0,speaking:0,value:3600}};

let levelScore = {math:30000, economics:6000, computer:60000, physics:10000, physicalExercise:4000,
    english:{hearing:0,reading:0,seeing:0,writing:0,grammar:0,word:0,speaking:0,value:10000}};

let dataMainZero={
    math:0, economics:0, computer:0, physics:0, physicalExercise:0,
    english:{hearing:0,reading:0,seeing:0,writing:0,grammar:0,word:0,speaking:0,value:0}
}


/**
 *
 * get all progress
 *
 */
function getAll(){
    let dataMain = dataMainBasic;
    for(let i=0; i<dataArr.length; i++){
        dataMain.math += dataArr[i].math;
        dataMain.economics += dataArr[i].economics;
        dataMain.computer += dataArr[i].computer;
        dataMain.physics += dataArr[i].physics;
        dataMain.physicalExercise +=  dataArr[i].physicalExercise;
        console.log(dataArr[i].english);
        dataArr[i].english.value = dataArr[i].english.hearing * 0.25 + dataArr[i].english.reading*0.25 + dataArr[i].english.speaking+  dataArr[i].english.word+ dataArr[i].english.seeing*0.5 + dataArr[i].english.grammar + dataArr[i].english.writing;
        dataMain.english.value +=  dataArr[i].english.value;
    }
    return dataMain;
}

function getLastweek(){
    let dataMain = dataMainZero;

    if(dataArr.length>=7){
        for(let i=dataArr.length-7; i<dataArr.length; i++){
            dataMain.math += dataArr[i].math;
            dataMain.economics += dataArr[i].economics;
            dataMain.computer += dataArr[i].computer;
            dataMain.physics += dataArr[i].physics;
            dataMain.physicalExercise +=  dataArr[i].physicalExercise;

            dataArr[i].english.value = dataArr[i].english.hearing * 0.25 + dataArr[i].english.reading*0.25 + dataArr[i].english.speaking+  dataArr[i].english.word+ dataArr[i].english.seeing*0.5 + dataArr[i].english.grammar + dataArr[i].english.writing;
            dataMain.english.value +=  dataArr[i].english.value;
        }
    }else if(dataArr.length<7){
        for(let i=0; i<dataArr.length; i++){
            dataMain.math += dataArr[i].math;
            dataMain.economics += dataArr[i].economics;
            dataMain.computer += dataArr[i].computer;
            dataMain.physics += dataArr[i].physics;
            dataMain.physicalExercise +=  dataArr[i].physicalExercise;
            console.log(dataArr[i].english);
            dataArr[i].english.value = dataArr[i].english.hearing * 0.25 + dataArr[i].english.reading*0.25 + dataArr[i].english.speaking+  dataArr[i].english.word+ dataArr[i].english.seeing*0.5 + dataArr[i].english.grammar + dataArr[i].english.writing;
            console.log(dataArr[i].english);
            dataMain.english.value +=  dataArr[i].english.value;
        }
    }

    return dataMain;
}


let allData = getAll();
let weekData = getLastweek();

$(".main-progress>li").each(function() {
    let id = $(this).attr('id');
    let tmpLen = 0;
    if(id === "english"){
        tmpLen =$(this).children(".bar").children(".achieved").css("width", ((allData[id].value) / levelScore[id].value) * 700 + 'px');
        $(this).children(".bar").children(".achieved").css("width", ((allData[id].value-weekData[id].value) / levelScore[id].value) * 700 + 'px');
        $(this).children(".bar").children(".recent").css("width", ((weekData[id].value) / levelScore[id].value) * 700 + 'px');
        $(this).children(".bar").children(".recent").children("p").html(allData[id].value-weekData[id].value + '+' + weekData[id].value + 'points');

        $(this).children(".goal-score").html(levelScore[id].value+" points");
    }else{
        $(this).children(".bar").children(".achieved").css("width", ((allData[id]-weekData[id]) / levelScore[id]) * 700 + 'px');
        $(this).children(".bar").children(".recent").css("width", ((weekData[id]) / levelScore[id]) * 700 + 'px');
        $(this).children(".bar").children(".recent").children("p").html(allData[id]-weekData[id] + '+' + weekData[id] + 'points');

        $(this).children(".goal-score").html(levelScore[id]+" points");
    }

});


totalPoints = allData.math + allData.economics + allData.computer +allData.physics + allData.physicalExercise+ allData.english.value;

$(".personal-data").find(".total-points").children("p").html(totalPoints);

let giftHtmlArr = [];

remainGiftPoints = totalPoints;
for(let i = 0; i<giftList.length; i++){
    remainGiftPoints -= giftList[i].value;
    giftHtmlArr[i] = "<li>" + giftList[i].name + " (" + giftList[i].value + ")" +"</li>";
}


let giftHtmlStr = giftHtmlArr.join("");
$(".personal-data").find(".gifts-box").html(
    "<h4>Gift List: </h4>" + "<ul>" +  giftHtmlStr +"</ul>" +'<div class="remain-points"><h4>The remaining gift points</h4><p>'+remainGiftPoints+'</p></div>'
);
