
 * Given a **set** of candidate numbers (**C**) **(without duplicates)** and a target number (**T**), find all unique combinations in **C** where the candidate numbers sums to **T**.

   The **same** repeated number may be chosen from **C** unlimited number of times.

   **Note:**

   - All numbers (including target) will be positive integers.
   - The solution set must not contain duplicate combinations.

   For example, given candidate set `[2, 3, 6, 7]` and target `7`, 
   A solution set is: 

   ```
   [
     [7],
     [2, 2, 3]
   ]
   ```

```javascript
/** Runtime: 119ms / Beats 84.73%
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
	candidates.sort(function(a,b){
		return a-b;
	});
	let returnArr = [];
	let len = candidates.length;
	combinCell(target, [], 0);

	function combinCell(target, Arr, index){
		for(let i = index; i < len; i++){
			let arrCopy = Arr.slice();
			if(candidates[i] < target){
				arrCopy.push(candidates[i]);
				combinCell(target-candidates[i], arrCopy, i);
			}else if(candidates[i] === target){
				arrCopy.push(target);
				returnArr.push(arrCopy);
				arrCopy = [];
				return;
			}else{
				return;
			}
		}
	}
	return returnArr;
};
combinationSum([92,71,89,74,102,91,70,119,86,116,114,106,80,81,115,99,117,93,76,77,111,110,75,104,95,112,94,73],310);
```

