
 * Given an array of integers sorted in ascending order, find the starting and ending position of a given target value.

   Your algorithm's runtime complexity must be in the order of *O*(log *n*).

   If the target is not found in the array, return `[-1, -1]`.

   For example,
   Given `[5, 7, 7, 8, 8, 10]` and target value 8,
   return `[3, 4]`.

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
/**
 * 思路：首先常规寻找（dir=0）到目标值之一x，判断x是否处于range的边界，若处于上界，arr[0]=x；若处于下界，arr[1]=x; 若不处于边界，分别执行寻找上界（dir=1）和下界（dir=-1）的方法
 * 若寻找到上界，判断下界是否已存在，若不存在，继续寻找下界。反之亦然。
 */
var searchRange = function(nums, target) {
    let arr = new Array(2);
    
    find(0, nums.length-1, 0);
    
    function find(min, max, dir){
        if(min>max){
            if(arr[0] === undefined){
                arr[0] = -1;
                arr[1] = -1;
            }
            return;
        }
        
        let temp = Math.floor((max+min)/2);
        if(nums[temp] === target){
            if(nums[temp-1] !== target){
                arr[0] = temp;
                if(arr[1]===undefined && nums[temp+1] === target){
                    find(temp+1, max, 1);
                }
            }
            if(nums[temp+1] !== target){
                arr[1] = temp;
                if(arr[0]===undefined){
                    find(min, temp-1, -1);
                }
            }
            //常规查找（dir=0）到目标值且不位于边界时，需要向两个方向寻找range边界。若已开始寻找边界（dir!=0）且尚未找到边界时，则按照该方向继续寻找
            if(nums[temp-1] === target && nums[temp+1] === target){
                if(arr[0]===undefined && (dir === 0 || dir === -1)){ 
                    find(min, temp-1, -1);
                }
                if(arr[1]===undefined && (dir === 0 || dir === 1)){
                    find(temp+1, max, 1);
                }   
            }
        }else if(nums[temp] < target){
            find(temp+1, max, dir);
        }else{
            find(min, temp-1, dir);
        }
    }
    return arr;
};

```









