In this problem, a tree is an **undirected** graph that is connected and has no cycles.

The given input is a graph that started as a tree with N nodes (with distinct values 1, 2, ..., N), with one additional edge added. The added edge has two different vertices chosen from 1 to N, and was not an edge that already existed.

The resulting graph is given as a 2D-array of `edges`. Each element of `edges` is a pair `[u, v]` with `u < v`, that represents an **undirected** edge connecting nodes `u` and `v`.

Return an edge that can be removed so that the resulting graph is a tree of N nodes. If there are multiple answers, return the answer that occurs last in the given 2D-array. The answer edge `[u, v]` should be in the same format, with `u < v`.

**Example 1:**

```
Input: [[1,2], [1,3], [2,3]]
Output: [2,3]
Explanation: The given undirected graph will be like this:
  1
 / \
2 - 3

```

**Example 2:**

```
Input: [[1,2], [2,3], [3,4], [1,4], [1,5]]
Output: [1,4]
Explanation: The given undirected graph will be like this:
5 - 1 - 2
    |   |
    4 - 3

```

**Note:**

The size of the input 2D-array will be between 3 and 1000.

Every integer represented in the 2D-array will be between 1 and N, where N is the size of the input array.

**Update (2017-09-26):**
We have overhauled the problem description + test cases and specified clearly the graph is an **undirected** graph. For the **directed**graph follow up please see **Redundant Connection II**). We apologize for any inconvenience caused.

*解题思路：*

1. 本题最终要求得多余的路径，实质上等于求得环路（每个环路的任一路径可视为多余路径）
2. 为求得环路，本解法选择逐一去除非环路分支，最终只保留环路，从中选择input中的最后一条连接路径进行return。
3. 去除环路分支的方法：先去除包含游离端点（只有一条路径的端点）的所有路径，然后循环执行此方法，最终将只剩下环路
4. 具体实现：通过map数据格式，汇总各端点所连接的路径信息，然后进行筛选。

```javascript
/** Runtime: 88 ms / beats 83.33%
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function(edges) {
    let map = new Map();
    for(let i=0; i<edges.length; i++){
        if(map.has(edges[i][0])){
            map.get(edges[i][0]).set(i, edges[i]);
        }else{
            map.set(edges[i][0], new Map());
            map.get(edges[i][0]).set(i, edges[i]);
        }
        if(map.has(edges[i][1])){
            map.get(edges[i][1]).set(i, edges[i]);
        }else{
            map.set(edges[i][1], new Map());
            map.get(edges[i][1]).set(i, edges[i]);
        }
    }
    function init(value, key, map){
        value.forEach(function(v, k, m){
            if(key!==v[0]){
                map.get(v[0]).delete(k);
                if(map.get(v[0]).size === 1){
                    init(map.get(v[0]), v[0], map);
                }
            }else{
                map.get(v[1]).delete(k);
                if(map.get(v[1]).size === 1){
                    init(map.get(v[1]), v[1], map);
                }
            } 
        });
        map.delete(key);
    }
    map.forEach(function(value, key, map){
        if(value.size===1){
            init(value, key, map);
        }
    });
    let index = 0;
    map.forEach(function(value, key, map){
        value.forEach(function(v, k, m){
            if(k>index){
                index = k;
            }
        });
    });
    return edges[index];
};


findRedundantConnection(
[[16,25],[7,9],[3,24],[10,20],[15,24],[2,8],[19,21],[2,15],[13,20],[5,21],[7,11],[6,23],[7,16],[1,8],[17,20],[4,19],[11,22],[5,11],[1,16],[14,20],[1,4],[22,23],[12,20],[15,18],[12,16]]
);
```



