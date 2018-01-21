
 * ------

   Given an array with *n* objects colored red, white or blue, sort them so that objects of the same color are adjacent, with the colors in the order red, white and blue.

   Here, we will use the integers 0, 1, and 2 to represent the color red, white, and blue respectively.

   **Note:**
   You are not suppose to use the library's sort function for this problem.

   ​

   应该还可以优化：

```javascript
/** Runtime: 97 ms / beats 54.76% (best: 78ms)
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
    let p1 = 0;
    let p2 = nums.length-1;
    let i =0 ;
    while(i<=p2){
        if(nums[i] === 0){
            [nums[p1], nums[i]] = [nums[i], nums[p1]];
            p1++;
            i++;
        }else if(nums[i] === 1){
            i++;     
        }else if(nums[i] === 2){
            [nums[p2], nums[i]] = [nums[i], nums[p2]];
            p2--;
        }
    } 
};
```





