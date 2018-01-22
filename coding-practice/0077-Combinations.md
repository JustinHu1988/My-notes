
 * ------

   Given two integers *n* and *k*, return all possible combinations of *k* numbers out of 1 ... *n*.

   For example,
   If *n* = 4 and *k* = 2, a solution is:

   ```
   [
     [2,4],
     [3,4],
     [2,3],
     [1,2],
     [1,3],
     [1,4],
   ]
   ```

   *对比“纯递归”和“递归+循环”两种方法，速度有明显差距*

```javascript
/** Runtime: 152 ms / beats 98.31% (best: 150ms)
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
	let arrMain = [];
	gener([],n,k);

	function gener(arr, m, s){
		if(s === 0){
			return arrMain.push(arr);
		}
		if(m<s){
			return;
		}
		gener([m].concat(arr), m-1, s-1);
		gener(arr, m-1, s);
	}
	return arrMain;
};
```



```javascript
/** Runtime: 438 ms / beats 6.31% (best: 150ms)
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
	let arrMain = [];
	gener(1, []);
	function gener(index, arr){
		if(arr.length === k){
			arrMain.push(arr);
			return;
		}
		for(let i=index; i<=n; i++){
			gener(i+1, [i].concat(arr));
		}
	}
	return arrMain;
};
```



