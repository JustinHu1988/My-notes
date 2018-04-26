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





























