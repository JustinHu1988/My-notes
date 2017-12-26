
 * Given a sorted array and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

   You may assume no duplicates in the array.

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    return find(0, nums.length-1);

	function find(min, max){
		if(min>max){
			return min;
		}
		let temp = Math.floor((min+max)/2);

		if(nums[temp] === target){
			return temp;
		}else if(nums[temp] < target){
			return find(temp+1, max);
		}else{
			return find(min, temp-1);
		}
	}
};
```









