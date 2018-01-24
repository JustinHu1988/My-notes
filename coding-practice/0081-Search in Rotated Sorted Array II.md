
 * ------

   > *Follow up* for "Search in Rotated Sorted Array":
   > What if *duplicates* are allowed?
   >
   > Would this affect the run-time complexity? How and why?

   Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.

   (i.e., `0 1 2 4 5 6 7` might become `4 5 6 7 0 1 2`).

   Write a function to determine if a given target is in the array.

   The array may contain duplicates.

   **需要优化速度**

```javascript
/** Runtime: 136 ms / beats 10.00% (best: 82ms)
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function(nums, target) {
	nums.sort(function(a, b){
		return a-b;
	});
	let len = nums.length;
	if(nums[0]>target || nums[len-1]<target){
		return false;
	}else if(nums[0]===target || nums[len-1]===target){
		return true;
	}else{
		return find(0, len-1);
	}

	function find(s, e){
		if(s>e){return false;}
		let mid = (s+e)>>1;
		if(nums[mid]>target){
			return find(s, mid-1);
		}else if(nums[mid]<target){
			return find(mid+1, e);
		}else{
			return true;
		}
	}
};
```

