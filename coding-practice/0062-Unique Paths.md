
 * ------

   A robot is located at the top-left corner of a *m* x *n* grid (marked 'Start' in the diagram below).

   The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

   How many possible unique paths are there?

   ![img](https://leetcode.com/static/images/problemset/robot_maze.png)

   Above is a 3 x 7 grid. How many possible unique paths are there?

   **Note:** *m* and *n* will be at most 100.

   *思路：利用杨辉三角形。*


```javascript
/** Runtime: 87 ms ／ beats 74.23% （best:  75ms）
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    let arr = [];
    for(let i=0; i<n; i++){
        arr.push([]);
    }
    for(let i=0; i<m; i++){
        arr[0][i] = 1;
    }
    for(let i=1; i<n; i++){
        arr[i][0] = 1;
    }
    for(let i=1; i<n; i++){
        for(let j=1; j<m; j++){
            arr[i][j] = arr[i-1][j] + arr[i][j-1];
        }
    }
    
    return arr[n-1][m-1];
};
```

