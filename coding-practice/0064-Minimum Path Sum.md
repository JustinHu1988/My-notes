
 * ------

   Given a *m* x *n* grid filled with non-negative numbers, find a path from top left to bottom right which *minimizes* the sum of all numbers along its path.

   **Note:** You can only move either down or right at any point in time.

   **Example 1:**

   ```
   [[1,3,1],
    [1,5,1],
    [4,2,1]]

   ```

   Given the above grid map, return 

   ```
   7
   ```

   . Because the path 1→3→1→1→1 minimizes the sum.

   *思路：利用杨辉三角形。*


```javascript
/** Runtime: 98 ms ／ beats 59.04% （best:  82ms）
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
	let m = grid[0] !== undefined ? grid[0].length : 0;
	let n = grid.length;
	let arr = [];
	for (let i = 0; i < n; i++) {
		arr.push([]);
	}

	if (m !== 0) {
		for(let i=0; i<n; i++){
			for(let j=0; j<m; j++){
				if(i===0 && j===0){
					arr[i][j] = grid[i][j];
				}else if(i===0){
					arr[i][j] = grid[i][j] + arr[i][j-1];
				}else if(j===0){
					arr[i][j] = grid[i][j] + arr[i-1][j];
				}else{
					arr[i][j] = arr[i-1][j]>arr[i][j-1] ? grid[i][j]+arr[i][j-1] : grid[i][j]+arr[i-1][j];
				}
			}
		}
	}

	return n===0 || m===0 ? 0 : arr[n-1][m-1];
};
```

