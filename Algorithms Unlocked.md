**Notes for Algorithms Unlocked**

# Chapter 1: What Are Algorithms and Why Should You Care?

*What is a computer algorithm?*

A computer algorithm is a set of steps to accomplish a task that is described precisely enough that a computer can run it.

*What do we want from a computer algorithm?*

Computer algorithms solve computational problems.

* Given an input to a problem, it should always produce a **correct** solution to the problem;
* It should use computational **resources** efficiently while doing so.

## Correctness

1. Sometimes, we can accept that a computer algorithm might produce an incorrect answer, as long as we can control how often it does so. For example: **Encryption**
2. Correctness is a tricky issue with another class of algorithms -- **approximation algorithms**.
   * For some problems, we have no algorithm that finds an optimal solution in any reasonable amount of time, but we know of an approximation algorithm that, in a reasonable amount of time, can find a solution that is almost optimal (the quantitative measure of the solution found by the approximation algorithm is within some known factor of the optimal solution's quantitative measure).
   * As long as we specify what the desired factor is, we can say that a correct solution from an approximation algorithm is any solution that is within that factor of the optimal solution.

## Resource usage

In this book, we focus on just one resource: **time**.

*How do we judge the time required by an algorithm?*

There are two factors：

1. **Input size**
2. **Order of growth of the running time**





# Chapter 2: Describe and Evaluate Computer Algorithms

**Example 1st: LINEAR-SEARCH**
```
Procedure LINEAR-SEARCH(A; n; x)

Inputs:
A: an array.
n: the number of elements in A to search through.
x: the value being searched for.

Output: Either an index i for which A[i]=x, or the special value NOT-FOUND, which could be any invalid index into the array, such as 0 or any negative integer.
------
1. Set answer to NOT-FOUND.
2. For each index i, going from 1 to n, in order:
    A. If A[i]=x, then set answer to the value of i.
3.Return the value of answer as the output.
```

## First: input-size
Input:
1. An array `A` of n elements
2. number `n`
3. value `x` we're searching for

The size of `n` and `x` are insignificant as the array `A` get large.


## Second: order of growth

> **Assumptions:**
> Each individual operation - whether it's an arithmetic operation, a comparison, assigning to a variable, indexing into an array, or calling or returning from a procedure - takes some fixed amount of time that is independent of the input size. Let's say that each execution of step $i$ takes $t^i$ time, where $t^i$ is some constant that does not depend on `n`.
>
> We need to take account that some steps execute multiple times.

In LINEAR-SEARCH, the running time is somewhere between:

$t_{1} + t'_{2}\cdot(n+1) + t''_{2}\cdot{n} + t'_{2A}\cdot{n} + t''_{2A}\cdot{0} + t_{3}$

and

$t_{1} + t'_{2}\cdot(n+1) + t''_{2}\cdot{n} + t'_{2A}\cdot{n} + t''_{2A}\cdot{n} + t_{3}$

*Note*:

1. $t'_{2} (n+1)$: the test of $i$ against $n$ happens $n+1$ times;
2. $t''_{2} n$: incrementing $i$ happens $n$ times;
3. $t'_{2A} n$: testing whether $A[i] = x$;
4. $t''_{2A}$: setting answer to $i$;

*Rewrite* these bounds, collecting terms that multiply by `n` together, and collecting the rest of the terms:
1. **lower bound**: $(t'_{2} + t''_{2} + t'_{2A})\cdot{n} + (t_{3} + t_{1} + t'_{2})$
2. **upper bound**: $(t'_2 + t''_2 + t'_{2A} + t''_{2A})\cdot{n} + (t_3 + t_1 + t'_2)$

Notice that both of these bounds are of the form `cn+d`, where `c` and `d` are constant that do not depend on `n`.

So, they are both linear functions of `n`.


### **θ-notation**
We use a special notation to indicate that a running time is *bounded from above* by some linear function of `n` *and from below* by some linear function of `n`. We write that running time is $θ(n)$ (theta of n).

*For $f(n)=θ(g(n))$, $θ(g(n))$ will discard the low-order term and the coefficients of $f(n)$.*

*Although we lose precision by characterizing the running time as $θ(g(n))$, we gain the advantages of highlighting the order if growth of the running time and suppressing tedious detail*.

*θ-notation can applies to functions in general, not just those that describe running times of algorithms, and it  applies to functions other than linear ones.*

For example, we can write: $n^2/4 + 100n + 50 = θ(n^2)$.

### O-notation and Ω-notation

Now let's look at BETTER-LINEAR-SEARCH:

**Example 2nd: BETTER-LINEAR-SEARCH**
```
Procedure BETTER-LINEAR-SEARCH(A,n,x)
Inputs and Output: Same as LINEAR-SEARCH.
------
1. For i = 1 to n:
    A. if A[i] = x, then return the value of i as the output.
2. Return NOT-FOUND as the output.
```

This one is a little trickier than LINEAR-SEARCH because *we don't know in advance how many times the loop will iterate*.

If `A[1]` equals `x`, then it will iterate just once; if `x` is not present in the array, then the loop will iterate all n times, which is the maximum possible. So in the worst case, BETTER-LINEAR-SEARCH takes $θ(n)$ time to search an array of n elements.

In the best case, when `A[1]` equals x, BETTER-LINEAR-SEARCH takes just a constant amount of time: it sets `i` to 1. This amount of time does not depend on `n`. So the  best-case running time of this is $θ(1)$.

So *we cannot use θ-notation for a blanket statement that covers all cases of the running time of BETTER-LINEAR-SEARCH*.

#### **O-notation**
Now, we use *$O(g(n))$ (big-oh of g(n)) to indicate that a running time is never worse than a constant times function $g(n)$*. For $f(n)=O(g(n))$ , once `n` becomes sufficiently large, $f(n)$ is *bounded from above* by some constant times $g(n)$.

For BETTER-LINEAR-SEARCH, we can say that its running time in all cases is $O(n)$; Although the running time might be better than a linear function of `n`, it's never worse.

#### **Ω-notation**
We use *$Ω(g(n))$ (big-omega of g(n)) to indicate that its running time is never better than a constant times function $g(n)$.* For $f(n)=Ω(g(n))$, once `n` becomes sufficiently large, $f(n)$ is *bounded from below* by some constant times $g(n)$.



θ-notation, O-notation and Ω-notation is **asymptotic notation**. They give us the luxury of dropping low-order terms and constant factors so that we can ignore tedious details and focus on what's important: how the function grows with `n`.

**Example 3rd: SENTINEL-LINEAR-SEARCH**
```
Procedure SENTINEL-LINEAR-SEARCH(A,n,x)
Input and Output: Same as LINEAR-SEARCH.
1. Save A[n] into last and then put x into A[n].
2. Set i to 1.
3. While A[i]≠x, do the following:
    A. increment i.
4. Restore A[n] from last.
5. If i<n or A[n]=x, then return the value of i as the output.
6. Otherwise, return NOT-FOUND as the output.
```

The time per iteration of SENTINEL-LINEAR-SEARCH is less than the time per iteration of BETTER-LINEAR-SEARCH. Both take a linear amount of time in the worst case, but the constant factor for SENTINEL-LINEAR-SEARCH is better.

Although we'd expect SENTINEL-LINEAR-SEARCH to be faster in practice, it would be by only a constant factor. If you use asymptotic notation, they are equivalent:
θ(n) in the worst case, θ(1) in the best case, and O(n) in all cases.



## 2.3 **Loop invariants** 循环不变式

Loop invariant: *a common method of showing correctness of an algorithm*.

An assertion that we demonstrate to be true each time we start a loop iteration.

For a loop invariant to help us argue correctness, we have to show three things about it:

1. **Initialization:** It is true before the first iteration of the loop.
2. **Maintenance:** If it is true before an iteration of the loop, it remains true before the next iteration.
3. **Termination:** The loop will terminates, and when it does, the loop invariant, along with the reason that the loop terminated, gives us a useful property.

*(可以类比数学归纳法)*


## 2.4 **Recursion**
With the technique of recursion, we solve a problem by solving smaller instances of the same problem.

*Example*: computing $n!$("n-factorial").

Predefine: `n!=1` if `n=0`, and `n! = n·(n-1)·(n-2)···3·2·1`.

```
Procedure FACTORIAL(n)

Input: A integer n;
Output: the value of n!;

1. If n=0, then return 1 as the output;
2. Otherwise, return n·FACTORIAL(n-1).
```

**For recursion to work, two properties must hold**:
1. There must be one or more **base cases**, where we compute the solution directly without recursion.
2. Each recursive call of the procedure must be on a **smaller instance of the same problem** that will eventually reach a base case.


We can often rewrite algorithms that use a loop in a recursive style. Here is linear search, without a sentinel, written recursively:
```
Procedure RECURSIVE-LINEAR-SEARCH(A,n,i,x)

Inputs: Same as LINEAR-SEARCH, but with an added parameter i;
Output: The index of an element equaling x in the subarray from A[i] through A[n], or NOT-FOUND if x does not appear in this subarray.

1. If i>n, then return NOT-FOUND;
2. Otherwise(i<=n), if A[i] = x, then return i;
3. Otherwise(i<=n and A[i]≠x), return RECURSIVE-LINEAR-SEARCH(A,n,i+1,x).
```

## 2.5 Further reading

1. Chapters 2 and 3 of CLRS [CLRS09] cover much of the material in
  this chapter.
2. An early algorithms textbook by Aho, Hopcroft, and Ullman
  [AHU74] influenced the field to use asymptotic notation to analyze
  algorithms.
3. There has been quite a bit of work in proving programs correct;
   if you would like to delve into this area, try the books by Gries
   [Gri81] and Mitchell [Mit96].





# Chapter 3: Algorithms for Sorting and Searching

If an array is sorted, then we can use a simple technique known as binary search to search an n-element array in only **$O(lgn)$** time.

So first, we need know how to get the array to be sorted.

**Four algorithms**:
1. selection sort （选择排序）
2. insertion sort （插入排序）
3. merge sort （归并排序）
4. quick sort （快速排序）

Each sorting algorithm will have its advantages and its disadvantages.

*All of the sorting algorithms that we'll see in this chapter take either **$θ(n^2)$** or **$θ(nlgn)$** time in the worst case.*

Therefore:
1. *If you were going to perform only a few searches, you'd better off just running linear search.*
2. *But if you were going to search many times, you might be better off first sorting the array and then searching by running binary search.*

Sorting is an important problem in its own right, not just as a preprocessing step for binary search.


**Key** and **Satellite data:**

In addition to the *key*(which we'll call a *sort key* when we're sorting), the elements that we sort usually include as well what we call *satellite data*. Satellite data is the information that is associated with the sort key and should travel with it when elements are moved around.



## 3.1 Binary search
*Binary search has the advantage that it takes only $O(lgn)$ time to search an n-element array.*


In a computer, we perform binary search on an array. At any point, we are considering only a subarray, that is, the portion of the array between and including two indices; let's call them `p` and `r`.

```
Procedure BINARY-SEARCH(A, n, x)
------
Inputs and Output: Same as LINEAR-SEARCH
------
1. Set p to 1, and set r to n;
2. While p<=r, do the following:
    A. Set q to Math.floor((p+r)/2);
    B. If A[q] = x, then return q;
    C. Otherwise, if A[q] < x, then set p to q+1;
    D. Otherwise, if A[q] > x, then set r to q-1;
3. Return NOT-FOUND.
```

We can also write binary search as a recursive procedure:

```
Procedure RECURSIVE-BINARY-SEARCH(A,p,r,x)
_______
Inputs and Outputs: Inputs A and x are the same as LINEAR-SEARCH, as is the output. The inputs p and r delineate the subarray A[p..r] under consideration.
_______
1. If p > r, then return NOT-FOUND.
2. Otherwise (p <= r), do the following:
	A. Set q to Math.floor((r+q)/2);
	B. If A[q] = x, then return q;
	C. Otherwise(A[q]≠x):
		C1. If A[q] > x, then return RECURSIVE-BINARY-SEARCH(A,p,q-1,x);
		C2. Otherwise A[q] < x, return RECURSIVE-BINARY-SEARCH(A,q+1,r,x);
```

The running time of binary search is *$O(lgn)$* :

- In the worst case, when the value `x` is not present in the array, we halved and halved until the subarray under consideration was empty, yielding a running time of $θ(lgn)$.
- In the best case, when `x` is found in the first iteration of the loop, the running time is  $θ(1)$.

*It is possible to beat $θ(lgn)$ worst-case time for searching*, but only if we organize data in more elaborate ways and make certain assumptions about the keys.

## 3.2 Selection sort

The simplest sorting algorithm, but far from the fastest.

```
Procedure SELECTION-SORT(A,n)

Inputs:
 - A: an array;
 - n: the number of elements in A to sort.
 
Result: The elements of A are sorted into nondecreasing order.

1. For i = 1 to n-1:
	A. Set `smallest` to `i`; 
	B. For j = i + 1 to n:
		i. If A[j]<A[smallest], then set `smallest` to j;
	C. Swap A[i] with A[smallest].
```

The running time of SELECTION-SORT is *$θ(n^2)$.*

The total number of inner-loop iterations is:

$$(n-1)+(n-2)+(n-3)+ \cdots +2+1 = \frac{n(n-1)}{2}$$

Notice that this running time  $θ(n^2)$ is a blanket statement that covers all cases. Regardless of the actual element values, the inner loop runs $θ(n^2)$ times.

Here's another way to see that the running time is  $θ(n^2)$, without using the arithmetic series. We'll show separately that the running time is both  $O(n^2)$ and  $Ω(n^2)$. (Page 35).

Two final thoughts about selection sort:

1. Its asymptotic running time of  $θ(n^2)$ is the worst of the sorting algorithms.

2. The  $θ(n^2)$ running time comes from the comparisons in step `1Bi`. But the number of times that it *moves* array elements is only $θ(n)$, because step `1C` runs on $n-1$ times. 

   *If moving array elements is particularly time-consuming* — perhaps because they are large or stored on a slow device such as a disk — *then selection sort might be a reasonable algorithm to use*.



## 3.3 Insertion sort

In selection sort, when we decided which book to put into the $i$th slot, the books in the first $i$ slots were the first $i$ books overall, sorted alphabetically by author name.

In insertion sort, the books in the first $i$ slots will be *the same books that were originally in the first $i$ slots, but now sorted by author name*.

```
Procedure INSERTION-SORT(A,n)

Inputs and Result: Same as SELECTION-SORT.

1. For i = 2 to n:
	A. Set `key` to `A[i]`, and set `j` to `i-1`;
	B. While j>0 and A[j]>key, do the following:
		i. Set A[j+1] to A[j].
		ii. Decrement j.
	C. Set A[j+1] to key.
```

Figure Example for `key` move:

<img src="images/img-for-insertion-sort-key-move-algrithms-unlocked.png">

The test in step `1B` relies on the `and` operator being *short circuiting*(短路): 

- If the expression on the left, `j > 0` is false; then it does not evaluate the expression on the right `A[j] > key`.

For the INSERTION-SORT procedure, the number of times that the inner loop iterates depends on both the index `i` of the outer loop and the values in the array elements.

> (SELETION-SORT's running time depends only on the index `i` of the outer loop).

Running time of INSERTION-SORT is *$O(n^2)$*:

- The best case will be $θ(n)$ ;
- The worst case will be $θ(n^2)$; ($\frac {n(n-1)} {2}$) 

In the worst case, INSERTION-SORT and SELECTION-SORT have running times that are asymptotically the same.

**Compare INSERTION-SORT with  SELECTION-SORT**:

- *Insertion sort is an excellent choice when the array starts out as "almost sorted"*. 
  - Suppose that each array element starts out within `k` positions of where it ends up in the sorted array. If `k` is a constant, then the running time of insertion sort would be only $θ(n)$.
  - In fact, we can even tolerate some elements moving a long distance in the array, as long as there are not too many such elements. In particular, if `l` elements can move anywhere in the array, and the remaining `n-l` elements can move at most `k` position, then the total number of shifts is at most $l(n-l) + (n-l)k= (k+l) n - (k+l) l$, Which is *$θ(n)$* if both `k` and `l` are constants.
- *Selection sort moves elements $θ(n)$ times no matter what, but insertion sort could move elements up to  $θ(n^2)$ times*. So if moving an element is particularly time-consuming and you have no reason to expect that insertion sort's input approaches the best-case situation, then you might be better off running selection sort instead of insertion sort.

## 3.4 Merge sort

Merge sort has a running time of only  *$θ(nlg n)$* in all cases.

Merge sort does have some *disadvantages*:

1. the *constant factor* that we hide in the asymptotic notation *is higher* than for the other two algorithms above. Of course, once the array size `n` gets large enough, that doesn't really matter.
2. Merge sort *does not work in place*: It has to make complete copies of the entire input array. If space is at a premium, you might not want to use merge sort.

We employ a common algorithmic paradigm known as **divide-and-conquer** in merge sort.

*Divide-and-conquer algorithm:*

1. *Divide* the problem into a number of subproblems that are smaller instances of the same problem.
2. *Conquer* the subproblems by solving them recursively. If they are small enough, solve the subproblems as *base cases*.
3. *Combine* the solutions to the subproblems into the solution for the original problem.



Apply divide-and-conquer on bookshelf sorting problem:

1. Divide by finding the number `q` of the slot midway between `p` and `r`. We do so in the same way that we found the midpoint in binary search: add `p` and `q`, divide by 2, and take the floor.
2. Conquer by recursively sorting the books in each of the two subproblems created by the divide step:  recursively sort the books that are in slots `p` through `q`, and recursively sort the books that are in slots `q+1` through `r`.
3. Combine by merging the sorted book that are in slots `p` through `q` and slots `q+1` through `r`. so that all the books in slots `p` through `r` are sorted.

Base case: when fewer than two books need to be sorted(that is , when `p>=r`),since a set of books with no books or one book is already trivially sorted.

```
Procedure MERGE-SORT(A,p,r)

Inputs:
 - A: an array.
 - p,r: starting and ending indices of a subarray of A.
 
Result: The elements of the subarray A[p..r] are sorted into nondecreasing order.

1. If p>=r, then the subarray A[p..r] has at most one element, and so it is already sorted. Just return without doing anything.
2. Otherwise, do the following:
	A. Set q to Math.floor((p+r)/2).
	B. Recursively call MERGE-SORT(A,p,q).
	C. Recursively call MERGE-SORT(A,q+1,r).
	D. Call MERGE(A,p,q,r).
```

Figure Example:

<img src="images/img-for-merge-algrithms-unlocked.png" width="500"/>

Now we focus on MERGE procedure, *how efficient is this merge procedure*?

1. Copying the elements to be merged from array A into temporary arrays (and then merge them back into A).

   1. Let $n_1=q-p+1$ be the number of elements in A[p..q] and $n_2=r-q$ be the number of elements in A[q+1..r].
   2. We create temporary arrays B with $n_1$ elements and C with $n_2$ elements, and we copy the elements in A[p..q], in order, into B, and likewise the elemnts in A[q+1..r], inorder, into C. Now we can merge these elements back into A[p..q] without fear of overwriting our only copies of them.

2. Merge them back into A.

   1. Compare the smallest element in both B and C that not yet copied back to A. 

   2. Copying the smaller one of the two back into A.

   3. Update indices into the arrays.

      Note: In constant time, we can determine which element is smaller, copy it back into the correct position of A[p..r], and update indices into the arrays.

   *So, to merge `n` elements, we move elements `2n` times and compare pairs of elements at most `n` times.*

```
Procedure MERGE(A,p,q,r)

Inputs:
 - A: an array;
 - p,q,r: indices into A. Each of the subarrays A[p..q] and A[q+1..r] is assumed to be already sorted.
 
Result: The subarray A[p..r] contains the elements originally in A[p..q] and A[q+1..r], but now the entire subarray A[p..r] is sorted.

1. Set n1 = q-p+1, and set n2 = r-q.
2. Let B[1..n1+1] and C[1..n2+1] be new arrays.
3. Copy A[p..q] into B[1..n1] and copy A[q+1..r] into C[1..n2].
4. Set both B[n1+1] and C[n2+1] to ∞.
5. Set both i and j to 1.
6. For k = p to r:
	A. If B[i]<=C[j], then set A[k] to B[i] and increment i.
	B. Otherwise (B[i]>C[j]),set A[k] to C[j] and increment j.
	
```

> In practice, we represent ∞ by a value that compares as greater than any sort key.

If we are merging `n` elements altogether, it takes *$θ(n)$* time to copy the elements into arrays B and C, and constant time per element to copy it back into A[p..r], for a total merging time of only *$θ(n)$* .

**Here is how we analyze merge sort:**

- Let's say that sorting a subarray of n elements takes time $T(n)$, which is a function that increases with $n$ . 

- The time $T(n)$ comes from the three components of the divide-and-conquer paradigm, whose times we add together:

  1. Dividing takes constant time, because it amounts to just computing the index `q`.
  2. Conquering consists of the two recursive calls on subarrays, each with $n/2$ elements. By how we defined the time to sort a subarray, each of the two recursive calls takes time $T(n/2)$.
  3. Combinging the results of the two recursive calls by merging the sorted subarrays takes  $θ(n)$ time.

- Because the constant time for dividing is a low-order term compared with the $θ(n)$ time for combining, we can absorb the dividing time into the combinging time and say that dividing and combining , together, take $θ(n)$ time. The conquer step costs $T(n/2)+T(n/2)$, or $2 T (n/2)$.

- Now, we can write a equation for $T(n)$:

  - *$$T(n) = 2T (n/2) +  θ(n)$$*   (More accurately:$$T(n) = 2T (n/2) +  f(n)$$ )

  This is an **recurrence equation**(递归式), or just *recurrence*.

  The problem is that we want to express $T(n)$ in a non-recursive manner.

- It can be a real pain in the neck to convert a function expressed as a recurrence into non-recursive form, but for a broad class of recurrence equations we can apply a cookbook method known as the "**master method**". The master method applies to many (but not all) recurrences of the form $$T(n) = aT (n/b) +  f(n)$$ , where `a` and `b` are positive integer constants.

- Fortunately, it applies to our merge-sort recurrence, and it gives the result that *$T(n)$ is $θ(nlgn)$*. 

*This $θ(nlgn)$ running time applies to all cases of merge sort* — best case, worst case, and all cases in between. *Each element is copied  $θ(nlgn)$ times*. As you can see from examining the MERGE method, when it is called with $p=1$ and $r=n$, it makes copies of all `n` elements, and *so merge sort definitely does not run in place*.



## 3.5 **Quicksort**

Quicksort uses divide-and-conquer in a slightly different way than merge sort.

Differences from merge sort:

- *Quicksort works in place*.
- Quicksort's asymptotic running time differs between the worst case and the average case. In particular, *quicksort's worst-case running time is $θ(n^2)$, but its average-case running time is better: $θ(nlgn)$.*

Quicksort also *has good constant factors* (better than merge sort's), and it is often *a good sorting algorithm to use in practice*.  

How quicksort uses  divide-and-conquer:

```
Procedure QUICKSORT(A, p, r)

Inputs and Result: Same as MERGE-SORT.

1. If p>=r, then just return without doing anything.
2. Otherwise, do the following:
	A. Call PARTITION(A,p,r), and set q to its result.
	B. Recursively call QUICKSORT(A,p,q-1).
	C. Recursively call QUICKSORT(A,q+1,r).
```

Figure Example for QUICKSORT:

<img src="images/img-for-quicksort-algrithms-unlocked.png" width="250" />

The key to quicksort is **partitioning**. Just as we were able to merge `n` elements in $θ(n)$ time, we can partition `n` elements in $θ(n)$ time.

*To partition a subarray A[p..r]:* 

1. first choose A[r] (the rightmost element) as the pivot.
2. go through the subarray from left to right, comparing each element with the pivot. We maintain indices `q` and `u` into the subarray that divide it up as follows:
   1. The subarray `A[p..q-1]` corresponds to group L: each element is less than or equal to the pivot;
   2. The subarray `A[q..u-1]` corresponds to group R: each element is greater than the pivot.
   3. The subarray `A[u..r-1]` corresponds to group U: we don't yet know how they compare with the pivot.
   4. The element `A[r]` corresponds to group P: it holds the pivot.
3. At  each step, we compare `A[u]`, the leftmost element in group U,  with the pivot.
   1. If `A[u]` is greater than the pivot, then we increment `u` to move the dividing line between groups R and U to the right.
   2. If instead `A[u]` is less than or equal to the pivot, then we swap the elements in `A[q]`(the leftmost element in group R) and `A[u]` and then increment both `q` and `u` to move the dividing lines between groups L and R and groups R and U to the right. 

```
Procedure PARTITION(A, p, r)

Inputs: Same as MERGE-SORT.

Result: Rearranges the elements of A[p..r] so that every element in A[p..q-1] is less than or equal to A[q] and every element in A[q+1..r] is greater than q. Returns the index q to the caller.

1. Set q to p.
2. For u = p to r-1 do:
	A. if A[u] <= A[r], then swap A[q] with A[u] and then increment q.
3. Swap the value in A[q] with the value in A[r] and then return q.
```

Figure Example for PARTITION:

<img src="images/img-for-quicksort-partitioned-algrithms-unlocked.png" width="600"/>

*Running time for PARTITION:*

- since each comparison takes constant time and each swap takes constant time, the total time for PARTITION on an n-element subarray is *$θ(n)$.*

**Running time for QUICKSORT** :

- As with merge sort, let's say that sorting a subarray of `n` elements takes time $T(n)$, a function that increases with `n`.

- Dividing, done by the PARTITION procedure, takes $θ(n)$ time. 

- *But the time for QUICKSORT depends on how even the partitioning turns out to be*.

- *In worst case*, the partition sizes are really unbalanced. *If every element other than the pivot is less than it*, then Partition ends up leaving the pivot in `A[r]` and return the index `r` to QUICKSORT, which QUICKSORT stores in the variable `q`. In this case, we will need $T(n-1)$ time for A[p..q-1] partition. So:

  - *$$T(n) = T(n-1) + θ(n)$$*
  - We can't solve this recurrence using the master method, but it has the solution that *$T(n)$ is $θ(n^2)$*. That's no better than selection sort!
  - *How can we get such an uneven split?*
    - If every pivot is greater than all other elements, then the array must have started out already sorted.
    - It also turns out that we get an uneven split every time if the array starts out in reverse sorted order. 

- *In best case*, we got an even split every time, each of the subarrays would have at most $n/2$ elements. The recurrence would be the same as the recurrence for merge sort:

  - *$$T(n) = 2T(n/2) + θ(n)$$*
  - In this case, $T(n)$ is *$θ(nlgn)$*.

- *In average case*:

  If the elements of the input array come in a random order, then on average we get splits that are close enough to even that QUICKSORT takes *$θ(nlgn)$* time.

  ​

**Now, suppose that you have a worst enemy**:

Your enemy has already known that you always pick the last element in each subarray as the pivot, and has arranged the array so that you always get the worst-case split. How can you foil your enemy?

Solution: *Don't always pick the last element as the pivot.* 

- In this case, previous PARTITION procedure won't work.
- So, before running the PARTITION procedure, swap `A[r]` with a randomly chosen element in `A[p..r]`. Now you've chosen your pivot randomly and you can run the PARTITION procedure.
- In fact, you *can still improve your chance of getting a split that's close to even*. *Instead of choosing one element in `A[p..r]` at random, choose three elements at random and swap the median of the three with `A[r]`.* 
  - By the median of the three, we mean the one whose value is between the other two. (If two or more of the randomly chosen elements are equal, break ties arbitrarily ????) .

*How many times does QUICKSORT swap elements?*

- That depends on whether you count "swapping" an element to the same position it started in as a swap. You could certainly check to see whether this is the case and avoid the swap if it is.
- So let's call it a swap only when an element really moves in the array as a result of swapping, that is, when $q\ne u$ in step `2A` or when $q\ne r$ in step 3 of PARTITION. 
  - The best case for minimizing swaps is also one of the worst cases for asymptotic running time: when the array is already sorted. Then no swaps occur.
  - The most swaps occur when `n` is even and the input array looks like
    `n, n-2,n-4,…,4,2,1,3,5,…,n-3,n-1`.  Then $n^2/4$ swaps occur, and the asymptotic running time is still the worst case $θ(n^2)$.

    ​	
    ​

## 3.6 Recap

### Search algorithms

| Algorithm         | Worst-case running time | Best-case running time | Requires sorted array? |
| ----------------- | :---------------------: | :--------------------: | :--------------------: |
| **Linear search** |         $θ(n)$          |         $θ(1)$         |           no           |
| **Binary search** |        $θ(lgn)$         |         $θ(1)$         |          yes           |

### Sorting algorithms

| Algorithm          | Worst-case running time | Best-case running time | Worst-case swaps | In-place? |
| ------------------ | :---------------------: | :--------------------: | :--------------: | :-------: |
| **Selection sort** |        $θ(n^2)$         |        $θ(n^2)$        |      $θ(n)$      |    yes    |
| **Insertion sort** |        $θ(n^2)$         |         $θ(n)$         |     $θ(n^2)$     |    yes    |
| **Merge sort**     |        $θ(nlgn)$        |       $θ(nlgn)$        |    $θ(nlgn)$     |    no     |
| **Quicksort**      |        $θ(n^2)$         |       $θ(nlgn)$        |     $θ(n^2)$     |    yes    |

These tables do not show *average-case running times,* because with the notable exception of quicksort, they match the worst-case running time.



### Sorting algorithms compare in practice

*For these four sorting algorithms,* **Randomized quicksort** *was the champion for n>=64*. Here are the ratios of the running times of other algorithms to randomized quicksort's running times on various input size:

<img src="images/img-for-ratio-sorting-01-algrithms-unlocked.png">

*Randomized quicksort looks pretty good, but we can beat it*.

Insertion sort works well when no element has to move very far in the array. So, once the sub-problem sizes in the recursive algorithms get down to some size `k`, no elements has to move more than `k-1` positions. Instead of continuing to recursively call randomized quicksort once the sub-problem sizes become small, what happens if we instead run insertion sort, suitably modified to sort a subarray rather than the entire array?

Indeed, *with such a hybrid method, we can sort even faster than randomized quicksort*.

In certain circumstance, a subarray size of 22 was the optimal crossover point on MacBook Pro; and a subarray size of 17 was the optimal crossover point on some PC. Here are ratios of running times of the **hybrid algorithm** to randomized quicksort on both machines, for the same problem sizes:

<img src="images/hybrid algorithm to randomized quicksort.png">

*Is it possible to beat $θ(nlgn)$ time for sorting?*

- It depends. 
- If the only way that we can determine where to place elements is by comparing elements, doing different things based on the results of the comparisons, then no, we cannot beat $θ(nlgn)$ time. 
- If we know something about the elements that we can take advantage of, we can do better.



# Chapter 4 A Lower Bound for Sorting and How to Beat It

In practice, quicksort is the fastest of the four, but if you absolutely had to guard against bad worst-case behavior, you would choose merge sort.

Is there have a algorithm can beat $θ(nlgn)$ time in the worst case?

The answer depends on the rules of the game: how is the sorting algorithm allowed to use the sort keys when determining the sorted order?

## 4.1 Rules for sorting

*In previous four algorithms of sorting, they determine the sorted order based only on comparing pairs of sort keys*.



Suppose that we know two things about the elements we are sorting:

1. Each sort key is either 1 or 2;
2. The elements consist of only sort keys — no satellite data.

In this simple situation, we can sort n elements in only $θ(n)$ time.

```
Procedure REALLY-SIMPLE-SORT(A,n)

Inputs:
 - A: an array in which each element is either 1 or 2.
 - n: the number of elements in A to sort.
 
Result: The elements of A are sorted into nondecreasing order.

1. Set k to 0.
2. For i = 1 to n:
	A. If A[i]=1, then increment k;
3. For i = 1 to k:
	A. Set A[i] to 1;
4. For i = k+1 to n:
	A. Set A[i] to 2.
```

Notice that REALLY-SIMPLE-SORT *never compares two array elements with each other*. It compares each array element with the value 1, but never with another array element.

So *in this restricted situation, we can sort without comparing pairs of sort keys*.



## 4.2 The lower bound on comparison sorting

Now that you have some idea about how the rules of the game may vary, let’s see a lower bound on how fast we can sort.

**Comparison sort** : algorithm that determines the sorted order only by comparing pairs of elements.

> The four sorting algorithms from the previous chapter are comparison sorts, but REALLY-SIMPLE-SORT is not.

**Lower bound** : In the worst case, any comparison sorting algorithm for n elements requires $Ω(nlgn)$ comparisons between pairs of elements.

1. This lower bound is *about the worst case*.
   - This lower bound is an **existential lower bound**, because it says that there exists an input that requires $Ω(nlgn)$ comparisons.
   - Another type of lower bound is a **universal lower bound**,  which applies to all inputs.
   - For sorting, the only universal lower bound we have is $Ω(n)$, since we have to look at each element at least once. (This $Ω(n)$ means $Ω(n)$ time, not $Ω(n)$ comparisons, because there are some sort algorithms do not comparing pairs of elements. )
2. This lower bound $Ω(nlgn)$ does not depend on the particular algorithm, as long as it's a comparison sorting algorithm.
   - *This lower bound applies to every comparison sorting algorithm, no matter how simple or complex.*



## 4.3 Beating the lower bound with **Counting sort**

We can *generalize the method of REALLY-SIMPLE-SORT to handle `m` different possible values for the sort keys*, as long as they are integers in a range of `m` consecutive integers, say, `0` to `m-1`, and we can also allow the elements to have satellite data.

Suppose:

- we know that the sort keys are integers in the range `0` to `m-1`;
- we know that exactly three elements have sort keys equal to `5` and that exactly six elements have sort keys less than `5`( that is, in the range 0 to 4).
- Then we know that, in the sorted array, the elements with sort keys equal to 5 should occupy positions 7,8 and 9.

Therefore, we want *compute*, *for each possible sort-key value, how many elements have sort keys less than that value* and *how many elements have sort keys equal to that value*.

We can compute how many elements have sort keys less than each possible sort-key value by first computing how many elements have sort keys equal to that value:

```
Procedure COUNT-KEYS-EQUAL(A,n,m)

Inputs:
 - A: an array of integers in the range 0 to m-1.
 - n: the number of elements in A.
 - m: defines the range of the values in A.
 
Output: An array equal[0..m-1] such that equal[j] contains the number of elements of A that equal j, for j = 0,1,2,...,m-1.

1. Let equal[0..m-1] be a new array.
2. Set all values in equal to 0.
3. For i = 1 to n:
	A. Set key to A[i].
	B. Increment equal[key].
4. Return the equal array.
```

Notice that **COUNT-KEYS-EQUAL** never compares sort keys with each other. It uses sort keys only to index into the `equal` array.

Since first loop makes `m` iterations, and the second loop makes `n` iterations, and each iteration of each loop takes constant time, COUNT-KEYS-EQUAL takes *$θ(m+n)$* time. If `m` is a constant, then COUNT-KEYS-EQUAL takes *$θ(n)$* time. 

Now we can use the `equal` array to compute a running sum to find out how may elements have sort keys less than each value:

```
Procedure COUNT-KEYS-LESS(equal,m)

Inputs:
 - equal: the array returned by COUNT-KEYS-EQUAL.
 - m: defines the index range of equal: 0 to m-1.

Output: An array less[0..m-1] such that for j=0,1,2,...,m-1, less[j] contains the sum equal[0]+equal[1]+···+equal[j-1].

1. Let less[0..m-1] be a new array.
2. Set less[0] to 0.
3. For j = 1 to m-1:
	A. Set less[j] to less[j-1] + equal[j-1];
4. Return the less array.
```

COUNT-KEYS-LESS procedure runs in $θ(n)$ time

Once we have the less array,  we can create a sorted array, though not in place:

```
Procedure REARRANGE(A, less, n, m)

Inputs:
 - A: an array of integers in the range 0 to m-1;
 - less: the array returned by COUNT-KEYS-LESS;
 - n: the number of elements in A;
 - m: defines the range of the values in A.

Output: An array B containing the elements of A, sorted.

1. let B[1..n] and next[0..m-1] be new arrays.
2. For j = 0 to m-1:
	A. Set next[j] to less[j]+1;
3. For i = 1 to n:
	A. Set key to A[i];
	B. Set index to next[key];
	C. Set B[index] to A[i];
	D. Increment next[key];
4. Return the B array.
```

<img src="images/algrithms-unlocked-img-chapter04-for-less-rearrange.png" width="400" />

REARRANGE runs in $θ(m+n)$ time, which is $θ(n)$ if $m$ is a constant.

*Now we can put the three procedures together to create* **counting sort** : 

```
Procedure COUNTING-SORT(A,n,m)

Inputs:
 - A: an array of integers in the range 0 to m-1;
 - n: the number elements in A;
 - m: defines the range of the values in A;
 
Output: A array B containing the elements of A, sorted.

1. Call COUNT-KEYS-EQUAL(A,n,m), and assign its result to equal.
2. Call COUNT-KEYS-LESS(equal,m) and assign its result to less.
3. Call REARRANGE(A,less,n,m) and assign its result to B.
4. Return the B array.
```

*COUNTING-SORT runs time $θ(m+n)$, or  $θ(n)$ when $m$ is a constant.*

*Counting sort beats the lower bound of  $Ω(nlgn)$ for comparison sorting because it never compares sort keys against each other.* Instead, it uses sort keys to index into arrays, which it can do because the sort keys are small integers. *If the sort keys were real numbers with fractional parts, or they were character strings, then we could not use counting sort*.

*This procedure is a bit inefficient in how they use arrays, you can combine the `equal`, `less` and `next` arrays into one array.*

> **Example** :  One example would be if I were sorting exams by grade. The grades range from 0 to 100, but the number of students varies. I could use counting sort to sort the exams of n students in $θ(n)$ time, since m=101 (remember that the range being sorted is 0 to m-1) is a constant.

In practice, however, counting sort turns out to be useful as part of yet another sorting algorithm: *radix sort*.

In addition to running in linear time when m is a constant, counting sort has another important property: it is **stable(稳定)**. *In a stable sort, elements with the same sort key appear in the output array in the same order as they do in the input array*. In other words, a stable sort breaks ties between two elements with equal sort keys by placing first in the output array whichever element appears first in the input array.



## 4.4 **Radix sort (基数排序)**

If we want to *sort strings of characters of some fixed length*, we can use radix sort algorithm.

*Using a stable sorting method is important for Radix sort*. Counting sort is one of stable sorting methods.

*Radix sort algorithm*:

1. Assume that we can think of each sort key as a `d-digit` number, where each digit is in the range `0` to `m-1`. 
2. **Run a stable sort on each digit, going from right to left**. If we use counting sort as the stable sort, then the time to sort on one dight is $θ(m+n)$, and the time to sort all `d` digits is  **$θ(d(m+n))$**.  If `m` is a constant, then the time for radix sort is *$θ(dn)$*. If `d` is also a constant, then the time for radix sort is only $θ(n)$.

  ​

## 4.5 Further reading

Chapter 8 of CLRS expands on all the material in this chapter.





# Chapter 5 Directed Acyclic Graphs



## 5.1 Directed acyclic graphs

*Directed graphs* (有向图):

- vertex (顶点)
- directed edge (有向边)
  - Each directed edge is an ordered pair of the form `(u,v)`, where `u` and `v` are vertices.
  - When a directed graph contains a directed edge `(u,v)`, we say that:
    -  *`v` is adjacent to `u`* ;
    -  *`(u,v)` leaves `u` and enters `v`*;

**Directed acyclic graph**, or **dag** (有向非循环图):

- There is no way to "cycle" from a vertex back to itself.
- *Use* :
  - Dags are great for modeling dependencies where one task must occur before another.
  - Another use for dags arises when planning projects, such as building a house or cooking.

## 5.2 Topological sorting

*A **topological sort（拓扑排序）** of a dag produces a linear order such that if `(u,v)` is an edge in the dag, then `u` appears before `v` in the linear order.*

Topological sorting differs from sorting in the sense that we used in Chapter 3 and 4.

The linear order produced by a topological sort is *not necessarily unique*.

The number if edges entering a vertex is the vertex's **in-degree**, and so we could start with any vertex whose in-degree is 0.

Every dag must have at least one vertex with in-degree 0 and at least on vertex with **out-degree** 0, for otherwise there would be a cycle.



```
Procedure TOPOLOGICAL-SORT(G)

Input: G: a directed acyclic graph with vertices numbered 1 to n.

Output: A linear order of the vertices such that u appears before v in the linear order if (u,v) is an edge in the graph.

1. Let in-degree[1..n] be a new array, and create an empty linear order of vertices.
2. Set all values in in-degree to 0.
3. For each vertex u:
	A. For each vertex v adjacent to u:
		i. Increment in-degree[v].
4. Make a list `next` consisting of all vertices u such that in-degree[u] = 0.
5. While `next` is not empty, do the following:
	A. Delete a vertex from `next`, and call it vertex u.
	B. Add u to the end of the linear order.
	C. For each vertex v adjacent to u:
		i. Decrement in-degree[v].
		ii. If in-degree[v] = 0, then insert v into the next list.
6. Return the linear order.
```

In order to analyze the TOPOLOGICAL-SORT procedure, we first have to understand how to represent a directed graph and a list such as `next`.

When representing a graph, we won't require it to be acyclic, because the absence or presence of cycle has no effect on how we represent a graph.



## 5.3 How to represent a directed graph

Assume that we want to represent a graph that has `n` vertices and `m` edges.

1. **Adjacency matrix (邻接矩阵)**
   - an n*n adjacency matrix in which each row and each column corresponeds to one vertex, and the entry in the row for vertex u and the column for vertex v is either 1 if the edge(u,v) is present or 0 if the graph does not contain edge(u,v).
   - Since an adjacency matrix has n^2^ entries, it must be true that m<=n^2^.
2. Unordered list
   - a list of all m edges in the graph in no particular order.
3. **Adjacency-list representation (邻接表)**
   - With an n-element array indexed by the vertices in which the array entry for each vertex u is a list of all the vertices adjacent to u.

<img src="images/algrithms-unlocked-img-chapter05-adjacency-matrix.png" width="400">

The unordered list of edges and the adjacency-list representation lead to the question of how to represent a list.

- The best way to represent a list depends on what types of operations we need to perform on the list.
- For unordered edge lists and adjacency lists, we know in advance how many edges will be in each list, and the contents of the lists won't change, and so we can store each list in an array.
- We can also use an array to store a list even if the list's contents change over time, as long as we know the maximum number of items that will ever be in the list at any one time.
- If we don't need to insert an item into the middle of the list or delete an item from the middle of the list, representing a list by an array is as efficient as any other means.



​If we do need to insert into the middle of the list, then we can use a **linked list (链表)**, in which each list item includes the location of its successor item in the list, making it simple to splice in a new item after a given item. 

If we also need to delete from the middle of the list, then each item in the linked list should also include the location of its predecessor item, so that we can quickly splice out an item.

*From now on, we will assume that we can insert into or delete from a linked list in constant time*.

A linked list that has only successor links is a **singly liked list (单向链表)**. Adding predecessor links makes a **doubly linked list (双向链表)**.



## 5.4 Running time of topological sorting

If we assume that the dag uses the adjacency-list representation and the next list is a linked list, then we can show that the TOPOLOGICAL-SORT procedure takes **$θ(n+m)$** time. (Since next is a linked list, we can insert into it or delete from it in constant time) 



## 5.5 Critical path in a PERT chart			

**PERT chart**: (program evaluation and review technique)

**critical path**: The time to complete the entire job, even with as many tasks performed simultaneously as possible, is given by the "critical path" in the PERT chart.



To understand what a critical path is, we first have to understand that a path is, and then we can define a critical path.

**Path**: 

- A path in a graph is a sequence of vertices and edges that allow you to get from one vertex to another (or back to itself); we say that the path contain both the vertices on it and the edges traversed.
- a path from a vertex back to itself is a cycle, but of course dags do not have cycles.



*A **critical path** in a PERT chart is a path for which the sum of the task times is maximum over all paths.*

- The sum of tha task times along a critical path gives the minimum possible time for the entire job, no matter how many tasks are performed simultaneously.



**Dummy vertices**:

- Assuming that all task times are positive, a critical path in a PERT chart must start at some vertex with in-degree 0 and end at some vertex with out-degree 0.
- Rather than checking paths between all pairs of vertices in which one has in-degree 0 and one has out-degree 0, we can just add two “dummy” vertices, “start” and “finish”, because these are dummy vertices, we give them task times of 0.
- We add an edge from start to each vertex with in-degree 0 in the PERT chart, and we add an edge from each vertex with out-degree 0 to finish. Now the only vertex with in-degree 0 is start, and the only vertex with out-degree 0 is finish.
- A path from start to finish with the maximum sum of task times on its vertices (shaded) gives a critical path in the PERT chart—minus the dummy vertices start and finish, of course.



**shortest path**:

- Once we have added the dummy vertices, we find a critical path by finding a shortest path from start to finish, based on the task times. 

- At this point, you might think I made an error in the previous sentence, because a critical path should correspond to a longest path, not a shortest path. 

- Indeed, it does, but because a PERT chart has no cycles, we can alter the task times so that a shortest path gives us a critical path. 

- In particular, *we negate each task time and find a path from start to finish with the minimum sum of task times*.

- Why negate task times and find a path with the minimum sum of task times? Because solving this problem is a special case of finding shortest paths, and *we have plenty of algorithms for finding shortest paths*.

  ​

**Weight (权)**:

- When we talk about shortest paths, however, the values that determine path lengths are associated with edges, not with vertices. 
- We call the value that we associate with each edge its **weight**. 
- A directed graph with edge weights is a **weighted directed graph (加权有向图)**. “Weight” is a generic term for values associated with edges.
- The weight of a path is the sum of the weights of the edges on the path. 
- A shortest path from vertex `u` to vertex `v` is a path whose sum of edge weights is minimum over all paths from `u` to `v`. Shortest paths are not necessarily unique, as a directed graph from `u` to `v` could contain multiple paths whose weights achieve the minimum.

  ​		
  Here is an example dag:

<img src="images/algrithms-unlocked-img-chapter05-dag-with-weight.png" width="400">


​		
​		
*Now we just have to find a shortest path (shaded) from start to finish in this dag, based on these edge weights*. A critical path in the original PERT chart will correspond to the vertices on the shortest path we find, minus start and finish. So let’s see how to find a shortest path in a dag.



​	

## 5.6 Shortest path in a directed acyclic graph

There is another advantage to learning how to find a shortest path in a dag: we'll lay the foundations for finding shortest paths in arbitrary ditected graphs that may have cycles.

As we did for topologically sorting a dag, we’ll assume that: 

- the dag is stored with the *adjacency-list representation* 
- and with *each edge(u,v) we have also stored its weight as weight(u,v)*.



**Single-source shortest paths (SSSP, 单源最短路径)**

In a dag that we derive from a PERT chart above, we  want a shortest path from the *source vertex* to a specific *target vertex*.

Now, we'll solve the more general problem of finding **single-source shortest paths**, where we **find shortest paths from a source vertex to all other vertices**.

- By convention, we will name the source vertex `s`, and we want to compute two things for each vertex `v`.
  1. *the weight of a shortest path from `s` to `v`,  which we denote by `sp(s,v)`.*
  2. the **predecessor** of `v` on a shortest path from `s` to `v`: a vertex `u` such that a shortest path from `s` to `v` is a path from `s` to `u` and then a single edge(u,v).
- Number the `n` vertices from 1 to n, so that algorithms for shortest paths here and in Chapter 6 can store these results in arrays `shortest[1..n]` and `pred[1..n]`,
- As the algorithms unfold, the values in `shortest[v]` and `pred[v]` might not be their correct final values, but when the algorithms are done, they will be.



*We need to handle a couple of cases that can arise*:

1. what if there is no path at all from `s` to `v`?

   - Then, we define `sp(s,v) = ∞`, so that `shortest[v]` should come out to `∞`.
   - Since `v` would have no predecessor on a shortest path from `s`, we also way that `pred[v]` should be the special value `NULL`.
   - Moreover, all shortest paths from `s` start with `s`, and so `s` has no predecessor either; thus we say that `pred[s]` should also be `NULL`.

2. What if the weight of a cycle is negative?

   For now, however, we’re concerned only with acyclic graphs, and so there are no cycles, much less negative-weight cycles, to worry about.



To compute shortest paths from a source vertex `s`, *we start off with*:

- `shortest(s) = 0` (since we don’t have to go anywhere to get from a vertex to itself);
- `shortest(v) = ∞`  for all other vertices v (since we don’t know in advance which vertices can be reached from s);
- `pred[v] = NULL` for all vertices `v`.


Then we apply a series of **relaxation steps** to the edges of the graph:

```
Procedure RELAX(u,v)

Inputs: u, v: vertices such that there is an edge(u,v).

Result: The value of shortest[v] might decrease, and if it does, then pred[v] becomes u.

1. If shortest[u]+weight(u,v) < shortest[v], then set shortest[v] to shortest[u] + weight(u,v) and set pred[v] to u.
```



We're going to relax all the edges in the dag, and the edges of each shortest path will be interspersed, in order, as we go through all the edges and relax each one.



Here’s a more precise statement of how relaxing edges along a shortest path works, and it applies to any directed graph, with or withoutcycles:

- Start with `shortest(u) = 0` and `pred[u] = NULL` for all vertices,except that `shortest(s) = 0` for the source vertex s.
- Then relax the edges along a shortest path from s to any vertex v, in order, starting from the edge leaving s and ending withthe edge entering v. Relaxations of other edges may be inter-spersed freely with the relaxations along this shortest path, butonly relaxations may change any shortest or pred values.
- After the edges have been relaxed, v’s shortest and pred valuesare correct: `shortest[v] = sp(s,v)` and `pred[v]` is the vertex preceding v on some shortest path from s.



*In a dag, it's really easy to relax each edge exactly once yet relax the edges along every shortest path, in order*. How?

- First, topologically sort the dag.
- Then, consider each vertex, taken in the topologically sorted linear order, and relax all the edges leaving the vertex.
- Since every edge must leave a vertex earlier in the linear order and enter a vertex later in the order, every path in the dag must visit vertices in an order consistent with the linear order.

```
Procedure DAG-SHORTEST-PATHS(G,s)

Inputs:
 - G: a weighted directed acyclic graph, containing a set V of n vertices and a set E of m directed edges.
 - s: a source vertex in V.
 
Result: For each non-source vertex v in V, shortest[v] is the weight sp(s,v) of a shortest path from s to v and pred[v] is the vertex preceding v on some shortest path. For the source vertex s, shortest[s] = 0 and pred[s] = NULL. If there is no path from s to v, then shortest[v] = ∞ and pred[v] = NULL.

1. Call TOPOLOGICAL-SORT(G) and set l to be the linear order of vertices returned by the call.
2. Set shortest[v] to ∞ for each vertex v except s, set shortest[s] to 0, and set pred[v] to NULL for each vertex v.
3. For each vertex u, taken in the order given by l:
	A. For each vertex v adjacent to u:
		i. Call RELAX(u,v).
```

The next image shows a dag with weights appearing next to the edges. The shortest values from running DAG-SHORTSET-PATHS from source vertex s appear inside the vertices, and shaded edges indicate the pred values.

<img src="images/algrithms-unlocked-img-chapter05-dag-01.png" width="300">

*The vertices are laid out left to right in the linear order returned by the topological sort, so that all edges go from left to right.*

If an edge (u,v) is shaded, then pred[v] is u and shortest[v] = shortest[u]+weight(u,v); for example, since (x,y) is shaded, pred[y] = x and shortest[y] equals shortest[x]+weight(x,y).

There is no path from s to r, and so shortest[r] = ∞ and pred[r] = NULL.



*DAG-SHORTSET-PATHS runs in $θ(m+n)$ time.*

- step 1 takes $θ(m+n)$ time
- step 2 initializes two values for each vertex and therefore takes $θ(n)$ time.
- the outer loop of step 3 examines each vertex exactly once, and the inner loop of step 3A examines each edge exactly once over all iterations. Because each call of RELAX in step 3Ai takes constant time, step 3 takes $θ(m+n)$ time.



Going back to PERT charts, *it’s now easy to see that finding a critical path takes $θ(m+n)$ time, where the PERT chart has n vertices and m edges.* 

- We add the two vertices, start and finish, and we add at most m edges leaving start and at most m edges entering finish, for a total of at most 3m edges in the dag. 
- Negating the weights and pushing them from the vertices to the edges takes  $θ(m)$ time, and then finding a shortest path through the resulting dag takes  $θ(m+n)$ time.



> 寻找最短路径-注释笔记：
>
> 1. *拓扑排序在这里的作用，是用来生成一个特定的线性顺序（不唯一），让我们可以不重复的按照顺序遍历相邻顶点组成的线段。*
>
> 2. *每一条线段（u->v）包含的信息有：(以下都是自己定义的变量名，为了描述方便)*
>
>    1. *前置顶点u*
>    2. *u距离s的权重$w_1$*
>    3. *u到v的权重$w_2$*
>    4. *v距离s的权重$w_3​$*
>    5. *v的前驱顶点$p$*
>
> 3. *如果$w_1 + w_2 < w_3$，则设置$w_3=w_1 + w_2$，并将v的前驱$p$设置为u。*
>
>    *如果$w_1 + w_2 >= w_3$，则不改变顶点v包含的相关信息。*
>
> 4. *当完成全部线段的遍历后，每个顶点v都会包含距离s最近的权重值，加上指示其最短路径的前驱顶点。*
>
>    ​

# Chapter 6 Shortest Paths

Most graphs that model real-life situations have cycles.

**single-pair shortest path (单-结点对最短路径)**

- When your GPS finds the fastest route from your current location to a specific destination, it is solving the single-pair shortest path problem.

- Your GPS works with a weighted directed graph, where the edge weights represent either distance or travel time.

  - Because you can't drive a negative distance or arrive before you've departed, all edge weights in your GPS's graph are *positive*.
  - I suppose that some of them could be 0 for some weird reason, so let's say that the edge weights are *non-negative*.

- *When all edge weights are nonnegative, we don't have to worry about negative-weight cycles, and all shortest paths are well defined.*


  ​	

What about graphs with negative-weight edges? How do they relate to the real world? 

- We'll see that we can couch the problem of determining whether an arbitrage opportunity exist in currency trading as determining whether a graph that may have negative-weight edges has a negative-weight cycle.



Dijkstra's algorithm

Bellman-Ford algorithm



### Dijkstra's algorithm

Dijkstra's algorithm works on graphs that have two important differences from the graphs we saw in Chapter 5: 

- all edge weights must be nonnegative
- the graph may contain cycles.

It is at the core of how your GPS finds routes.