
 * ------

   Given a *m* x *n* matrix, if an element is 0, set its entire row and column to 0. Do it in place.

* *改进方法：方法1比方法2更加简洁快速，因为赋值阶段不需要重复遍历：*

```javascript
/** Runtime: 140 ms / beats 79.76% (best: 132ms)
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
	let arr = [];
	for(let i=0; i<matrix.length; i++){
		for(let j=0; j<matrix[0].length; j++){
			if(matrix[i][j] === 0){
				arr.push([i,j]);
			}
		}
	}
	for(let i=0; i<arr.length; i++){
		setZero(arr[i][0],arr[i][1]);
	}

	function setZero(x,y){
		for(let i=0; i<matrix.length; i++){
			matrix[i][y]=0;
		}
		for(let i=0; i<matrix[0].length; i++){
			matrix[x][i]=0;
		}
	}
};
```



```javascript
/** Runtime: 150 ms / beats 65.48% (best: 132ms)
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
	let arr = [];
	for(let i=0; i<matrix.length; i++){
		for(let j=0; j<matrix[0].length; j++){
			if(matrix[i][j] === 0){
				arr.push([i,j]);
			}
		}
	}
	for(let i=0; i<arr.length; i++){
		setZero(arr[i][0],arr[i][1]);
	}

	function setZero(x,y){
		for(let i=0; i<matrix.length; i++){
			matrix[i][y]=0;
		}
		for(let i=0; i<matrix[0].length; i++){
			matrix[x][i]=0;
		}
	}
};
```









