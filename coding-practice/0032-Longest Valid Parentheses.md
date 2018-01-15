
 * Given a string containing just the characters `'('` and `')'`, find the length of the longest valid (well-formed) parentheses substring.

   For `"(()"`, the longest valid parentheses substring is `"()"`, which has length = 2.

   Another example is `")()())"`, where the longest valid parentheses substring is `"()()"`, which has length = 4.

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
	let sCopy = s.split("");
	let count = 0;
	let tempNum = 0;
	let num = 0;
    // 正向查找
	for(let i=0; i<s.length; i++){
		if(sCopy[i]==="("){
			count++;
			tempNum++;
		}else{
			count--;
			tempNum++;
		}
		if(count<0){
			if(num<tempNum-1){
				num = tempNum-1;
			}
			tempNum=0;
			count=0;
		}else if(count===0){
			if(num<tempNum){
				num = tempNum;
			}
		}
	}
	// 反向查找
	if(count>0){
		count=0;
		tempNum=0;
		for(let i=s.length-1; i>=0; i--){
			if(sCopy[i]===")"){
				count++;
				tempNum++;
			}else{
				count--;
				tempNum++;
			}
			if(count<0){
				if(num<tempNum-1){
					num = tempNum-1;
				}
                tempNum = 0;
                count = 0;
			}
		}
	}
	return num;
};
```









