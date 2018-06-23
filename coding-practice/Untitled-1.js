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
    function find
};