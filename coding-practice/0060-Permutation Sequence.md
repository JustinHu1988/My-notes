
 * ------

   The set `[1,2,3,…,*n*]` contains a total of *n*! unique permutations.

   By listing and labeling all of the permutations in order,
   We get the following sequence (ie, for *n* = 3):

   1. `"123"`
   2. `"132"`
   3. `"213"`
   4. `"231"`
   5. `"312"`
   6. `"321"`

   Given *n* and *k*, return the *k*th permutation sequence.

   **Note:** Given *n* will be between 1 and 9 inclusive.


```javascript
/** Runtime: 96 ms ／ beats 56.00% （best:  86ms） 应该可以优化
 * @param {number} n
 * @param {number} k
 * @return {string}
 * 根据阶乘和k值，直接计算第k个排列的每一位数值
 * 利用Set结构特性以及其value()方法生成的结构(以及其next().value）
 */
var getPermutation = function(n, k) {
	let str = '';
	let set = new Set();
	for(let i=1; i<=n; i++){
		set.add(i);
	}
	compute(n,k);
	return str;

	function compute(n, k){
		let i = 0;
		for(; i<n; i++){
			if(k<=factorial(i+1)){
				break;
			}
		}
		let fact = factorial(i);
		let r = Math.ceil(k/fact);
		k = k- (r-1)*fact;
		let setIter = set.values();
		for(let j=0; j<n-i-1; j++){
			let temp = setIter.next().value;
			str += temp;
			set.delete(temp);
		}
		let temp;
		for(let j=0; j<r; j++){
			temp = setIter.next().value;
		}
		str += temp;
		set.delete(temp);
		if(k===1){
			set.forEach(function(v1,v2,set){
				str += v1;
				set.delete(v1);
			});
		}else if(set.size>0){
			compute(set.size, k);
		}
	}
	function factorial(n){
		return n > 1 ? n * factorial(n-1) : 1;
	}
};
getPermutation(3,4);

```



- 小改动：将阶乘先计算出来存在数组里。（速度上没有观察到明显变化）

```javascript
/** Runtime: 96 ms ／ beats 56.00% （best:  86ms）
 * @param {number} n
 * @param {number} k
 * @return {string}
 * 根据阶乘和k值，直接计算第k个排列的每一位数值
 * 利用Set结构特性以及其value()方法生成的结构(以及其next().value）
 */
var getPermutation = function(n, k) {
	let str = '';
	let set = new Set();
  	let factorArr = [];
	for(let i=1; i<=n; i++){
		set.add(i);
	}
  	for(let i=0; i<=n; i++){
        factorArr.push(factorial(i));
    }
	compute(n,k);
	return str;

	function compute(n, k){
		let i = 0;
		for(; i<n; i++){
			if(k<=factorArr[i+1]){
				break;
			}
		}
		let fact = factorArr[i];
		let r = Math.ceil(k/fact);
		k = k- (r-1)*fact;
		let setIter = set.values();
		for(let j=0; j<n-i-1; j++){
			let temp = setIter.next().value;
			str += temp;
			set.delete(temp);
		}
		let temp;
		for(let j=0; j<r; j++){
			temp = setIter.next().value;
		}
		str += temp;
		set.delete(temp);
		if(k===1){
			set.forEach(function(v1,v2,set){
				str += v1;
				set.delete(v1);
			});
		}else if(set.size>0){
			compute(set.size, k);
		}
	}
	function factorial(n){
		return n > 1 ? n * factorial(n-1) : 1;
	}
};
getPermutation(3,4);
```

