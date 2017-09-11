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



## 2.3 **Loop invariants**

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
	C. Set A[j] to key.
```

The test in step `1B` relies on the `and` operator being *short circuiting*(短路): 

- If the expression on the left, `j>0` is false; then it does not evaluate the expression on the right `A[j]>key`.

For the INSERTION-SORT procedure, the number of times that the inner loop iterates depends on both the index `i` of the outer loop and the values in the array elements.

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















