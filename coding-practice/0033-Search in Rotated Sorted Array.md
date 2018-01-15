
 * Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.

   (i.e., `0 1 2 4 5 6 7` might become `4 5 6 7 0 1 2`).

   You are given a target value to search. If found in the array return its index, otherwise return -1.

   You may assume no duplicate exists in the array.

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
	let len = nums.length;
	let shiftNum = 0;

	// 移位，还原为排序数组，记录移位次数
	for(let i = 0; i< len; i++){
		if(nums[0]>nums[len-1]){
			nums.unshift(nums.pop());
			shiftNum++;
		}else{
			break;
		}
	}

	// 二分法常规查找，返回index时还原移位次数
	return findTar(0, len-1);

	function findTar(min, max){
		if(min>max){
			return -1;
		}
		let index = Math.floor(max-min/2);
		if(nums[index] === target){
			return index-shiftNum>=0 ?index-shiftNum : index-shiftNum+len;
		}else if(nums[index] > target){
			return findTar(min, index-1);
		}else{
			return findTar(index+1, max);
		}
	}
};

```









