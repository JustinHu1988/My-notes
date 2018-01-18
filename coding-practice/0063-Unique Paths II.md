
 * ------

   Follow up for "Unique Paths":

   Now consider if some obstacles are added to the grids. How many unique paths would there be?

   An obstacle and empty space is marked as `1` and `0` respectively in the grid.

   For example,

   There is one obstacle in the middle of a 3x3 grid as illustrated below.

   ```
   [
     [0,0,0],
     [0,1,0],
     [0,0,0]
   ]

   ```

   The total number of unique paths is `2`.

   **Note:** *m* and *n* will be at most 100.

   *思路：利用杨辉三角形。*


```javascript
/** Runtime: 105 ms ／ beats 54.62% （best:  85ms）
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
    let arr = [];
    let m = obstacleGrid[0].length;
    let n = obstacleGrid.length;
    
    for(let i=0; i<n; i++){
        arr.push([]);
    }
    if(obstacleGrid[0][0]===0){
       arr[0][0] = 1;
    }else{
       arr[0][0] = 0;
    }
    for(let i=1; i<m; i++){
        if(obstacleGrid[0][i]===0){
            arr[0][i] = arr[0][i-1];
        }else{
            arr[0][i] = 0;
        }
    }
    for(let i=1; i<n; i++){
        if(obstacleGrid[i][0]===0){
            arr[i][0] = arr[i-1][0];
        }else{
            arr[i][0] = 0;
        }
    }
    for(let i=1; i<n; i++){
        for(let j=1; j<m; j++){
            if(obstacleGrid[i][j]===0){
                arr[i][j] = arr[i-1][j] + arr[i][j-1];
            }else{
                arr[i][j] = 0;
            }
        }
    }
    
    return arr[n-1][m-1];
};
```

