
 * ------

   Implement wildcard pattern matching with support for `'?'` and `'*'`.

   ```
   '?' Matches any single character.
   '*' Matches any sequence of characters (including the empty sequence).

   The matching should cover the entire input string (not partial).

   The function prototype should be:
   bool isMatch(const char *s, const char *p)

   Some examples:
   isMatch("aa","a") → false
   isMatch("aa","aa") → true
   isMatch("aaa","aa") → false
   isMatch("aa", "*") → true
   isMatch("aa", "a*") → true
   isMatch("ab", "?*") → true
   isMatch("aab", "c*a*b") → false

   ```



```javascript
/** Time limit exceeded
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    let pArr = p.split('');
    let pTemp = '';
    if(pArr.length > 0){
        pTemp = pArr[0];
    }else if(s.length ===0){
        return true;
    }else{
        return false;
    }
    

    for(let i=1; i<pArr.length; i++){
        if(pArr[i] === pArr[i-1] && pArr[i-1] === "*"){
            continue;
        }else{
            pTemp+=pArr[i];
        }
    }
    console.log(pTemp);
    
    return matchCell(0,0);


    function matchCell(i,j){
        if(i===s.length && j===pTemp.length){
            return true;
        }else if(i<=s.length && j<=pTemp.length){
            if(compare(s[i], pTemp[j])){
                return matchCell(i+1, j+1);
            }else if(pTemp[j] === "*"){
                for(let k=0;k<s.length-i+1; k++){
                    let temp = matchCell(i+k, j+1);
                    if(temp===true){
                        return true;
                    }
                }
                return false;
            }else{
                return false;
            }
        }else{
            return false;
        }
        
    }

    function compare(a,b){
        if(a===b || a==="?" || b==="?"){
            return true;
        }else{
            return false;
        }
    }
};
isMatch("aa", "aa");

isMatch("abbabaaabbabbaababbabbbbbabbbabbbabaaaaababababbbabababaabbababaabbbbbbaaaabababbbaabbbbaabbbbababababbaabbaababaabbbababababbbbaaabbbbbabaaaabbababbbbaababaabbababbbbbababbbabaaaaaaaabbbbbaabaaababaaaabb", "**aa*****ba*a*bb**aa*ab****a*aaaaaa***a*aaaa**bbabb*b*b**aaaaaaaaa*a********ba*bbb***a*ba*bb*bb**a*b*bb");


```

