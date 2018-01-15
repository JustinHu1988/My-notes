
 * Given two non-negative integers `num1` and `num2` represented as strings, return the product of `num1` and `num2`.

   **Note:**

   1. The length of both `num1` and `num2` is < 110.
   2. Both `num1` and `num2` contains only digits `0-9`.
   3. Both `num1` and `num2` does not contain any leading zero.
   4. You **must not use any built-in BigInteger library** or **convert the inputs to integer** directly.

* 思路：拆分字符串，按位相乘，对位摆放到目标数组中，整理进位，然后合并return。



```javascript
/** Runtime: 150ms / Beats 47.78%
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
  if(num1==="0" || num2==="0"){
     return "0";
    }
    let finalArr = [];
  	let numArr1 = num1.split("");
  	let numArr2 = num2.split("");
  	numArr1.reverse();
  	numArr2.reverse();

    for(let i = 0; i<numArr1.length; i++){
        for(let j=0; j<numArr2.length; j++){
            let num = parseInt(numArr1[i])*parseInt(numArr2[j]);
            finalArr[i+j] = finalArr[i+j]===undefined ? num : finalArr[i+j]+num;
            reorder(i+j);
        }
    }
    
    function reorder(index){
        if(finalArr[index]>9){
          	finalArr[index+1] = finalArr[index+1]===undefined ? Math.floor(finalArr[index]/10) : finalArr[index+1]+Math.floor(finalArr[index]/10);
            finalArr[index] = finalArr[index]%10;
            if(finalArr[index+1]>9){
                return reorder(index+1);
            }
        }else{
            return;
        }
    };
  finalArr.reverse();
  return finalArr.join('');
};
multiply("98","9");
```



```javascript
/** Runtime: 136ms / Beats 63.33%
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
    if (num1 === "0" || num2 === "0") {
        return "0";
    }
    let finalArr = [];
    let numArr1 = num1.split("");
    let numArr2 = num2.split("");
    numArr1.reverse();
    numArr2.reverse();

    for (let i = 0; i < numArr1.length; i++) {
        for (let j = 0; j < numArr2.length; j++) {
            let num = parseInt(numArr1[i]) * parseInt(numArr2[j]);
            finalArr[i + j] = finalArr[i + j] === undefined ? num : finalArr[i + j] + num;
        }
    }

    reorder(0);
    function reorder(index) {
        if (finalArr[index] > 9) {
            finalArr[index + 1] = finalArr[index + 1] === undefined ? Math.floor(finalArr[index] / 10) : finalArr[index + 1] + Math.floor(finalArr[index] / 10);
            finalArr[index] = finalArr[index] % 10;
        }
        if (finalArr[index] !== undefined) {
            return reorder(index + 1);
        }
    };
    finalArr.reverse();
    return finalArr.join('');
};
multiply("6", "82503");
```



```javascript
/** Runtime: 130ms / Beats 66.67%
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
    if (num1 === "0" || num2 === "0") {
        return "0";
    }
    let finalArr = [];
    let numArr1 = num1.split("");
    let numArr2 = num2.split("");
    for(let i=0; i<numArr1.length;i++){
        numArr1[i] = parseInt(numArr1[i]);
    }
    for(let i=0; i<numArr2.length;i++){
        numArr2[i] = parseInt(numArr2[i]);
    }
    numArr1.reverse();
    numArr2.reverse();

    for (let i = 0; i < numArr1.length; i++) {
        for (let j = 0; j < numArr2.length; j++) {
            let num = numArr1[i] * numArr2[j];
            finalArr[i + j] = finalArr[i + j] === undefined ? num : finalArr[i + j] + num;
        }
    }

    reorder(0);
    function reorder(index) {
        if (finalArr[index] > 9) {
            finalArr[index + 1] = finalArr[index + 1] === undefined ? Math.floor(finalArr[index] / 10) : finalArr[index + 1] + Math.floor(finalArr[index] / 10);
            finalArr[index] = finalArr[index] % 10;
        }
        if (finalArr[index] !== undefined) {
            return reorder(index + 1);
        }
    };
    finalArr.reverse();
    return finalArr.join('');
};
multiply("6", "82503");
```





```javascript
/** Runtime: 110ms / Beats 95.56%
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
    if (num1 === "0" || num2 === "0") {
        return "0";
    }
    let finalArr = [];
    let numArr1 = num1.split("");
    let numArr2 = num2.split("");
    for(let i =0; i<numArr1.length+numArr2.length; i++){
        if(numArr1[i]!==undefined){
            numArr1[i] = parseInt(numArr1[i]);
        }
        if(numArr2[i]!==undefined){
            numArr2[i] = parseInt(numArr2[i]);
        }
        finalArr[i] = 0;
    }
    numArr1.reverse();
    numArr2.reverse();

    for (let i = 0; i < numArr1.length; i++) {
        for (let j = 0; j < numArr2.length; j++) {
            let num = numArr1[i] * numArr2[j];
            finalArr[i + j] = finalArr[i + j] + num;
        }
    }
    reorder(0);
    function reorder(index) {
        if (finalArr[index] > 9) {
            finalArr[index + 1] = finalArr[index + 1] === undefined ? Math.floor(finalArr[index] / 10) : finalArr[index + 1] + Math.floor(finalArr[index] / 10);
            finalArr[index] = finalArr[index] % 10;
        }
        if (finalArr[index] !== undefined) {
            return reorder(index + 1);
        }
    };
    
    finalArr.reverse();
    if(finalArr[0] === 0){
        finalArr.shift();
    }
    return finalArr.join('');
};
multiply("6", "82503");
```

- 实际上，运行速度也都差不多