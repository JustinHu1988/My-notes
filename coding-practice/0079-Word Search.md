
 * ------

   Given a 2D board and a word, find if the word exists in the grid.

   The word can be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. The same letter cell may not be used more than once.

   For example,
   Given **board** =

   ```
   [
     ['A','B','C','E'],
     ['S','F','C','S'],
     ['A','D','E','E']
   ]

   ```

   word= "ABCCED", -> returns `true`,

   word = "SEE", -> returns `true`,

   word = "ABCB", -> returns `false`.

   *从速度上看，应该还可以优化*

```javascript
/** Runtime: 211 ms / beats 42.58% (best: 120ms)
 * @param {character[][]} board
 * @param {string} word
* @return {boolean}
	*/
var exist = function(board, word) {
	let yLen = board.length;
	let xLen = board[0] !== undefined ? board[0].length : 0;
	let arr = [];
	let status = false;
  	//先获取首字母匹配的所有坐标，push进arr数组。
	for(let i=0; i<yLen; i++){
		for(let j=0; j<xLen; j++){
			if(word[0] === board[i][j]){
				arr.push([i,j]);
			}
		}
	}
  	//针对arr的每一个元素，开始检测匹配
	for(let i=0; i<arr.length; i++){
		let track = [];
		find(track, arr[i][0], arr[i][1], 0);
	}

	function find(track, coordY, coordX, strIndex){
		if(strIndex === word.length){status = true;}
		if(track[coordY*xLen+coordX] === 1){
			return;
		}
		if(coordY >= 0 && coordY<yLen && coordX>=0 && coordX<xLen && !status && board[coordY][coordX] === word[strIndex]){
			let trackCopy = track.slice();
			trackCopy[coordY*xLen+coordX] = 1;
			find(trackCopy,  coordY, coordX+1, strIndex+1);
			find(trackCopy,  coordY, coordX-1, strIndex+1);
			find(trackCopy,  coordY+1, coordX, strIndex+1);
			find(trackCopy,  coordY-1, coordX, strIndex+1);
		}else{
			return;
		}
	}
	return status;
};
exist([
	['A','B','C','E'],
	['S','F','C','S'],
	['A','D','E','E']
],"SEE");
```

