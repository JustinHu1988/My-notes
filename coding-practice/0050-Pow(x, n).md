
 * ------

   Implement [pow(*x*, *n*)](http://www.cplusplus.com/reference/valarray/pow/).

   **Example 1:**

   ```
   Input: 2.00000, 10
   Output: 1024.00000

   ```

   **Example 2:**

   ```
   Input: 2.10000, 3
   Output: 9.26100

   ```


```javascript
/** Runtime: 106 ms / Beats 42.47%
 * @param {string[]} strs
 * @return {string[][]}
 */
var myPow = function(x, n) {
    let result = 1;
    let arr = [];
    let temp = n;
    if(n>=0){
        while(temp>0){
            arr.push(temp%10);
            temp = Math.floor(temp/10);
        }
    }else{
        while(temp<0){
            arr.push(temp%10);
            temp = Math.ceil(temp/10);
        }
    }

    compute(0, x);
    function compute(index, x){
        if(n>=0){
            for(let i=0; i<arr[index]; i++){
                result *= x;
            }
        }else{
            for(let i=0; i>arr[index]; i--){
                result /= x;
            }
        }
        if(index+1 < arr.length){
            compute(index+1, x*x*x*x*x*x*x*x*x*x);
        }
    }
    
    return result;
};
```

