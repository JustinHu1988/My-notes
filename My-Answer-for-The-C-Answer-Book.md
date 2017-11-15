### 1-13

Write a program to print a histogram of the lengths of words in its input.

1. horizontal

```C
#include <stdio.h>
/* a horizontal historgram of the lengths of words */
#define MAXLEN 24

int main()
{
    int lenArray[MAXLEN];
    int c, maxLen, i, tmp, j;
    
    tmp = 0;
    j = 0;
    maxLen = 0;
    
    for (i = 0; i < MAXLEN; ++i)
        lenArray[i] = 0;
    
    while((c = getchar()) != EOF){
        if(c == ' ' || c == '\n' || c == '\t'){
            ++lenArray[tmp];
            tmp = 0;
        } else {
            tmp++;
        }
    }
    
    for (i = 0; i < MAXLEN; ++i){
        if(maxLen < lenArray[i])
            maxLen = lenArray[i];
    }
    
    printf("Histogram of the lengths of words:\n");
    
    for (i = 1; i < MAXLEN; ++i){
        printf("%3d: ", i);
        for(j=0; j<lenArray[i]; ++j){
            printf("|");
        }
        printf("\n");
    }     
}
```

2. vertical

```C
#include <stdio.h>
/* a vertical historgram of the lengths of words */
#define MAXLEN 24

int main()
{
    int lenArray[MAXLEN];
    int c, maxLen, i, tmp, j;
    
    tmp = 0;
    j = 0;
    maxLen = 0;
    
    for (i = 0; i < MAXLEN; ++i)
        lenArray[i] = 0;
    
    while((c = getchar()) != EOF){
        if(c == ' ' || c == '\n' || c == '\t'){
            ++lenArray[tmp];
            tmp = 0;
        } else {
            tmp++;
        }
    }
    
    for (i = 0; i < MAXLEN; ++i){
        if(maxLen < lenArray[i])
            maxLen = lenArray[i];
    }
    
    printf("Histogram of the lengths of words:\n");
    
    for (i = maxLen; i >0 ; --i){
        for (j=1; j<MAXLEN; ++j){
            if (lenArray[j] < i){
                printf("   ");
            }
            else
                printf(" - ");
        }
        printf("\n");
    }
    for (j=1; j<MAXLEN; ++j){
            printf("%2d ", j);
    }
    printf("\n");
     
}
```

### 1-14

Need first learn `<ctype.h>`.

```C

```



### 1-15

```C
#include <stdio.h>

#define LOWER 0
#define UPPER 300
#define step 20

float celsius(float fahr);

int main(){
    
    int fahr;
    fahr = LOWER;
    while(fahr <= UPPER ){
        printf("%d %.2f\n",fahr, celsius(fahr));
        fahr += 20;
    }
}

float celsius(float fahr){
    return 5.0/9.0 * (fahr-32);
}
```

