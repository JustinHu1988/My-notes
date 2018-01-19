
 * ------

   Given two binary strings, return their sum (also a binary string).

   For example,
   a = `"11"`
   b = `"1"`
   Return `"100"`.

   ​

```javascript
/** Runtime: 117 ms / beats 40.44% (best: 88 ms)
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
	let arr1 = a.length >= b.length ? a.split('') : b.split('');
	let arr2 = a.length < b.length ? a.split('') : b.split('');
	let arr3 = [];
	let carry = 0;
	let len = arr1.length;

	for(let i=0; i<len; i++){
		let temp;
		if(i<arr2.length){
			temp = parseInt(arr1[arr1.length-i-1]) + parseInt(arr2[arr2.length-i-1]) + carry;
		}else{
			temp = parseInt(arr1[arr1.length-i-1]) + carry;
		}
		arr3[i] = temp%2;
		carry = Math.floor(temp/2);
	}
	if(carry===1){
		arr3.push(1);
	}
	arr3.reverse()
	return arr3.join('');
};

addBinary("11", '1110');
```



- ​

```javascript
/** Runtime: 108 ms / beats 57.78% (best: 88 ms)
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
	let arr1 = a.length >= b.length ? a.split('') : b.split('');
	let arr2 = a.length < b.length ? a.split('') : b.split('');
  	let len = arr1.length;
	let arr3 = new Array(len);
	let carry = 0;
	
	for(let i=0; i<len; i++){
		let temp;
		if(i<arr2.length){
          	if(arr1[arr1.length-i-1] === '1' && arr2[arr2.length-i-1] === '1'){
                 temp = 2+carry;
            }else if(arr1[arr1.length-i-1] === '0' && arr2[arr2.length-i-1] === '0'){
                 temp = carry;    
            }else{
                temp = 1+carry;  
            }
		}else{
          	if(arr1[arr1.length-i-1] === '1'){
                 temp = 1+carry;
            }else if(arr1[arr1.length-i-1] === '0'){
                 temp = carry;    
            }
		}
		arr3[len-1-i] = temp%2;
		carry = Math.floor(temp/2);
	}
	if(carry===1){
		arr3.unshift(1);
	}
	return arr3.join('');
};

addBinary("11", '1110');
```





