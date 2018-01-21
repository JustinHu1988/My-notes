
 * ------

   Given an array of words and a length *L*, format the text such that each line has exactly *L* characters and is fully (left and right) justified.

   You should pack your words in a greedy approach; that is, pack as many words as you can in each line. Pad extra spaces `' '` when necessary so that each line has exactly *L* characters.

   Extra spaces between words should be distributed as evenly as possible. If the number of spaces on a line do not divide evenly between words, the empty slots on the left will be assigned more spaces than the slots on the right.

   For the last line of text, it should be left justified and no extra space is inserted between words.

   For example,
   **words**: `["This", "is", "an", "example", "of", "text", "justification."]`
   **L**: `16`.

   Return the formatted lines as:

   ```
   [
      "This    is    an",
      "example  of text",
      "justification.  "
   ]

   ```

   **Note:** Each word is guaranteed not to exceed *L* in length.

   ​

   - *写法上较为复杂，执行速度可以。今后可以抽时间学习一下别人的写法。*

```javascript
/**　Runtime: 87 ms / beats 60.53%  (best: 76ms)
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
var fullJustify = function(words, maxWidth) {
	let mainArr = [], tempCount = 0, start = 0, end = 0, status = false;
	for(let i=0; i<words.length; i++){
		if(words[i].length!==0){
			if(tempCount+words[i].length<maxWidth){
				tempCount += words[i].length+1;
				end = i;
				status = false;
			}else{
				if(tempCount+words[i].length===maxWidth){
					tempCount += words[i].length;
					end = i;
					status = true;
				}
				if(start!==words.length-1){
					let str = '';
					let len = 0;
					let count = -1;
					for(let j=start; j<=end;j++){
						len+=words[j].length;
						count++;
					}
					if(count>0){
						let whiteNum = maxWidth - len;
						let small = Math.floor(whiteNum/count);
						let bigNum = whiteNum%count;
						let whiteStr1= "";
						let whiteStr2= "";
						for(let j=0; j<small; j++){
							whiteStr2+=' ';
						}
						whiteStr1 = whiteStr2 + ' ';
						for(let j=start; j<=end; j++){
							str+=words[j];
							if(j === end){
								mainArr.push(str);
							}else if(j-start+1 > bigNum){
								str+=whiteStr2;
							}else{
								str+=whiteStr1;
							}
						}
					}else if(count===0){
						str+=words[start];
						for(let k=str.length; k<maxWidth; k++){
							str+=' ';
						}
						mainArr.push(str);
					}
					start = ++end;
					tempCount = status ? 0 : words[i].length+1;
				}
			}
		}
		if(i===words.length-1){
			let str = '';
			for(let j=start; j<words.length; j++){
				str+=words[j];
				if(j === words.length-1){
					for(let k=str.length; k<maxWidth; k++){
						str+=' ';
					}
					mainArr.push(str);
				}else{
					str+=' ';
				}
			}
		}
	}
	return mainArr;
};
```



​





