
 * ------

   Validate if a given string is numeric.

   Some examples:
   `"0"` => `true`
   `" 0.1 "` => `true`
   `"abc"` => `false`
   `"1 a"` => `false`
   `"2e10"` => `true`

   **Note:** It is intended for the problem statement to be ambiguous. You should gather all requirements up front before implementing one.

* 最简单的js写法，可以使用isNaN()方法，不过这样练不到算法

```javascript
/** Runtime: 150 ms ／ beats 62.59% （best:  132ms）
 * @param {string} s
 * @return {boolean}
 */
var isNumber = function(s) {
  	let arr = s.split(' ');
  	let allWhiteSpace = true;
  	for(let i=0; i<arr.length; i++){
		if(arr[i].length !== 0){
			allWhiteSpace = false;
		}
	}
    return allWhiteSpace ? false : !isNaN(s);
}
```




* 下面是自行写法，写的有点复杂：

```javascript
/** Runtime: 153 ms ／ beats 53.24% （best:  132ms）
 * @param {string} s
 * @return {boolean}
 */
var isNumber = function (s) {
	let arr = s.split(' ');

	let arr2 = [];
	let times = 0;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].length !== 0) {
			times++;
			if (times === 2) {
				return false;
			}
			arr2.push(arr[i]);
		}
	}
	if (times === 0) {
		return false;
	}
	//已去除所有空格
	let str = arr2[0];
	for (let i = 0; i < str.length; i++) {
		if (!((str[i].charCodeAt(0) >= 48 && str[i].charCodeAt(0) <= 57) || str[i] === 'e' || str[i] === '.' || str[i] === '-' || str[i] === '+')) {
			return false;
		}
	}// 已排除所有无关字符
	//按'e'拆分
	arr2 = str.split('e');
	if (arr2.length > 2) {
		return false;
	} else if (arr2.length === 1) {
		if (arr2[0].length === 0) {
			return false;
		} else {
			return form(arr2, 1);
		}
	} else if (arr2.length === 2) {
		if (arr2[0].length === 0 || arr2[1].length === 0) {
			return false;
		} else {
			return form(arr2, 2);
		}
	}
	return true;

	function form(arr3, index) {
		for (let i = 0; i < index; i++) {
			//按'-'拆分
			let arr4 = arr3[i].split('-');
			if (arr4.length > 2 || (arr4.length === 2 && arr4[0].length !== 0) || arr4[arr4.length - 1].length === 0) {
				return false;
			} else {
				//按'+'拆分
				arr4 = arr4[arr4.length - 1].split('+');
				if (arr4.length > 2 || (arr4.length === 2 && arr4[0].length !== 0) || arr4[arr4.length - 1].length === 0) {
					return false;
				} else {
					//按'.'拆分
					arr4 = arr4[arr4.length - 1].split('.');
					if (i === 0) {
						if (arr4.length > 2 || (arr4[0].length === 0 && arr4[arr4.length - 1].length === 0)) {
							return false;
						}
					} else {
						if (arr4.length !== 1) {
							return false;
						}
					}
				}
			}
		}
		return true;
	}
};
```

