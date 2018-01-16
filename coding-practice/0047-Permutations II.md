
 * ------

   Given a collection of numbers that might contain duplicates, return all possible unique permutations.

   For example,
   `[1,1,2]` have the following unique permutations:

   ```
   [
     [1,1,2],
     [1,2,1],
     [2,1,1]
   ]

   ```


```Javascript
/** Runtime: 133 ms / Beats 72.09%
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  nums.sort(function(a,b){
    return a-b;
  });
    let arr = [];
    let len = nums.length;
    generate(0, [], 0);
    function generate(i, array, next){
        for(let j=next; j<len; j++){
           let arrCopy = array.slice();
            if(arrCopy[j] === undefined){
                arrCopy[j] = nums[i];
                if(i === len-1){
                    arr.push(arrCopy);
                    return;
                }else{
                  if(nums[i+1] === nums[i]){
                    generate(i+1, arrCopy, j+1);
                  }else{
                    generate(i+1, arrCopy, 0);
                  }
                    
                }
            }
        }
    }
    return arr;
};
permute([3,3,0,3]);
```

