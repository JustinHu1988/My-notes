# Coordinates

Most javascript methods deal with one of two coordinate systems:

1. Relative to the window (or another viewport) top/left;

2. Relative to the document top/left;

   ​

### 1. Window coordinates:

1. **`getBoundingClientRect()`**: 

   - The `Element.getBoundingClientRect()` method returns the size of an element and its position relative to the viewport.

   - The returned value is a `DOMRect`, contains attributes:

     `top`, `left`, `right`, `bottom`, `width`, `height`, `x`, `y`. 

> *Note:*
>
> 1. *`getBoundingClientRect()` 返回的对象是静态的，如果viewport发生变化，需要重新获取正确坐标。*
> 2. Coordinates `right`/`bottom` are different from CSS properties.



2. **`elementFromPoint(x,y)`**:
   - The `elementFromPoint()` property of the `DocumentOrShadowRoot`  interface returns the topmost `element` at the specified coordinates (relative to the viewpoint).

>*Note:*
>
>For out-of-window coordinates the `elementFromPoint` return `null`.
>
>The method `documentFromPont(x,y)` only works if `(x,y)` are inside the visible area.
>
>If any of the coordinates is negative or exceeds the window width/height, the it return `null`.



### 2. Document coordinates:

































