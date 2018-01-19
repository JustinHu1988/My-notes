
 * ------

   Given a non-negative integer represented as a **non-empty** array of digits, plus one to the integer.

   You may assume the integer do not contain any leading zero, except the number 0 itself.

   The digits are stored such that the most significant digit is at the head of the list.

```javascript
/** Runtime: 87 ms / beats 73.73%  (best 78ms)
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
	for(let i=digits.length-1; i>=0; i--){
		if(digits[i]<9){
			digits[i]++;
			break;
		}else{
			digits[i] = 0;
		}
	}
	if(digits[0] === 0){
		digits.unshift(1);
	}
	return digits;
};
```





