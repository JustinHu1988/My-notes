# Algorithms Unlocked

# Chapter 2:

## How to characterize running times

**Example: LINEAR-SEARCH**
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

> two factors：
1. input size
2. order of growth

### First: input-size
Input:
1. An array `A` of n elements
2. number `n`
3. value `x` we're searching for

The size of `n` and `x` are insignificant as the array `A` get large.


### Second: order of growth

>**Assumptions:**
1. Each individual operation - whether it's an arithmetic operation, a comparison, assigning to a variable, indexing into an array, or calling or returning from a procedure - takes some fixed amount of time that is independent of the input size. Let's say that each execution of step `i` takes `t`<sub>`i`</sub> time, where `t`<sub>`i`</sub> is some constant that does not depend on `n`.
2. We need to take account that some steps execute multiple times.


In LINEAR-SEARCH, the running time is somewhere between:

t<sub>1</sub> + t'<sub>2</sub>(n+1) + t"<sub>2</sub>n + t'<sub>2A</sub>n + t"<sub>2A</sub>·0 + t<sub>3</sub>

and

t<sub>1</sub> + t'<sub>2</sub>(n+1) + t"<sub>2</sub>n + t'<sub>2A</sub>n + t"<sub>2A</sub>·n + t<sub>3</sub>

> Note:
1. t'<sub>2</sub>(n+1): the test of `i` against `n` happens `n+1` times;
2. t"<sub>2</sub>n: incrementing `i` happens `n` times;
3. t'<sub>2A</sub>n: testing whether `A[i] = x`;
4. t"<sub>2A</sub>: setting answer to `i`;

**Rewrite** these bounds, collecting terms that multiply by `n` together, and collecting the rest of the terms:
1. **lower bound**: (t'<sub>2</sub> + t"<sub>2</sub> + t'<sub>2A</sub>)n + (t<sub>3</sub> + t<sub>1</sub> + t'<sub>2</sub>)
2. **upper bound**: (t'<sub>2</sub> + t"<sub>2</sub> + t'<sub>2A</sub> + t"<sub>2A</sub>)n + (t<sub>3</sub> + t<sub>1</sub> + t'<sub>2</sub>)

Notice that both of these bounds are of the form `cn+d`, where `c` and `d` are constant that do not depend on `n`.

So, they are both *linear functions* of `n`.


#### θ-notation
We use a special notation to indicate that a running time is bounded from above by some linear function of `n` and from below by some linear function of `n`. We write that running time is `θ(n)` (theta of n).

`θ(n)` will discard the low-order term and the coefficients of `n`. Although we lose precision by characterizing the running time as `θ(n)`, we gain the advantages of highlighting the order if growth of the running time and suppressing tedious detail.

`θ` notation can applies to functions in general, not just those that describe running times of algorithms, and it  applies to functions other than linear ones.

For example, we can write: n<sup>2</sup>/4 + 100n + 50 = θ(n<sup>2</sup>).

#### O-notation and Ω-notation

Now let's look at BETTER-LINEAR-SEARCH:

**Example: BETTER-LINEAR-SEARCH**
```
Procedure BETTER-LINEAR-SEARCH(A,n,x)
Inputs and Output: Same as LINEAR-SEARCH.
------
1. For i = 1 to n:
    A. if A[i] = x, then return the value of i as the output.
2. Return NOT-FOUND as the output.
```

This one is a little trickier than LINEAR-SEARCH because **we don't know in advance how many times the loop will iterate**.

If `A[1]` equals `x`, then it will iterate just once; if `x` is not present in the array, then the loop will iterate all n times, which is the maximum possible. So *in the worst case*, BETTER-LINEAR-SEARCH takes `θ(n)` time to search an array of n elements.

In the best case, when `A[1]` equals x, BETTER-LINEAR-SEARCH takes just a constant amount of time: it sets `i` to 1. This amount of time does not depend on `n`. So the  best-case running time of this is `θ(1)`.

So we cannot use θ-notation for a blanket statement that covers all cases of the running time of BETTER-LINEAR-SEARCH.

##### O-notation
Now, we use **`O(g(n))`(big-oh of g(n)) to indicate that a running time is never worse than a constant times function `g(n)`**. For `f(n)=O(g(n))`, once `n` becomes sufficiently large, `f(n)` is **bounded from above** by some constant times `g(n)`.

For BETTER-LINEAR-SEARCH, we can say that its running time in all cases is `O(n)`; Although the running time might be better than a linear function of n, it's never worse.

##### Ω-notation
We use **`Ω(g(n))`(big-omega of g(n)) to indicate that its running time is never better than a constant times function `g(n)`**. For `f(n)=Ω(g(n))`, once `n` becomes sufficiently large, `f(n)` is bounded from below by some constant times `g(n)`.



θ-notation, O-notation and Ω-notation is **asymptotic notation**. They give us the luxury of dropping low-order terms and constant factors so that we can ignore tedious details and focus on what's important: how the function grows with `n`.

**Example: SENTINEL-LINEAR-SEARCH**
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



## 2.3 Loop invariants

Loop invariant: a common method of showing correctness of an algorithm.

An assertion that we demonstrate to be true each time we start a loop iteration.

For a loop invariant to help us argue correctness, we have to show three things about it:

1. **Initialization:** It is true before the first iteration of the loop.
2. **Maintenance:** If it is true before an iteration of the loop, it remains true before the next iteration.
3. **Termination:** The loop will terminates, and when it does, the loop invariant, along with the reason that the loop terminated, gives us a useful property.

(可以类比数学归纳法)


## 2.4 Recursion
With the technique of recursion, we solve a problem by solving smaller instances of the same problem.

**Example**: computing `n!`("n-factorial").

Predefine: `n!=1` if `n=0`, and `n! = n·(n-1)·(n-2)···3·2·1`.

```
Procedure FACTORIAL(n)

Input: A integer n;

Output: the value of n!;

1. If n=0, then return 1 as the output;
2. Otherwise, return n·FACTORIAL(n-1).

```

For recursion to work, two properties must hold:
1. There must be one or more **base cases**, where we compute the solution directly without recursion.
2. Each recursive call of the procedure must be on a *smaller instance of the same problem* that will eventually reach a base case.


We can often rewrite algorithms that use a loop in a recursive style. Here is linear search, without a sentinel, written recursively:
```
Procedure RECURSIVE-LINEAR-SEARCH(A,n,i,x)

Inputs: Same as LINEAR-SEARCH, but with an added parameter i;

Output: The index of an element equaling x in the subarray from A[i] through A[n], or NOT-FOUND if x does not appear in this subarray.

1. If i>n, then return NOT-FOUND;
2. Otherwise(i<=n), if A[i] = x, then return i;
3. Otherwise(i<=n adn A[i]≠x), return RECURSIVE-LINEAR-SEARCH(A,n,i+1,x).

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



# 3 Algorithms for Sorting and Searching

If an array is sorted, then we can use a simple technique known as binary search to search an n-element array in only O(lg`n`) time.




















