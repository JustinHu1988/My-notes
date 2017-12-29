
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
			rearr.push({num:-1, x:i, y:j, z:arr03[i][j], zxArr:[], zyArr:[], list:{1:1,2:1,3:1,4:1,5:1,6:1,7:1,8:1,9:1},len:9});
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
		arrZ[i].push({1:1,2:1,3:1,4:1,5:1,6:1,7:1,8:1,9:1,len:9});
		arrX[i].push({1:1,2:1,3:1,4:1,5:1,6:1,7:1,8:1,9:1,len:9});
		arrY[i].push({1:1,2:1,3:1,4:1,5:1,6:1,7:1,8:1,9:1,len:9});
	}


	for(let i=0; i<9; i++){
		for(let j=0; j<9; j++){
			if(board[i][j] !== '.'){
				arrX[i][j].len = 1;
				arrX[i][j].num = parseInt(board[i][j]);

				arrZ[arrX[i][j].z][9][arrX[i][j].num] = 0;
				arrZ[arrX[i][j].z][9].len--;
				count++;
				sift(arrX[i][j]);
			}
		}
	}

	let times =0;
	while(count < 81 && times<100){
		continFun(arrZ, 1);
		continFun(arrZ, 2);
		console.log(count,arrX);

		continFun(arrY, 1);
		continFun(arrY, 2);
		continFun(arrX, 1);
		continFun(arrX, 2);
		//continFun(arrX);

		times++;

	}


	function sift(r){
		for(let i=0; i<9; i++){
			siftEle(r, r.row, i);
			siftEle(r, r.col, i);
			siftEle(r, r.blo, i);
		}
		sift2nd(r);
	}


	function sift2nd(r){
		for(let i=0; i<2; i++){
			if(r.horBlo[i][9][r.num] !== 0 && r.horBlo[i][9].len !==0){
				let obj = r.horBlo[i];
				let count = 0;
				let num1 = 0;
				let num2 = 0;
				for(let j=0; j<9; j++){
					if(obj[j].x !== r.x){
						if(count<3){
							num1 += obj[j].list[r.num];
						}else if(count<6){
							num2 += obj[j].list[r.num];
						}
						count++;
					}
				}
				if(num1 === 0){
					if(r.x%3 !== 2){
						putZeroX(r.horBlo[1-i], r, 2);
					}else{
						putZeroX(r.horBlo[1-i], r, 1);
					}
					break;
				}else if(num2 === 0){
					if(r.x%3 === 0){
						putZeroX(r.horBlo[1-i], r, 1);
					}else{
						putZeroX(r.horBlo[1-i], r, 0);
					}
					break;
				}
			}
		}
		for(let i=0; i<2; i++){
			if(r.verBlo[i][9][r.num] !== 0 && r.verBlo[i][9].len !==0){
				let obj = r.verBlo[i];
				let countArr = [0,0,0];
				let num0 = 0;
				let num1 = 0;
				let num2 = 0;
				for(let j=0; j<9; j++){
					if(obj[j].y !== r.y){
						if(j%3 === 0){
							num0 += obj[j].list[r.num];
							countArr[0]++;
						}else if(j%3 === 1){
							num1 += obj[j].list[r.num];
							countArr[1]++;
						}else if(j%3 === 2){
							num2 += obj[j].list[r.num];
							countArr[2]++;
						}
					}
				}
				if(countArr[0] === 0){
					if(num1 === 0){
						putZeroY(r.verBlo[1-i], r, 2);
					}else if(num2 === 0){
						putZeroY(r.verBlo[1-i], r, 1);
					}
					break;
				}else if(countArr[1] === 0){
					if(num0 === 0){
						putZeroY(r.verBlo[1-i], r, 2);
					}else if(num2 === 0){
						putZeroY(r.verBlo[1-i], r, 0);
					}
					break;
				}else if(countArr[2] === 0){
					if(num0 === 0){
						putZeroY(r.verBlo[1-i], r, 1);
					}else if(num1 === 0){
						putZeroY(r.verBlo[1-i], r, 0);
					}
					break;
				}
			}
		}
	}
	function putZeroX(blo, r, row){
		for(let i=row*3; i<row*3+3; i++){
			siftEle(r, blo, i);
		}
		findOnlyOne(blo, r);
	}
	function putZeroY(blo, r, col){
		for(let i=0; i<9; i++){
			if(i%3 === col%3){
				siftEle(r, blo, i);
			}
		}
		findOnlyOne(blo, r);
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

	function findNum(r){
		for(let i=0; i<9; i++){
			if(r.list[i+1]===1){
				r.num = i+1;
				r.len = 1;
				count++;
				arrZ[r.z][9][r.num] = 0;
				arrZ[r.z][9].len--;
				board[r.x][r.y] = "" + (i+1);
				return sift(r);
			}
		}
	}
	function findOnlyOne(blo, r){
		let count=0;
		let temp=0;
		for(let i=0; i<9; i++){
			if(blo[9][r.num] === 1 && blo[i].num === -1 && blo[i].list[r.num]!==0){
				count++;
			}
			if(count === 1 && temp === 0){
				temp = i;
			}
		}
		if(count===1){
			blo[temp].num = r.num;
			blo[temp].len = 1;
			blo[9][r.num] === 0;
			blo[9].len--;
			board[blo[temp].x][blo[temp].y] = "" + blo[temp].num;
			return sift(blo[temp]);
		}
	}

	function continFun(arr, numArg){
		for(let i=0; i<9; i++){
			for(let j=0; j<9; j++){
				let num = 0;
				let temp = 0;
				let temp2 = 0;
				for(let k=0; k<9; k++){
					if(arr[i][k].num === -1){
						num += arr[i][k].list[j+1];
						if(num === 1 && temp === 0){
							temp = arr[i][k];
						}
						if(num === 2 && temp2 === 0){
							temp2 = [temp, arr[i][k]];
						}
					}
				}
				if(numArg === 1 && num === 1){
					temp.num = j+1;
					temp.len = 1;
					count++;
					arrZ[temp.z][9][temp.num] = 0;
					arrZ[temp.z][9].len--;
					board[temp.x][temp.y] = "" + (j+1);

					return sift(temp);
				}

				if(numArg === 2 && num === 2){
					removeTwoS(temp2, j+1);
				}
			}
		}
	}

	function removeTwoS(arr2, num){

		let squ = arrZ[arr2[0].z];
		let arrTemp = {len:0};
		arrTemp.len = squ[9].len;
		for(let i=0; i<9; i++){
			arrTemp[i] = squ[9][i];
		}
		for(let i=0; i<9; i++){
			if(squ[i].num === -1 && squ[i] !== arr2[0] && squ[i]!== arr2[1]){
				for(let k=1; k<10; k++){
					if(squ[i].list[k] === 1 && arrTemp[k] === 1){
						arrTemp[k] === 0;
						arrTemp.len--;
					}
				}
			}
		}
		let numArr2 = [num];
		if(arrTemp.len === 2){
			for(let k=1; k<10; k++){
				if(k!== num && arrTemp[k] === 1){
					numArr2.push(k);
				}
			}
			for(let i=0; i<2; i++){
				for(let k=1; k<10; k++){
					if(arr2[i].list[k]===1 && k!== numArr2[0] && k!== numArr2[1]){

						arr2[i].list[k]=0;
						arr2[i].len--;
					}
				}
			}
		}

	}





	function removeTwo(arr){
		for(let i=0; i<9; i++){
			let tempArr = [];
			for(let j=0; j<9; j++){
				if(arr[i][j].num === -1 && arr[i][j].len === 2){
					let te = [];
					for(let k=0; k<9; k++){
						if(arr[i][j].list[k+1]===1){
							te.push({k:k, obj:arr[i][j]});
						}
					}
					tempArr.push(te);
				}
			}
			if(tempArr.length>1){
				for(let k=0; k<tempArr.length; k++){
					for(let j=k+1; j<tempArr.length; j++){
						if(tempArr[k][0].k === tempArr[j][0].k && tempArr[k][1].k === tempArr[j][1].k){
							removeCer(arr[i], tempArr[k][0].obj,tempArr[j][0].obj,tempArr[k][0].k+1,tempArr[k][1].k+1);
						}
					}
				}
			}else{continue;}
		}
	}

	function removeCer(blo, obj1, obj2, num1, num2){
		for(let i=0; i<9; i++){
			if(blo[i].num === -1 && blo[i] !== obj1 && blo[i] !== obj2){
				if(blo[i].list[num1] !== 0){
					blo[i].list[num1] = 0;
					blo[i].len--;
				}
				if(blo[i].list[num2] !== 0){
					blo[i].list[num2] = 0;
					blo[i].len--;
				}
				if(blo[i].len===1){
					findNum(blo[i]);
				}
			}
		}
	}

};



let temp = [[".",".","9","7","4","8",".",".","."],["7",".",".",".",".",".",".",".","."],[".","2",".","1",".","9",".",".","."],[".",".","7",".",".",".","2","4","."],[".","6","4",".","1",".","5","9","."],[".","9","8",".",".",".","3",".","."],[".",".",".","8",".","3",".","2","."],[".",".",".",".",".",".",".",".","6"],[".",".",".","2","7","5","9",".","."]];
solveSudoku(temp);
```



```Javascript
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function(board) {
	let count = 0;
	let reArr = [];
	let arrX = new Array(), arrY = new Array(), arrZ = new Array(9), arr03 = new Array();
	for(let i=0; i<9; i++){
		arrX.push(new Array(9));
		arrY.push(new Array(9));
		arrZ[i] = [];
		arr03.push(new Array(9));
	}

	// arrZ的映射数组arr03
	let index = 0;
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
			reArr.push({num:-1,list:{1:1,2:1,3:1,4:1,5:1,6:1,7:1,8:1,9:1},len:9, x:i, y:j, z:arr03[i][j]});
			let tempObj = reArr[reArr.length-1];
			arrX[i][j] = tempObj;
			arrY[j][i] = tempObj;
			arrZ[arr03[i][j]].push(tempObj);
		}
	}
	// 为每个单元格添加关联单元格信息： row, col, blo
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
	// 加入队列信息
	for(let i=0; i<9; i++){
		arrZ[i].push({1:1,2:1,3:1,4:1,5:1,6:1,7:1,8:1,9:1,len:9});
		arrX[i].push({1:1,2:1,3:1,4:1,5:1,6:1,7:1,8:1,9:1,len:9});
		arrY[i].push({1:1,2:1,3:1,4:1,5:1,6:1,7:1,8:1,9:1,len:9});
	}

	// 根据已知数字，为空格删除候选
	for(let i=0; i<9; i++){
		for(let j=0; j<9; j++){
			if(board[i][j] !== '.'){
				let obj = arrX[i][j];
				obj.len = 1;
				obj.num = parseInt(board[i][j]);
				count++;
				removeQMess(obj);
				sift(arrX[i][j]);
			}
		}
	}



	// 当一个数字确定时，移除Z/X/Y队列的相应候选数字，len递减
	function removeQMess(obj){
		arrZ[obj.z][9][obj.num] = 0;
		arrZ[obj.z][9].len--;
		arrX[obj.z][9][obj.num] = 0;
		arrX[obj.z][9].len--;
		arrY[obj.z][9][obj.num] = 0;
		arrY[obj.z][9].len--;
	}

	// 移除其所在三数组其他空格内的相应候选数字
	function sift(r){
		for(let i=0; i<9; i++){
			siftEle(r, r.row, i);
			siftEle(r, r.col, i);
			siftEle(r, r.blo, i);
		}
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
	function findNum(r){
		for(let i=0; i<9; i++){
			if(r.list[i+1]===1){
				r.num = i+1;
				r.len = 1;
				count++;
				removeQMess(r);
				board[r.x][r.y] = "" + (i+1);
				return sift(r);
			}
		}
	}

	// 如果一个数组内的空格中，有两个候选数刚好同时只处于两个空格当中，删除这两个空格中的其他候选


	// 如果一个数组的空格内，某数只在一个空格里剩下候选，则将该数填写到其中，清理队列候选和关联空格候选
}

```







