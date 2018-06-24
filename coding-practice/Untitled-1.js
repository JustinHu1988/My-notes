//605. Can Place Flowers

/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function(flowerbed, n) {
    let count = 0;
    let len = flowerbed.length;

    for(let i=0; i<len; i++){
        if(flowerbed[i]===0){
            if((flowerbed[i-1]===0 || flowerbed[i-1]===undefined) && (flowerbed[i+1]===0 || flowerbed[i+1]===undefined)){
                flowerbed[i]=1;
                count++;
            }
        }
    }
    if(count>=n) {return true} else{return false}

};
canPlaceFlowers([0],1);



// 606. Construct String from Binary Tree
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} t
 * @return {string}
 */
var tree2str = function(t) {
    let str = '';
    if(t===null){
        return str;
    }
    function re(t2){
        str += t2.val;
        if(t2.left!==null||t2.right!==null){
            str += "("
        }
        if(t2.left!==null){
            re(t2.left);
        }
        if(t2.left!==null||t2.right!==null){
            str += ")"
        }
        if(t2.right!==null){
            str += "("
            re(t2.right);
            str += ")"
        }
    }
    re(t);
    return str;
    
};








// 609. Find Duplicate File in System
/**
 * @param {string[]} paths
 * @return {string[][]}
 */
var findDuplicate = function(paths) {
    
};


//591. Tag Validator












//852. Peak Index in a Mountain Array

/**
 * @param {number[]} A
 * @return {number}
 */
var peakIndexInMountainArray = function(A) {
    for(let i=1; i<A.length; i++){
        if(A[i]<A[i-1]){
            return i-1
        }
    }
};
peakIndexInMountainArray( [0,1,0])


//853. Car Fleet

/**
 * @param {number} target
 * @param {number[]} position
 * @param {number[]} speed
 * @return {number}
 */
var carFleet = function(target, position, speed) {
    if(position.length===0){return 0}
    let objArr = [];
    for(let i=0; i<position.length; i++){
        objArr.push({position: position[i], speed:speed[i], time: (target-position[i])/speed[i]})
    }
    objArr.sort(function(a,b){
        return b.position - a.position
    })

    let max = objArr[0].time, fleetCount=1;

    for(let i=1; i<position.length; i++){
        if(objArr[i].time > max){
            max =  objArr[i].time;
            fleetCount++;
        }
    }
    return fleetCount
};

carFleet(12, [10,8,0,5,3], [2,4,1,1,3])





// 854. K-Similar Strings
/**
 * @param {string} A
 * @param {string} B
 * @return {number}
 */
var kSimilarity = function(A, B) {

};









// 859. Buddy Strings
/**
 * @param {string} A
 * @param {string} B
 * @return {boolean}
 */
var buddyStrings = function(A, B) {
    if(A.length !== B.length){return false}

    if(A===B){
        let temp = {a:0,b:0,c:0,d:0,e:0,f:0,g:0,h:0,i:0,j:0,k:0,l:0,m:0,n:0,o:0,p:0,q:0,r:0,s:0,t:0,u:0,v:0,w:0,x:0,y:0,z:0}
        for(let i=0; i<A.length; i++){
            temp[A[i]]++;
            if( temp[A[i]]===2){
                return true
            }
        }
    }

    let diffA = [], diffB = [],diffCount = 0;
    for(let i=0; i<A.length; i++){
        if(A[i]!==B[i]){
            diffCount++;
            if(diffCount===1){
                diffA[0]=A[i];
                diffB[0]=B[i];
            }else if(diffCount===2){
                diffA[1]=A[i];
                diffB[1]=B[i];
            }else if(diffCount>2){
                return false
            }
        }
    }
    if(diffCount===2){
        if(diffA[0]===diffB[1] && diffA[1]===diffB[0]){
            return true
        }else{
            return false;
        }
    }else{
        return false;
    }

};

buddyStrings("","ba");


// 856. Score of Parentheses
/**
 * @param {string} S
 * @return {number}
 */
var scoreOfParentheses = function(S) {
    if(S===''){
        return 0
    }
    let arr = S.split("");
    for(let i=0; i<arr.length; i++){
        if(arr[i]==='(' && arr[i+1] === ')'){
            let temp = arr.slice(0, i);
            let temp2 = arr.slice(i+2);
            temp.push(1);
            arr = temp;
            arr = arr.concat(temp2)
        }
    }
    while(arr.length>1){

        for(let i=0; i<arr.length; i++){
            if(typeof arr[i] === "number"){
                if(arr[i-1]==='(' && arr[i+1]===')'){
                    let temp = arr.slice(0, i-1);
                    let temp2 = arr.slice(i+2);
                    temp.push(arr[i]*2);
                    arr = temp;
                    arr = arr.concat(temp2)
                }else if(typeof arr[i-1] === "number"){
                    let temp = arr.slice(0, i-1);
                    let temp2 = arr.slice(i+1);
                    temp.push(arr[i]+arr[i-1]);
                    arr = temp;
                    arr = arr.concat(temp2)
                }else if(typeof arr[i+1] === "number"){
                    let temp = arr.slice(0, i);
                    let temp2 = arr.slice(i+2);
                    temp.push(arr[i]+arr[i+1]);
                    arr = temp;
                    arr = arr.concat(temp2)
                }
            }
        }
    }
    return arr[0];
};

scoreOfParentheses("(())");


// 858. Mirror Reflection
/**
 * @param {number} p
 * @param {number} q
 * @return {number}
 */
var mirrorReflection = function(p, q) {
    for(let i=1; i<1001; i++){
        if((p*i)%q===0 && (p*i)%(2*q)===0 && i%2!==0){
            return 2;
        }else if((p*i)%q===0 && (p*i)%(2*q)!==0 && i%2!==0){
            return 1;
        }else if((p*i)%q===0){
            return 0;
        }
    }
};
mirrorReflection(4,3);
mirrorReflection(6,4);


// 857. Minimum Cost to Hire K Workers
/**
 * @param {number[]} quality
 * @param {number[]} wage
 * @param {number} K
 * @return {number}
 */
var mincostToHireWorkers = function(quality, wage, K) {
    let arr = [];
    for(let i=0; i<quality.length; i++){
        arr.push({ratio:wage[i]/quality[i], wage: wage[i], quality: quality[i]});
    }
    arr.sort(function(a,b){
        return a.ratio - b.ratio
    })

    let min = 9999999999;

    for(let i=K-1; i<arr.length; i++){
        let tempArr = arr.slice(0,i);
        tempArr.sort(function(a,b){
            return a.quality - b.quality
        })

        let temp = 0;
        for(let j=0; j<K-1; j++){
            temp+=tempArr[j].wage*arr[i].ratio/tempArr[j].ratio
        }
        temp+=arr[i].wage
        if(temp<min){
            min=temp
        }

    }
    return min
};
mincostToHireWorkers([25,68,35,62,52,57,35,83,40,51],
    [147,97,251,129,438,443,120,366,362,343]
    ,6);


mincostToHireWorkers([3,1,10,10,1],[4,8,2,2,7],3);
mincostToHireWorkers([10,20,5],[70,50,30],2);





