
 * Given *n* non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining.

   For example, 
   Given `[0,1,0,2,1,0,1,3,2,1,2,1]`, return `6`.

   ![img](https://leetcode.com/static/images/problemset/rainwatertrap.png)

   The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped. **Thanks Marcos** for contributing this image!

* 思路：先找到最高点，将整体分为前半段和后半段，利用规律分别计算。

```javascript
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
  let total = 0;
  let max = 0;
  let index = -1;
  let len = height.length;

  for(let i=0; i<len; i++){
    if(max<height[i]){
      index = i;
      max = height[i];
    }
  }
  let temp = 0;
  for(let i=0; i<index; i++){
    if(temp>height[i]){
      total+=temp-height[i];
    }else if(temp<height[i]){
      temp = height[i];
    }
  }
  temp = 0;
  for(let i=len-1; i>index; i--){
	if(temp>height[i]){
      total+=temp-height[i];
    }else if(temp<height[i]){
      temp = height[i];
    }
  }

  return total;
};
trap([0,1,0,2,1,0,1,3,2,1,2,1]);

```

```javascript
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
  let total = 0;
  let max = 0;
  let index = -1;
  let len = height.length;

  for(let i=0; i<len; i++){
    if(max<height[i]){
      index = i;
      max = height[i];
    }
  }
  
  cal(0, index, 1);
  cal(len-1, index, -1);
  
  function cal(start, end, x){
    let temp = 0;
    for(let i=start; x*i<x*end; i+=x){
      if(temp>height[i]){
        total+=temp-height[i];
      }else if(temp<height[i]){
        temp = height[i];
      }
    }
  }

  return total;
};
trap([0,1,0,2,1,0,1,3,2,1,2,1]);
```

```javascript
/** Runtime: 96ms / Beats 91.91%
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
  let total = 0, max = 0, index = -1;
  let len = height.length;
  for(let i=0; i<len; i++){
    if(max<height[i]){
      index = i;
      max = height[i];
    }
  }
  cal(0,1,0);
  cal(len-1,-1,0);
  function cal(i,x,temp){
    if(i===index){
      return;
    }else if(temp>height[i]){
      total+=temp-height[i];
      return cal(i+x,x,temp);
    }else if(temp<=height[i]){
      return cal(i+x,x,height[i]);
    }
  }
  return total;
};
trap([0,1,0,2,1,0,1,3,2,1,2,1]);
```

- 以上三个方法，实际运行效率差距不大

