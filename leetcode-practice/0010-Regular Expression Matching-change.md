
 * Regular Expression Matching的变体，下面的式子适用于*代表任意个数的字母，.可以代表任意单个字母的模式
 * 由于与第10题的原义不符，因此作为一道新题先存在这里备份。
 * 代码未验证！！！

```javascript
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
		let sArr = s.split("");
		let pArr = p.split("");
		let pSec = p.split("*");
		let subArr = [];
		for(let i=0; i<pSec.length; i++){
			subArr.push(pSec[i].split(""));
		}

		let len1 = sArr.length;
		let len3 = 0;
		let asterArr = [];
		for(let i=0;i<pSec.length; i++){
			len3 += pSec[i].length;
		}
		for(let i=0; i<pArr.length; i++){
			if(pArr[i] === "*"){
				asterArr.push({str:pArr[i], index:i});
			}
		}

		let differ = len1 - len3;
		let i = 0;


		if(asterArr.length === 0){ // 没有*的情况下，判断是否匹配
			console.log(0);
			if(sArr.length === pArr.length){
				for(let i=0; i<sArr.length; i++){
					if(sArr[i] !== pArr[i] && pArr[i] !== "."){
						return false;
					}
				}
				return true;
			}else{
				return false;
			}
		}else{ // 有*的情况下，判断是否匹配
			return judge(s,i,differ);
		}


		function judge(s,i,differ){
			if(pSec[i].length===0){
				if(i<pSec.length-1){
					judge(s.substr(pSec[i].length),i+1,differ);
				}else if(i===pSec.length-1){
					return true;
				}
			}else{
				if(i===0 && indexOfR(sArr, subArr[i])!==0){
					console.log(2,subArr[i]);
					return false;
				}
				if(i<pSec.length-1){
					if(indexOfR(sArr, subArr[i])===-1){
						console.log(3);
						return false;
					}else{
						for(let j=0; j<differ; j++){
							let subJudge = judge(s.substr(pSec[i].length+indexOfR(sArr, subArr[i])+j),i+1,differ-indexOfR(sArr, subArr[i])-j);
							if(subJudge === true){
								console.log(4);
								return true;
							}
						}
					}
				}else if(i===pSec.length-1){
					if(indexOfR(sArr, subArr[i])===-1){
						console.log(6);
						return false;
					}else{
						if(indexOfR(sArr, subArr[i])+pSec[i].length === s.length){
							return true;
						}else{
							return false;
						}
					}
				}else{
					console.log(5);
					return true;
				}
			}

			console.log(6);
			return false;
		}
		function indexOfR(sArr, subArr){
			let subMatch = false;
			let index = -1;
			for(let i=0; i<sArr.length; i++){
				for(let j=0; j<subArr.length; j++){
					if(subArr[j] !== sArr[i+j] && subArr[j]!=="."){
						break;
					}
					if(j=== subArr.length-1 && (subArr[j] === sArr[i+j] || subArr[j]===".")){
						subMatch = true;
						index = i;
						break;
					}
				}
				if(subMatch === true){
					break;
				}
			}
			return index;
		}
	};

isMatch("aa", ".*");
```
