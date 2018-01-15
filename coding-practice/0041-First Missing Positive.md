
 * Given an unsorted integer array, find the first missing positive integer.

   For example,
   Given `[1,2,0]` return `3`,
   and `[3,4,-1,1]` return `2`.

   Your algorithm should run in *O*(*n*) time and uses constant space.

```javascript
/** Runtime: 81 ms ／ Beats 100.00%
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
	let len = nums.length;
	let numArr = new Array(len+1);
	for(let i=0; i<len; i++){
		let x = nums[i];
		if(x>0){
			numArr[x] = 1;
		}
	}
	for(let i=1; i<=len+1; i++){
		if(numArr[i] === undefined){
			return i;
		}
	}
	return 1;
};


firstMissingPositive([3,4,-1,1]);
```

