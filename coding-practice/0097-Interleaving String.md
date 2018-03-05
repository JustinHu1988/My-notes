Given *s1*, *s2*, *s3*, find whether *s3* is formed by the interleaving of *s1* and *s2*.

For example,
Given:
*s1* = `"aabcc"`,
*s2* = `"dbbca"`,

When *s3* = `"aadbbcbcac"`, return true.
When *s3* = `"aadbbbaccc"`, return false.



*解题思路：见代码注释*

```javascript
/** Runtime: 64 ms ／ beats: 100.00%
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function(s1, s2, s3) {
	let s1Len = s1.length, s2Len = s2.length, s3Len = s3.length;
	// status用于判定是否已找到匹配
  	let status = false;
	// 先行判定长度是否吻合
	if(s1Len+s2Len !== s3Len){
		return status;
	}

	compute(0,0,0);

	function compute(i,j,k){
		if(!status && i <= s1Len && j <= s2Len){ // 如果还未找到匹配，执行。若已找到匹配，返回。
			if(i === s1Len && j === s2Len && k === s3Len){ // 是否满足匹配条件
				status = true;
				return;
			}
			if(s3[k]!==s1[i] && s3[k]!==s2[j]){ // 若当前字符不匹配，返回上一层
				return;
			}
			if(s1[i] === s2[j]){ // 如果两个子字符串当前候选字符相同，执行大括号内容；若不同，则直接作匹配判断，进入下一轮
				if(s3[k] !== s3[k+1]){ // 判定目标字符串的当前字符和后续字符是否相同，若不同，则逐一试验两子字符串的字符进行匹配，继续递归。
					if(s3[k+1]===s1[i+1]){
						compute(i+2, j, k+2);
					}
					if(s3[k+1]===s2[j+1]){
						compute(i, j+2, k+2);
					}
				}else{ // 若目标字符串的当前字符和后续字符相同，则找到下一个不同字符的所在位置，并对两个子字符串也做同样操作。按照下一个不同字符的位置，进行匹配判定，继续递归。
					let kT = k+1, jT = j+1, iT = i+1;
					while(s3[kT] === s3[k])
						kT++;
					while(s1[iT] === s1[i])
						iT++;
					while(s2[jT] === s2[j])
						jT++;

					if(s1[iT]=== s3[kT] && iT-i<=kT-k){
						compute(iT, j+kT-k-(iT-i), kT);
					}
					if(s2[jT]=== s3[kT] && jT-j<=kT-k){
						compute(i+kT-k-(jT-j), jT, kT);
					}
				}
			}else{
				if(s3[k]===s1[i]){
					return compute(i+1, j, k+1);
				}else if(s3[k]===s2[j]){
					return compute(i, j+1, k+1);
				}else{
					return;
				}
			}
		}else{
			return;
		}
	}
	return status;
};
```



