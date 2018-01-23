
 * ------

   Follow up for "Remove Duplicates":
   What if duplicates are allowed at most *twice*?

   For example,
   Given sorted array *nums* = `[1,1,1,2,2,3]`,

   Your function should return length = `5`, with the first five elements of *nums* being `1`, `1`, `2`, `2` and `3`. It doesn't matter what you leave beyond the new length.

   ​

```javascript
/** Runtime: 114 ms / beats 61.90% (best: 99ms)
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
	let len = nums.length;
	let isTwice = false;
	let num = 0;
	return count(0);
	function count(index){
		if(index===len){return num;}
		if(nums[index] === nums[index-1]){
			if(isTwice){
				return count(index+1);
			}else{
				nums[num++] = nums[index];
				isTwice = true;
				return count(index+1);
			}
		}else{
			isTwice = false;
			nums[num++] = nums[index];
			return count(index+1);
		}
	}
};

removeDuplicates([1,1,1,2,2,3]);
```

