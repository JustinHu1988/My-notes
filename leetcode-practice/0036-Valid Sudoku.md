
 * Determine if a Sudoku is valid, according to: [Sudoku Puzzles - The Rules](http://sudoku.com.au/TheRules.aspx).

   The Sudoku board could be partially filled, where empty cells are filled with the character `'.'`.

   ![img](http://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sudoku-by-L2G-20050714.svg/250px-Sudoku-by-L2G-20050714.svg.png)

   A partially filled sudoku which is valid.

   **Note:**
   A valid Sudoku board (partially filled) is not necessarily solvable. Only the filled cells need to be validated.

```javascript
/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
	// 先将board里的字符串元素变成数字
	for(let i=0; i<9; i++){
		for(let j=0; j<9; j++){
			if(board[i][j] === "."){
				board[i][j] = -1;
			}else{
				board[i][j] = parseInt(board[i][j]);
			}
		}
	}

	let status = true;
	for(let i=0; i<9; i++){
		status = verifyUnit(i);
		if(status === false){
			return false;
		}
	}
	return status;

	// 判断当前单元的九个元素是否有重复的数字（1-9），分为行、列、3*3方块三种情况
	function verifyUnit(x){
		let arr0 = new Array(9);
		let arr1 = new Array(9);
		let arr2 = new Array(9);
		for(let i=0; i<9; i++){
			if(board[x][i] !== -1){
				if(arr0[board[x][i]]===1){
					return false;
				}else{
					arr0[board[x][i]] = 1;
				}
			}

			if(board[i][x] !== -1){
				if(arr1[board[i][x]]===1){
					return false;
				}else{
					arr1[board[i][x]] = 1;
				}
			}

			let numX = Math.floor(i/3)+Math.floor(x/3)*3;
			let numY = Math.floor(i%3)+(x*3)%9;
			//console.log(numX,numY);
			if(board[numX][numY] !== -1){
				if(arr2[board[numX][numY]]===1){
					return false;
				}else{
					arr2[board[numX][numY]] = 1;
				}
			}
		}
		return true;
	}
};
```









