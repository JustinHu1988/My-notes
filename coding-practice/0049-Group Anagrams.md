
 * ------

   Given an array of strings, group anagrams together.

   For example, given: `["eat", "tea", "tan", "ate", "nat", "bat"]`, 
   Return:

   ```
   [
     ["ate", "eat","tea"],
     ["nat","tan"],
     ["bat"]
   ]
   ```

   **Note:** All inputs will be in lower-case.




- 使用质因数分解，来判断每个字符串的特征值：

```javascript
/** Runtime: 160 ms / Beats 100%
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    let tempArr = {};
    let objArr = [];
    
    let plusObj = {
        a:2,
        b:3,
        c:5,
        d:7,
        e:11,
        f:13,
        g:17,
        h:19,
        i:23,
        j:29,
        k:31,
        l:37,
        m:41,
        n:43,
        o:47,
        p:53,
        q:59,
        r:61,
        s:67,
        t:71,
        u:73,
        v:79,
        w:83,
        x:89,
        y:97,
        z:101
    }
    let count =0;
    for(let i=0; i<strs.length; i++){
        let temp = 1;
        for(let j=0;j<strs[i].length; j++){
            temp *= plusObj[strs[i][j]];
        }
        if(tempArr[temp] === undefined){
            tempArr[temp] = count++;
            objArr.push([strs[i]]);
        }else{
            objArr[tempArr[temp]].push(strs[i]);
        }
    }
    return objArr;
};

groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]);
```

- 在上述方法中，将对象tempArr替换为Map对象：

```javascript
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    let tempArr = new Map();
    let objArr = [];
    
    let plusObj = {
        a:2,
        b:3,
        c:5,
        d:7,
        e:11,
        f:13,
        g:17,
        h:19,
        i:23,
        j:29,
        k:31,
        l:37,
        m:41,
        n:43,
        o:47,
        p:53,
        q:59,
        r:61,
        s:67,
        t:71,
        u:73,
        v:79,
        w:83,
        x:89,
        y:97,
        z:101
    }
    let count =0;
    for(let i=0; i<strs.length; i++){
        let temp = 1;
        for(let j=0;j<strs[i].length; j++){
            temp *= plusObj[strs[i][j]];
        }
        let bool = tempArr.get(temp);
        if(bool === undefined){
            tempArr.set(temp, count++);
            objArr.push([strs[i]]);
        }else{
            objArr[bool].push(strs[i]);
        }
    }
    return objArr;
};
```



- 使用分解、排序并重组字符串的方法：

```Javascript
/** Runtime: 213 ms / Beats 87.19%
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    let strArr = [];
    let tempArr = {};
    let objArr = [];
  	let count =0;
    for(let i=0; i<strs.length; i++){
        strArr.push(strs[i].split(''));
        strArr[i].sort();
        strArr[i] = strArr[i].join('');
        if(tempArr[strArr[i]] === undefined){
            tempArr[strArr[i]] = count++;
            objArr.push([strs[i]]);
        }else{
            objArr[tempArr[strArr[i]]].push(strs[i]);
        }
    }
    return objArr;
};
```

