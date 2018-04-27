# Linux basic

## Querying command

- **`whatis`** -  describe the command briefly
  - `whatis command` - `whatis` can show the category of the command.
  - **`whatis -w "loca*"`** - use regular expression to find the description of the command
- **`info`** - more detail about the command
- **`man`** - Manual page of command
  - man page have 9 categories:
    1. Executable programs or shell commands
    2. System calls
    3. Library functions, covering in particular the C standard library
    4. Special Files (usually devices, those found in `/dev`) and drivers
    5. File Formats and conventions
    6. Games
    7. Miscellanea
    8. System administration commands and daemons 
    9. Kernel routines []
  - **`man -k`**
    - Find command by keyword
- **`which`**
  - Locate a command
- **`whereis`**
  - Locate the binary, source and manual page files for a command



For more information about these commands, use `man command`.



## Managing filesystem

- **`mkdir`**
  - Make directories
- **`rmdir`**
  - Remove empty directories
- **`rm`**
  - remove files or directories
- **`mv`**
  - Move(rename) files
- **`cp`**
  - Copy files and directories 
  - `cp -r source_dir dest_dir`: copy directories recursively
- **`cd`**
  - Change directory
- **`pwd`**
  - Print name of current/working directory
- **`ls`**
  - List directory contents
  - **`ls -lrt`** : list contents in long listing format, sort by modification time, oldest first.
  - **`ls | cat -n`** : list all the file and give every file an index 
- **`locate`**
  - find files by name
  - Need to use **`updatedb`** to update the database.
- **`find`**
  - Search for files in a directory hierarchy (realtime search)
  - `find ./ | wc -l`
    - Find the number of contents in current directory
- **`chown`**
  - Change file owner and group
  - `chown -R`
- **`chmod`**
  - Change file mode bits
- **`ln`**
  - Make links between files (hard link by default)
  - **`ln -s`** : make symbolic links instead of hard links



#### check the content of file

- **`cat`**
  - Concatenate files and print on the standard output
- **`vi`**
  - a programmers text editor
- **`head`**
  - Output the first part of files
- **`tail`**
  - Output the last part of files
- **`more`**
  - file perusal filter for crt viewing
- **`grep`**
  - Print lines matching a pattern
  - `grep -v`: invert match



**Create aliases**:

- *Manage aliases temporarily*:
  - **`alias`** - add and list aliases.
    - For example: `alias lsl='ls -lrt'`.
  - **`unalias`** - remove an alias.


- *Add alias permanently*: 
  - Add command into **`~/.bashrc`** file.
    - `~/.bashrc` contains the information that is specific to your bash shells.
    - It is readed when you log in and also each time you open a new bash shell.
    - This is the best location to add aliases so that your shell picks them up.
    - *you can also add environment variables into `~/.bashrc`.*



## Metacharacters 

#### Connecting and expanding commands

- **`|`**
  - connects the output from one command to the input of another command.
- **`;`**
  - With one command completing before the next command begins.
- **`&&`**
  - `[ test ] && action`
  - If the test is true, perform the "action" command
- **`||`**
  - `[ test ] || action`
  - If the test is false, perform the "action" command

#### File-redirection metacharacters

- **`<`** — Directs the contents of a file to the command.
- **`>`** — Directs the standard output of a command to a file.
  - `: > a.txt` : clear the `a.txt` file.
- **`2>`** — Directs standard error (error messages) to the file.
- **`&>`** — Directs both standard output and standard error to the file.
- **`>>`** — Directs the output of a command to a file
  - adding the output to the end of the existing file.



## set environment variables

1. Temporarily add environment variables:

   ```shell
   PATH=$APPDIR:/opt/app/soft/bin:$PATH:/usr/local/bin:$TUXDIR/bin:$ORACLE_HOME/bin;export PATH
   ```

2. Permanently add:

   - If you are add a path for all users, you may add a path to the $PATH in **`/etc/profile`**.
   - If you add a path for a particular user, add it into **`~/.bashrc`**.



## Bash shortcut key

- Ctrl+U
- Ctrl+W
- Ctrl+H
- Ctrl+R




## Managing text file

#### Use **`find`** to search files

- Find `txt` and `pdf` files in current directory:

  ```shell
  find . \( -name "*.txt" -o -name "*.pdf" \) -print
  ```

- Use *regular expression* to find txt and pdf:

  ```shell
  find . -regex ".*\(\.txt|\.pdf\)$"
  ```

- `find . -iregex pattern`

  - Like -regex, but the match is case insensitive.

- Find all files that are *not* `txt`

  ```shell
  find . ! -name "*.txt" -print
  ```

- Print files in current directory (**`-maxdepth`** is equal to 1)

  ```shell
  find . -maxdepth 1 -type f
  ```

- Find files by *type*:

  ```shell
  find . -type d -print
  ```

- *`find` can distinguish between file, symbolic link and directory, but can not distinguish between binary file and text file.*

###### Search by time:

- Files were accessed in 7 days ago(exactly):

  ```shell
  find . -atime 7 -type f -print
  ```

- Files were accessed in last 7 days:

  ```shell
  find . -atime -7 -type f -print
  ```

- Files were accessed before 7 days ago:

  ```shell
  find . -atime +7 -type f -print
  ```

###### Search by size:

- Find files which is greater than 2k:

  ```Shell
  find . -type f -size +2k
  ```

###### Search by user

- files is owned by certain user:

  ```shell
  find . -type f -user justin -print
  ```



#### After you find files

- Delete:

  ```shell
  find . -type f -name "*.swp" -delete

  #or

  find . -type f -name "*.swp" | xargs rm
  ```

- execute some command (**`-exec`** action):

  - Change current directory files ownership:

    ```shell
    find . -type f -user root -exec chown weber {} \
    ```

    *`{}` is a special string, for every matched file, `{}` will be replaced by its filename.*

  - Copy all the files to another directory:

    ```shell
    find . -type f -mtime +10 -name ".txt" -exec cp {} 
    ```

    ​

- **combine multiple commands:**

  If you want to execute many commands after find files, you can write a shell script, then execute it after `-exec` action:

  ```shell
  -exec ./commands.sh {} \;
  ```



#### *check file type*

**`file`**: determines file type

- for example:

  ```shell
  file filename
  ```

  ​

*Command combination to find all binary files in current directory:*

```Shell
ls -lrt | awk '{print $9}' | xargs file | grep ELF | awk '{print $1}' | tr -d ':'
```



#### **`grep`** text search

- Basic syntax:

```shell
grep match_pattern file
```



- Basic options:

  - `-o`

    - Print only the matched (non-empty) parts of a matching line, with each such part on a separate output line.

  - `-v`

    - Invert the sense of matching, to select non-matching lines.

  - `-c`

    - Suppress normal output; instead print a count of matching line for each input file.

  - `-n`

    - Prefix each line of output with the 1-based line number within its input file.

  - `-i`

    - Ignore case distinctions in both the PATTERN and the input files.

  - `-l`

    - Suppress normal output; instead print the name of each input file from which output would normally have been printed. The scanning will stop on the first match.

  - **`-R`**

    - Read all files under each directory, recursively. Follow all symbolic links.

    - for example:

      ```shell
      grep "class" . -R -n
      ```

  - `-e`

    - Use PATTERN as the pattern. If this option is used multiple times or is combined with the `-f` option, search for all patterns given. This option can be used to protect a pattern beginning with "-".

    - For example:

      ```shell
      grep -e "class" -e "vitural" file
      ```



#### **`xargs`** 

`xargs` build and execute command line from standard input.

- *`xargs` reads items from the standard input, delimited by blanks (which can be protected with double or single quotes or a backslash) or newlines, and executes the command (default is **`/bin/echo`**) one or more times with any initial-arguments followed by items read from standard input.*
- Blank lines on the standard input are ignored.




Options:

- `-d` : Input items are terminated by the specified character.
  - The specified delimiter may be a single character, a C-style character escape such as `\n`
- `-n max-args` : use at most `max-args` arguments per command line.
- `-l [max-lines]` : Use at most `max-lines` nonblank input lines per command line.
- `-I replace-str` : 
- `-O` : Input items are terminated by a null character instead of by whitespace.



#### **`sort`**

Sort lines of text files.



#### **`uniq`**

Report or omit repeated lines.

For example:

- Delete repeated lines:

  ```shell
  sort unsort.txt | uniq
  ```

- Count the number of same lines:

  ```shell
  sort unsort.txt | uniq -c
  ```

- Find out repeated lines:

  ```shell
  sort unsort.txt | uniq -d
  ```

Options:

- `-s` : avoid comparing the first N characters
- `-w` : compare no more than N characters in lines



#### **`tr`**

Translate or delete characters.

*Translate, squeeze, and/or delete characters from standard input, writing to standard output.*



For example:

```shell
echo 12345 | tr '0-9' '9876543210'  # 87654
cat text | tr '\t' ' '

# delete all digits
cat file | tr -d '0-9'

# delete all non-digit characters (except ' ' and '\n')
cat file | tr -d -c '0-9 \n'

# delete redundant white space:
cat file | tr -s ' '

```



**`tr [OPTION]... SET1 [SET2]`:**

- SETs are specified as strings of characters. Most represent themselves.
- Interpreted sequences are:
  - `\NNN` : character with octal value NNN (1 to 3 octal digits)
  - `\\` : backslash
  - `\a` : audible BEL
  - `\b` : backspace
  - `\f` : form feed
  - `\n` : new line
  - `\r` : return
  - `\t` : horizontal tab
  - `\v` : vertical tab
  - `CHAR1-CHAR2`
    - All characters from `CHAR1` to `CHAR2` in ascending order.
  - `[CHAR*]` :
    - in SET2, copies of `CHAR` until length of SET1.
  - `[CHAR*REPEAT]` :
    - REPEAT copies of CHAR, REPEAT octal if starting with 0. 
  - `[:alnum:]` :
    - all letters and digits 
  - `[:alpha:]` :
    - all letters 
  - `[:digit:]` :
    - all digits 
  - `[:cntrl:]` :
    - All control characters 
  - `[:print:]` :
    - All printable characters, including space 
  - `[:graph:]` :
    - All printable characters, not including space 
  - `[:space:]` : 
    - All horizontal or vertical space
  - `[:blank:]` : 
    - All horizontal whitespace
  - `[:upper:]` :
    - all upper case letters
  - `[:lower:]` :
    - all lower case letters
  - `[:punct:]` :
    - all punctuation characters
  - `[:xdigit:]`:
    - all hexadecimal digits
  - `[=CHAR=]`:
    - all characters which are equivalent to CHAR



For example:

```shell
tr '[:lower:]' '[:upper:]'
```



#### **`cut`**

```shell
cut OPTION... [FILE]...
```

Remove sections from each line of files.

- Print selected parts of lines from each FILE to standard output.
- With no FILE, or when FILE is `-`, read standard input.
- Mandatory arguments to long options are man dater for short options too.



Options:

- `-f`

  - Select only these fields; also print any line that contains no delimiter character, unless the `-s` option is specified.

  - For exmaple:

    ```shell
    cut -d ' ' -f 2 file # cut the second word of each line of the file
    ```

- `-c`

- `-b`

- `-d`

  ​

Use one, and only one of `-b`, `-c` or `-f`. Each `LIST` is made up of one range, or many ranges separated by commas.

- Selected input is written in the same order that it is read, and is written exactly once. Each *range* is one of:
  - `N`
    - N'th byte, character or field, counted from 1.
  - `N-`
    - From N'th byte, character or field, to end of line.
  - `N-M`
    - from N'th to M'th (included) byte, character or field.
  - `-M`
    - From first to M'th (included) byte, character or field.



#### **`paste`**

Merge lines of files.

```shell
paste [OPTION]... [FILE]...
```

- Write lines consisting of the sequentially corresponding lines from each FILE, separated by TABs, to standard output.
- With no FILE, or when FILE is `-`, read standard input.



Options:

- `-d, --delimiters=LIST`
  - reuse characters from LIST instead of TABs
- `-s, --serial`
  - Paste one file at a time instead of in parallel
- `-z, --zero-terminated`
  - line delimiter is NUL, not newline



For example:

```shell
cat file1
1
2

cat file2
colin
book

paste file1 file2 -d ','
1,colin
2,book
```



#### **`wc`**

Print newline, word, and byte counts for each file.

```shell
wc -l file  # print the newline counts
wc -w file  # print the word counts
wc -m file  # print the character counts
wc -c file  # print the byte counts
wc -L file  # print the maximum display width
```



#### **`sed`**

Stream editor for filtering and transforming text.

```shell
sed [OPTION]... {script-only-if-no-other-script} [input-file]...
```

Sed is a stream editor.

- A stream editor is used to perform basic text transformations on an input stream (a file or input from a pipeline).
- While in some ways similar to an editor which permits scripted edits (such as `ed`), sed works by making only one pass over the input(s), and is consequently more efficient.
- But, it is sed's ability to filter text in a pipeline which particularly distinguishes it from other types of editors.














