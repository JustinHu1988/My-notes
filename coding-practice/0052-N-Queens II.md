
 * ------

   Follow up for N-Queens problem.

   Now, instead outputting board configurations, return the total number of distinct solutions.

   ![img](https://leetcode.com/static/images/problemset/8-queens.png)

   ​

* *使用了Set对象结构。* 


```javascript
/** Runtime: 142 ms / beats 21.21%. (best: 86 ms) 与best有距离，应该还可以优化
 * @param {number} n
 * @return {number}
 */
var totalNQueens = function(n) {
	let mainNum = 0;
	let mapArr = [];
	let temp = [];
	for(let i=0; i<n; i++) {
		temp.push(i);
	}
	for(let i=0; i<n; i++){
		mapArr.push(new Set(temp));
	}
	
	perform(mapArr, 0);
	return mainNum;
	function perform(mapArr, count){
		mapArr[0].forEach(function(v1, v2, set){
			let mapArr2 = deepCopy(mapArr);
			let count2 = count;
			count2++;
			if(count2===n){
				return mainNum++;
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
			perform(mapArr2, count2);
		});
	}
	function deepCopy(arr){
		let newArr = [];
		for(let i=0; i<arr.length; i++){
			newArr.push(new Set(arr[i]));
		}
		return newArr;
	}
};
```



