
 * Write a program to solve a Sudoku puzzle by filling the empty cells.

   Empty cells are indicated by the character `'.'`.

   You may assume that there will be only one unique solution.

   ![img](http://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sudoku-by-L2G-20050714.svg/250px-Sudoku-by-L2G-20050714.svg.png)

   A sudoku puzzle...

   ![img](http://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Sudoku-by-L2G-20050714_solution.svg/250px-Sudoku-by-L2G-20050714_solution.svg.png)

   ...and its solution numbers marked in red.

```javascript
/** Runtime: 84ms / Beats 100.00%
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function(board) {
  	// 候选单元格map
	let waitMap = new Map();
    // 刚确定数字的单元格map（尚未清理关联单元格候选数字）
	let tempMap = new Map();
	let isFinish = false;
	let boardName = board;

	for(let i=0; i<9; i++){
		for(let j=0; j<9; j++){
			if(board[i][j] == '.'){
				waitMap.set(i*10+j, new Set(['1','2','3','4','5','6','7','8','9']));
			}else{
				tempMap.set(i*10+j, board[i][j]);
			}
		}
	}
	//复制数组（双层深度）
	function clone(array){
		let newArr = [];
		for(let i=0; i<array.length; i++){
			newArr.push(array[i].concat());
		}
		return newArr;
	}
	//检验待定单元格
	function testSize(set, x, y, tempMap, waitMap, board){
		if(set.size===1){
			set.forEach(function(value, key, set){
				board[x][y] = value;
				tempMap.set(x*10+y, board[x][y]);
				waitMap.delete(x*10+y);
				clear(x,y,value,tempMap, waitMap);
			});
		}else if(set.size===0){
			return true;
		}
		return false;
	}
	//清理相关单元格候选数字
	function clear(x,y,value, tempMap, waitMap){
		for(let i=0; i<9; i++){
			if(waitMap.has(x*10+i)){
				waitMap.get(x*10+i).delete(value);
			}
			if(waitMap.has(i*10+y)){
				waitMap.get(i*10+y).delete(value);
			}
		}
		let tempX = x%3;
		let tempY = y%3;
		for(let i=x-tempX; i<x-tempX+3; i++){
			for(let j=y-tempY; j<y-tempY+3; j++){
				if(waitMap.has(i*10+j)){
					waitMap.get(i*10+j).delete(value);
				}
			}
		}
	}


	//主体函数
	function compute(waitMap, tempMap, board){
		//console.log(waitMap, tempMap,board);
		let isNeedReturn = false;
		if(waitMap.size === 0){
			isFinish = true;
			boardName = board;
			return;
		}

      	
		while(tempMap.size!==0){
			tempMap.forEach(function(value, key, map){
				let x = Math.floor(key/10);
				let y = key%10;
				clear(x,y,value,tempMap, waitMap);
				tempMap.delete(key);
			});
			waitMap.forEach(function(value, key, map){
				if(!isNeedReturn){
					let x = Math.floor(key/10);
					let y = key%10;
					isNeedReturn = testSize(value, x, y,tempMap, waitMap, board);

				}
			});

			if(isNeedReturn){
				return;
			}
		}


		if(waitMap.size !== 0){
			let status = 10;
			let ob;
			let iterator1 = waitMap.entries();
			for(let i=0; i<waitMap.size; i++){
				let tempValue = iterator1.next().value;
				if(tempValue[1].size===0){
					return;
				}else{
					if(tempValue[1].size<status){
						status=tempValue[1].size;
						ob = tempValue[0];
					}
				}
			}

			if(ob !== undefined){
				waitMap.get(ob).forEach(function(value, key, map){
					if(!isFinish){
						let newWaitMap = new Map(waitMap);
						newWaitMap.forEach(function(value, key, map){
							newWaitMap.set(key, new Set(newWaitMap.get(key)));
						});
						let newTempMap = new Map(tempMap);
						let newBoard = clone(board);
						newTempMap.set(ob, value);
						newWaitMap.delete(ob);
						//console.log(ob);
						let x = Math.floor(ob/10);
						let y = ob%10;
						newBoard[x][y] = value;
						//console.log(x,y,value);
						return compute(newWaitMap, newTempMap, newBoard);
					}
				});
			}

		}

		if(waitMap.size === 0){
			isFinish = true;
			boardName = board;
			return;
		}
	}

	compute(waitMap, tempMap, board);
    for(let i=0; i<board.length; i++){
        board[i]=boardName[i];
    }
    
};


let temp = [[".",".","9","7","4","8",".",".","."],["7",".",".",".",".",".",".",".","."],[".","2",".","1",".","9",".",".","."],[".",".","7",".",".",".","2","4","."],[".","6","4",".","1",".","5","9","."],[".","9","8",".",".",".","3",".","."],[".",".",".","8",".","3",".","2","."],[".",".",".",".",".",".",".",".","6"],[".",".",".","2","7","5","9",".","."]];
solveSudoku(temp);
```

