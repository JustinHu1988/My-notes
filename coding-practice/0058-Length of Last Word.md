
 * ------

   Given a string *s* consists of upper/lower-case alphabets and empty space characters `' '`, return the length of last word in the string.

   If the last word does not exist, return 0.

   **Note:** A word is defined as a character sequence consists of non-space characters only.

   **Example:**

   ```
   Input: "Hello World"
   Output: 5
   ```




 下面两种方法，运行速度与best基本一致

```javascript
/** Runtime: 79 ms / beat:78.45%  (best: 75ms)
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
	let count = 0;
	for(let i=s.length-1; i>=0; i--){
		if(s[i]!==' '){
			count++;
		}else if(count!==0){
			break;
		}
	}
	return count;
};
```



```javascript
/** Runtime: 84 ms / beat:69.26%  (best: 75ms)
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
	let arr = s.split(' ');
	let len = arr.length;
  	while(!arr[len-1] && len>1){
        len--;
    }
	return arr[len-1].length;
};
```







