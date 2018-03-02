Given a string containing only digits, restore it by returning all possible valid IP address combinations.

For example:
Given `"25525511135"`,

return `["255.255.11.135", "255.255.111.35"]`. (Order does not matter)



​

```javascript
/** Runtime: 68 ms / beats 100.00%
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
	let objArr = [];
	let len = s.length;

	iter(0, 0, [], '', 0);

	return objArr;

	function iter(index, listNum, tempStr, tempArr, count) {
		// 判定剩余字符数是否超过限制
		if((4-count)*3<len-index){
			return false;
		}
		if(count<3){ // ip地址前三单元
			tempStr+=s[index];
			if(verify(tempStr)){
				if(listNum<2){
					iter(index+1, 0, '', tempArr+tempStr+'.', count+1);
					iter(index+1, listNum+1, tempStr, tempArr, count);
				}else if(listNum===2){
					iter(index+1, 0, '', tempArr+tempStr+'.', count+1);
				}else{
					return;
				}
			}
		}else{ // ip地址最后一单元
			for(let i=index;i<s.length;i++){
				tempStr+=s[i];
			}
			if(verify(tempStr)){
				tempArr+=tempStr;
				return objArr.push(tempArr);
			}else{
				return false;
			}
		}
	}

	// 验证单元是否有效
	function verify(tempStr) {
		if (tempStr.length === 0) {
			return false;
		}
		if (tempStr[0] === '0' && tempStr.length > 1) {//多位，0开头，返回false
			return false;
		}
		if (parseInt(tempStr) > 255) {
			return false;
		}
		return true;
	}
}
restoreIpAddresses("010010");
```



