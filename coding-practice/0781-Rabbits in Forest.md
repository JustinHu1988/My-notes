In a forest, each rabbit has some color. Some subset of rabbits (possibly all of them) tell you how many other rabbits have the same color as them. Those `answers` are placed in an array.

Return the minimum number of rabbits that could be in the forest.

```
Examples:
Input: answers = [1, 1, 2]
Output: 5
Explanation:
The two rabbits that answered "1" could both be the same color, say red.
The rabbit than answered "2" can't be red or the answers would be inconsistent.
Say the rabbit that answered "2" was blue.
Then there should be 2 other blue rabbits in the forest that didn't answer into the array.
The smallest possible number of rabbits in the forest is therefore 5: 3 that answered plus 2 that didn't.

Input: answers = [10, 10, 10]
Output: 11

Input: answers = []
Output: 0

```

**Note:**

1. `answers` will have length at most `1000`.
2. Each `answers[i]` will be an integer in the range `[0, 999]`.





解法1

```javascript
/** Runtime: 60ms
 * @param {number[]} answers
 * @return {number}
 */
var numRabbits = function(answers) {
    let map = new Map(), count = 0
    for(let i = 0; i < answers.length; i++){
        map.set(answers[i], map.has(answers[i]) ? map.get(answers[i])+1 : 1)
    }
    map.forEach(function(value, key, map){  
        count += Math.ceil(value/(key+1))*(key+1)
    })
    return count
};
```



解法2​

```javascript
/**
 * @param {number[]} answers
 * @return {number}
 */
var numRabbits = function(answers) {
    answers.sort()
    let temp = 0, count = 0
    for(var i=0; i<answers.length;){
        temp=answers[i]
        count+=temp+1
        if(temp===answers[i+temp]){
            i+=temp+1
        }else{
            while(temp===answers[i]){i++}
        }    
    }
    return count
};
```



