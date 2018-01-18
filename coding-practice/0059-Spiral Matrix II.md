
 * ------

   Given an integer *n*, generate a square matrix filled with elements from 1 to *n*2 in spiral order.

   For example,
   Given *n* = `3`,

   ```
   [
    [ 1, 2, 3 ],
    [ 8, 9, 4 ],
    [ 7, 6, 5 ]
   ]
   ```


 

```javascript
/** Runtime: 91 ms / beat:58.46%  (best: 78ms)
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {
	let arr = [];
	for(let i=0; i<n; i++){
		arr.push([]);
	}
	let nSqr = n*n;

	fill(0,n,1);
	function fill(s, n, num){
		if(num>nSqr){return;}
		for(let i=s; i<s+n; i++){
			arr[s][i] = num++;
		}
		for(let i=s+1; i<s+n; i++){
			arr[i][s+n-1] = num++;
		}
		for(let i=s+n-2; i>=s; i--){
			arr[s+n-1][i] = num++;
		}
		for(let i=s+n-2; i>s; i--){
			arr[i][s] = num++;
		}
		fill(s+1, n-2, num);
	}
	return arr;
};
```



```Javascript
/** Runtime: 95 ms / beat:52.31%  (best: 78ms)
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {
	let arr = [];
	for(let i=0; i<n; i++){
		arr.push([]);
	}
	let nSqr = n*n;
	let s=0;
  	let num = 1;
	while(num<=nSqr){
		for(let i=s; i<s+n; i++){
			arr[s][i] = num++;
		}
		for(let i=s+1; i<s+n; i++){
			arr[i][s+n-1] = num++;
		}
		for(let i=s+n-2; i>=s; i--){
			arr[s+n-1][i] = num++;
		}
		for(let i=s+n-2; i>s; i--){
			arr[i][s] = num++;
		}
		s++;
      	n -= 2;
    }

	return arr;
};
```





