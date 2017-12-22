
 * Given *n* pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

```javascript
/**
 * 基本思路：从头开始按位遍历可能性：
 *  1. 除了首位和末位，每个位置都有两种选择
 *  2. 并且，当前位置往前数时，后括号数不能多于前括号
 *  3. 当前括号数达到n时，补齐后括号，并将该字符串添加到数组（需要去重）
 *
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
	let parArr = [];
	// 前括号数倒数
	let count = n;
	// 总数倒数
	let mainNum = 2*n;
	let str = '';
	let oddEven = 0;

	calculate(str, true, count, mainNum);

	function calculate(str, bool, count, mainNum){
		if(count<=0){ // 边界判定
			for(let j=str.length-1; j<2*n-1; j++){
				str += ")";
			}
			// 去重：每两次添加一次（回退半个括号时，再次生成的依然是相同的组合）
			if(oddEven%2===0){
				// 添加到数组
				parArr.push(str);
			}
			oddEven++;
			if(oddEven===2){
				oddEven=0;
			}
			return;
		}else{
			// 按位生成
			if(bool){
				str += "(";
				for(let j=0; j<2; j++){
					calculate(str, j, count-1, mainNum-1);
				}
			}else if(!bool){
				if(count< mainNum/2){
					str += ")";
					for(let j=0; j<2; j++){
						calculate(str, j, count, mainNum-1);
					}
				}
			}
		}
	}
	return parArr;
};

generateParenthesis(3);
```





