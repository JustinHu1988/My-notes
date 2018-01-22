
 * ------

   Given a set of **distinct** integers, *nums*, return all possible subsets (the power set).

   **Note:** The solution set must not contain duplicate subsets.

   For example,
   If **nums** = `[1,2,3]`, a solution is:

   ```
   [
     [3],
     [1],
     [2],
     [1,2,3],
     [1,3],
     [2,3],
     [1,2],
     []
   ]
   ```

   *目前是使用“递归+循环”应该还可以优化*

```javascript
/** Runtime: 109 ms / beats 39.62% (best: 88ms)
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
	let arrMain = [];
	for(let i = 0; i<nums.length; i++){
		gener([],nums.length-1, i);
	}
	arrMain.push([]);
	function gener(arr, m, s){
		if(s === -1){
			return arrMain.push(arr);
		}
		if(m<s){
			return;
		}
		gener([nums[m]].concat(arr), m-1, s-1);
		gener(arr, m-1, s);
	}
	return arrMain;
};
```

