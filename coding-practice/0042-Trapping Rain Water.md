
 * Given *n* non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining.

   For example, 
   Given `[0,1,0,2,1,0,1,3,2,1,2,1]`, return `6`.

   ![img](https://leetcode.com/static/images/problemset/rainwatertrap.png)

   The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped. **Thanks Marcos** for contributing this image!

* ​

```javascript
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
	let temp = false;
	let tempArr = [];
	for(let i=0; i<height.length; i++){

		


		if((height[i]>height[i+1] || i===height.length-1) && (height[i]>height[i-1] || i===0)){
			if(temp){
				tempArr[tempArr.length-1].num = height[i];
				tempArr[tempArr.length-1].index = i;
			}else{
				tempArr.push({num: height[i], index:i});
			}
		}else if(height[i]===height[i+1] && height[i]>height[i-1]){
			if(temp){
				tempArr[tempArr.length-1].num = height[i];
				tempArr[tempArr.length-1].index = i;
			}else{
				tempArr.push({num: height[i], index:i});
				temp = true;
			}
		}else if(height[i]>height[i+1] && height[i]===height[i-1]){
			if(temp){
				tempArr[tempArr.length-1].num = height[i];
				tempArr[tempArr.length-1].index = i;
				temp = false;
			}
		}
	}
	console.log(tempArr);
	let mainCount = 0;
	for(let j = 1; j<tempArr.length; j++){
			let tempNum = tempArr[j-1].num<tempArr[j].num ? tempArr[j-1].num : tempArr[j].num;
			let tempCount = tempNum*(tempArr[j].index-tempArr[j-1].index-1);
			for(let i=tempArr[j-1].index+1; i<tempArr[j].index; i++){
				let minusCell = height[i]<tempNum ? height[i]:tempNum;
				tempCount -= minusCell;
			}
			mainCount += tempCount;
	}
	return mainCount;
};
trap([5,2,1,2,1,5]);

```

