
 * ------

   Given a matrix of *m* x *n* elements (*m* rows, *n* columns), return all elements of the matrix in spiral order.

   For example,
   Given the following matrix:

   ```
   [
    [ 1, 2, 3 ],
    [ 4, 5, 6 ],
    [ 7, 8, 9 ]
   ]

   ```

   You should return `[1,2,3,6,9,8,7,4,5]`.


```javascript
/** Runtime: 83 ms / beats 63.50%. (best: 75 ms)
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    let arr = [];

    sort(0,matrix[0]===undefined ?  0 : matrix[0].length,matrix.length);

    function sort(s, m, n){
        if(m===0||n===0){return;}
        if(m===1){
            for(let i=s; i<s+n; i++){
                arr.push(matrix[i][s]);
            }
        }else if(n===1){
            for(let i=s; i<s+m; i++){
                arr.push(matrix[s][i]);
            }
        }else{
            for(let i=s; i<s+m; i++){
                arr.push(matrix[s][i]);
            }
            for(let i=s+1; i<s+n; i++){
                arr.push(matrix[i][s+m-1]);
            }
            for(let i=s+m-2; i>=s; i--){
                arr.push(matrix[s+n-1][i]);
            }
            for(let i=s+n-2; i>s; i--){
                arr.push(matrix[i][s]);
            }
            sort(s+1, m-2, n-2);
        }
    }
    return arr;
};
```



