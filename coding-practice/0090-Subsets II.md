Given a collection of integers that might contain duplicates, **nums**, return all possible subsets (the power set).

**Note:** The solution set must not contain duplicate subsets.

For example,
If **nums** = `[1,2,2]`, a solution is:

```
[
  [2],
  [1],
  [1,2,2],
  [2,2],
  [1,2],
  []
]
```



解题思路：

1. 首先，想出求没有重复元素的数组arr的所有子集求法
2. 这个结果，会比目标结果多出一些重复元素。因此，在将子集加入结果数组`subArr`之前，先将其转换为字符串，加入到`subSet`的set集中，然后来判断是否加入了重复元素。若不重复，则将子集加入`subArr`中，若重复，则不加入。

```javascript
/** Runtime: 88 ms / beats 100.00%
 * 求有重复元素的数组arr的所有子集数组
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
	nums.sort(function(a,b){
		return a-b;
	});
	let subArr = [];
	let subSet = new Set();
	generate(0);

	function generate(len){
		if(len>nums.length){
			return;
		}
		let tempArr=[];
		gener(tempArr, -1, -1, len);
		generate(len+1);
	}
	function gener(tempArr, index1, index2, len){
		let newArr = tempArr.concat();

			if(index1<index2){
				newArr.push(nums[index2]);
			}
			if(newArr.length===len){
              	 // 去重
				let tempSet = newArr.join('');
				let tempSize = subSet.size;
				subSet.add(tempSet);
				if(tempSize!==subSet.size){
					subArr.push(newArr);
				}
				return;
			}
			if(index2<nums.length-1){
				gener(newArr, index2, index2+1, len);
				gener(newArr, index2+1, index2+1, len);
			}
	}
	return subArr;
};

subsetsWithDup([1,2,2]);
```



