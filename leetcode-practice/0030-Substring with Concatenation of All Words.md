
 * You are given a string, **s**, and a list of words, **words**, that are all of the same length. Find all starting indices of substring(s) in **s** that is a concatenation of each word in **words** exactly once and without any intervening characters.

   For example, given:
   **s**: `"barfoothefoobarman"`
   **words**: `["foo", "bar"]`

   You should return the indices: `[0,9]`.

```javascript
/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
/**
 * 基本思路，根据words里元素的长度n，遍历起点不同，以n长度分段的字符串，逐一寻找匹配，并且标记目前已匹配项
    - 当所有项都匹配时，添加序号到目标数组
    - 当当前项与任一项都不匹配时，清空记录匹配项和序号用的数组，从下一项开始重新计算匹配
    - 当当前项所能匹配的项都已被占用时，清除匹配序列最前方与当前匹配项相同的项（以及其之前的所有匹配项），将当前匹配项添加到队尾
 */
var findSubstring = function(s, words) {
    let wordsC = words.sort();
    let len = words.length;
    let n = wordsC[0].length;
    let arr =new Array(len);
    let arr2 = [];
    let Oarr = [];
    let indTemp = 0;

    // 1. 遍历起点不同，以n长度分段的字符串：1）遍历起点
    for(let i = 0; i < n; i++){
        find(i);
    }
    // 2. 遍历起点不同，以n长度分段的字符串：2）遍历以n长度分段的字符串
    function find(index){
        let num = Math.floor((s.length-index)/n);
        arr =new Array(len);
        arr2 = [];
        for(let j =0; j<num; j++){
            if(len-arr2.length>num-j){
                return;
            }else{
                indTemp = j*n+index;
                get(index, j, num);
            }
        }
    }
    // 3. 当前这个长度为n的字符串，是否与words数组里的某一元素所匹配
    function get(index, j, num){
        let count =0;
        let x = 0;
        let de = false;
        let sCut = s.substr(indTemp,n);

        for(let i=0; i< len; i++){
            let dep = sCut.indexOf(wordsC[i])===0;
            if(!dep){
                continue;
            }else{
                if(dep){
                    count++;
                    if(x==0){
                        x = [i,wordsC[i]];
                    }
                }
                if(arr[i]!==1 && dep){
                    arr[i]=1;
                    arr2.push(i);
                    break;
                }
                if(x !== 0 && x[1] !== wordsC[i+1]){
                    de = true;
                    break;
                }
            }
        }
        if(count===0){ //如果当前片段与所有项都不匹配，断开重新计算
            arr =new Array(len);
            arr2 = [];
        }else if(de === true){ //如果当前片段有匹配，但匹配项已被占用，舍去第一个匹配项以及之前的部分
            let k =0;
            for(; k<arr2.length; k++){
                if(wordsC[arr2[k]] === x[1]){
                    break;
                }
                arr[arr2[k]] = 0;
            }
            for(let l = 0; l<=k; l++){
                arr2.shift();
            }
            arr2.push(x[0]);
        }
        // 全部匹配，添加目标序号
        if(arr2.length===len){
            Oarr.push(indTemp-(len-1)*n);
            arr[arr2[0]] = 0;
            arr2.shift();
        }
    }
    return Oarr;
};
```









