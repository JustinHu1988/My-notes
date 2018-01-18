
 * ------

   Given a set of *non-overlapping* intervals, insert a new interval into the intervals (merge if necessary).

   You may assume that the intervals were initially sorted according to their start times.

   **Example 1:**
   Given intervals `[1,3],[6,9]`, insert and merge `[2,5]` in as `[1,5],[6,9]`.

   **Example 2:**
   Given `[1,2],[3,5],[6,7],[8,10],[12,16]`, insert and merge `[4,9]` in as `[1,2],[3,10],[12,16]`.

   This is because the new interval `[4,9]` overlaps with `[3,5],[6,7],[8,10]`.

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
/** Runtime: 118 ms / Beats 64.06%  (best: 99 ms)
 * @param {Interval[]} intervals
 * @param {Interval} newInterval
 * @return {Interval[]}
 */
var insert = function(intervals, newInterval) {
	let arr = [];
	let status = true;
	produce(undefined,undefined,0);
	function produce(s, e, i){
		if(i === intervals.length){
			if(status){
				if(s === undefined){
					arr.push([newInterval.start, newInterval.end]);
				}else{
					arr.push([s, e]);
				}
			}
			return;
		}
		if(intervals[i].end < newInterval.start){
			arr.push([intervals[i].start, intervals[i].end]);
		}else if(intervals[i].start > newInterval.end){
			if(status){
				if(s === undefined){
					arr.push([newInterval.start, newInterval.end]);
				}else{
					arr.push([s, e]);
				}
				status = false;
			}
			arr.push([intervals[i].start, intervals[i].end]);
		}else{
			if(s===undefined){
				s = intervals[i].start<newInterval.start ? intervals[i].start : newInterval.start;
			}
			e = intervals[i].end>newInterval.end ? intervals[i].end : newInterval.end;
		}
		produce(s,e,i+1);
	}
	return arr;
};
```



