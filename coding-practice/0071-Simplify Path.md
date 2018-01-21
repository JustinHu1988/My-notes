
 * ------

   - Given an absolute path for a file (Unix-style), simplify it.

     For example,
     **path** = `"/home/"`, => `"/home"`
     **path** = `"/a/./b/../../c/"`, => `"/c"`

     ​

```javascript
/** Runtime: 99 ms / beats 67.57% (best: 92ms)
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function(path) {
	let arr = path.split('/');
	let newArr = [];
	
	for(let i=0; i<arr.length; i++){
		if(arr[i] === '..'){
			newArr.pop(arr[i]);
		}else if(arr[i] === '.' || arr[i] === ''){

		}else{
			newArr.push(arr[i]);
		}
	}

	return '/' + newArr.join('/');
};
```



​





