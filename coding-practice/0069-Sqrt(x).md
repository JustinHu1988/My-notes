
 * ------

   Implement `int sqrt(int x)`.

   Compute and return the square root of *x*.

   **x** is guaranteed to be a non-negative integer.

   **Example 1:**

   ```
   Input: 4
   Output: 2

   ```

   **Example 2:**

   ```
   Input: 8
   Output: 2
   Explanation: The square root of 8 is 2.82842..., and since we want to return an integer, the decimal part will be truncated.

   ```

   ​

   - *`mid = start + ((end-start)>>1);`以后可以多利用位移运算符，效率高*

```javascript
/** Runtime: 119 ms / beats 92.28% (best: 112ms)
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
	let trueNum = 0;
	return find(1,x);
	function find(start, end){
		if(start>end){return trueNum;}
		let mid = start + ((end-start)>>1);  //  这个写法，比 mid = Math.floor((start+end)/2);效率高
		if(mid*mid>x) return find(start, mid-1);
		else if(mid*mid<x){
			trueNum = mid > trueNum ? mid : trueNum;
			return find(mid+1, end);
		}else if(mid*mid===x) return mid;
	}
};
```



​





