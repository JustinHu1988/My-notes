
 * Given a digit string, return all possible letter combinations that the number could represent.

```javascript
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
	let digArr = digits.split('');
	let oArr = [];
	let strArr = [];
	// 获取候选字符数列
	for(let i =0; i<digArr.length; i++){
		getLetter(digArr, i);
	}
	// 边界判定
	if(oArr.length === 0){
		return strArr;
	}
	// 获取letter组合字符串
	formLetter(oArr, 0, "");
	return strArr;

	function getLetter(digArr, i){
		if(i===digArr.length){
			return;
		}else{
			let temp = [];
			switch (digArr[i]){
				case '2':
					temp.push("a", "b", "c");
					oArr.push(temp);
					break;
				case '3':
					temp.push("d", "e", "f");
					oArr.push(temp);
					break;
				case '4':
					temp.push("g", "h", "i");
					oArr.push(temp);
					break;
				case '5':
					temp.push("j", "k", "l");
					oArr.push(temp);
					break;
				case '6':
					temp.push("m", "n", "o");
					oArr.push(temp);
					break;
				case '7':
					temp.push("p", "q", "r", "s");
					oArr.push(temp);
					break;
				case '8':
					temp.push("t", "u", "v");
					oArr.push(temp);
					break;
				case '9':
					temp.push("w", "x", "y", "z");
					oArr.push(temp);
					break;
			}
		}
	}
	function formLetter(oArr, num, strTemp){
		if(num === oArr.length){
			strArr.push(strTemp);
			return;
		}else{
			for(let i=0; i<oArr[num].length; i++){
				let temp = strTemp + oArr[num][i];
				formLetter(oArr, num+1, temp);
			}
		}
	}
};
letterCombinations("242");
```





