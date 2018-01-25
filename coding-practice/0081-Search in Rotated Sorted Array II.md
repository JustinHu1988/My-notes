
 * ------

   > *Follow up* for "Search in Rotated Sorted Array":
   > What if *duplicates* are allowed?
   >
   > Would this affect the run-time complexity? How and why?

   Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.

   (i.e., `0 1 2 4 5 6 7` might become `4 5 6 7 0 1 2`).

   Write a function to determine if a given target is in the array.

   The array may contain duplicates.


*下方两种方法执行速度不同，1为$θ(lgn)$，2为$θ(n)$。*

```javascript
/** Runtime: 87 ms / beats 98.04% (best: 86ms)
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function(nums, target) {
	// 边界判定
	if(nums[0]>nums[nums.length-1] && nums[0]>target && nums[nums.length-1]<target){
		return false;
	}else if(nums[0]===target || nums[nums.length-1]===target){
		return true;
	}
	// 首尾去重
	while(nums.length>0 && nums[0]===nums[nums.length-1]){
		nums.pop();
	}
	if(nums.length===0){return false;}
	return find1(0, nums.length-1);

	function find1(s, e){
		if(s>e){return false;}
		let mid = (s+e)>>1;
		if(target===nums[mid]){return true;}
		if(target>nums[e]){//target属于前半段，不是order list
			if(nums[mid]>target){
				return find1(s, mid-1);
			}else if(nums[mid]>nums[e]){
				return find1(mid+1, e);
			}else if(nums[mid]<=nums[e]){
				return find1(s, mid-1);
			}
		}else if(target<nums[e]){//target属于后半段，已经进入order list
			if(nums[mid]<target){
				return find1(mid+1, e);
			}else if(nums[mid]>nums[e]){
				return find1(mid+1, e);
			}else if(nums[mid]<=nums[e]){
				return find1(s, mid-1);
			}
		}else{
			return true;
		}
	}
};
```



```javascript
/** Runtime: 136 ms / beats 10.00% (best: 86ms)
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

