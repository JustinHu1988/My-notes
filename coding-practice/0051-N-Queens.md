
 * ------

   The *n*-queens puzzle is the problem of placing *n* queens on an *n*×*n* chessboard such that no two queens attack each other.

   ![img](https://leetcode.com/static/images/problemset/8-queens.png)

   Given an integer *n*, return all distinct solutions to the *n*-queens puzzle.

   Each solution contains a distinct board configuration of the *n*-queens' placement, where `'Q'` and `'.'` both indicate a queen and an empty space respectively.

   For example,
   There exist two distinct solutions to the 4-queens puzzle:

   ```
   [
    [".Q..",  // Solution 1
     "...Q",
     "Q...",
     "..Q."],

    ["..Q.",  // Solution 2
     "Q...",
     "...Q",
     ".Q.."]
   ]

   ```

* *使用了Set对象结构。*


```javascript
/** Runtime: 145 ms / Beats 46.15%  （best: 105ms）
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
	let mainArr = [];
	let mapArr = [];
	let temp = [];
	for(let i=0; i<n; i++) {
		temp.push(i);
	}
	for(let i=0; i<n; i++){
		mapArr.push(new Set(temp));
	}
	let arr = [];
  
	perform(mapArr, arr);

	function perform(mapArr, arr){
		mapArr[0].forEach(function(v1, v2, set){
			let mapArr2 = deepCopy(mapArr);
			let arr2 = arr.slice();
			arr2.push(v1);
			if(arr2.length===n){
				return addResult(arr2);
			}
			mapArr2.shift();

			for(let i=0; i<mapArr2.length; i++){
				mapArr2[i].delete(v1);
				if(v1+i+1<n){
					mapArr2[i].delete(v1+i+1);
				}
				if(v1-i-1>=0){
					mapArr2[i].delete(v1-i-1);
				}
			}
			perform(mapArr2, arr2);
		});
	}

	function deepCopy(arr){
		let newArr = [];
		for(let i=0; i<arr.length; i++){
			newArr.push(new Set(arr[i]));
		}
		return newArr;
	}
	function addResult(arrTemp){
		let arr = [];
		for(let i=0; i<n; i++){
			let str = '';
			for(let j=0; j<n; j++){
				if(j===arrTemp[i]){
					str += 'Q';
				}else{
					str += '.';
				}
			}
			arr.push(str);
		}
		mainArr.push(arr);
	}
	return mainArr;
};
solveNQueens(9);
```





```javascript
/** Runtime: Time Limit Exceeded
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
	let arr = [];

	let map1 = new Map();

	let count = [];
	for(let i=0; i<n; i++){
		count.push(n);
	}

	put(map1, 0, count);
	function put(map, index, count){
		let status = false;

		for(let i=0; i<n; i++){
			let isContinue = false;
			let map2 = new Map(map);
			let count2 = count.slice();
			if(!map2.has(index*10+i)){
				map2.set(index*10+i, "Q");
				status = true;
				for(let j=0; j<n; j++){
					if(!map2.has(index*10+j)){
						map2.set(index*10+j, ".");
					}
				}
				for(let j=index+1; j<n; j++){
					if(!map2.has(j*10+i)){
						map2.set(j*10+i, ".");
						count2[j] -= 1;
					}
					if(i-j+index>=0 && !map2.has(j*10+i-j+index)){
						map2.set(j*10+i-j+index, ".");
						count2[j] -= 1;
					}
					if(i+j-index<n && !map2.has(j*10+i+j-index)){
						map2.set(j*10+i+j-index, ".");
						count2[j] -= 1;
					}
					if(count2[j] === 0){
						isContinue = true;
						break;
					}
				}
				if(isContinue){
					continue;
				}
				if(index+1 === n){
					let arrTemp = [];
					for(let k=0; k<n; k++){
						let strTemp = '';
						for(let l=0; l<n; l++){
							strTemp += map2.get(10*k+l);
						}
						arrTemp.push(strTemp);
					}
					arr.push(arrTemp);
				}else{
					put(map2, index+1, count2);
				}
			}
		}
		if(!status){
			return false;
		}
	}
	return arr;
};
```

