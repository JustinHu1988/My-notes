
 * ------

   Given an array of non-negative integers, you are initially positioned at the first index of the array.

   Each element in the array represents your maximum jump length at that position.

   Your goal is to reach the last index in the minimum number of jumps.

   For example:
   Given array A = `[2,3,1,1,4]`

   The minimum number of jumps to reach the last index is `2`. (Jump `1` step from index 0 to 1, then `3` steps to the last index.)

   **Note:**
   You can assume that you can always reach the last index.

* *这是一个最短路径问题的特例，每条路径线段的权重均为1*

* *因为权重均为1，因此不需要遍历所有n+m的可能性，只要赋予过权重的点，就可以不再进行权重计算，只需要n次计算（n为顶点数，m为路径线段数）*


```Javascript
/** Runtime: 104 ms / Beats 50.72%
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
	let AObj = [];
	for(let i =0; i<nums.length; i++){
		AObj.push({route:nums[i], distance:nums.length});
	}
	AObj[0].distance = 0;
	let j=1;
	for(let i=0; i<AObj.length; i++){
		for(; j<i+1+AObj[i].route; j++){
			if(j>=AObj.length){break;}
			if(AObj[j].distance > AObj[i].distance+1){
				AObj[j].distance = AObj[i].distance+1;
			}
		}
	}
	return AObj[AObj.length-1].distance;
};
jump([2,3,1,1,4]);
```



- *下面这个写法，可以用于路线权重不全为1时使用，但用在这道题里，将会超时。（区别在于变量`j`的使用）*

```Javascript
/** Time Limit Exceeded
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
	let AObj = [];
	for(let i =0; i<nums.length; i++){
		AObj.push({weight: 1, route:nums[i], distance:nums.length});
	}
	AObj[0].distance = 0;
	
	for(let i=0; i<AObj.length; i++){
		for(let j=i+1; j<i+1+AObj[i].route; j++){
			if(j>=AObj.length){break;}
			if(AObj[j].distance > AObj[i].distance+AObj[i].weight){
				AObj[j].distance = AObj[i].distance+AObj[i].weight;
			}
		}
	}
	return AObj[AObj.length-1].distance;

};
jump([2,3,1,1,4]);
```

