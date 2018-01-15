The count-and-say sequence is the sequence of integers with the first five terms as following:

```
1.     1
2.     11
3.     21
4.     1211
5.     111221

```

`1` is read off as `"one 1"` or `11`.
`11` is read off as `"two 1s"` or `21`.
`21` is read off as `"one 2`, then `one 1"` or `1211`.

Given an integer *n*, generate the *n*th term of the count-and-say sequence.

Note: Each term of the sequence of integers will be represented as a string.


 * **同等条件下，直接使用str[i]访问字符串的子字符，比str.charAt(i)要快。下面是速度比较：93ms — 135ms**

```javascript
/** Runtime: 93 ms
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
    let str = '1';
    return countCell(str, n-1);

    function countCell(str,n){
        if(n===0){
            return str;
        }else{
            let strNew='';
            let j=0;
            let k=0;
            for(let i=0; i<str.length; i++){
	            if(str[i] !== str[k]){
		            strNew += (j+str[k]);
		            j=1;
		            k=i;
	            }else {
		            j++;
	            }
            }
	        strNew += (j+str[k]);
            return countCell(strNew, n-1);
        }
    }
};
```

```Javascript
/** Runtime: 135 ms
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
    let str = '1';
    return countCell(str, n-1);

    function countCell(str,n){
        if(n===0){
            return str;
        }else{
            let strNew='';
            let j=0;
            let k=0;
            for(let i=0; i<str.length; i++){
	            if(str.charAt(i) !== str.charAt(k)){
		            strNew += (j+str.charAt(k));
		            j=1;
		            k=i;
	            }else {
		            j++;
	            }
            }
	        strNew += (j+str.charAt(k));
            return countCell(strNew, n-1);
        }
    }
};
```







