# Arithmetic

## I. Calculating with Natural Numbers

### fundamental laws of reckoning

**Five fundamental laws of addition**:

1. $a+b$ is always again a number

   (Addition is always possible, in contrast to subtraction, which is not always possible in the domain of positive integers.)

2.  $a+b$ is one-valued.

3. The associative law: $(a+b)+c=a+(b+c)$

4. the commutative law: $a+b=b+a$

5. The monotonic law: $if\; b>c,\;then\;a+b>a+c$



**Five laws of multiplication**:

1. $a\cdot b$ is always a number.
2. $a\cdot b$ is one-valued.
3. Assciative law: $a \cdot (b \cdot c) = (a \cdot b) \cdot c$ 
4. Commutative law: $a \cdot b = b \cdot a$
5. Monotonic law: $if\; b>c,\;then\;a \cdot b>a \cdot c$



Multiplication together with addition obeys also the **Distributive law**:

$a \cdot (b+c) = a \cdot b + a \cdot c$



All elementary reckoning can be based upon these eleven laws.

*Ordinary reckoning with integers consists in repeated use of the eleven fundamental laws together with the memorized results of the addition and multiplication.*



### Logical Foundations of Operations with Integers

How does one justify the above-mentioned fundamental laws, how does one account for the notion of number at all?



So far as the notion of number is concerned, it is very difficult to discover its origin.



##### Intuitive(直觉) view:

**Theorem of mathematical induction**: If a theorem holds for small numbers, and if an assumption of its validity for a number n always insures its validity for n+1, then it holds generally for every number.

This theorem is an *intuitive* truth, carries us over the boundary where sense perception fails.



If we would realize teh significance of this question as the the source of the validity of our eleven fundamental rules of reckoning, we should remember that, mathematics as a whole rests ultimately upon them.



*The security of entire structure of mathmatics rests upon intuition, where this word is to be understood in its most general sense.*



##### Point Set(点集) view:

*The properties of integers and of operations with them are to be deduced from the general properties and abstract relations of point sets.*



##### Purely formal theory of numbers(数的纯形式理论) view:

Once one has the eleven fundamental rules of reckoning, one can operate with the letters a, b, c, …, be things devoid of meaning, or things of whose meaning we know nothing; let us agree only that one may combine them according to those eleven rules, but that these combinations need not have any real known meaning.



Only the question arises here:

*Whether these operations could lead one to contradictions?*





## II. The First Extension of the Notion of Number

Extension of the number concept:

- Introduction of **fractions** and operations with fractions.
- Treatment of **negative numbers**
- More or less complete presentation of the notion of **irrational numbers** by examples that arise upon different occasions, which leads to the notion of the **continuum of real numbers (实数连续统)**.



### 2.1 Negative Numbers

The creation of negative numbers is motivated by the demand that:

- *the operation of subtraction shall be possible in all cases.*



Here, for the first time, we meet the transition from concrete to formal mathematics.



When negative numbers are introduced:

- *addition and subtraction coalesce*.

  The new operation of addition (including subtraction) in the domain of positive and negative numbers the five formal laws stated before hold without change. 

- The chief point in the multiplication of positive and negative numbers is the *rule of signs*:

  *The absolute value of a product is equal to the product of the absolute values of the factors; its sign is positive or negative according as an even or an odd number of factors is negative.*

  With this convention, multiplication in the domain of positive and negative numbers has again the following properties:

  1. Always possible.
  2. Unique.
  3. Associative.
  4. Commutative.
  5. Distributive with respect to addition.???

  There is a change only in the monotonic law:

  6. If $a>b$ then:
     - if $c>0$, then $a \cdot c > b \cdot c$;
     - if $c<0$, then $a \cdot c<b \cdot c$;



*Again, whether these laws, considered again purely formally, are consistent?*

- A purely logical proof of consistency is as yet much less possible here than it is in the case of integers.

- Only a reduction is possible, in the sense that the present laws are consistent if the laws for integers are consistent.

- But until this had been completed by a logical consistency proof for integers, one will have to hold that *the consistency of our laws is based solely on the fact that there are intuitive things, with intuitive relations, which obey these laws.*

- From the present point of view, we have the so called **parenthesis rules** for operations with positive numbers, which are, of course, contained in our fundamental formulas, provided one includes the corresponding laws for subtraction. In order to show the possibility of extremely simple intuitive proofs for them, let see two examples:

  1. Given $a>b$ and $c>a$, where a, b, c are positive. Then $a-b$ is a positive number and is smaller than c, that is, $c-(a-b)$ must exist as a positive number.

     Now, You can easily use axis of abscissas to prove that $c-(a-b)=c-a+b$ :

     <img src="images/elementary-mathematics-from-an-advanced-standpoint-001.PNG">

  2. Given $a>b$ and $c>d$; then $a-b$ and $c-d$ are positive integers. We wish to examine the product $(a-b) \cdot (c-d)$; for that purpose, draw the rectangle with sides $a-b$ and $c-d$ whose area is the number sought, $(a-b) \cdot (c-d)$, and which is part of the rectangle with sides a and c.

     Then, we also can easily prove that: $(a-b)(c-d)=ac-ad-bc+bd$.

     <img src="images/elementary-mathematics-from-an-advanced-standpoint-002.PNG">

  3. ​



















