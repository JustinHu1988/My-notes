Given *n* non-negative integers representing the histogram's bar height where the width of each bar is 1, find the area of largest rectangle in the histogram.

![img](https://leetcode.com/static/images/problemset/histogram.png)

Above is a histogram where width of each bar is 1, given height = `[2,1,5,6,2,3]`.

![img](https://leetcode.com/static/images/problemset/histogram_area.png)

The largest rectangle is shown in the shaded area, which has area = `10` unit.

For example,
Given heights = `[2,1,5,6,2,3]`,
return `10`.

*下方两种方法执行速度不同，解法一更有效率。*

```javascript
// 不重复计算同一区域 每个候选矩形只计算一遍
/** Runtime: 60 ms  / beats 100%
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
	let maxNum = heights[0] === undefined ? 0 : heights[0];

	for(let i=0; i<heights.length; i++){
		if((heights[i]>heights[i+1] && i<heights.length-1) || i===heights.length-1){
			let tempMin = heights[i];
			for(let j=i; j>=0; j--){
				if(heights[j]<heights[i+1] && i<heights.length-1){
					break;
				}
				if(heights[j]<tempMin){
					tempMin=heights[j];
				}
				if(maxNum<(i-j+1)*tempMin){
					maxNum = (i-j+1)*tempMin;
				}
			}
		}

	}
	return maxNum;
};
largestRectangleArea([2,1,5,6,2,3]);
```



```javascript
// 有重复计算问题 每个元素逐一计算一遍其可能的矩形面积
/** Runtime: 244 ms  / beats 11.11%
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
	let maxNum = 0;

	for(let i=0; i<heights.length; i++){
		if(heights[i]!==0 && ((i>0 && heights[i]!==heights[i-1]) || i===0)){
			let count = 1;
			for(let j=i+1; j<heights.length; j++){
				if(heights[j]>=heights[i]){
					count++;
				}else{
					break;
				}
			}
			if(i>0){
				for(let j=i-1; j>=0; j--){
					if(heights[j]>=heights[i]){
						count++;
					}else{
						break;
					}
				}
			}
			if(maxNum<count*heights[i]){
				maxNum = count*heights[i];
			}
		}
	}
	return maxNum;
};
largestRectangleArea([2,1,5,6,2,3]);

```

