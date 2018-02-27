1. A message containing letters from `A-Z` is being encoded to numbers using the following mapping:

   ```
   'A' -> 1
   'B' -> 2
   ...
   'Z' -> 26

   ```

   Given an encoded message containing digits, determine the total number of ways to decode it.

   For example,
   Given encoded message `"12"`, it could be decoded as `"AB"` (1 2) or `"L"` (12).

   The number of ways decoding `"12"` is 2.

   ​

```javascript
/** Runtime: 104 ms / beats 63.96%
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
	let finalNum = 1;
	let arr = [];
	let countArr =[];
	// 边界判定
	if(s[0]==='0' || s.length===0){
		return 0;
	}

	// 将字符串转换为数字数组
	for(let i=0; i<s.length; i++){
		arr[i]=parseInt(s[i]);
		// 判定含连续1和2的序列，并特别注意数字0的判定（0的情况较多，end属性也是为此设置的判定之一）
		if(arr[i]<=2 && arr[i]>0){
			if(arr[i-1]<=2 && arr[i-1]>0){
				countArr[countArr.length-1].num++;
			}else{
				countArr.push({num:1, end:0});
			}
		}else if(arr[i]!==0){
			if(arr[i-1]===1 || (arr[i-1]===2 && arr[i]<7)){
				countArr[countArr.length-1].end = 1;
			}
		}else if(arr[i]===0){
			if(arr[i-1]===0 || arr[i-1]>2){
				return 0;
			}else if(arr[i-1]===1 || arr[i-1]===2){
				countArr[countArr.length-1].end = -1;
			}
		}
	}
	// 逐一计算序列的解码可能性，然后全部相乘即得出结论
	for(let i=0; i<countArr.length; i++){
		finalNum *= compute(countArr[i].num+countArr[i].end);
	}
	return finalNum;
	// 计算连续序列的可能性
	function compute(num){
		let num1 = 1;
		let num2 = 2;

		if(num===1 || num===0){
			return 1;
		}else if(num===2){
			return 2;
		}else{
			for(let i=3; i<=num; i++){
				if(num1>num2){
					num2 += num1;
				}else{
					num1 += num2;
				}
			}
		}
		return num1>num2 ? num1 : num2;
	}
};
numDecodings("10");
```



