
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

```javascript
/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
var fullJustify = function(words, maxWidth) {
	let mainArr = [];
	let tempCount = 0;
	let start = 0;
	let end = 0;
	for(let i=0; i<words.length; i++){
		if(tempCount<maxWidth+1){
			tempCount += words[i].length+1;
			end = i;
		}else{
			let str = '';
			let len = 0;
			let count = -1;
			for(let j=start; j<=end; i++){
				len+=words[j];
				count++;
			}
			let whiteNum = maxWidth - len;
			let small = Math.floor(whiteNum/count);
			let bigNum = whiteNum%count;
			let whiteStr1= "";
			let whiteStr2= "";
			for(let j=0; j<bigNum-1; j++){
				whiteStr2+=' ';
			}
			whiteStr1 = whiteStr2 + ' ';
			for(let j=start; j<=end; i++){
				str+=words[j];
				if(j === end){
					mainArr.push(str);
				}else if(j-start+1 > bigNum){
					str+=whiteStr2;
				}else{
					str+=whiteStr1;
				}
			}
			start = i;
			tempCount = 0;
		}
		if(i===words.length-1){
			let str = '';
			for(let j=start; j<words.length; i++){
				str+=words[j];
				if(j === words.length-1){
					for(let k=str.length; k<maxWidth+1; i++){
						str+=' ';
					}
					mainArr.push(str);
				}else{
					str+=' ';
				}
			}
			mainArr.push(str);
		}

	}
	return mainArr;

};

fullJustify(["This", "is", "an", "example", "of", "text", "justification."],16);
```



​





