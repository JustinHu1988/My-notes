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





### 1-16  

```C
#include <stdio.h>
#define MAXLINE 10 /* maximum input line size */

int get_line(char line[], int maxline);
void copy(char to[], char from[]);

int main()
{
    int len;	/* current line length */
    int max;	/* maximum length seen so far */
    char line[MAXLINE];	/* current input line */
    char longest[MAXLINE];	/* longest line saved here */
    
    
    max = 0;
    while((len = get_line(line, MAXLINE)) > 0)
        if (len > max) {
            max = len;
            copy(longest, line); //
        }
    if(max > 0)
        printf("The longest's length is %d, it's content are: %s\n", max, longest);
    return 0;
}

/* get_line: read a line to s, return length */
int get_line(char s[], int lim)
{
    int c, i, j;
    j=0;
    
    for (i=0; (c=getchar())!=EOF && c!='\n'; ++i){
        if(i<lim-2){
            s[j] = c;
            ++j;
        }
    }
    if (c == '\n'){
        s[j] = c;
        ++j;
        ++i;
    }
    s[j] = '\0';
    return i;
}

/* copy: copy 'from' into 'to'; assume to is big enough */
void copy(char to[], char from[])
{
    int i;
    
    i = 0;
    while((to[i] = from[i]) != '\0')
        ++i;
}
```



### 1-17 print all input lines that are longer than 80 characters

```C
#include <stdio.h>
#define MAXLINE 1000
#define LONGLINE 80
int get_line(char str[]);

int main()
{
    char str[MAXLINE];
    int len;
    
    while((len = get_line(str))> 0){
        if(len>80){
            printf("%s", str);
        }
    }
    
}
int get_line(char str[]){
    int i, c=0;
    
    for(i=0; i<MAXLINE && (c=getchar())!=EOF && c!='\n'; ++i){
        str[i] = c;
    }
    if(c=='\n'){
        str[i] = c;
        ++i;
    }
    str[i] = '\0';
    
    return i;
}
```



### 1-18

```C
#include <stdio.h>
#define MAXLINE 1000
#define LONGLINE 8
int get_line(char str[]);
int remove_line(char str[], char str_01[]);

int main()
{
    char str[MAXLINE];
    
    int len, actLen = 0;
    
    while((len = get_line(str))> 0){
        if(len>LONGLINE){
            char str_01[MAXLINE];
            actLen = remove_line(str, str_01);
            if(len>LONGLINE && actLen >0){
                
                printf("%s", str_01);
            }
        }
        
    }
    
}
int get_line(char str[]){
    int i, c=0;
    
    for(i=0; i<MAXLINE && (c=getchar())!=EOF && c!='\n'; ++i){
        str[i] = c;
    }
    if(c=='\n'){
        str[i] = c;
        ++i;
    }
    str[i] = '\0';
    
    return i;
}

int remove_line(char str[], char str_01[]){
    int i = 0, j=0;
    while(str[i] != '\n'){
        if(str[i] !=' ' && str[i] != '\t'){
            str_01[j] = str[i];
            ++j;
        }
        ++i;
    }
    str_01[j] = '\n';
    ++j;
    str_01[j] = '\0';
    return j;
}
```



### 1-19 reverse

```C

#include <stdio.h>
#define MAXLINE 1000
#define LONGLINE 8
int get_line(char str[]);
int reverse_line(char str[], char str_01[], int len);

int main()
{
    char str[MAXLINE];
    
    int len, actLen = 0;
    
    while((len = get_line(str))> 0){
        if(len>LONGLINE){
            char str_01[MAXLINE];
            actLen = reverse_line(str, str_01, len);
            if(len>LONGLINE && actLen >0){
                
                printf("%s", str_01);
            }
        }   
    }
}
int get_line(char str[]){
    int i, c=0;
    
    for(i=0; i<MAXLINE && (c=getchar())!=EOF && c!='\n'; ++i){
        str[i] = c;
    }
    if(c=='\n'){
        str[i] = c;
        ++i;
    }
    str[i] = '\0';
    
    return i;
}

int reverse_line(char str[], char str_01[], int len){
    int i = 0, j=0;
    for(i = len-2; i>=0; --i){
        str_01[j] = str[i];
        ++j;
    }
    str_01[j] = '\n';
    ++j;
    str_01[j] = '\0';
    return j;
}
```









