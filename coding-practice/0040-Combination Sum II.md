
 * Given a collection of candidate numbers (**C**) and a target number (**T**), find all unique combinations in **C** where the candidate numbers sums to **T**.

   Each number in **C** may only be used **once** in the combination.

   **Note:**

   - All numbers (including target) will be positive integers.
   - The solution set must not contain duplicate combinations.

   For example, given candidate set `[10, 1, 2, 7, 6, 1, 5]` and target `8`, 
   A solution set is: 

   ```
   [
     [1, 7],
     [1, 2, 5],
     [2, 6],
     [1, 1, 6]
   ]
   ```

```javascript
/** Runtime: 118ms / Beats 87.10%
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
	candidates.sort(function(a,b){
		return a-b;
	});
	let returnArr = [];
	combinCell(candidates, target, [], 0);

	function combinCell(candi, target, Arr, index){
		for(let i = index; i < candi.length; i++){
			let arrCopy = Arr.slice();
			if(candi[i] < target){
              	 if(i !== index && candi[i] === candi[i-1]){
					continue;
				}
				arrCopy.push(candi[i]);
				combinCell(candi, target-candi[i], arrCopy, i+1);

			}else if(candi[i] === target){
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
combinationSum([3,1,3,5,1,1],8);
```

