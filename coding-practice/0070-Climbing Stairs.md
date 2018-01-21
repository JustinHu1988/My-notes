
 * ------

   You are climbing a stair case. It takes *n* steps to reach to the top.

   Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

   **Note:** Given *n* will be a positive integer.

   **Example 1:**

   ```
   Input: 2
   Output:  2
   Explanation:  There are two ways to climb to the top.

   1. 1 step + 1 step
   2. 2 steps

   ```

   **Example 2:**

   ```
   Input: 3
   Output:  3
   Explanation:  There are three ways to climb to the top.

   1. 1 step + 1 step + 1 step
   2. 1 step + 2 steps
   3. 2 steps + 1 step

   ```

   - *思路：当2的个数特定时，其所有组合方式为$C^{m2}_{main}$， 其中main为此时1和2的总个数，m2为2的个数。因此遍历所有2的取值可能，分别求得组合数，相加即可。*

```javascript
/** Runtime: 81 ms / beats 77.45% (best: 72ms)
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
	let m2 = n>>1;
	let num = 0;
	for(let i=0; i<=m2; i++){
		let temp = 1;
		let temp2 = 1;
		let c2 = i>n-2*i ? n-2*i : i;
		num += perm(c2, n-i, temp)/perm(c2, c2, temp2);
	}
	function perm(c2, main, temp){
		return c2>0 ? temp*main*perm(c2-1, main-1, temp) : 1;
	}
	return num;
};
climbStairs(5);
```



​





