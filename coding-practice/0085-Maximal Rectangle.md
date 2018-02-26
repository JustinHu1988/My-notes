Given a 2D binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.

For example, given the following matrix:

```
1 0 1 0 0
1 0 1 1 1
1 1 1 1 1
1 0 0 1 0

```

Return 6.

*解题思路，按行计算矩形。以第一行为例：*

1. *首先将第一行数据转化为map，只保留含1的项，然后遍历map计算出此行中的相关矩形面积*
2. *然后与下一行叠加，列中均为1的保留在map里，含0的列从map中删除，然后遍历map，计算矩形面积= 横边长 乘以 行数*
3. 继续与下一行叠加，直到所有行均叠加完毕，即可将以第一行为顶边的所有矩形遍历完毕；
4. 按照上述方法继续计算以第二行为顶边的矩形，以此类推。

```javascript
/** Runtime: 128 ms / beats 83.78%
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

	// 主函数：按行遍历
	function compute(index,thisMap,rowNum){
		// 初始化当前行map数据
		for(let i=0; i<matrix[index].length; i++){
			if(matrix[index][i]!=='0'){
				thisMap.set(i,matrix[index][i]);
				count(i, rowNum, thisMap);
			}
		}
		lastCount(rowNum);
		if(matrix.length > index+1){
			overlay(index,thisMap,rowNum+1);
		}
		if(index>=matrix.length-1){
			return;
		}else{
			return compute(index+1, new Map(), 1);
		}
	}

	// 根据不同的首行，分别向下进行逐行叠加验证
	function overlay(index,map,rowNum){
		map.forEach(function(value,key,map){
			if(matrix[rowNum+index-1][key]==='0'){
				map.delete(key);
			}else{
				count(key, rowNum);
			}
		});
		lastCount(rowNum);
		if(rowNum+index!==matrix.length){
			overlay(index,map,rowNum+1);
		}
	}

	// 验证矩形面积并更新area数据
	function count(nowIndex, rowNum){
		if(preIndex===-1 || nowIndex-1!==preIndex){// 与前一位不连续或最后一列
			if(temp*rowNum>area){
				area=temp*rowNum;
			}
			preIndex = nowIndex;
			temp=1;
		}else{ // 与前一位连续
			temp++;
			preIndex = nowIndex;
		}
	}
	function lastCount(rowNum){
		if(temp*rowNum>area){
			area=temp*rowNum;
		}
		temp = 0;
		preIndex = -1;
	}

	return area;
};

maximalRectangle([["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]);
```

