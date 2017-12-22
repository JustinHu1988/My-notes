
 * Divide two integers without using multiplication, division and mod operator.

   If it is overflow, return MAX_INT.

```javascript
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function(dividend, divisor) {
	let dividendC=dividend, divisorC = divisor;
	let temp = 0;
	let i=0;
	let plus = true;
	// 把被除数和除数转化为正数， 结果符号存在plus里
	if(dividend<0){
		dividendC = -dividend;
		plus = !plus;
	}
	if(divisor<0){
		divisorC = -divisor;
		plus = !plus;
	}


	let num = 0;
	if(divisorC>dividendC){
		return 0;
	}else{
		for(;i<dividend+1; i++){
			temp+=divisor;
			if(temp>dividend){
				max(i);
				return num;
			}
		}
	}

	function plusFun(x){
		for(;i<dividend+1; i+x){
			temp+=divisor;
			if(temp>dividend){
				max(i);
				return num;
			}
		}
	}


	function max(i){
		if(i>2147483647){
			num=2147483647;
		}else if(i<-2147483648){
			num=-2147483648;
		}else{
			num = i;
		}
	}
};

divide(2147483647,-2);
```





