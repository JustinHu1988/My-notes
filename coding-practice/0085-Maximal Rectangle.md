Given a 2D binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.

For example, given the following matrix:

```
1 0 1 0 0
1 0 1 1 1
1 1 1 1 1
1 0 0 1 0

```

Return 6.

*有解题思路，尚未完成。*

```javascript
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function(matrix) {
	let area = 0;
	let temp = 0;
	let preIndex = -1;

	if(matrix[0]!==undefined){
		compute(0,new Map(),1);
	}
	function compute(index,thisMap,rowNum){
		// 初始化当前行map数据
		for(let i=0; i<matrix[index].length; i++){
			if(matrix[index][i]!==0){
				thisMap.set(i,matrix[index][i]);
			}
			count(i, rowNum);
		}
		let temp = 0;
		let preIndex = -1;
		if(matrix.length > index+1){
			overlay(index,thisMap,rowNum+1);
		}

		if(index>=matrix.length-1){
			return;
		}else{
			return compute(index+1, new Map(), 1);
		}
	}
	function overlay(index,map,rowNum){
		map.forEach(function(value,key,map){
			if(matrix[rowNum+index-1][key]===0){
				map.delete(key);
			}else{
				count(key, rowNum);
			}
		});
		let temp = 0;
		let preIndex = -1;
		if(rowNum+index!==matrix.length){
			overlay(index,map,rowNum+1);
		}
	}
	// 验证矩形面积并更新area数据
	function count(nowIndex, rowNum){
		if(nowIndex===0){
			preIndex=0;
			temp++;
		}else if(nowIndex===matrix[0].length-1){
			if(nowIndex-1!==preIndex){
				if(temp*rowNum>area){
					area=temp*rowNum;
				}
			}else if(preIndex===-1){
				preIndex = nowIndex;
				temp++;
				if(temp*rowNum>area){
					area=temp*rowNum;
				}
			}
			preIndex=-1;
			temp = 0;
		}else{
			if(nowIndex-1!==preIndex){
				if(temp*rowNum>area){
					area=temp*rowNum;
				}
				preIndex=-1;
				temp = 0;
			}else if(preIndex===-1){
				preIndex = nowIndex;
				temp++;
				if(temp*rowNum>area){
					area=temp*rowNum;
				}
			}
		}



		if((nowIndex-1!==preIndex && preIndex!==-1) || nowIndex===matrix[0].length-1){
			preIndex=-1;
			if(nowIndex-1===preIndex && nowIndex===matrix[0].length-1){
				if((temp+1)*rowNum>area){
					area=(temp+1)*rowNum;
				}
			}else{
				if(temp*rowNum>area){
					area=temp*rowNum;
				}
			}
			temp = 0;
		}else{
			preIndex=nowIndex;
			temp++;
		}
	}
	return area;


};

maximalRectangle([["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]);
```

