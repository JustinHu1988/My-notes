
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
        arr03.push(new Array(9));
        arrZ[i] = [];
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
    
    for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){
            rearr.push({x:i, y:j, z:arr03[i][j], list:{1:1,2:1,3:1,4:1,5:1,6:1,7:1,8:1,9:1},len:9, num:-1});
            arrX[i][j] = rearr[rearr.length-1];
            arrY[j][i] = rearr[rearr.length-1];
            arrZ[arr03[i][j]].push(rearr[rearr.length-1]);
        }
    }
    for(let i=0; i<9; i++){
        arrX[i].push([9,9,9,9,9,9,9,9,9]);
        arrY[i].push([9,9,9,9,9,9,9,9,9]);
        arrZ[i].push([9,9,9,9,9,9,9,9,9]);
    }
    
    
    
    for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){
            if(board[i][j]!=="."){
                arrX[i][j].len = 1;
                arrX[i][j].num = parseInt(board[i][j]);
                count++;
                sift(arrX[i][j]);
            }
        }
    }
    
    function sift(r){
        let xt = r.x;
        let yt = r.y;
        let zt = r.z;
        for(let i=0; i<9; i++){
            if(arrX[xt][i].len!==1 && arrX[xt][i].list[r.num] !== 0){
                arrX[xt][i].list[r.num] = 0;
                arrX[xt][i].len--;
                if(arrX[xt][i].len===1){
                    findNum(arrX[xt][i]);
                }
            }
            if(arrY[yt][i].len!==1 && arrY[yt][i].list[r.num] !== 0){
                arrY[yt][i].list[r.num] = 0;
                arrY[yt][i].len--;
                if(arrY[yt][i].len===1){
                    findNum(arrY[yt][i]);
                }
            }
            if(arrZ[zt][i].len!==1 && arrZ[zt][i].list[r.num] !== 0){
                arrZ[zt][i].list[r.num] = 0;
                arrZ[zt][i].len--;
                if(arrZ[zt][i].len===1){
                    findNum(arrZ[zt][i]);
                }
            }
        }
        
    }
    for(let k=0; k<50; k++){
        if(count<81){
            for(let i=0; i<9; i++){
                sift2(i);
            }
        }
    }
    
    
    
    function sift2(i){
        for(let j=0; j<9; j++){
            let x = 0;
            let temp = -1;
            for(let k=0; k<9; k++){
                if(arrZ[i][k].num === -1){
                    x += arrZ[i][k].list[j+1];
                }
                if(x === 1 && temp===-1){
                    temp = k;
                }
            }
            if(x === 1 ){
                arrZ[i][temp].num = j+1;
                count++;
                arrZ[i][temp].len = 1;
                board[arrZ[i][temp].x][arrZ[i][temp].y] = "" + (j+1);

                sift(arrZ[i][temp]);
            }
        }
    }
    
    function findNum(r){
        for(let i=0; i<9; i++){
            if(r.list[i+1]===1){
                r.num = i+1;
                count++;
                board[r.x][r.y] = "" + (i+1);
                return sift(r);
            }
        }
    }
    
    
};
```









