
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
    let arr= [];
    let countArr = [];
    let count = 0;
    let x = 0;
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

    // 初始化的除数累加单位的数组和商累加单位的数组
    arr.push(divisorC);
    countArr.push(1);

    // 计算商
	if(divisorC>dividendC){
		return 0;
	}else{
        return plusFun(0, 0, 0, 0);
	}  

    // 计算商的函数，（循环累加，若累加10次依然小于被除数，接下来就按10倍除数向上累加，以此类推。若大于被除数时，回退一次累加，再将除数倍率返回到1/10，继续累加。直到累加单位恢复为除数本身，当再次大于被除数时，返回累计的商）
	function plusFun(x, index, thisnum, tempCount){
		for(let i=0; i<10; i++){
			x +=arr[index];
            thisnum += arr[index];
			if(x >dividendC){
                if(index===0){
                    if(plus){
                        if(count>2147483647){
                            return 2147483647;
                        }else{
                            return count;
                        }
                    }else{
                        if(-count<-2147483648){
                            return -2147483648;
                        }else{
                            return -count;
                        }
                    }
                }else{
                    return plusFun(x-arr[index], index-1, 0, 0);
                }
				
			}
            count += countArr[index];
            tempCount += countArr[index];
		}
        if(x<dividendC){
            arr.push(thisnum);
            countArr.push(tempCount);
            return plusFun(x, index+1, 0, 0);
        }
	}
};


divide(2147483647,-2);
```









