
 * ------

   Given a collection of intervals, merge all overlapping intervals.

   For example,
   Given `[1,3],[2,6],[8,10],[15,18]`,
   return `[1,6],[8,10],[15,18]`.

* *注意：虽然给定参数是二维数组，但实际传入的参数intervals不是一个二维数组，而是以下结构：*

  ```Javascript
  [ Interval { start: 1, end: 3 },
    Interval { start: 2, end: 6 },
    Interval { start: 8, end: 10 },
    Interval { start: 15, end: 18 } ]
  ```

  *因此，写代码时需要根据这个结构进行编写。*


```javascript
/**
 * Definition for an interval.
 * function Interval(start, end) {
 *     this.start = start;
 *     this.end = end;
 * }
 */
/** Runtime: 136 ms / beats 57.53% (best: 105ms)
 * @param {Interval[]} intervals
 * @return {Interval[]}
 */
var merge = function(intervals) {
	intervals.sort(function(a,b){
		return a.start - b.start;
	});
	let arr = [];
	produce(undefined,undefined,0);
	function produce(s, e, i){
		if(i === intervals.length){
			return s===undefined? null :arr.push([s,e]);
		}else if(s === undefined){
			s = intervals[i].start;
			e = intervals[i].end;
			produce(s, e, i+1);
		}else if(e < intervals[i].start){
			arr.push([s,e]);
			s = intervals[i].start;
			e = intervals[i].end;
			produce(s, e, i+1);
		}else if(e >= intervals[i].start){
			produce(s, (e>intervals[i].end)?e:intervals[i].end, i+1);
		}
	}
	return arr;
};
merge([[1,3],[2,6],[8,10],[15,18]]);
```



