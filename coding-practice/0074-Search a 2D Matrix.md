
 * ------

   Write an efficient algorithm that searches for a value in an *m* x *n* matrix. This matrix has the following properties:

   - Integers in each row are sorted from left to right.
   - The first integer of each row is greater than the last integer of the previous row.

   For example,

   Consider the following matrix:

   ```
   [
     [1,   3,  5,  7],
     [10, 11, 16, 20],
     [23, 30, 34, 50]
   ]

   ```

   Given **target** = `3`, return `true`.

```javascript
/** Runtime: 94 ms / beats 54.55% (best: 82ms)
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
	let arr = findArr(0, matrix.length-1);
	if(arr===false)
		return false;
	else
		return num(0, arr.length-1);
	
	function findArr(s, e){
		if(s>e) return false;
		let mid = (s+e)>>1;
		if(matrix[mid][0]>target)
			return findArr(s, mid-1);
		else if(matrix[mid][matrix[mid].length-1]<target)
			return findArr(mid+1, e);
		else
			return matrix[mid];
	}
	function num(s, e){
		if(s>e) return false;
		let mid = (s+e)>>1;
		if(arr[mid]>target)
			return num(s, mid-1);
		else if(arr[mid]<target)
			return num(mid+1, e);
		else
			return true;
	}
};
```





