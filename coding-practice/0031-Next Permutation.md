
 * Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.

   If such arrangement is not possible, it must rearrange it as the lowest possible order (ie, sorted in ascending order).

   The replacement must be in-place, do not allocate extra memory.

   Here are some examples. Inputs are in the left-hand column and its corresponding outputs are in the right-hand column.
   `1,2,3` → `1,3,2`
   `3,2,1` → `1,2,3`
   `1,1,5` → `1,5,1`

```javascript
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
/**
 * 基本规律：
 * 1. 从后往前遍历nums，当遇到nums[i]>nums[i-1]时，将nums[i-1]与"num[i]到num[len-1]中大于且最接近num[i-1]的值"相置换，然后将num[i]到num[len-1]这些项进行reverse即可
 * 2. 若遍历到最后也没有遇到nums[i]>nums[i-1]，reverse整个nums
 */
var nextPermutation = function(nums) {
	let len = nums.length;
	for(let i=len-1; i>=0; i--){
		if(nums[i]>nums[i-1]){
			let index = findBigLittle(nums[i-1], i, len-1);

			[nums[i-1], nums[index]] = [nums[index], nums[i-1]];
			subReverse(i, len-1);
			return;
		}else{
			continue;
		}
	}
	nums.reverse();

	function subReverse(min, max){
		if(min<max){
			[nums[min], nums[max]] = [nums[max], nums[min]];
			return subReverse(min+1, max-1);
		}else{
			return;
		}
	}
	function findBigLittle(num, min, max){
		let tempDif;
		let index=0;
		for(let i = min; i<=max; i++){
			if((tempDif === undefined || tempDif>=nums[i]-num) && nums[i]-num>0){
				index=i;
				tempDif = nums[i]-num;
			}
		}
		return index;
	}
};
```









