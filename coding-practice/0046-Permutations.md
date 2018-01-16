
 * ------

   Given a collection of **distinct** numbers, return all possible permutations.

   For example,
   `[1,2,3]` have the following permutations:

   ```
   [
     [1,2,3],
     [1,3,2],
     [2,1,3],
     [2,3,1],
     [3,1,2],
     [3,2,1]
   ]
   ```


```Javascript
/** Runtime: 115 ms / Beats 65.55%
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    let arr = [];
    let len = nums.length;
    generate(0, []);
    function generate(i, array){
        for(let j=0; j<len; j++){
           let arrCopy = array.slice();
            if(arrCopy[j] === undefined){
                arrCopy[j] = nums[i];
                if(i === len-1){
                    arr.push(arrCopy);
                    return;
                }else{
                    generate(i+1, arrCopy);
                }
            }
        }
    }
    return arr;
};
```

