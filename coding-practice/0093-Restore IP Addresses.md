Given a string containing only digits, restore it by returning all possible valid IP address combinations.

For example:
Given `"25525511135"`,

return `["255.255.11.135", "255.255.111.35"]`. (Order does not matter)



​

```javascript
/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
	let sArr = [];
	for(let i=0; i<s.length; i++){
		sArr.push(parseInt(s[i]));
	}

	function iter(index, listNum){

	}

	// 验证单元是否有效
	function verify(arr){
		if(arr.length===0){return false;}
		if(arr[0]===0 && arr.length>1){//多位，0开头，返回false
			return false;
		}
		let temp=1;
		for(let i=0; i<arr.length; i++){
			temp*=arr[i];
			if(i<arr.length-1){
				temp*=10;
			}
		}
		if(temp>255){
			return false;
		}
		return true;
	}


};
```



