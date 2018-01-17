
 * ------

   Find the contiguous subarray within an array (containing at least one number) which has the largest sum.

   For example, given the array `[-2,1,-3,4,-1,2,1,-5,4]`,
   the contiguous subarray `[4,-1,2,1]` has the largest sum = `6`.

   ​


```javascript
/** Runtime: 117 ms / beats 21.21%. (best: 88 ms) 应该还可以优化
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
	let set = new Set();
	let num = 0;
	let start = false;

	for(let i=0; i<nums.length; i++){
		if(nums[i]<0){
			if(start){
				set.add(num);
				if(num + nums[i]<0){
					num=0;
				}else{
					num += nums[i];
				}
			}else{
				set.add(nums[i]);
			}
		}else{
			if(start === false){
				start = true;
			}
			num += nums[i];
		}
		if(i===nums.length-1){
			if(start){
				set.add(num);
			}
		}
	}
	let num2 = nums[0];
	set.forEach(function(v1,v2,set){
		if(num2<v1){
			num2=v1;
		}
	});
	return num2;
};
```



