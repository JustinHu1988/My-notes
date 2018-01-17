
 * ------

   Given an array of non-negative integers, you are initially positioned at the first index of the array.

   Each element in the array represents your maximum jump length at that position.

   Determine if you are able to reach the last index.

   For example:
   A = `[2,3,1,1,4]`, return `true`.

   A = `[3,2,1,0,4]`, return `false`.


```javascript
/** Runtime: 105 ms / beats 44.72%. (best: 86 ms)
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    let arr = [];
    let len = nums.length;
    for(let i=0; i<len; i++){
        arr.push({num:nums[i], dis:len});
    }
    arr[0].dis = 0;
    let j=1;
    for(let i=0; i<len; i++){
        for(; j<(arr[i].num+i+1<len ? arr[i].num+i+1 : len);j++){
            if(arr[j].dis>arr[i].dis+1){
                arr[j].dis = arr[i].dis+1;
            }
        }
    }

    return arr[arr.length-1].dis === len ? false : true;
};
canJump([2,3,1,1,4]);
```



