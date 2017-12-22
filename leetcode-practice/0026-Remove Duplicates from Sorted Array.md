
 * Given a sorted array, remove the duplicates [**in-place**](https://en.wikipedia.org/wiki/In-place_algorithm) such that each element appear only *once* and return the new length.

   Do not allocate extra space for another array, you must do this by **modifying the input array in-place** with O(1) extra memory.

```javascript
/**
 * 思路：获取数组长度len，循环len次，移除数组前len个元素。每次循环中，当移除元素不等于上一个移除元素时，将其push到数组队尾
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
	let len = 0;
	let num = null;
	let length = nums.length;

	for(let i=0; i<length; i++){
		let temp = nums.shift();
		if(temp === num){
			continue;
		}else{
			num = temp;
			nums.push(num);
			len++;
		}
	}
	return len;
};

let nums = [1,1,2];
removeDuplicates(nums);
```





