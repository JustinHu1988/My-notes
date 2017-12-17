Implement regular expression matching with support for `'.'` and `'*'`.


 * `'.'` Matches any single character.
 * `'*'` Matches zero or more of the preceding element.
 * The matching should cover the entire input string (not partial).
 * The function prototype should be:

    * `bool isMatch(const char *s, const char *p)`

```javascript
/** javascript
 * 思路：
 * 1. 将正则的字符串，按顺序分解成一个数组，其中元素结构为{arr:'a', num:1, fix:true/false}，arr代表连续的相同字符，num代表这个字符最少需要有几个，fix代表这个字符长度是否固定
 * 2. 执行match函数
 */

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
	let sArr = s.split("");
	let z=0;

	// 将p分解成一个数组，每项元素含有三个属性{arr:'a', num:1, fix:true/false}
	let pArrPre = p.split("");
	let pArr = [];
	for(let i=0; i<pArrPre.length; i++){
		if(i===0){
			pArr.push({arr:pArrPre[i], num:1, fix:true});
		}else if(i>0){
			if(pArrPre[i]==="*"){
				pArr[pArr.length-1].fix=false;
				pArr[pArr.length-1].num-=1;
			}else if(pArrPre[i] === pArr[pArr.length-1].arr){
				pArr[pArr.length-1].num+=1;
			}else{
				pArr.push({arr:pArrPre[i], num:1, fix:true});
			}
		}
	}

	// 执行match函数
	return match(sArr, pArr, z);

	function match(s, p, z){ // 以下，称p[z]为当前匹配项
		// 通用状态变量，用于循环递归函数时使用
		let status = false;

		// 匹配数组中，目前剩余需要匹配的最少字符数
		let remainLeast = 0;
		for(let i=z; i<pArr.length; i++){
			remainLeast += pArr[i].num;
		}

		// 边界判断：
		//  如果需要匹配的最少字符数，大于当前字符串数组s的长度，return false
		//  如果s的长度和最少需要匹配的字符数都为0，return true
		if(remainLeast>s.length){
			return false;
		}else if(s.length===0 && remainLeast===0){
			return true;
		}
		//  如果索引序号z超出数组长度，return false
		if(z>=p.length){
			return false;
		}

		// 先行匹配判断：
		// 当前匹配项（第z项）,如果num属性大于零，先验证"s字符串数组前num个字符"是否与"当前匹配项所含字符"相匹配。若不匹配，返回false；若匹配，继续验证
		for(let i=0; i<p[z].num; i++){
			if(!compare(p[z].arr, s[i])){
				return false;
			}
		}

		// 常规判断：
		// 当前匹配项的fix属性，true代表是长度固定的字符串，false代表是长度不固定的单字符序列（即含星号）
		if(p[z].fix === true){ //长度固定的单字符
			// 如果需要匹配的最小字符等于当前字符数量num并等于s所剩余字符，并且s剩余字符都与当前匹配项相匹配，return true。
			// 否则，从s中去掉已匹配的字符，将匹配项索引序号+1，再次执行match
			if(p[z].num === s.length && remainLeast === s.length && compare(p[z].arr,s[0])){
				return true;
			}else{
				return match(s.slice(p[z].num), p, z+1);
			}
		}else{  //长度不固定的单字符序列（即含星号）
			// 如果当前字符与s首字符相匹配，执行if内的判断。否则，执行else
			if(compare(p[z].arr, s[0])){
				if(p[z].arr==="."){ //当前匹配项为：.*
					// 边界判定：如果最小匹配数减去当前匹配项的num等于0，return true
					if(remainLeast-p[z].num === 0){
						return true;
					}
					// 循环+递归，遍历.*取每一个长度值的情况，再次执行后续match；
					// 若有后续match成功的情况，return true；若遍历所有情况后，后续的match无一成功，则return false
					for(let i=0; i<s.length; i++){
						status = match(s.slice(p[z].num+i), p, z+1);
						if(status === true){
							return true;
						}
					}
					return false;
				}else{ //当前匹配项为：char*
					// 检测匹配的变动范围：
					// s[0]开始连续同一字符的数量，减去当前匹配项的最小匹配数量num，所得差值i，就是当前匹配项所能匹配的可能性数量
					let i=0;
					for(; i<s.length; i++){
						if(s[p[z].num+i]!==p[z].arr){
							break;
						}
					}
					i+=1;
					// 遍历这个可能性，从0到i，执行后续match. 若有后续match成功的情况，return true；若遍历所有情况后，后续的match无一成功，则return false
					for (let j=0; j<i; j++){
						status = match(s.slice(p[z].num+j), p, z+1);
						if(status === true){
							return true;
						}
					}
					return false;
				}
			}else{ // 当前匹配项与s首字符不匹配，匹配项序号+1，再次执行match
				return match(s, p, z+1);
			}
		}
	};

	// compare函数，用于判断单字符是否匹配
	function compare(num1, num2){
		if(num1 === "." || num1 === num2){
			return true;
		}else{
			return false;
		}
	}
};
```

