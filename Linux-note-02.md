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



