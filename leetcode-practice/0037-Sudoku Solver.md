
 * Write a program to solve a Sudoku puzzle by filling the empty cells.

   Empty cells are indicated by the character `'.'`.

   You may assume that there will be only one unique solution.

   ![img](http://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sudoku-by-L2G-20050714.svg/250px-Sudoku-by-L2G-20050714.svg.png)

   A sudoku puzzle...

   ![img](http://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Sudoku-by-L2G-20050714_solution.svg/250px-Sudoku-by-L2G-20050714_solution.svg.png)

   ...and its solution numbers marked in red.

```javascript
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function(board) {
	let rearr = [];
	let arr03 = new Array();
	let count = 0;
	let index = 0;
	let arrX = new Array(), arrY = new Array(), arrZ = new Array(9);
	for(let i=0; i<9; i++){
		arrX.push(new Array(9));
		arrY.push(new Array(9));
		arrZ[i] = [];
		arr03.push(new Array(9));
	}

	for(let i=0; i<9; i+=3){
		for(let j=0; j<9; j+=3){
			genContent(i,j,3);
		}
	}
	function genContent(x, y, len){
		for(let i=x; i<len+x; i++){
			for(let j=y; j<9/len+y; j++){
				arr03[i][j] = index;
			}
		}
		index++;
	}
	// 生成每个单元格基本信息
	for(let i=0; i<9; i++){
		for(let j=0; j<9; j++){
			rearr.push({x:i, y:j, z:arr03[i][j], zxArr:[], zyArr:[], list:{1:1,2:1,3:1,4:1,5:1,6:1,7:1,8:1,9:1},len:9, num:-1});
			let tempObj = rearr[rearr.length-1];
			arrX[i][j] = tempObj;
			arrY[j][i] = tempObj;
			arrZ[arr03[i][j]].push(tempObj);
		}
	}

	// 为每个单元格添加关联单元格信息
	for(let i=0; i<9; i++) {
		for (let j = 0; j < 9; j++) {
			let tempObj = arrX[i][j];
			tempObj.row = arrX[i];
			tempObj.col = arrY[j];
			tempObj.blo = arrZ[tempObj.z];

			if(tempObj.z%3 === 0){
				tempObj.horBlo = [arrZ[tempObj.z+1],arrZ[tempObj.z+2]];
			}else if(tempObj.z%3 === 1){
				tempObj.horBlo = [arrZ[tempObj.z-1],arrZ[tempObj.z+1]];
			}else if(tempObj.z%3 === 2){
				tempObj.horBlo = [arrZ[tempObj.z-2],arrZ[tempObj.z-1]];
			}
			if(Math.floor(tempObj.z/3) === 0){
				tempObj.verBlo = [arrZ[tempObj.z+3],arrZ[tempObj.z+6]];
			}else if(Math.floor(tempObj.z/3) === 1){
				tempObj.verBlo = [arrZ[tempObj.z-3],arrZ[tempObj.z+3]];
			}else if(Math.floor(tempObj.z/3) === 2){
				tempObj.verBlo = [arrZ[tempObj.z-6],arrZ[tempObj.z-3]];
			}
		}
	}

	for(let i=0; i<9; i++){
		arrZ[i].push = {1:1,2:1,3:1,4:1,5:1,6:1,7:1,8:1,9:1,len:9};
	}


	for(let i=0; i<9; i++){
		for(let j=0; j<9; j++){
			if(board[i][j] !== '.'){
				arrX[i][j].len = 1;
				arrX[i][j].num = parseInt(board[i][j]);

				arrZ[arrX[i][j].z][9][arrX[i][j].num] = 0;
				count++;
				sift(arrX[i][j]);
			}
		}
	}

	function sift(r){
		for(let i=0; i<9; i++){
			siftEle(r, r.row, i);
			siftEle(r, r.col, i);
			siftEle(r, r.blo, i);
		}

		/*
		for(let i=0; i<9; i++){
			if(r.row[i].len!==1 && r.row[i].list[r.num] !== 0){
				r.row[i].list[r.num] = 0;
				r.row[i].len--;
				if(r.row[i].len===1){
					findNum(r.row[i]);
				}
			}
			if(r.col[i].len!==1 && r.col[i].list[r.num] !== 0){
				r.col[i].list[r.num] = 0;
				r.col[i].len--;
				if(r.col[i].len===1){
					findNum(r.col[i]);
				}
			}
			if(r.blo[i].len!==1 && r.blo[i].list[r.num] !== 0){
				r.blo[i].list[r.num] = 0;
				r.blo[i].len--;
				if(r.blo[i].len===1){
					findNum(r.blo[i]);
				}
			}
		}
		*/

		sift2nd(r);
	}
	function siftEle(r, attr, i){
		if(attr[i].len!==1 && attr[i].list[r.num] !== 0){
			attr[i].list[r.num] = 0;
			attr[i].len--;
			if(attr[i].len===1){
				findNum(attr[i]);
			}
		}
	}

	function sift2nd(r){
		for(let i=0; i<2; i++){
			if(r.horBlo[i][9][r.num] !== 0 && r.horBlo[i][9].len !==0){
				
			}
		}

	}

	function findNum(r){
		for(let i=0; i<9; i++){
			if(r.list[i+1]===1){
				r.num = i+1;
				count++;
				arrZ[r.z][9][r.num] = 0;
				board[r.x][r.y] = "" + (i+1);
				return sift(r);
			}
		}
	}


};
```









