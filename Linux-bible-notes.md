# Chapter 3 Using the Shell

The shell is a command language interpreter.



This chapter is your guide to working with the Linux system commands, processes, and filesystem from the shell. It describes the shell environment and helps you tailor it to your needs.



There are several ways to get to a shell interface in Linux. Three of the most common are:

- shell prompt
- Terminal window
- virtual console

## Running commands

The default prompt for a regular user is a dollar sign: `$`.

The default prompt for the root user is a pound sign (hash mark): `#`

```
$ who am i
justin tty1 2018-03-19 15:04
$ grep justin /etc/passwd
justin:x:1000:1000:Justin Hu,,,:/home/justin:/bin/bash
```

- **`date`**
- **`pwd`**
  - shows your current working directory
- **`hostname`**
  - shows your computer's hostname
- **`ls`**
  - Lists the files and directories in your current directory





### Command syntax:

##### Options 

Options typically consist of a single letter, preceded by a hyphen.

But you also can group single-letter options together or precede each with a hyphen, to use more than one option at a time:

```
$ ls -l -a -t
$ ls -lat
```



Some commands include options that are represented by a whole word. To tell a command to use a whole word as an option, you typically precede it with a double hyphen (`—`). 

```
$ ls --help
```

Without the double hyphen, the letters `h`,`e`,`l`,and `p` would be interpreted as separate options. 

- (There are some commands that don't follow the double hyphen convention, using a single hyphen before a word, but most commands use double hyphens for word options.)



##### arguments

Many commands also accept arguments after certain options are entered or at the end of the entire command line. 

An argument is an extra piece of information, such as a filename, directory, username, device, or other item that tells the command what to act on.

```
cat /etc/passwd
```

Displays the contents of the `etc/passwd` file on your screen.

In this case, `etc/passwd` is the argument.



Sometimes, an argument is associated with an option.

- In that case, the argument must immediately follow the option. 

- With single-letter options, the argument typically follows after a space.

  ```
  $ tar -cvf backup.tar /home/justin
  ```

  In the `tar` example just shown, the options say to create (`c`) a file (`f`) named `backup.tar` that includes all the contents of the `/home/justin` directory and its subdirectories and show verbose messages as the backup is created (`v`). Because `backup.tar` is an argument to the `f` option, `backup.tar` must immediately follow the option.

- For full-word options, the argument often follows an equal sign (`=`). Here are some examples:

  ```
  $ ls --hide=Desktop
  ```

  the --hide option tells the ls command to not display the file or directory named Desktop when listing the contents of the directory. 





```
uname
```

- Print system information

```
$ id
uid=1000(justin) gid=1000(chris) groups=1000(justin), 4(adm) .......
```

```
$ who -uH
NAME  LINE TIME         IDLE PID COMMENT 
justin tty1 Jan 13 20:57 .    2013
```



### Locating commands

To find commands you type, the shell looks in what is referred to as your path. For commands that are not in your path, you can type the complete identity of the location of the command.



*The better way is to have commands stored in well-known directories and then add those directories to your shell's **`$PATH`** environment variable*.

- The path consists of a list of directories that are checked sequentially for the commands you enter. To see your current path, type the following:

- ```
  $ echo $PATH
  /usr/local/bin:/usr/bin:/bin:/usr/local/sbin:/usr/sbin:/sbin:/home/justin/bin
  ```

  - The results show a common default path for a regular Linux user. Directories in the path list are *separated by colons.*

- *Most user commands that come with Linux are stored in the `/bin`, `/usr/bin`, or `/usr/local/bin` directories.*

- The `/sbin` and `/usr/sbin` directories contain administrative commands.

- The last directory shown is the `bin` directory in the user’s `home` directory(`/home/justin/bin`).

- *If you want to add your own commands or shell scripts, place them in the `bin` directory in your home directory (such as `/home/chris/bin` for the user named `chris`).* 

  - This directory is automatically added to your path in some Linux systems, although you may need to create that directory or add it to your PATH on other Linux systems. 
  - So, as long as you add the command to your bin with execute permission, you can begin using it by simply typing the command name at your shell prompt. 

- *To make commands available to all users, add them to `/usr/local/bin`.*



*Linux does not, by default, check the current directory for an executable before search the path.*

- It immediately begins searching the path, and executables in the current directory are run only if they are in the PATH variable or you give their absolute (such as `/home/chris/scriptx.sh`) or relative (for example, `./scriptx.sh`) address.



*The path directory order is important.*



Not all the commands you run are located in directories in your `PATH` variable. 

- Some commands are built into the shell.
- Other commands can be overridden by creating aliases that define any commands and options that you want the command to run.
- There are also ways of defining a function that consists of a stored series of commands.



*Here is the order in which the shell checks for the commands you type:*

1. **Aliases.** 
   - Names set by the `alias` command that represent a particular command and a set of options.
   - alias enable you to define a short name for a long, complicated command.
2. **Shell reserved word.**
   - Words reserved by the shell for special use.
   - Many of these are words that you would use in programming-type functions, such as `do`, `while`, `case`, and `else`. (See chapter 7)
3. **Function.**
   - a set of commands that are executed together within the current shell.
4. **Built-in command.**
   - This is a command built into the shell. 
   - As a result, there is no representation of the command in the filesystem. Some of the most common commands you will use are shell built-in commands, such as:
     - **`cd`** (to change directories), 
     - **`echo`** (to output text to the screen), 
     - **`exit`** (to exit from a shell), 
     - **`fg`** (to bring a command running in the background to the foreground), 
     - **`history`** (to see a list of commands that were previously run), 
     - `pwd` (to list the present working directory), 
     - **`set`** (to set shell options), 
     - **`type`** (to show the location of a command).
5. **Filesystem command**.
   - This command is stored in and executed from the computer's filesystem.
   - These are the commands that are indicated by the value of the `PATH` variable.



If a command resides in several locations, you can add the `-a` option to have all the known locations of the command printed. For example, the command `type -a ls` should show an aliased and filesystem location for the `ls` command.



*If a command is not in your `PATH` variable, you can use the `locate` command to try to find it.*

- *Using **`locate`**, you can search any part of the system that is accessible to you (some files are only accessible to the root user.)*





## Recalling Commands Using Command History



### Command-line editing

You can use the following steps to change the command:

1. Press the up arrow ($\uparrow$) key.
   - Display the most recent command from your shell history.
2. Press Ctrl+A.
   - This moves the cursor to the beginning of the command line.
3. Press Ctrl+F or the right arrow ($\rightarrow$) key.
4. Press Ctrl+D. 
   - Type this command to delete some characters.



Keystroke for Navigating Command Lines

| keystroke | Full Name          | Meaning                                  |
| --------- | ------------------ | ---------------------------------------- |
| Ctrl+F    | Character forward  | go forward one character                 |
| Ctrl+B    | Character backward | Go backward one character                |
| Alt+F     | Word forward       | Go forward one word                      |
| Alt+B     | Word backward      | Go backward one word                     |
| Ctrl+A    | Beginning of line  | Go to the beginning of the current line  |
| Ctrl+E    | End of line        | Go to the end of the line                |
| Ctrl+L    | Clear screen       | Clear screen and leave line at the top of the screen |



Keystrokes for Editing Command Lines

| Keystroke | Full Name                | Meaning                                  |
| --------- | ------------------------ | ---------------------------------------- |
| Ctrl+D    | Delete current           | Delete the current character.            |
| Backspace | Delete previous          | Delete the previous character.           |
| Ctrl+T    | Transpose character      | Switch positions of current and previous characters |
| Alt+T     | Transpose words          | Switch positions of current and previous words |
| Alt+U     | Uppercase word           | Change the current word to uppercase.    |
| Alt+L     | Lowercase word           | Change the current word to lowercase.    |
| Alt+C     | Capitalize word          | Change the current word to an initial capital. |
| Ctrl+V    | Insert special character | Add a special character. For example, to add a Tab character, press Ctrl+V+Tab |



Keystrokes for Cutting and Pasting Text from within Command Lines

| Keystroke | Full Name             | Meaning                                  |
| --------- | --------------------- | ---------------------------------------- |
| Ctrl+K    | Cut end of line       | Cut text to the end of the line          |
| Ctrl+U    | Cut beginning of line | Cut text to the beginning of the line    |
| Ctrl+W    | Cut previous word     | Cut the word located behind the cursor   |
| Alt+D     | Cut next word         | Cut the word following the cursor        |
| Ctrl+Y    | Paste recent text     | Paste most recently cut text             |
| Alt+Y     | Paste earlier text    | Rotate back to previously cut text and paste it. |
| Ctrl+C    | Delete whole line     | Delete the entire line                   |



### Command-line completion

To attempt to complete a value, type the first few characters and press `Tab`.

Here are some of the values you can type partially from a bash shell:

- Command, alias, or funciton
- Variable
  - If the text you type begins with a dollar sign, the shell completes the text with a variable from the current shell.
- Username
  - If the text you type begins with a tilde(`~`), the shell completes the text with a username. As a result, `~username` indicates the home directory of the named user.
- Hostname
  - If the text you type begins with the at symbol(`@`), the shell completes the text with a hostname taken from the `/etc/hosts` file.



Pressing `Tab` twice offers some wonderful possibilities. 



### Command-line recall

After you type a command line, the entire command line is saved in your shell’s history list. The list is stored in the current shell until you exit the shell. After that, it is written to a history file

To view your history list, use the `history` command. Type the command without options or followed by a number to list that many of the most recent commands. 

```
$ history 8
382 date
383 ls /usr/bin | sort -a | more
384 man sort
385 cd /usr/local/bin
386 man more
387 useradd -m /home/chris -u 101 chris 388 passwd chris
389 history 8
```

A number precedes each command line in the list. You can recall one of those commands using an exclamation point (`!`).

- Keep in mind that when using an exclamation point, the command runs blind, without presenting an opportunity to confirm the command you're referencing.



There are several ways to run a command immediately from this list, including the following:

- **`!n`** — Run command number.
  - replace the `n` with the number of the command line and that line is run.
- **`!!`** — *Run previous command.*
- **`!?string?`** — *Run command containing string*.
  - This runs the most recent command that contains a particular string of characters.




**Key Strokes for Using Command History**

| Key(s)                                  | Function Name              | Description                              |
| --------------------------------------- | -------------------------- | ---------------------------------------- |
| Arrow keys($\uparrow$ and $\downarrow$) | step                       | Press the up and down arrow keys to step through each command line in your history list to arrive at the one you want.(Ctrl+P and Ctrl+N do the same functions, respectively.) |
| *Ctrl+R*                                | Reverse incremental search | After you press these keys, you enter a search string to do a reverse search. As you type the string, a matching command line appears that you can run or edit. |
| Ctrl+S                                  | Forward incremental search | This is the same as the preceding function but for forward search. (it may not work in all instances.) |
| *Alt+P*                                 | Reverse search             | After you press these keys, you enter a string to do a reverse search. Type a string and press Enter to see the most recent command line that includes that string. |
| Alt+N                                   | Forward search             | This is the same as the preceding function but for forward search. (It may not work in all instances.) |

​			

Another way to work with your history list is to use the **`fc`** *command:*

-  Type `fc` followed by a history line number, and that command line is opened in a text editor.
  - Make the changes that you want.
-  When you exit the editor, the command runs.
-  You can also give a range of line numbers.
  - All the commands open in your text editor, and then run one after the other when you exit the editor.



​		
After you close your shell, the history list is stored in the `.bash_history` file in your home directory. Up to 1,000 history commands are stored for you by default.



> *NOTE*
>
> Some people disable the history feature for the root user by setting the **`HISTFILE`** to `/dev/null` or simply leaving `HISTSIZE` blank. This prevents information about the root user’s activities from potentially being exploited. 
>
> If you are an administrative user with root privileges, you may want to consider emptying your  file upon exiting as well for the same reasons. 
>
> Also, because shell history is stored permanently when the shell exits properly, you can prevent storing a shell’s history by killing a shell. For example, to kill a shell with process `ID 1234`, type `kill -9 1234` from any shell.
>
>
> ​				
>

## Connecting and expanding commands

A truly powerful feature of the shell is the capability to redirect the input and output of commands to and from other commands and files. 

To allow commands to be strung together, the shell uses *metacharacters*.

- A **metacharacter** is a typed character that has special meaning to the shell for connecting commands or requesting expansion.

- *Metacharacters include:*

  - pipe character **`|`**
  - ampersand **`&`**
  - semicolon **`;`**
  - right parenthesis **`)`**
  - left parenthesis **`(`**
  - Less than sign **`<`**
  - Greater than sign **`>`**

  ​

### Piping between commands

The pipe(**`|`**) metacharacter *connects the output from one command to the input of another command.*

For example:

```
$ cat /etc/passwd | sort | less
```

This command lists the contents of the `/etc/passwd` file and pipes the output to the sort command. The sort command takes the usernames that begin each line of the `/etc/passwd` file, sorts them alphabetically, and pipes the output to the less command (to page through the output).

​			

### Sequential commands

Sometimes, you may want a sequence of commands to run, *with one command completing before the next command begins*. 

You can do this by typing several commands on the same command line and separating them with semicolons (**`;`**):

For example:

- ```
  $ date ; troff -me verylargedocument | lpr ; date
  ```

  In this example, I was formatting a huge document and wanted to know how long it would take. The first command (date) showed the date and time before the formatting started. The troff command formatted the document and then piped the output to the printer. When the formatting was finished, the date and time were printed again (so I knew how long the troff command took to complete).

- Another useful command to add to the end of a long command line is `mail`. You could add the following to the end of a command line.

  ```
  ; mail -s "Finished the long command" justin@example.com
  ```

  then, a mail message is sent to the user you choose after the command completes.



### Background commands

Some commands can take a while to complete.

Sometimes, you may not want to tie up your shell waiting for a command to finish. In those cases, *you can have the commands run in the background by using the ampersand (**`&`**).*



- Text formatting commands (such as `nroff` and `troff`, described earlier) are examples of commands that are often run in the background to format a large document. 
- *You also might want to create your own shell scripts that run in the background to check continuously for certain events to occur, such as the hard disk filling up or particular users logging in.*

For example:

- The following is an example of a command being run in the background:

  ```
  $ troff -me verylargedocument | lpr &
  ```

  See more in Chapter 6.



### Expanding commands

*With command substitution, you can have the output of a command interpreted by the shell instead of by the command itself.* 

In this way, you can have the standard output of a command become an argument for another command.

*The two forms of command substitution are **`$(command)`** and **`` `command` ``** (backticks, not single quotes).*

For example:

```
$ vi $(find /home | grep xyzzy)
```

- the command substitution is done before the `vi` command is run.
- First, the find command starts at the `/home` directory and prints out all files and directories below that point in the filesystem.
- The output is piped to the `grep` command, which filters out all files except for those that include the string `xyzzy` in the filename. 
- Finally, the vi command opens all filenames for editing (one at a time) that include xyzzy. (If you run this and are not familiar with vi, you can type **`:q!`** to exit the file.)



*This particular example is useful if you want to edit a file for which you know the name but not the location.*

- As long as the string is uncommon, you can find and open every instance
  of a filename existing beneath a point you choose in the filesystem. (In other words, don’t use `grep` from the root filesystem or you’ll match and try to edit several thousand files.)



### Expanding arithmetic expressions

Sometimes, you want to pass arithmetic results to a command.

There are two forms you can use to expand an arithmetic expression and pass it to the shell: 

- **`$[expression]`**
- **`$(expression)`**



For example:

```
$ echo "I am $[2018 - 1988] years old."
I am 30 years old.
```

- The shell interprets the arithmetic expression first, and then passes that information to the `echo` command displays the text, with the results of the arithmetic `30` inserted.

```
$ echo "There are $(ls | wc -w) files in this directory."
There are 14 files in this directory.
```



### Expanding variables

*Variables that store information within the shell can be expanded using the dollar sing(**`$`**) metacharacter.*

When you expand an environment variable on a command line, the value of the variable is printed instead of the variable name itself, as follows:

```
$ ls -l $BASH
```

Using **`$BASH`** as an argument to ls -l causes a long listing of the bash command to be printed.


​		

## Using Shell Variables

The shell itself stores information that may be useful to the user’s shell session in what are called **variables**. 

- *You can see all variables set for your current shell by typing the **`set`** command.*			

A subset of your local variables are referred to as **environment variables**.

- Environment variables are variables that are ecported to any new shells opened from the current shell.
- *Type **`env`** to see environment variables*.



Because there are always multiple ways to do anything in Linux, you can also type **`declare`** to get a list of the current environment variables and their values along with a list of shell functions.



Besides those that you set yourself, system files set variables that store things such as locations of configuration files, mailboxes, and path directories. 

- They can also store values for your shell prompts, the size of your history list, and type of operating system. 

- You can refer to the value of any of those variables by preceding it with a dollar sign (`$`) and placing it anywhere on a command line. For example:

  ```
  $ echo $USER
  justin
  ```



When you start a shell, many environment variables are already set



*Some variables that either are set when you use a bash shell or can be set by you to use with different features：*

| Variable           | Description                              |
| :----------------- | ---------------------------------------- |
| **`BASH`**         | This contains the full pathname of the `bash` command. This is usually `/bin/bash`. |
| **`BASH_VERSION`** | This is a number representing the current version of the `bash` command. |
| **`EUID`**         | This is the effective user ID number of the current user. It is assigned when the shell starts, based on the user's entry in the `etc/passwd` file. |
| **`FCEDIT`**       | If set, this variable indicates the text editor used by the `fc` command to edit `history` commands. |
| **`HISTFILE`**     | This is the location of your history file. It is typically located at `$HOME/.bash_history` |
| `HISTFILESIZE`     | This is the number of history entries that can be stored. |
| `HISTCMD`          | This returns the number of the current command in the `history` list. |
| `HOME`             | This is your home directory. It is your current working directory each time you log in or type the `cd` command with any options. |
| `HOSTTYPE`         | This is a value that describes the computer architecture on which the Linux system is running. For AMD 64-bit machines, the value is x86_64. |
| `MAIL`             | This is the location of your mailbox file. The file is typically your username in the `var/spool/mail` directory. |
| `OLDPWD`           | This is the directory that was the working directory before you changed to the current working directory. |
| `OSTYPE`           | This name identifies the current operating system. |
| `PATH`             | This is the colon-separated list of directories used to find commands that you type. For the root user, the value also includes `/sbin:/usr/sbin:/usr/local/sbin` You need to type the full path or a relatie path to a command you want to run that is not in your `PATH`. |
| `PPID`             | This is the process ID of the command that started the current shell. |
| `PROMPT_COMMAND`   | This can be set to a command name that is run each time before your shell prompt is displayed. Setting `PROMPT_COMMAND=date` lists the current date/time before the prompt appears. |
| **`PS1`**          | This sets the value of your shell prompt. There are many items that you can read into your prompt(date, time, username, hostname, and so on). |
| `PWD`              | This is the directory that is assigned as your current directory. This value changes each time you change directories using the `cd` command. |
| `RANDOM`           | Accessing this variable causes a random number to be generated. |
| `SECONDS`          | This is the number of seconds since the time the shell was started. |
| `SHLVL`            | This is the number of shell levels associated with the current shell session. |
| `TMOUT`            | This can be set to a number representing the number of seconds the shell can be idle without receiving input. After the number of seconds is reached, the shell exits. |



### Creating and using aliases

*You can add and list aliases with the **`alias`** command.*

For example:

```
$ alias p='pwd ; ls -CF'
```

- the letter p is assigned to run the command `pwd`, and then to run `ls -CF` to print the current working directory and list its contents in column form.

```
$ alias rm='rm -i'
```

- Instead of just removing files, you are prompted for each individual file removal. This prevents you from automatically removing all the files in a directory by mistakenly typing something such as `rm *`.



*If you want to remove an alias, type **`unalias`**.*

- (Remember that if the alias is set in a configuration file, it will be set again when you open another shell.)



### Exiting the shell

Type: 

- **`exit`**
- **Ctrl+D**.





## Creating Your Shell Environment

You can tune your shell to help you work more efficiently.

You can set aliases to create shortcuts to your favorite command lines and environment variables to store bits of information.

*By adding those setting to shell configuration files, you can have the settings available every time you open a shell.*



### Configuring your shell

Several configuration files support how your shell behaves.

- Some of the files are executed for every user and every shell, whereas others are specific to the user who creates the configuration file.



The following table shows the files that are of interest to anyone using the bash shell in Linux.(**`~`** in the filenames to indicate that the file is located in each user's home directory.)

| File              | Description                              |
| ----------------- | ---------------------------------------- |
| `/etc/profile`    | This sets up user environment information for every user. It is executed when you first log in. This file provides values for your path, in addition to setting environment variables for such things as the location of your mailbox and the size of your history files. Finally, `/etc/profile` gathers shell settings from configuration files in the `etc/profile.d` directory. |
| `/etc/bashrc`     | This executes for every user who runs the bash shell, each time a bash shell is opened. It sets the default prompt and may add one or more aliases. Values in this file can be overridden by information in each user's `~/.bashrc` file. |
| `~/.bash_profile` | This is used by each user to enter information that is specific to his or her use of the shell. It is executed only once, when the user logs in. By default, it sets a few environment variables and executes the user's `.bashrc` file. This is a good place to add environment variables because, once set, they are inherited by future shells. |
| `~/.bashrc`       | This contains the information that is specific to your bash shells. *It is read when you log in and also each time you open a new bash shell. This is the best location to add aliases so that your shell picks them up.* |
| `~/.bash_logout`  | This executes each time you log out (exit the last bash shell). By default, it simply clears your screen. |

- *To change the `/etc/profile` or `etc/bashrc` files, you must be the root user.*
- *Users can change the information in the `$HOME/.bash_profile`, `$HOME/.bashrc` and `$HOME/.bash_logout` files in their own home directories.*
- ​

Until you learn to use the `vi` editor, you can use a simple editor called **`nano`** to edit plain-text files.

For example:

- ```
  $ nano $HOME/.bashrc
  ```

  *With the file open in `nano`, move the cursor down to the bottom of the file. Type the line you want (for example, you could type alias `d='date +%D'`).*

  To save the file, press **Ctrl+O** (the letter O); to quit, press **Ctrl+X**. The next time you log in or open a new shell, you can use the new alias (in this case, just type `d`). 

- *To have the new information you just added to the file available from the current shell, type the following:*

  ```
  $ source $HOME/.bashrc
  ```



The following sections provide ideas about items configuration files.

*In most cases, you add these values to the `.bashrc` file in your home directory.*

*However, if you administer a system, you may want to set some of these values as defaults for all your Linux system's users.*



### Setting your prompt

Your prompt consists of a set of characters that appear each time the shell is ready to accept a command.

- *If you are setting your prompt temporarily by typing at the shell, you should put the value of `PS1` in quotes.* 
  - For example, you could type export `PS1="[\t \w]\$ "` to see a prompt that looks like this: `[20:26:32 /var/spool]$`.

- *To make a change to your prompt permanent, add the value of **`PS1`** to your `.bashrc` file in your home directory.*

  - There may already be a `PS1` value in that file that you can modify. Refer to the Bash Prompt HOWTO (http://www.tldp.org/HOWTO/Bash-Prompt-HOWTO) for information on changing colors, commands, and other features of your bash shell prompt.

    ​

**Characters to Add Information to bash Prompt**:

| Special Character | Description                              |
| ----------------- | ---------------------------------------- |
| `\!`              | This shows the current command history number. This includes all previous commands stored for your username. |
| `\#`              | This shows the command number of the current command. This includes only the commands for the active shell. |
| `\$`              | This shows the user prompt (`$`) or root prompt (`#`), depending on which user you are. |
| `\W`              | This shows only the current working directory base name. For example, if the current working directory was `/var/spool/mail`, this value simple appears as `mail`. |
| `\[`              | This precedes a sequence of nonprinting characters.  This can be used to add aterminal control sequence into the prompt for such things as changing colors, add-ing blink effects, or making characters bold. (Your terminal determines the exactsequences available.) |
| `\]`              | This follows a sequence of nonprinting characters. |
| `\\`              | This shows a backslash.                  |
| `\d`              | This displays the day name, month, and day number of the current date—for exam-ple, Sat Jan 23. |
| `\h`              | This shows the hostname of the computer running the shell. |
| `\n`              | This causes a newline to occur.          |
| `\nnn`            | This shows the character that relates to the octal number replacing `nnn`. |
| `\s`              | This displays the current shell name. For the bash shell, the value would be bash. |
| `\t`              | This prints the current time in hours, minutes, and seconds—for example, 10:14:39. |
| `\u`              | This prints your current username.       |
| `\w`              | This displays the full path to the current working directory. |





### Adding environment variables

*You might want to consider adding a few environment variables to your `$HOME/.bashrc` file.* These can help make working with the shell more efficient and effective:

- **`TMOUT`**

- **`PATH`**

  - If you often use directories of commands that are not in your path, you can permanently add them. 

    To do this, add a `PATH` variable to your `.bashrc` file. 

    For example, to add a directory called `/getstuff/bin`, add the following:

    ```
    PATH=$PATH:/getstuff/bin ; export PATH
    ```

    *(直接添加在`.bashrc`文件里)*This example first reads all the current path directories into the new PATH (`$PATH`), adds the /getstuff/bin directory, and then exports the new PATH.

    >CAUTION:*
    >
    >Some people add the current directory to their PATH by adding a directory identified simply as a dot (`.`) as follows:
    >
    >```
    >PATH=.:$PATH ; export PATH
    >```
    >
    >This enables you to run commands in your current directory before evaluating any other command in the path (which people may be used to if they have used DOS). However, the security risk with this procedure is that you could be in adirectory that contains a command that you don’t intend to run from that directory. For example, a malicious personcould put an ls command in a directory that, instead of listing the content of your directory, does something devious. Because of this, the practice of adding the dot to your path is highly discouraged.

- Whatever:

  - You can create your own environment variables to provide shortcuts in your work.

  - Choose any name that is not being used and assign a useful value to it.

  - For example, if you do lots of work with files in the `/work/time/files/info/memos` directory, you could set the following variable:

    ```
    M=/work/time/files/info/memos ; export M
    ```

    You could make that your current directory by typing `cd $M`. You could run a program from that directory called hotdog by typing `$M/hotdog`. 

    You could edit a filefrom there called bun by typing `vi $M/bun`.






## Getting Information about Commands



- Check the PATH.

  - Type `echo $PATH`
    - You see a list of the directories containing commands that are immediately accessible to you.
  - *Then, you can use `ls` to list the contents of those directories, you will see most standard Linux commands.*
    - For example: `ls /bin`.

- Use the `help` command.

  - Some commands are built into the shell, so they do not appear in a directory.

    The `help` command lists those commands and shows options available with each of them.

  - For help with a particular built-in command, type `help command`, replacing `command` with the name that interests you.

- Use `--help` with the command.

- Use the `info` command.

  - Not all commands have information available in the info database, but sometimes more information can be found there than on a man page.

- Use the `man` command.



Man pages are the most common means of getting information about commands, as well as other basic components of a linux system.

**Manual Page Sections:** 

| Section Number | Section Name                            | Description                              |
| -------------- | --------------------------------------- | ---------------------------------------- |
| 1              | User Commands                           | Commands that can be run from the shell by a regular user (typically no administrative privilege is needed) |
| 2              | System Calls                            | Programming functions used within an application to make calls to the kernel |
| 3              | C Library Functions                     | Programming functions that provide interfaces to specific programming libraries (such as those for certain graphical interfaces or other libraries that operate in user space.) |
| 4              | Devices and Special Files               | Filesystem nodes that represent hardware devices (such as terminals or CD drives) or software devices (such as random number generators) |
| 5              | File Formats and Conventions            | Types of files (such as a graphics or word processing file) or specific configuration files (such as the `passwd` or `group` file). |
| 6              | Games                                   | Games available on the system            |
| 7              | Miscellaneous                           | Overviews of topics such as protocols, filesystems, character set standards, and so on. |
| 8              | System Administration Tools and Daemons | Commands that require root or other administrative privileges to use |



*Options to the `man` command enable you to search the man page database or display man pages on the screen.*

**For example:**

```
$ man -k passwd 
...
passwd(1)
passwd(5)
$ man passwd
$ man 5 passwd
```

- *Using the `-k` option, you can search the name and summary sections  of all man pages installed on the system.*
- If you type `man -k passwd`, you will see a list of name contains `passwd`.
  - *`passwd(1)`  is `passwd` command in section 1 of the man pages;*
  - *`passwd(5)` is `passwd` file in section 5.*
- *If you want to explicitly request the section 5 man page, you can type `man 5 passwd`.*
- While you are displaying a man page, *you can press the forward slash `/` and type a term to search the document for that term.*
  - *Press `n` to repeat the search forward;*
  - *Press `N` to repeat the search backward.*
  - Type `q` to quit the man page.







# Chapter 4 Moving around the Filesystem

One of the defining properties of UNIX systems on which Linux is based is that :

- nearly everything you need to identify on your system (data, commands, symbolic links, devices, and directories) is represented by items in the filesystems. 

Knowing where things are and understanding how to get around the filesystem from the shell are critical skills in Linux.



In Linux, files are organized within a hierarchy of directories. 

- Each directory can contain files, as well as other directories. 
- You can refer to any file or directory using either a full path or a relative path.



**Root directory**, represented by a single slash (**`/`**).

The Linux  lesystem is organized as a hierarchy of directories:

<img src="images/linux-bible-chapter-04-01.png" width="400">

**Some of these Linux directories may interest you:**

- `/bin`—Contains common Linux user commands, such as `ls`, `sort`, `date`, and `chmod`.
- `/boot`—Has the bootable Linux kernel and boot loader configuration files (GRUB).
- `/dev`—Contains files representing access points to devices on your systems. 
  - These include:
    - terminal devices (`tty*`), 
    - floppy disks (`fd*`), 
    - hard disks (`hd*` or `sd*`), 
    - RAM(`ram*`)
    - CD-ROM (`cd*`) 
  - Users can access these devices directly through these device files; however, applications often hide the actual device names from end users.
- `/etc`—Contains administrative configuration files. 
  - Most of these files are plaintext files that can be edited with any text editor if the user has proper permission.
- `/home`—Contains directories assigned to each regular user with a login account.
  - (The root user is an exception, using `/root` as his or her home directory.)
- `/media`—Provides a standard location for automounting devices (removable media in particular). 
  - If the medium has a volume name, that name is typically used as the mount point. For example, a USB drive with a volume name of `myusb` would be mounted on `/media/myusb`.
- `/lib`—Contains shared libraries needed by applications in `/bin` and `/sbin` to boot the system.
- `/mnt`—A common mount point for many devices before it was supplanted by the standard `/media` directory. 
  - Some bootable Linux systems still use this directory to mount hard disk partitions and remote filesystems. 
  - Many people still use this directory to temporarily mount local or remote filesystems that are not mounted permanently.
- `/misc`—A directory sometimes used to automount filesystems upon request.
- `/opt`—Directory structure available to store add-on application software.
- `/proc`—Contains information about system resources.
- `/root`—Represents the root user's home directory. 
  - The home directory for root does not reside beneath `/home` *for security reasons.*
- `/sbin`—Contains administrative commands and daemon processes.
- `/tmp`—Contains temporary files used by applications.
- `/usr`—Contains user documentation, games, graphical files (X11), libraries (lib),and a variety of other commands and files that are not needed during the bootprocess. 
  - The `/usr` directory is meant for files that don't change after installation(in theory, `/usr` could be mounted read-only).
- `/var`—Contains directories of data used by various applications. 
  - In particular, this is where you would place files that you share as an FTP server (`/var/ftp`) or a
    web server (`/var/www`). 
  - It also contains all system log files (`/var/log`) and spool files in `/var/spool` (such as `mail`, `cups`, and `news`). 
  - *The `/var` directory contains directories and files that are meant to change often.* 
  - *On server computers, it is common to create the `/var` directory as a separate filesystem, using a filesystem type that can be easily expanded.*

    ​

> Linux Filesystems versus Windows-Based Filesystems
>
> ■ In MS-DOS and Windows filesystems, drive letters represent different storage devices (forexample, A: is a  oppy drive and C: is a hard disk). *In Linux, all storage devices are connected to the filesystem hierarchy.* So the fact that all of `/usr` may be on a separate hard disk or that `/mnt/remote1` is a filesystem from another computer is invisible to the user.
>
> ■ *Slashes*, rather than backslashes, are used to separate directory names in Linux. So `C:\home\joe` in a Microsoft system is `/home/joe` in a Linux system.
>
> ■ Filenames almost always have suffixes in DOS (such as `.txt` for text files or `.doc` forword-processing files). Although at times you can use that convention in Linux, three-character suffixes have no required meaning in Linux. They can be useful for identifying a file type. Many Linux applications and desktop environments use  le suf xes to determine the contents of a file. In Linux, however, DOS command extensions such as `.com`, `.exe`, and `.bat` don’tnecessarily signify an executable. (*Permission flags make Linux files executable.*)
>
> ■ Every file and directory in a Linux system has permissions and ownership associated with it.

​				

## Using Basic Filesystem Commands

When you log in to a Linux system and open a shell, you are placed in your home directory. In Linux, most of the files you save and work with will probably be in that directory or subdirectories that you create.



**Commands to Create and Use Files**

| Command     | Result                                   |
| ----------- | ---------------------------------------- |
| `cd`        | Changes to another direcotry             |
| `pwd`       | Prints the name of the current working directory |
| **`mkdir`** | Creates a directory                      |
| **`chmod`** | *Changes the permission on a file or directory* |
| `ls`        | List the contents of a directory         |

- Return your home directory:

  ```
  $ cd
  $ cd ~
  ```

  - Tilde **`~`** can represent your home directory. So you can:

    ```
    $ cd ~/Music
    $ pwd
    /home/justin/Music
    ```

- Use **`..`** to go to a directory above the current directory.




## Using Metacharacters and Operators

Whether you are listing, moving, copying, removing, or otherwise acting on files in your Linux system, metacharacters and operators help you to work with files more efficiently.

- Metacharacters can help you match one or more files without completely typing each file name.
- Operators enable you to direct information from one command or file to another command or file.

### Using file-matching metacharacters

- **`*`** — Matches any number of characters
- **`?`** — Matches any one character.
- **`[...]`** — Matches any one of the characters between the brackets, which can include a hyphen-separated range of letters or numbers.

For example:

- First, let's create some empty files:

  ```
  $ touch apple banana grape grapefruit watermelon
  ```

  *The **`touch`** command creates empty files.*

- Now, let's try to use some metacharacters:

  ```
  $ ls a*
  apple
  $ ls g*
  grape grapefruit 
  $ ls g*t 
  grapefruit
  $ ls *e*
  apple grape grapefruit watermelon 
  $ ls *n*
  banana watermelon
  $ ls ????e
  apple grape
  $ ls g???e* 
  grape grapefruit
  $ ls [abw]*
  apple banana watermelon 
  $ ls [agw]*[ne]
  apple grape watermelon
  $ ls [a-g]*
  apple banana grape grapefruit
  ```

  ​

### *Using file-redirection metacharacters*

- **`<`** — Directs the contents of a file to the command.
  - In most cases, this is the default action expected by te command and the use of the character is optional;
  - Using `less bigfile` is the same as `less < bigfile`.
- **`>`** — Directs the standard output of a command to a file.
  - If the file exists, the content of that file is overwritten.
- **`2>`** — Directs standard error (error messages) to the file.
- **`&>`** — Directs both standard output and standard error to the file.
- **`>>`** — Directs the output of a command to a file
  - adding the output to the end of the existing file.

For example:

```
$ mail root < ~/.bashrc
$ man chmod | col -b > /tmp/chmod
$ echo "I finished the project on $(date)" >> ~/projects
```



Another type of redirection, referred to as **here text** (also called a *here document*), enables you to type text that can be used as standard input for a command.

- *Here documents involve entering two less-than characters (**`<<`**) after a command, followed by a word.*

- *All typing following that word is taken as user input until the word is repeated on a line by itself.*

- Example:

  ```
  $mail root cnegus rjones bdecker <<thetext
  > I want to tell everyone that there will be a 10 a.m.
  > meeting in conference room B. Everyone should attend.
  >
  > -- James
  > thetext
  $
  ```

- This example sends a mail message to root, census, rjones, and bdecker usernames. The text entered between `<<thetext` and `thetext` becomes the content of the message.

- A common use of here text is to use it with a text editor to create or add to a file from within a script:

  ```
  /bin/ed /etc/resolv.conf <<resendit 
  a
  nameserver 100.100.100.100
  .
  w
  q 
  resendit
  ```

  With these lines added to a script run by the root user, the `ed` text editor adds the IP address of a DNS server to the `/etc/resolv.conf` file.

### Using brace expansions characters

By using curly braces(**`{}`**), you can expand out a set of characters 



……

………







# Chapter 5 Working with Text Files

## Editing Files with vim

Two main operating mode:

- command
- input

vi editor starts in command mode.



*Adding text:*

- `a`
  - add command. 
  - input text that starts to the right of the cursor.
- `A`
  - Add at end command. 
  - Input text starting at the end of the current line.
- `i`
  - Insert command.
  - Input text that starts to the left of the cursor.
- `I`
  - Insert at beginning command.
  - Input text that starts at the beginning of the current line.
- `o`
  - open below command.
  - Open a line below the current line and put you in insert mode.
- `O`
  - Open above command.
  - Open a line above the current line and imputs you in insert mode.



*Moving around in the text:*

- Arrow keys / `h`,`l`,`j`,`k`;
- `w`
  - to the beginning of the next word (delimited by the spaces, tabs or punctuation).
- `W`
  - to the beginning of the next word (delimited by the spaces, tabs).
- `b`
  - to the beginning of the previous word (delimited by the spaces, tabs or punctuation).
- `B`
  - to the beginning of the previous word (delimited by the spaces, tabs).
- `0`(zero)
  - to the beginning of teh current line.
- `$`
  - to the end of the current line.
- `H`
  - to the Upper-left corner of the screen
- `M`
  - to the first character of the middle line on the screen.
- `L`
  - to the lower-left corner of the screen.



*Deleting, copying, and changing text:*

- `x`
  - Deletes the character under the cursor.
- `X`
  - Deletes the character directly before the cursor.
- `d<?>`
  - Deletes come text.
- `c<?>`
  - Changes come text.
- `y<?>`
  - Yanks (copies) come text.

`<?>` *after each letter in the preceding list identifies the place where you can use a movement command to choose what you are deleting, changing, or yanking.*

For example:

- `dw`
  - Delete a word after the current cursor position.
- `db`
  - Delete a word before the current cursor position.
- `dd`
  - Delete the entire current line.
- `c$`
  - *Erase from the current character to the end of the current line (`$`) and goes into input mode.*
- `c0`
  - *Erase from te previous character to the beginning of the current line.*
- `cl`
  - Erase the current letter and goes into input mode.
- `cc`
  - Erase the line and goes intto input mode.
- `yy`
  - Copy(`y`) the current line(`y`) into the buffer.
- `y)`
  - Copy the current sentence(`)`) to the right of the cursor, into the buffer.
- `y}`
  - Copy the current paragraph, to the right of the cursor, into the buffer.



*Any of the commands just shown can be further modified using numbers, as you can see in the following examples:*

- `3dd`
  - Deletes(`d`) three(`3`) line(`d`), beginning at the current line.
- `3dw`
  - Deletes(`d`) the next three(`3`) words(`w`).
- `5cl`
  - Changes(`c`) the next five(`5`) letters(`l`).*(that is, removes the letters and enters input mode)*.
- `12j`
  - Moves down(`j`) 12 lines(`12`).
- `5cw`
  - Erases(`c`) the next five (`5`) words(`w`) and goes into input mode.
- `4y)`
  - Copies(`y`) the next four(`4`) sentences(`)`).



*Pasting (putting) text*

- `P`
  - Puts the copied text to the left of the cursor if the text consists of letters or words.
  - Puts the copied text above the current line if the copied text contains lines of text.
- `p`
  - Puts the copied text to the right of the cursor if the text consists of letters or words.
  - Puts the copied text below the current line if the copied text contains lines of text.



*Repeating commands*

- `.`



*Exiting vi*

- `ZZ`
  - Saves the current changes to the file and exits from `vi`.
- `:w`
  - Saves the current file but doesn't exit from `vi`.
- `:wq`
  - Works the same as `ZZ`.
- `:q`
  - Quits the current file.
  - This works only if you don't have any unsaved changes.
- `:q!`
  - Quits the current file and doesn't save the changes you just made to the file.



*The following tips to smooth out your first trials with `vi`:*

- `Esc`
  - Back to command mode.
- `u`
  - *Undo the previous change.*
- `Ctrl+R`
  - *Redo, undoes your undo.*
- `:!command`
  - *Run a shell command while you are in `vi` using `:!` followed by a shell command name.*
- `Ctrl+G`
  - Display some messages.



*Skipping around in the file:*

- `Ctrl+f`
  - One page ahead
- `Ctrl+b`
  - One page back
- `Ctrl+d`
  - One-half page ahead
- `Ctrl+u`
  - One-half page back
- `G`
  - to the last line of the file.
- `1G`
  - to the first line of the file.
- `35G`
  - to any line number.



*Search for text:*

- `/hello`
  - Search forward for the word `hello`.
- `?goodbye`
  - Search backward for the word `goodbye`.
- `/The.*foot`
  - Searches forward for a line that has the word `The` in it and also, after that at some point, the word `foot`.
- `?[pP]rint`
  - Searches backward for either `print` or `Print`. 
  - *Remember that casematters in Linux, so make use of brackets to search for words that could have different capitalization.*

*After you have entered a search term, simply type `n` or `N` to search again* in the same direction(`n`) or the opposite direction (`N`) for the term.



*Using ex mode:*

When you type a colon and the cursor goes to the bottom of the screen, you are essentially in `ex` mode.

- `:g/Local`
  - search for the word `Local`, and prints every occurrence of that lie from the file.
- `:s/Local/Remote`
  - Substitute `Remote` for the first occurrence of the word `Local` on the current line.
- `:s/Local/s//Remote`
  - Substitute `Remote` for the first occurrence of the word `Local` on every line.
- `:s/Local/s//Remote/g`
  - Substitute `Remote` for the every occurrence of the word `Local` in the entire file.
- `:s/Local/s//Remote/gp`
  - Substitutes every occurrence of the word `Local` withthe word `Remote` in the entire file, and then prints each line so you can see thechanges (piping it through less if output fills more than one page).



*Learning more about vim: **vimtutor**.*





## Finding Files

- `locate` — find commands by name;
- `find` — find files based on lots of different attributes;
- `grep` — search within text files to find line in files that contain search text.



#### Using `locate` to find files by name

On most Linux systems, the `updatedb` command runs once per day to gather the names of files throughout your Linux system into a database.

By running the `locate` command, you can search that database to find the location of files stored in that database.



Compare `locate` with `find`

- faster
- `locate` cannot find any files added to the system since the previous time the database was created.
  - Not every file in your filesystem is stored in the database. 
  - *The contents of the `/etc/updatedb.conf` file limit which filenames are collected by pruning out select mount types, filesystem types, file types, and mount points.???*
- *As a regular user, you can't see any files from the locate database that you can't see in the filesystem normally.*
- When you search for a string, the string can appear anywhere in a file's path.
- If you add files to your system after `updatedb` runs, you can't locate those files until `updatedb` runs again.
  - To get the database to contain all files up to the current moment, you can simply run `updatedb` from the shell as root.




Unlike the `find` command, which uses the `-name` option to find filenames, the `locate` command locates teh string you enter if it exists in any part of the file's path.



#### Searching for files with `find`

*The best command for searching your filesystem for files, based on a variety of attributes.*

After files are found, you can act on those files as well by running any commands you want on them.

- slower than `locate`, but gives you an up-to-the-moment view of the files on your Linux system.
  - You can also tell `find` to start at a particular point in the filesystem, so the search can go faster by limiting the area of the filesystem being searched.
- Nearly any file attribute you can think of can be used as a search option.

The `find` command finds all files and directories below the current directory.

```
$ find $HOME -ls
```

A special option to the find command is `-ls`. A long listing (ownership, permission, size, and so on) is printed with each file when you add `-ls` to the find command (similar to output of the `ls -l` command). 



>If, as a regular user, you are searching an area of the  lesystem where you don’t have full permission to access all files it contains (such as the /etc directory), you might receive lots of error messages when you search with find. To get rid of those messages, direct standard errors to `/dev/null`. To do that, add the following to the end of the
>command line: `2> /dev/null`. The 2> redirects standard error (STDERR) to the next option (in this case `/dev/null`, where the output is discarded).



*Finding file by name:*

- To find files by name, you can use the `-name` and `-iname` options.

- To make the search more flexible, you can use file-matching characters, such as asterisks(`*`) and question mark(`?`), as in the following examples:

  ```
  # find /etc -name passwd 
  /etc/pam.d/passwd
  /etc/passwd
  # find /etc -iname '*passwd*' 
  /etc/pam.d/passwd 
  /etc/passwd-
  /etc/passwd.OLD 
  /etc/passwd 
  /etc/MYPASSWD 
  /etc/security/opasswd
  ```

  - Using the `-name` option and no asterisks, the first example above lists any files in the `/etc` directory that are named `passwd` exactly.
  - By using `-iname` instead, you can match any combination of upper and lower case. 
  - Using asterisks, you can match any filename that includes the word `passwd`.



*Finding file by size:*

`-size` option enables you to search for files that are exactly, smaller than, or larger than a selected size, as you can see in the following examples:

```
$ find /usr/share/ -size +10M
$ find /mostlybig -size -1M
$ find /bigdata -size +500M -size -5G -exec du -sh {} \;
```

- The first example in the preceding code finds files larger than 10MB. 
- The second finds files less than 1MB. 
- In the third example, I’m searching for ISO images and video files that are between 500MB and 5GB. This includes an example of the `-exec` option (which I describe later) to run the `du` command on each file to see its size.



*Finding files by user*

You can search for a particular owner(`-user`) or group(`-group`) when you try to find files.

By using `-not` and `-or`, you can refine your search for files associated with specific users or groups, as you can see in the following examples:

```
$ find /home -user chris -ls
# find /home -user chris -or -user joe -ls
# find /etc -group ntp -ls
# find /var/spool -not -user root -ls		
```

- The first example outputs a long listing of all files under the `/home` directory that are owned by the user chris. 
- The next lists files owned by chris or joe. 
- The find command of `/etc` turns up all files that have `ntp` as their primary group assignment. 
- The last example shows all files under `/var/spool` that are not owned by root.



*Finding files by permission*

Searching for files by permission is an excellent way to turn up security issues on your system or uncover access issues.

Just as you changed permissions on files using numbers or letters (with the `chmod` command), you can likewise find files based on number or letter permissions along with the `-perm` options.

```
$ find /bin -perm 755 -ls
$ find /home/justin/ -perm -222 -type d -ls
```

- Each of those three numbers varies from no permission (0) to full read/write/execute permission (7), by adding read (4), write (2), and execute (1) bits together. 
- With a hyphen (`-`) in front of the number, all three of the bits indicated must match; with a plus (`+`) in front of it, any of the numbers can match for the search to find a file. The full, exact numbers must match if neither a hyphen or plus is used.
- Notice that, in this case, the -type d is added to match only directories.

```
$ find /myreadonly -perm +222 -type f
$ find . -perm -002 -type f -ls
```

- Using `-perm +222`, you can find any file (-type `f`) that has write permission turned on for the user, group, or other.
- The last example, `-perm +002`, is very useful for finding files that have open write permission for “other,” regardless of how the other permission bits are set.

  ​		

*Finding files by date and time*

*Date and time stamps are stored for each file when it is created, when it is accessed, when its content is modified, or when its metadata is changed.*

- *Metadata includes owner, group, time stamp, file size, permissions, and other information stored in the file's inode.*

You might want to search for file data or metadata changes for any of the following reasons:

- You just changed the contents of a configuration file, and you can't remember which one, So you search `/etc` to see what has changed in the past 10 minutes:

  ```
  $ find /etc/ -mmin -10
  ```

- You suspect that someone hacked your system three days ago. So you search the system to see if any commands have had their ownership or permissions changed in the past three days:

  ```
  $ find /bin /usr/bin /sbin /usr/sbin -ctime -3
  ```

- You want to find files in your FTP server (`var/ftp`) and web server (`/var/www`) that have not be accessed in more than 300 days, so you see if any need to be deleted:

  ```
  $ find /var/ftp /var/www -atime +300
  ```

- *The `time` options enable you to search based on the number of days since each file was accessed(`-atime`), was changed(`-ctime`), or has its metadata changed(`-mtime`). The `min` options do the same in minutes.*

  - Numbers that you give as arguments to the `min` and `time` options are preceded by a hyphen or a plus.
    - *Hyphen indicate a time from the current time to that number of minutes or days ago.*
    - *Plus sign indicate time from the number of minutes or days age and older.*
    - *With no hyphen or plus, the exact number is matched.*




*Using `-not` `-and` `-or` when finding files*

Example:

- There is a shared directory called `/var/all`. This command line enables you to find files that are owned by either `joe` or `chris`.

  ```
  $ find /var/all \( -user joe -or -user chris \) -ls
  ```

- This command line searches for files owned by the user `joe`, but only those that are not assigned to the group `joe`:

  ```
  $ find /var/all -user joe -not -group joe -ls
  ```

- You can also add multiple requirements on your searches. Here, a file must be owned by the user `joe` and must also be more than 1MB in size:

  ```
  $ find /var/all -user joe -and -size +1M -ls
  ```

  ​

*Finding files and executing commands:*

- One of the most powerful features of the find command is the capability to execute commands on any files you find.

- With **the `exec` option**, the command you use is executed on every file found, without stopping to ask if that's okay.

- **The `-ok` option** stops at each matched file and asks whether you want to run the command on it.

- The syntax for using `-exec` and `-ok` is the same:

  ```
  $ find [options] -exec command {} \;
  $ find [options] -find command {} \;
  ```

  - The set of curly braces indicates where on the command line to read in each file that is found. Each file can be included in the command line multiple times, if you laike.
  - To end the line, you need to add a backslash and semicolon (`\;`).

- Example:

  - This command finds any file named `iptables` under the `/etc` directory and includes that name in the output of an echo command:

    ```
    $ find /etc -iname iptables -exec echo "I found {}" \;
    I found /etc/bash_completion.d/iptables
    I found /etc/sysconfig/iptables
    ```

  - This command finds every file under the `usr/share` directory that is more than 5MB in size. Then it lists the size of each file with the `du` command. The output of `find` is then sorted by size, from largest to smallest. With `-exec` entered, all entires found are processed, without prompting:

    ```
    $ find /usr/share -size +5M -exec du {} \; | sort -nr
    ```

  - The `-ok` option enables you to choose, one at a time, whether each file found is acted upon by the command you enter. The next example shows that: find all files that belong to `joe` in the `/var/allusers` directory (and its subdirectories) and move them to the `tmp/joe` directory.

    ```
    # find /var/allusers/ -user joe -ok mv {} /tmp/joe/ \;
    ```

    Notice in the preceding code that you are prompted for each file that is found before it is moved to the /tmp/joe directory. You would simply type y and press Enter at each line to move the file, or just press Enter to skip it.



#### Searching in files with `grep`

- If you want to search for files that contain a certain search term, you can use the grep command. 

- With `grep`, you can search a single file or search a whole directory structure of files recursively.

- *When you search, you can have every line containing the term printed on your screen (standard output) or just list the names of the files that contain the search term.*

- By default, grep searches text in a case-sensitive way, although you can do case-insensitive searches as well.

- *Instead of just searching files, you can also use grep to search standard output.*

  - if a command turns out lots of text and you want to find only lines that contain certain text, you can use grep to filter just want you want.

- Example:

  ```
  $ grep desktop /etc/services
  $ grep -i desktop  /etc/services
  ```

- To search for lines that don't comain a selected text string, use the `-v` option.

  - Example:

    ```
    $ grep -vi tcp /etc/services
    ```

    all lines from the `etc/services` file are displayed except those containing the text `tcp` (case-insensitive).

- To do recursive searches, use the `-r` option and a directory as an argument.

- `-l` options just lists files that include the search text, without showing the actual lines of text.

- Example:

  ```
  $ grep -rli preedns /usr/share/doc/

  $ grep -ri --color root /etc/sysconfig/
  ```

- *To search the output of a command for a term, you can pipe the output to the `grep` command.*

  - For example, I know that IP addresses are listed on output line from the `ip` command that include the string `inet`. So I can use `grep` to just display those lines:

    ```
    $ ip addr show | grep inet
    ```

    ​




​					
Being able to work with plain-text files is a critical skill for using Linux. Because so many configuration files and document files are in plain-text format, you need to become proficient with a text editor to effectively use Linux. Finding filenames and content in files are also critical skills. In this chapter, you learned to use the locate and `find` commands for finding files and `grep` for searching files.



​			

# Chapter 6 Managing Running Processes

From a shell, you can launch processes, and then pause, stop, or kill them. You can also put them in the background and bring them to the foreground.



## Understanding Processes

A process is a running instance of a command.

- Process ID
- Each process, when it is run, is associated with a particular user account and group account.

> Commands that display information about running processes get most of that information from raw data stored in the `/proc` file system. Each process stores its information in a subdirectory of `/proc`, named after the process ID of that process.

## Listing Processes

- `ps`
- `top`

#### `ps`

The most common utility for checking running processes is the `ps` command.

- Example:

  ```
  $ ps u
  USER PID %CPU %MEM  VSZ  RSS   TTY STAT START TIME COMMAND 
  jake 2147 0.0  0.7 1836 1020  tty1 S+   14:50 0:00 -bash 
  jake 2310 0.0  0.7 2592  912  tty1 R+   18:22 0:00 ps u
  ```

  - the `u` option asks that usernames be shown, as well as other information such as the time the process started and memory and CPU usage for processes associated with the current user.
  - The processes shown are associated with the current terminal(`tty1`).
  - The first process show that the user named `jake` opened a bash shell after logging in.
  - The next process shows that `jake` has run the `ps u` command.
  - `tty1` is being used for the login session.
  - `STAT`: The `STAT` column represents the state of the process, with `R` indicating a currently running process and `S` representing a sleeping process.
    - Several other values can appear under the `STAT` column. For example, a plus sign (`+`) indicates that the process is associated with the foreground operations.
  - `PID`: You can use the `PID` if you ever need to kill a runaway process or send another kind of signal to a process.
  - `VSZ`: (virtual set size) shows the size of the image process (in kilobytes).
  - `RSS`: shows the size of the program in memory.
    - The `VSZ` and `RSS` sizes may be different because `VSZ` is the amount of memory allocated for the process, whereas `RSS` is the amount that is actually being used. `RSS` memory represents physical memory that cannot be swapped.
  - `TIME`: shows teh cumulative system time used. (Many commands consume very little CPU time, as reflected by `0:00` for processes that haven't even used a a whole second of CPU time).



To page through all the processes running on your Linux system for the current user, add the pipe (`|`) and the `less` command to `ps ux`:

```
$ ps ux | less
```

To page through all processes running for all users on your system, use the `ps aux` command as follows:

```
$ ps aux | less
```



The `ps` command can be customized to display selected columns of information and to sort information by one of those columns.

- *the next example lists every running process (`-e`) and then follows the `-o` option with every column of information I want to display,* including:

  ```
  $ ps -eo pid,user,uid,group,gid,vsz,rss,comm | less
  ```

  The process ID (`pid`), username (`user`), user ID (`uid`), group name (`group`), group ID (`gid`), virtual memory allocated (`vsz`), resident memory used (`rss`), and *the full command line that was run (`comm`)*. By default, output is sorted by process ID number.

- *If you want to sort by a specific column, you can use the `--sort=` option.*

  ```
  $ ps -eo pid,user,group,gid,vsz,rss,comm --sort=-rss | less
  ```

  Because I want to see the highest ones first, I put a hyphen in front of that option to sort (`sort=-rss`).




#### `top`

The top command provides a screen-oriented means of displaying processes running on your system. When you are running the top, you can press:

- `h` — help
- `M` - sort by memory usage instead of CPU
- `P` - return to sorting by CPU
- `1` - toggle showing CPU usage of all your CPUs.
- `R` - reverse sort your output
- `u` - enter a username to display process only for a particular user.



A common practice is to use `top` to find processes that are consuming too much memory or processing power and then act on those processes in some way.

- A process consuming too much CPU can be reniced to give it less priority to the processors.
  - *Renicing a process*: `r` - PID - Enter - type a number
- A process consuming too much memory can be killed.
  - *Killing a process*: `k` - `15` / `9`



You also can list processes with System Monitor.



## Managing Background and Foreground Processes

Although the bash shell doesn't include a GUI for running many programs at once, it does let you move active programs between the background and foreground. 

In this way, you can have lots of stuff running and selectively choose the one you want to deal with at the moment.



- To stop a running command and put it in the background, press **`Ctrl+Z`**.
- Any command running in the background might spew output during commands that you run subsequently from that shell.
  - For example, if output appears from a command running in the background during a `vi` session, simply press **`Ctrl+L`** to redraw the screen to get rid of the output.





#### Starting background processes

To place a program in the background at the time you run the program:

- Type an ampersand(**`&`**) at the end of the command line:

  ```
  $ find /usr > /tmp/allusrfiles &
  [3] 15971
  ```

  This example command finds all files on your Linux system (starting from `/usr`), prints those filenames, and puts those names in the file `/tmp/allusrfiles`. The ampersand (`&`) runs that command line in the background. Notice that the job number, `[3]`, and process ID number, `15971`, are displayed when the command is launched. 

- To check which commands you have running in the background, use the **`jobs`** command.

  ```
  $ jobs
  [1]  Stopped (tty output) vi /tmp/myfile
  [2]  Running find /usr -print > /tmp/allusrfiles &
  [3]  Running nroff -man /usr/man2/* >/tmp/man2 &
  [4]- Running nroff -man /usr/man3/* >/tmp/man3 &
  [5]+ Stopped nroff -man /usr/man4/* >/tmp/man4
  ```

  - The first job shows a text-editing command (`vi`) that I placed in the background and stopped by pressing `Ctrl+Z` while I was editing. 

  - Job 2 shows the find command I just ran.

  - Jobs 3 and 4 show `nroff` commands currently running in the background. 

  - Job 5 had been running in the shell (foreground) until I decided too many processes were running and pressed `Ctrl+Z` to stop job 5 until a few processes had completed.

  - The plus sign (`+`) next to number 5 shows that it was most recently placed in the background.

  - The minus sign (`-`) next to number 4 shows that it was placed in the background just before the most recent background job. 

  - Because job 1 requires terminal input, it cannot run in thebackground. As a result, it is `Stopped` until it is brought to the foreground again.

  - To see the process ID for the background job, add a `-l` option to the jobs command.

    - If you type `ps`, you can use the process ID to figure out which command is for a particular background job.

      ​

#### Using foreground and background commands

You can use **`fg`** to bring any of the commands on the jobs list to the foreground.

- For example:

  ```
  $ fg %1
  ```

- *Caution*: Before you put a text processor, word processor, or similar program in the background, make sure you save your file. It's easy to forget you have a program in the background, and you will lose your data if you log out or the computer reboots.

- `%` — Refers to the most recent command put into the background (indicated by the plus sign when you type the `jobs` command).

- `%string` — Refers to a job where the command begins with a particular `string` of character.

  - the `string` must be unambiguous.

- `%?string` — Refers to a job where the command line contains a `string` at any point.

  - the string must be unambiguous or the match fails.

- `%--` — Refers to the previous job stopped before the one most recently stopped.



If a command is stopped, you can start it running again in the background using the **`bg`** command.

- For example:

  ```
  $ bg %5
  ```





## Killing and Renicing Processes

- The `kill` command can send a kill signal to any process to end it, assuming you have permission to do so.
- The `nice` and `renice` commands can be used to set or change the processor priority of a process.



#### `kill` and `killall`

Although usually used for ending a running process, the **`kill`** and **`killall`** commands can actually be used to send any valid signal to a running process.

- Besides telling a process to end, a signal might tell a process to reread configuration files, pause (stop), or continue after being paused, to name a few possibilities.

- *Signals are represented by both numbers and names:*
  - `SIGTERM(15)`
    - The default signal, which tries to terminate a process cleanly.
  - `SIGKILL(9)`
    - To kill a process immediately.
  - `SIGHUP(1)`
    - tells a process to reread its configuration files.
  - `SIGSTOP(17,19,23)`
    - Pauses a process.
    - Different numbers are used in different computer architectures. 
      - For most **x86** and **power PC** architectures, use the middle value.
      - The first value usually works for **Alpha** and **Sparc**.
      - The last one is for **MIPS** architecture.
  - `SIGCONT(19,18,25)`
    - Continues a stopped process.
  - `SIGINT(2)`
    - Interrupt from keyboard.
  - `SIGQUIT(3)`
    - Quit from keyboard.
  - `SIGABRT(6)`
    - Abort signal from abort(3).

- Different processes respond to different signals.

- Processes cannot block `SIGKILL` and `SIGSTOP` signals.

- Type `man 7 signal` to read about other available signals.

  ​



*Using `kill` to signal processes by `PID`:*

- using commands such as `ps` and `top`, you can find processes you want to send a signal to.

- for example:

  ```
  $ kill 10432
  $ kill -15 10432
  $ kill -SIGKILL 10432
  ```

- *Another useful signal is `SIGHUP`.* Some server processes, such as the `httpd` process, which provide web services, respond to a `SIGHUP(1)` signal by rereading its configuration files.

  - In fact, the command `service httpd reload` or `systemctl reload httpd` actually sends `SIGHUP` to `httpd` processes running on your system to tell them that configuration files need to be read again.

  - If the `httpd` process had a `PID` of 1833, you could use either of these command to have it read configuration files again:

    ```
    # kill -1 1833
    # systemctl reload httpd
    ```

    ​


*Using `killall` to signal processes by name:*

- the potential downside is that you can kill more processes than you mean to if you are not careful. 

  - typing `killal bash` may kill a bunch of shells that you don't mean to kill.

- example:

  ```
  $ killall -9 testme
  ```

- `killall` command can be particularly useful if you want to kill a bunch of commands of the same name.



#### Setting processor priority with `nice` and `renice`

Every process running on your system has a nice value between `-20` and `19`.

- By default, the nice value is set to `0`.
- *The lower the nice value, the more access to the CPUs the process has.*
- As regular user:
  - Can set nice value only from `0` to `19`.
  - Can set the nice value higher, not lower.
  - Only the user's own processes.



`nice` command can run a command with a particular nice value:

- ```
  # nice +5 updatedb
  ```



When a process is running, you can change the nice value using the `renice` command:

- ```
  # renice -n -5 20284
  ```



## Limiting Processes with cgroups

`nice` doesn't limit the total amount of resources a particular user or application can consume from a Linux system.



**Cgroups** can be used to identify a process as a **task**, belonging to a particular **control group**.

- Tasks can be set up in a hierarchy where, for example, there may be a task called daemons that sets default limitations for all daemon server processes, then subtasks that may set specific limits on a web server daemon (`httpd`) or FTP service daemon (`vsftpd`).
- As a task launches a process, other processes the initial process launches (called **child processes**) inherit the limitations set for the parent process. Those limitations might say that all the processes in a control group have access only to particular processors and certain sets of RAM. Or they may allow access only to up to 30 percent of the total processing power of a machine.



The types of resources that can be limited by cgroups include the following:

- Storage (blkio) — Limits total input and output access to storage devices (such as hard disks, USB drives, and so on).
- Processor scheduling (cpu) — Assigns the amount of access a cgroup has to be scheduled for processing power.
- Process accounting (cpuacct) — Reports on CPU usage. This information can be leveraged to charge clients for the amount of processing power they use.
- CPU assignment (cpuset) — On systems with multiple CPU cores, assigns a task to a particular set of processors  and associated memory.
- Device access (devices) — Allows tasks in a cgroup to open or create(mknod) selected device types.
- Suspend/resume (freezer) — Suspends and resumes cgroup tasks.
- Memory usage (memory) — Limits memory usage by task. It also creates reports on memory resources used.
- Network bandwidth (net_cls) — Limits network access to selected cgrouptasks. This is done by tagging network packets to identify the cgroup task that originated the packet and having the Linux traffic controller monitor and restrict packets coming from each cgroup.
- Network traffic (net_prio) — Sets priorities of network traffic coming from selected cgroups and lets administrators change these priorities on the fly.
- Name spaces (ns) — Separates cgroups into namespaces, so processes in one cgroup can only see the namespaces associated with the cgroup. Namespaces can include separate process tables, mount tables, and network interfaces.

Knowing how Linux can limit and contain the resource usage by the set of processes assigned to a task will ultimately help you manage your computing resources better. If you are interested in learning more about cgroups, you can refer to the following:

- Red Hat Enterprise Linux Resource Management and Linux Containers Guide—https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html-single/Resource_Management_and_Linux_Containers_Guide/index.html
- Kernel documentation on cgroups—Refer to files in the /usr/share/doc/kernel-doc-*/Documentation/cgroups directory after installing thekernel-doc package.

  ​		
  ​	

# Chapter 7 Writing Simple Shell Scripts

A **shell script** is a group of commands, functions, variables, or just about anything else you can use from a shell.

- This items are typed into a plain text file. That file can then be run as a command.
- Linux systems have traditionally used system initialization shell scripts during system startup to run commands needed to get services going.
- *You can create your own shell scripts to automate the tasks you need to do regularly.*



## Understanding Shell Scripts

Shell scripts are capable of handling everything from simple one-line commands to something as complex as starting up your Linux system.



#### Executing and debugging shell scripts

- One of the primary advantages of shell scripts is that they can be opened in any text editor to see what they do.
- A big disadvantage is that large or complex shell scripts often execute more slowly than compiled programs.



You can *execute a shell script in two basic ways*:

- *The filename is used as an argument to the shell (such as `bash myscript`).*
  - In this method, the file does not need to be executable; it just contains a list of shell commands.
  - The shell specified on the command line is used to interpret the commands in the script file.
  - This is most common for quick, simple tasks.
- *The shell script may also have the name of the interpreter placed in the first line of the script preceded by `#!`(as `#!/bin/bash`), and have the execute bit of the file containing the script set (using `chmod +x filename`).*
  - *You can then run your script just like any other program in your path simple by typing the name of the script on the command line.*



When scripts are executed in either manner, options for the program may be specified on the command line.

- Anything following the name of the script is referred to as a **command-line argument**.



As with writing any software, there is no substitute for clear and thoughtful design and lots of comments.

- The pound sign(`#`) prefaces comments and can take up an entire line or exist on the same line after script code.

- It is best to implement more complex shell scripts in stages, making sure the logic is sound at each step before continuing. *Here are a few good, concise tips to make sure things are working as expected during testing:*

  - In some cases, you can place an `echo` statement at the beginning of lines within the body of a loop and surround the command with quotes. That way, rather than executing the code, you can see what will be executed without making any permanent changes.

  - To achieve teh same goal, you can place dummy `echo` statements throughout the code. If these lines get printed, you know the correct logic branch is being taken.

  - You can use `set -x` near the beginning of the script to display each command that is executed or launch your scripts using:

    ```
    $ bash -x myscript
    ```

  - Because useful scripts have a tendency to grow over time, keeping your code readable as you go along is extremely important. Do what you can to keep the logic of your code clean and easy to follow.



#### Understanding shell variables

Often within a shell script, you want to reuse certain items of information. During the course of processing the shell script, the name or number representing this information may change.

To store information used by a shell script in such a way that it can be easily reused, you can set variables. Variable names within shell scripts are case-sensitive and can be defined in the following manner:

```
NAME=value
```

- The first part of a variable is the variable name
- the second part is the value set for that name.
- Be sure that the `NAME` and `value` touch the equal sign, without any spaces.



*Variables can be assigned from constants, such as text, numbers, and underscores.*

- This is useful for initializing values or saving lots of typing for long constants.

- The following examples show variables set to a string of characters (`CITY`) and a numeric value (`PI`):

  ```
  CITY="Springfield"
  PI=3.14159265
  ```

*Variables can contain the output of a command or command sequence.*

- You can accomplish this by preceding the command with a dollar sign and open parenthesis, and following it with a closing parenthesis.

  For example: `MYDATE=$(date)` assigns the output from the `date` command to the `MYDATE` variable. 

- Enclosing the command in backticks (`` `) can have the same effect.

- In this case, the `date` command is run when the variable is set and not each time the variable is read.



> *Escaping Special Shell Characters (`$`,`` `, ` * `,`!`,...)*
>
> - If you want to have the shell interpret a single character literally, precede it with a backslash (`\`).
>
> - To have a whole set of characters interpreted literally, surround those characters with single quotes (`'`).
>
> - Using *double quotes* is a bit trickier. Surround a set of text with double quotes if you want all but a few characters used literally.
>
>   - with text surrounded with double quotes, `$`,`` `, `!` are interpreted specially, but other characters are not.
>
>   - For example:
>
>     ```
>     $ echo '$HOME *** `date`'
>     $HOME *** `date`
>     $ echo "$HOME *** `date`"
>     /Users/justin *** Mon Apr 2 16:40:27 CST 2018
>     ```
>
>     ​
>
> Using variables is a great way to get information that can change from computer to computer or from day to day.



*Some examples of variable assignment:*

```
MACHINE=`uname -n`
#Sets the output of the uname -n command to the MACHINE variable.

NUM_FILES=$(/bin/ls | wc -l)
#set NUM_FILES to the number of files in the current directory by piping (|) the output of the ls command to the word count command (wc -l).

BALANCE="$CurBalance"
#BALANCE is set to the value of the CurBalance variable.

```



###### *Special shell positional parameters*

There are special variables that the shell assigns for you.

One set of commonly used variables is called **positional parameters** or **command line arguments** and is referenced as `$0`, `$1`, `$2`, … `$n`.

- `$0` is special and is assigned the name used to invoke your script.

- The others are assigned the values of the parameters passed on the command line, in teh order they appeared.

- For example, you had a shell script named `myscript` that contained the following:

  ```
  #!/bin/bash
  # Script to echo out command-line arguments
  echo "The first argument is $1, the second is $2."
  echo "The command itself is called $0."
  ```

  Assuming the script is executable and located in a directory in your `$PATH`, the following shows what would happen if you ran that command with `foo` and `bar` as arguments:

  ```
  $ chmod 755 /home/justin/bin/myscript
  $ myscript foo bar

  The first argument is foo, the second is bar.
  The command itself is called /home/justin/bin/myscript
  ```

- Another variable, *`$#`, tells you how many parameters your script was given.* In the example, `$#` would be `2`.

- *`$@` variable holds all the arguments entered at the command line*.

- *`$?` receives the exit status of the last command executed.*

  - a value of zero means the command exited successfully
  - anything other than zero indicates an error of some kine.

*For a complete list of special shell variables, refer to the `bash` man page.*



###### Reading in parameters

**`read`** *command:*

- you can prompt the user for information, and store that information to use later in your script.

- Example:

  ```
  #!/bin/bash
  read -p "Type in an adjective, noun and verb (past tense): " a1 n1 v1
  echo "He sighed and $v1 to the elixir. Then he ate the $a1 $n1."
  ```

  if this script were called `sillyscript`, here is how it might run:

  ```
  $ chmod 755 /home/justin/bin/sillyscript
  $ sillyscript
  Type in an adjective, noun and verb (past tense): hairy football danced
  He sighed and danced to teh elixir. Then he ate the hairy football.
  ```




###### Parameter expansion in bash

As mentioned earlier, if you want the value of a variable, you precede it with a `$` (for example, `$CITY`).

*This is really just shorthand for the notation `${CITY}`.*

- Curly braces are used when the value of the parameter needs to be placed next to other text without a space.

- Bash has special rules that allow you to expand the value of a variable in different ways. For example:

  - `${var:-value}`: If variable is unset or empty, expand this to `value`.
  - `${var#pattern}`: Chop the shortest match for `pattern` from the front of `var`'s value.
  - `${var##pattern}`: Chop the longest match for `pattern` from the front of `var`'s value.
  - `${var%pattern}`: Chop the shortest match for `pattern` from the end of `var`'s value.
  - `${var%%pattern}`: Chop the longest match for `pattern` from the end of `var`'s value.

- Try:

  ```
  $ THIS="Example"
  $ THIS=${THIS:-"Not Set"}
  $ THAT=${THAT:-"Not Set"}
  $ echo $THIS
  Example
  $ echo $THAT
  Not Set

  MYFILENAME=/home/digby/myfile.text
  FILE=${MYFILENAME##*/}    #FILE becomes myfile.txt
  DIR=${MYFILENAME%/*}    #DIR becomes /home/digby
  NAME=${FILE%.*}    #NAME becomes myfile
  EXTENSION=${FILE##*.}    #EXTENSION becomes txt
  ```



#### Performing arithmetic in shell scripts

Bash uses **untyped variables**.

- Unless you tell it otherwise with **`declare`**, your variables are just a bunch of letters to bash.
- But when you start trying to do arithmetic with them, bash converts then to integers if it can.



Integer arithmetic can be performed using the built-in **`let`** command or through the external **`expr`** or **`bc`** commands.

- for example, after setting the variable `BIGNUM` value to `1024`, the three commands that follow would all store the value `64` in the `RESULT` variable.

  ```
  BIGNUM=1024
  let RESULT=$BIGNUM/16
  RESULT=`expr $BIGNUM / 16`
  RESULT=`echo "$BIGNUM / 16" | bc`
  let foo=$RANDOM; echo $foo
  ```

Another way to incrementally grow a variable is to use **`$(())`** notation with `++I` added to increment the value of I.

- For example:

  ```
  $ I=0
  $ echo The value of I after increment is $((++I))
  The value of I after increment is 1

  $ echo The value of I before and after increment is $((I++)) and $I
  The value of I before and after increment is 1 and 2
  ```

  ​

> *Note*:
>
> Although most elements of shell scripts are relatively freeform (where whitespace, such as spaces or tabs , is insignificant), both `let` and `expr` are particular about spacing.
>
> The `let` command insists on no spaces between each operand and the mathematical operator, whereas the syntax of the `expr` command requires whitespace between each operand and its operator.
>
> In contrast to those, `bc` isn't picky about spaces, but can be trickier to use because it does floating-point arithmetic.

To see a complete list of the kinds of arithmetic you can perform using the `let` command, type **`help let`** at the bash prompt.



#### Using programming constructs in shell scripts

###### "**If … then**" statements

The most commonly used programming construct is conditional execution, or the `if` statement. There are several variations of `if` statements for testing various types of conditions.

- ```
  VARIABLE=1
  if [ $VARIABLE -eq 1 ] ; then
  echo "The variable is 1"
  fi
  ```

  - This is tests if `VARIABLE` is set ot the number 1. If it is, then the `echo` command is used to say that it is set to 1. 
  - *The `fi` statement then indicates that the `if` statement is complete and processing can continue.*

- Instead of using `-eq`, you can use the equal sign (`=`), as shown in the following example.

  - *The `=` works best for comparing string values, while `-eq` is often better for comparing numbers.*
  - Using the `else` statement, different words can be echoed if the criterion of the `if` statement isn't met.
  - *Keep in mind that it's good practice to put strings in double quotes.*

  ```
  STRING="Friday"
  if [ $STRING = "Friday" ] ; then
  echo "WhooHoo. Friday."
  else
  echo "Will Friday ever get here?"
  fi
  ```

- You can also reverse tests with an exclamation mark(`!`).

  ```
  STRING="FRIDAY"
  if [ "$STRING != "Monday" ]; then
  echo "At least it's not Monday"
  fi
  ```

- `elif` stands for "else if":

  ```
  filename="$HOME"
  if [ -f "$filename" ] ; then
  	echo "$filename is a regular file"
  elif [ -d "$filename" ] ; then
  	echo "$filename is a directory"
  else
  	echo "I have no idea what $filename is"
  fi
  ```


As you can see from the preceding examples, the condition you are testing is placed between square brackets `[ ]`.

- When a test expression is evaluated, it returns either a value of `0`, meaning that it is true, or a `1`, meaning that it is false.

Notice that the `echo` lines are indented. The indentation is optional and done only to make the script more readable. 



**Operators for Test Expressions**

| Operator          | What is Being Tested?                    |
| ----------------- | ---------------------------------------- |
| `-a file`         | Does the file exist? (Same as `-e`)      |
| `-b file`         | Is the file a block special device?      |
| `-c file`         | Is the file character special (for example, a character device)? Used to identify serial lines and terminal devices. |
| `-d file`         | Is the file a directory?                 |
| `-e file`         | Does the file exist?                     |
| `-f file`         | Does the file exist, and is it a regular file (for example, not a directory, socket, pipe, link, or device file)? |
| `-g file`         | Does the file have the set-group-id(SGID) bit set? |
| `-h file`         | Is the file a symbolic link? (Same as `-L`) |
| `-k file`         | Does the file have the sticky bit set?   |
| `-L file`         | Is the file a symbolic link?             |
| `-n string`       | Is the length of the string greater than 0 bytes? |
| `-O file`         | Do you own the file?                     |
| `-p file`         | Is the file a named pipe?                |
| `-r file`         | is the file readable by you?             |
| `-s file`         | Does the file exist, and is it larger than 0 bytes? |
| `-S file`         | Does the file exist, and is it a socket? |
| `-t fd`           | Is the file descriptor connected to a terminal? |
| `-u file`         | Does the file have the set-user-id(SUID) bit set? |
| `-w file`         | Is the file writable by you?             |
| `-x file`         | Is the file executable by you?           |
| `-z string`       | Is the length of the string 0(zero) bytes? |
| `expr1 -a expr2`  | Are both the first expression and the second expression true? |
| `expr1 -o expr2`  | Is either of the two expressions true?   |
| `file1 -nt file2` | Is the first file newer than the second file (using the modification timestamp)? |
| `file1 -ot file2` | Is the first file older than the second file (using the modification timestamp)? |
| `file1 -ef file2` | Are the two files associated by a link (a hard link or a symbolic link)? |
| `var1 = var2`     | Is the first variable equal to the second variable? |
| `var1 -eq var2`   | Is the first variable equal to the second variable? |
| `var1 -ge var2`   | Is the first variable greater than or equal to the second variable? |
| `var1 -gt var2`   | Is the first variable greater than the second variable? |
| `var1 -le var2`   | Is the first variable less than or equal to the second variable? |
| `var1 -lt var2`   | Is the first variable less than the second variable? |
| `var1 != var2`    | Is the first variable not equal to the second variable? |
| `var1 -ne var2`   | Is the first variable not equal to the second variable? |



- There is also a special shorthand method of performing tests that can be useful for simple *one-command actions*.

  - **`||`**: 

    ```
    # [ test ] || action
    # Perform simple single command if test is false
    dirname="/tmp/testdir"
    [ -d "$dirname" ] || mkdir "$dirname"
    ```

  - **`&&`**:

    ```
    # [ test ] && {action}
    # Perform simple single action if test is true
    [ $# -ge 3 ] && echo "There are at least 3 command line arguments."
    ```

- *You can combine the `&&` and `||` operators to make a quick, one-line if -then-else statement.*

  - The following example tests that the directory represented by `$dirname` already exists. If it does, a message says the directory already exists. If it doesn't, the statement creates the directory:

    ```
    dirname=mydirectory
    [ -e $dirname ] && echo $dirname already exists || mkdir $dirname
    ```



###### The **`case`** command

Similar to a `switch` statement in programming languages.

General form of **`case`** statement:

```
case "VAR" in
	Result1)
		{ body };;
	Result2)
		{ body };;
	*)
		{ body };;
esac
```

- You can use the `case` command to help with your backups.

  - For example:

    ```
    # Our VAR doesn't have to be a variable,
    # it can be the output of a command as well
    # Perform action based on day of week
    case `date +%a` in
    	"Mon")
    		BACKUP=/home/myproject/data0
    		TYPE=/dev/rft0
    		;;  # Note the use of the double semi-colon to end each option
    	"Tue" | "Thu")   # Note the use of the "|" to mean "or"
    		BACKUP=/home/myproject/data1
    		TYPE=/dev/rft1
    		;;
    	"Wed" | "Fri")
    		BACKUP=/home/myproject/data2
    		TYPE=/dev/rft2
    		;;
    	*)   # Don't do backups on the weekend.
    		BACKUP="none"
    		TYPE=/dev/null
    		;;
    esac
    ```

- The asterisk(`*`) is used as a catchall, similar to the `default` keyword in the C programming language.



###### The "**for … do**" loop

The syntax:

```
for VAR in LIST
do
	{ body }
done
```

- The `for` loop assigns the values in `LIST` to `VAR` one at a time. Then for each value, the body in braces between `do` and `done` is executed.

- *`VAR` can be any variable name, and `LIST` can be composed of pretty much any list of values or anything that generates a list.*

  - For example:

    ```
    for NUMBER in 0 1 2 3 4 5 6 7 8 9
    do
    	echo The number is $NUMBER
    done

    for FILE in `/bin/ls`  # equal to for FILE in `ls`
    do
    	echo $FILE
    done
    ```


- *You can also write it this way, which is somewhat cleaner:*

  ```
  for NAME in John Paul Ringo George ;  do
  	echo $NAME is my favorite Beatle
  done
  ```

- *Each element in the `LIST` is separated from the next by whitespace.*

  - *This can cause trouble if you're not careful because some commands, such as `ls -l`, output multiple fields per line, each separated by whitespace.*

- The string `done` ends the `for` statement.

- If you're a die-hard C programmer, *bash allows you to use C syntax to control your loops:*

  ```
  LIMIT=10
  # Double parentheses, and no $ on LIMIT even though it's a variable!
  for ((a=1; a <= LIMIT; a++)) ; do
  	echo "$a"
  done
  ```

  ​

###### The "**while … do**" and "**until … do**" loops

The structure of each is presented:

```
while condition
do
	{ body }
done
```

```
until condition
do
	{ body }
done
```

- The `while` statement executes while the condition is true.
- The `until` statement executes until the condition is true — in other words, while the condition is false.



Here is an example of a `while` loop that outputs the number `0123456789`:

- ```
  N=0
  while [ $N -lt 10 ] ; do
  	echo -n $N
  	let N=$N+1
  done
  ```

Another way to output the number `0123456789` is to use an `until` loop as follows:

- ```
  N=0
  until [ $N -eq 10 ] ; do
  	echo -n $N
  	let N=$N+1
  done
  ```





#### Trying some useful *text manipulation programs*

Bash is great and has lots of built-in commands, but it usually needs some help to do anything really useful. 

- Some of the most common useful programs you'll see used are `grep`, `cut`, `tr`, `awk`, and `sed`.
- As with all the best UNIX tools, most of these programs are designed to work with standard input and standard output, so you can easily use them with pipes and shell scripts.




###### The general regular expression parser

**general regular expression parser (`grep`)** :

- a way to find patterns in files or text. 

- Think of it as a useful search tool.

- Gainning expertise with regular expressions is quite a challenge, but after you master it, you can accomplish many useful things with just the simplest forms.

- For example:

  - You can display a list of all regular user accounts by using `grep` to search for all lines that contain the text `/home` in the `etc/passwd` file as follows:

    ```
    $ grep /home /etc/passwd
    ```

  - or you could find all environment variables that begin with `HO` using the following command:

    ```
    $ env | grep ^HO
    ```

    ​

###### Remove sections of lines of text(`cut`)

The **`cut`** command can extract fields from a line of text or from files.

- It is very useful for parsing system configuration files into easy-to-digest chunks.

- *You can specify the field separator you want ot use and the fields you want, or you can break up a line based on bytes.*

- For example:

  ```
  $ grep /home /etc/passwd | cut -d':' -f6 -
  ```

  This `grep` command line pipes a list of regular users from the `etc/passwd` file and displays the sixth field (`-f6`) as delimited by a colon (`-d':'`). 

  The hyphen at the end tells `cut` to read from standard input (from the pipe).



###### Translate or delete characters

**`tr`** command is a character-based translator that can be used to replace one character or set of characters with another or to remove a character from a line of text.

- *For example:*

  ```
  $ FOO="Mixed UPpEr aNd LoWeR cAsE"
  $ echo $FOO | tr [A-Z] [a-z]
  ```

  - Translates all uppercase letters to lowercase letters and displays the words `mixed upper and lower case` as a result.

  ```
  for file in * ; do
  	f=`echo $file | tr [:blank:] [_]`
  	[ "$file" = "$f" ] || mv -i -- "$file" "$f"
  done
  ```

  - The `tr` command is used on a list of filenames to rename any files in that list so that any tabs or spaces (as indicated by the `[:blank:]` option) contained in a filename are translated into underscores.



###### The stream editor (`sed`)

The **`sed`** command is a simple scriptable editor, so it can perform only simple edits, such as:

- removing lines that have text matching a certain pattern
- replacing one pattern of characters with another
- and so on





- You can use the `sed` command to essentially do what the `grep` example does: Search the `/etc/passwd` file for the word `home`.

  ```
  $ sed -n '/home/p' /etc/passwd
  ```

- ```
  $ sed 's/Mac/Linux/g' somefile.txt > fixed_file.txt
  ```

  In this example, `sed` searches the file `some file.txt` and replaces every instance of the string `Mac` with `Linux`.

  - Notice that the letter `g` is needed at the end of the substitution command to cause every occurrence of `Mac` on each line to be changed to `Linux`. *(Otherwise, only the first instance of `Mac` on each line is changed.)*
  - The output is then sent ot the `fixed_file.txt` file.
  - *The output from `sed` goes to `stdout`, so this command redirects the output to a file for safekeeping.*

  *You can get the same result using a pipe:*

  ```
  $ cat somefile.txt | sed 's/Mac/Linux/g' > fixed_file.txt
  ```

- ```
  $ cat somefile.txt | sed 's/ *$//' > fixed_file.txt
  ```

  By searching for a pattern and replacing it with a null pattern, you delete the original pattern.

  - This example searches the contents of the `somefile.txt` file and replaces extra blank spaces at the end of each line (`s/ *$`) with nothing(`//`).
  - Results go to the `fixed_file.txt` file.



#### Using simple shell scripts

Sometimes, the simplest of scripts can be most useful. 

- If you type the same sequence of commands repetitively, it makes sense to store those commands(once!) in a file.



The following sections offer a couple of simple, but useful, shell scripts.

###### Telephone list

This idea has been handed down from generation to generation of old UNIX hacks.

It's really quite simple, but it employs several of the concepts just introduced.

```
#!/bin/bash                  
# (@)/ph
# A very simple telephone list
# Type "ph new name number" to add to the list, or
# just type "ph name" to get a phone number

PHONELIST=~/.phonelist.txt

# If no command line parameters ($#), there
# is a problem, so ask what they're talking about.
if [ $# -lt 1 ]; then
	echo "Whose phone number did you want?"
	exit 1
fi

# Did you want to add a new phone number?
if [ $1 = "new" ]; then
	shift
	  echo $* >> $PHONELIST
	echo $* added to database
	exit 0
fi

# Nope. But does the file have anything in it yet?
# This might be our first time using it, after all.
if [ ! -s $PHONELIST ] ; then
	echo "No names in the phone list yet!"
	exit 1
else
	grep -i -q "$*" $PHONELIST   # Quietly search the file
	if [ $? -ne 0 ] ; then   # Did we find anything?
		echo "Sorry, that name was not found in the phone list"
		exit 1
	else
		grep -i "$*" $PHONELIST
	fi
fi
exit 0
```

So, if you created the telephone list file as `ph` in your current directory, you could type the following from the shell to try out your `ph` script:

```
$ chmod 755 ph
$ ./ph new "Marry Jones" 608-555-1212
Mary Jones 608-555-1212 added to database
$ ./ph Mary
Mary Jones 608-555-1212
```

- The `chmod` command makes the `ph` script executable.
- The `./ph` command runs the `ph` command from the current directory with the `new` option.
- This adds Mary Jones as the name and 608-555-1212 as the phone number to the database (`$HOME/.phone.txt`). 
- The next `ph` command searches the database for the name Mary and displays the phone entry for Mary.
- If the script works, add it to a directory in your path (such as `$HOME/bin`).



###### Backup script

Because nothing work forever and mistakes happen, backups are just a fact of life when dealing with computer data.

This simple script backs up all the data in the home directories of all the users on your Fedora or RHEL system:

```
#!/bin/bash
# (@)/my_backup
# A very simple backup script
#

# Change the TYPE device to match your system.
# Check /var/log/messages to determine your tape device.
# You may also need to add scsi-tape support to your kernel.
TYPE=/dev/rft0

# Rewind the tape device $TYPE
mt $TYPE rew
# Get a list of home directories
HOMES=`grep /home /etc/passwd` | cut -f6 -d':'`
# Back up the data in those directories
tar cvf $TYPE $HOMES
# Rewin and eject the tape
mt $TYPE rewoffl
```



## Summary

Writing shell scripts gives you the opportunity to automate many of your most common system administration tasks.







# Chapter 8 Learning System Administration ???

## Understanding System Administration

If you are the system administrator of a Linux system, you generally log in as a regular user account and then ask for administrative privileges when you need them.

This is often done with one of the following:

- **`su`** command:
  - Often, `su` is used to open a shell as root user.
  - After it is open, the administrator can run multiple commands and then exit to return to a shell as a regular user.
- **`sudo`** command:
  - With `sudo`, a regular user is given root privileges, but only when that user runs the `sudo` command to run another command.
  - After running that one command with `sudo`, the user is immediately returned to a shell and acts as the regular user again.
- Graphical windows:
  - Many graphical administration windows can be started by a regular user. With some tools, when root privilege is needed, you are prompted for the root password.



Tasks that can be done by only the root user tend to be those that affect the system as a whole or impact the security or health of the system. The following is a list of common features that a system administrator is expected to manage:

- *Filesystems*
  - The root user has permission to access files owned by any user.
- *Software installation*
- *User accounts*
- *Network interfaces*
  - In the past, the root user had to configure network interfacesand start and stop those interfaces. 
  - Now, many Linux desktops allow regular users to start and stop network interfaces from their desktop using Network Manager.This is particularly true for wireless network interfaces, which can come and go by location, as you move your Linux laptop or handheld device around.
- *Servers*
  - Configuring web servers, file servers, domain name servers, mail servers, and  dozens of other servers requires root privilege, as does starting and stopping those services.
  - Contents, such as web pages, can be added to servers by non-root users if you configure your system to allow that.
  - Services are ofthen run as special administrative user accounts, such as `apache`(for the `httpd` service) and `rpc` (for the `rpcbind` service). So if someone cracks a service, they can't get root privilege to other services or system resouces.
- *Security features*
  - Setting up security features, such as firewalls and user access lists, is usually done with root privilege.
  - It's also up to the root user to monitor how the services are being used and make sure that server resources are not exhausted or abused.



## Using Graphical Administration Tools

#### Using system-config-* tools

…….???

#### Using browser-based admin tools

…… ???



## Using the root user account

set root password for Ubuntu:

```
sudo passwd root
```

In this way, you can use root account on Ubuntu.



#### Becoming root from the shell (`su` command)

Although you can become the superuser by logging in as root, sometimes that is not convenient.

Then you can use `su` command, and then type the root user's password.

- At this point, you have full permission to run any command and use any file on the system.

- However, one thing that the `su` command doesn't do when used this way is read in the root user's environment. As a result, *you may type a command that you know is available and get the message `Command Not Found`.*

- *To fix this problem, use the `su` command with the dash(`-`) option instead, like this:*

  ```
  $ su -
  Password: ******
  #
  ```

- after you type the password, everything that normally happens at login for the root user happens after the `su` command is completed.

  - Your current directory will be root's home directory (probably `/root`)
  - Things such as the root user's `PATH` variable are used.

- If you become the root user by just typing `su`, rather than `su -`, you don't change directories or the environment of the current login session.



You can also use the `su` command to become a user other than root.

```
$ su - justin
```



When you are finished using superuser permissions, return to the previous shell by exiting the current shell by pressing **Ctrl+D** or by typing **`exit`**:



#### Gaining administrative access with `sudo`

Using `sudoers`, for any users or groups on the system, you can do the following:

- Assign root privilege for any command they run with `sudo`.
- Assign root privilege for a select set of commands.
- Give users root privilege without telling them the root password because the only have to provide their when user password to gain root privilege.
- Allow users, if you choose, to run `sudo` without entering a password at all.
- Track which users have run administrative commands on your system.
  - *Using `su`, all you know is that someone with the root password logged in, whereas the `sudo` command logs which user runs an administrative command.*



*With the `sudoers` facility, giving full or limited root privileges to any user simple entails adding the user to `/etc/sudoers` and defining what privilege you want that user to have.*

- Then the user can run any command he or she is privileged to use by preceding that command with the `sudo` command.



> TIP
>
> if you look at the `sudoers` file in Ubuntu, you see that the initial user on the system already has privilege, by default, for the admin group members.
>
> To give any other user the same privilege, you could simply add the additional user to the admin group when you run `visudo`.



Here is an example of how to use the `sudo` facility to cause the user named `justin` to have full `root` privilege.

1. As the root user, edit the `/etc/sudoers` file by running the **`visudo`** command:

   ```
   # /usr/sbin/visudo
   ```

2. Add the following line to allow `justin` to have full root privileges on the computer:

   ```
   justin    ALL=(ALL)    ALL
   ```

   This line causes justin to provide a password (his own password) in order to use administrative commands.

   To allow justin to have that privilege without using a password, type the following line instead:

   ```
   justin    ALL=(ALL)    NOPASSWD: ALL
   ```

3. Save the changes to the `/etc/sudoers/` file.





>after entering your password successfully in the first `sudo` command, you can enter as many `sudo` commands as you want for the next 5 minutes without having to enter the password again. *(You can change the timeout value from 5 minutes to any length of time you want by setting the `passwd_timeout` value in the `/etc/sudoers` file*.)
>
>

*the `/etc/sudoers` file gives you an incredible amount of flexibility in permitting individual users and groups to use individual applications or groups of applications.* Refer to the `sudoers` and `sudo` man pages for information about how to tune your `sudo` facility.



## Exploring Administrative Commands, Configuration Files, and Log Files



#### Administrative commands

When you log in as root (or use `su -`), your `$PATH` variable is set to include some directories that contain commands for the root user.

In the past, these have included the following:

- `/sbin`
  - Contained commands needed to boot your system, including commands for checking filesystems(`fsck`) and turn on swap devices (`swapon`).
- `/usr/sbin`
  - Contained commands for such things as managing user accounts (such as `useradd`) and checking processes that are holding files open (such as `lsof`).
  - Commands that run as daemon processes are also contained in this directory.
    - Daemon processes are processes that run in the background, waiting for service requests such as those to access a printer or a web page. (Look for commands that end in `d`, such as `sshd`, `pppd` and `cupsd`).

The `/sbin` and `/usr/sbin` directories are still used in Ubuntu as described here.

However, for RHEL 7 and the latest Fedora releases, all administrative commands from the two directories are stored in the `/usr/sbin` directory (which is symbolically linked to `/sbin`). Also, only `/usr/sbin` is added to the PATH of the root user, as well as the PATH of all regular users.



Some administrative commands are contained in regular user directories (such as `/bin` and `/usr/bin`).

- This is expecially true of commands that have some options available to everyone.
- A example is the `/bin/mount` command, which anyone can use to list mounted filesystems, but only root can use to mount filesystems. (Some desktops, however, are configured to let regular users use mount to mount CDs, DVDs, or other removable media.)



*To find commands intended primarily for the system administrator, check out the section 8 manual pages (usually in `/usr/share/man/man8`).* They contain descriptions adn option for most linux administrative commands.

*If you want to add commands to your system, consider adding them to directories such as `/usr/local/bin` or `/usr/local/sbin`.*



#### Administrative configuration files

Configuration files are another mainstay of Linux administration.

- Almost everything you set up for your particular computer — user accounts, network addresses, or GUI preferences — is stored in plaintext files.
- This has some advantages and some disadvantages:
  - The advantage of plain text files is that it's easy to read and change them.
  - The downside is that as you edit configuration files, no error checking is going on. You have to run the program that reads these files (such as a network daemon or the X desktop) to find out whether you set up the files correctly.
- While some configuration files use standard structures, such as XML, for storing information, many do not. So you need to learn the specific structure rules for each configuration file.
  - A comma or a quote in the wrong place can sometimes cause an entire interface to fail.



You can check in many ways that the structures of many configuration files is correct:

- Some software packages offer a command to test the sanity of the configuration file tied to a package before you start a service.
- The daemon process providing a service offers an option for checking your config file.
  - For example, run `http -t` to check your Apache web server configuration before starting your web server.



> Some text editors, such as the `vim` command (not `vi`), understand the structure of some types of configuration files.
>
> If you open such a configuration file in `vim`, notice that different elements of the file are shown in different colors.
>
> In particular, you can see comment lines in a different color than data.



Throughout this book, you’ll find descriptions of the configuration files you need to set up the different features that make up Linux systems. *The two major locations of configuration files*:

- your home directory (where your personal configuration files are kept) 
- the `/etc` directory (which holds system-wide configuration files).



*Following are descriptions of directories (and subdirectories) that contain useful configuration files.* Those descriptions are followed by some individual configuration files in `/etc` that are of particular interest. Viewing the contents of Linux configuration files can teach you a lot about administering Linux systems.

- `$HOME`
  - All users store information in their home directories that directs how theirlogin accounts behave. 
  - Many configuration files are directly in each user’s home directory (such as `/home/joe`) and begin with a dot (`.`). 
  - There are dot files that define the behavior of each user’s shell,the desktop look-and-feel, and options used with your text editor. 
  - There are even files such as those in each user’s `$HOME/.ssh` directory that configure permissions for logging into remote systems. 
- `/etc`
  - This directory contains most of the basic Linux system configuration files.
- `/etc/cron*`
  - Directories in this set contain files that define how the `crond` utility runs applications on a daily (`cron.daily`), hourly (`cron.hourly`), monthly (`cron.monthly`), or weekly (`cron.weekly`) schedule.
- `/etc/cups`
  - Contains files used to configure the CUPS printing service.
- `/etc/default`
  - Contains files that set default values for various utilities.
- `/etc/httpd`
  - Contains a variety of files used to configure the behavior of your Apache web server (specifically, the `httpd` daemon process). (On Ubuntu and other Linux systems, `/etc/apache` or `/etc/apache2` is used instead.)
- `/etc/init.d`
  - Contains the permanent copies of System V-style run-level scripts.
  - These scripts are often linked from the `/etc/rc?.d` directories to have each service associated with a script started or stopped for the particular run level. The `?` is replaced by the run-level number (`0` through `6`). Although System V init scripts are still supported, most services are now managed by the `systemd` facility.
- `/etc/mail`
  - Contains files used to configure your sendmail mail transport agent.
- `/etc/pcmcia`
  - Contains configuration files that allow you to have a variety
    of PCMCIA cards configured for your computer (if the pcmcia utils package is installed). PCMCIA slots are those openings on your laptop that enable you to have credit-card-sized cards attached to your computer. You can attach devices such as modems and external CD-ROMs. With many devices now available as USB devices, PCMCIA slots are less common than they were.
- `/etc/postfix`
  - Contains configuration files for the postfix mail transport agent.
- `/etc/ppp`
  - Contains several configuration files used to set up Point-to-Point Protocol (PPP) so you can have your computer dial out to the Internet. (PPP was more commonly used when dial-up modems were popular.)
- `/etc/rc?.d`
  - There is a separate `rc?.d` directory for each valid system state:
    - `rc0.d` (shutdown state), 
    - `rc1.d` (single-user state), 
    - `rc2.d` (multiuser state), 
    - `rc3.d`(multiuser plus networking state), 
    - `rc4.d` (user-defined state), 
    - `rc5.d` (multiuser,networking, plus GUI login state),
    - `rc6.d` (reboot state).
- `/etc/security`
  - Contains files that set a variety of default security conditions
    for your computer, basically defining how authentication is done. 
  - These files are part of the `pam` (pluggable authentication modules) package.
- `/etc/skel`
  - Any files contained in this directory are automatically copied to a user’s home directory when that user is added to the system. 
  - By default, most of these files are dot (`.`) files, such as `.kde` (a directory for setting KDE desktop defaults) and `.bashrc` (for setting default values used with the bash shell).
- `/etc/sysconfig`
  - Contains important system configuration files that are created and maintained by various services (including `iptables`, `samba`, and most networking services).
  - These files are critical for Linux distributions, such as Fedora and RHEL, that use GUI administration tools but are not used on other Linux systems at all.
- `/etc/systemd`
  - Contains files associated with the `systemd` facility, for managing the boot process and system services. 
  - In particular, when you run `systemctl` commands to enable and disable services, files that make that happen are stored in subdirectories of the `/etc/systemd/system` directory.
- `etc/xinetd.d`
  - Contains a set of files, each of which defines an on-demand network service that the `xinetd` daemon listens for on a particular port.
  - When the `xinetd` daemon process receives a request for a service, it uses the information in these files to determine which daemon processes to start ot handle the request.



*The following are some interesting configuration files in `/etc`:*

- `aliases`
  - Can contain distribution lists used by the Linux mail services. (This file is located in `/etc/mail` in Ubuntu when you install the sendmail package.)
- `bashrc`
  - Sets system-wide defaults for bash shell users. (This may be called `bash.bashrc` on some Linux distributions.)
- `crontab`
  - Sets times for running automated tasks and variables associated with the `cron` facility (such as the SHELL and PATH associated with `cron`).
- `csh.cshrc` (or `cshrc`)
  - Sets system-wide defaults for `csh` (C shell) users.
- `exports`
  - Contains a list of local directories that are available to be shared by remote computers using the Network File System (NFS).
- `fstab`
  - Identifies the devices for common storage media (hard disk, floppy, CD-ROM, and so on) and locations where they are mounted in the Linux system.
  - This is used by the `mount` command to choose which filesystems to mount when the system first boots.
- `group`
  - Identifies group names and group IDs (GIDs) that are defined on the system. 
  - Group permissions in Linux are defined by the second of three sets of `rwx`(read, write, execute) bits associated with each file and directory.
- `gshadow`
  - Contains shadow passwords for groups.
- `host.conf`
  - Used by older applications to set the locations in which domain names (for example, `redhat.com`) are searched for on TCP/IP networks (such asthe Internet). 
  - By default, the local hosts file is searched and then any name server entries in `resolv.conf`.
- `hostname`
  - Contains the host name for the local system (beginning in RHEL 7 andrecent Fedora and Ubuntu systems).
- `hosts`
  - Contains IP addresses and host names that you can reach from your computer. (Usually this file is used just to store names of computers on your LAN or small private network.)
- `hosts.allow`
  - Lists host computers that are allowed to use certain TCP/IP services from the local computer. (This and `hosts.deny` are part of the TCP Wrappers service.)
- `hosts.deny`
  - Lists host computers that are not allowed to use certain TCP/IP services from the local computer (although this file is used if you create it, it doesn’t exist by default).


- `inittab`
  - On earlier Linux systems, contained information that defined which programs start and stop when Linux boots, shuts down, or goes into different states in between.
  - This configuration file was the first one read when Linux started the init process. 
  - This file is no longer used on Linux systems that support `systemd`.
- `mtab`
  - Contains a list of filesystems that are currently mounted.
- `mtools.conf`
  - Contains settings used by DOS tools in Linux.
- `named.conf`
  - Contains DNS settings if you are running your own DNS server (bind or bind9 package).
- `nsswitch.conf`
  - Contains name service switch settings, for identifying where critical systems information (user accounts, host name-to-address mappings, and so on) comes from (local host or via network services).
- `ntp.conf`
  - Includes information needed to run the Network Time Protocol (NTP).
- `passwd`
  - Stores account information for all valid users on the local system. 
  - Also includes other information, such as the home directory and default shell. 
  - (Rarely includes the user passwords themselves, which are typically stored in the `/etc/shadow` file.)
- `printcap`
  - Contains definitions for the printers configured for your computer.
  - (If the `printcap` file doesn’t exist, look for printer information in the `/etc/cups` directory.)
- `profile`
  - Sets system-wide environment and startup programs for all users.
  - This file is read when the user logs in.
- `protocols`
  - Sets protocol numbers and names for a variety of Internet services.
- `rpc`
  - Defines remote procedure call names and numbers.
- `services`
  - Defines TCP/IP and UDP service names and their port assignments.
- `shadow`
  - Contains encrypted passwords for users who are defined in the `passwd` file.
  - (This is viewed as a more secure way to store passwords than the original encrypted password in the `passwd` file. The `passwd` file needs to be publicly readable, whereas the `shadow` file can be unreadable by all but the root user.)
- `shells`
  - Lists the shell command-line interpreters (`bash`, `sh`, `csh`, and so on) that are available on the system, as well as their locations.
- `sudoers`
  - Sets commands that can be run by users, who may not otherwise have permission to run the command, using the `sudo` command. 
  - In particular, this file is used to provide selected users with root permission.
- `rsyslog.conf`
  - Defines what logging messages are gathered by the `rsyslogd` daemon and what files they are stored in. 
  - (Typically, log messages are stored in files contained in the `/var/log` directory.)


- `termcap`
  - Lists definitions for character terminals, so character-based applications know what features are supported by a given terminal. 
  - Graphical terminals and applications have made this file obsolete to most people.
- `xinetd.conf`
  - Contains simple configuration information used by the `xinetd` daemon process.
  - This file mostly points to the `/etc/xinetd.d` directory for information about individual services.



Another directory, `/etc/X11`, includes subdirectories that each contain system-wide configuration files used by X and different X window managers available for Linux. 

- The `xorg.conf` file (configures your computer and monitor to make it usable with X) and configuration directories containing files used by `xdm` and `xinit` to start X are in here.

Directories relating to window managers contain files that include the default values that a user will get if that user starts one of these window managers on your system. Window managers that may have system-wide configuration files in these directories include `twm` (`twm/`) and `xfce` (`xdg/`).



#### Administrative log files and systems journal

One of the things that Linux does well is keep track of itself.

- This is a good thing, when you consider how much is going on in a complex operating system.
- Sometimes you are trying to get a new facility to work and it fails without giving you the foggiest reason why. 
- Other times, you want to monitor your system to see whether people are trying to access your computer illegally. 
- In any of those cases, you want to be able to refer to messages coming from the kernel and services running on the system.



For Linux systems that don’t use the `systemd` facility, the main utility for logging error and debugging messages is the `rsyslogd` daemon. 

- Some older Linux systems use `syslogd` and `syslogd` daemons.
- Although you can still use `rsyslogd` with `systemd` systems, `systemd` has its own method of gathering and displaying messages called the systemd journal (`journalctl` command).



###### Using `journalctl`  to view the systemd journal 

The primary command for viewing messages from the `systemd` journal is the **`journalctl`** command.

- The boot process, the kernel and all systemd-managed services direct their status and error messages to the `systemd` journal.



Using the `journalctl` command, you can display journal messages in many different ways.

- For examples:

  ```
  # journalctl
  # journalctl --list-boots | head
  # journalctl -b eb3d5cbdda8f4f8da7bdbc71fb94e61e
  # journalctl -k
  ```

  - In these examples, the `journalctl` command with no options lets you page through all message in the `systemd` journal.
  - To list the boot IDs for each time the system was booted, use the `-list-boots` option.
  - To view messages associated with a particular boot instance, use the `-b` option with one of the boot instances.
  - To see only kernel messages, use the `-k` option.

- Here are some more examples:

  ```
  # journalctl _SYSTEMD_UNIT=sshd.service
  # journalctl PRIORITY=0
  # journalctl -a -f
  ```

  - Use the `_SYSTEMD_UNIT=` options to show messages for specific services or for any other `systemd` unit file (such as other services or mounts).
  - To see messages associated with a particular syslog log level (from 0 to 7).
  - To follow messages as they come in, use the `-f` option; to show all fields, use the `-a` option.



###### Managing log messages with `rsyslogd`

The `rsyslogd` facility, and its predecessor `syslogd`, gather log messages and directthem to log files or remote log hosts. 

- Logging is done according to information in the `/etc/rsyslog.conf` file. 
- Messages are typically directed to log files that are usually in the `/var/log` directory, but can also be directed to log hosts for additional security.Here are a few common log files:
  - `boot.log` — Contains boot messages about services as they start up.
  - `messages` — Contains many general informational messages about the system.
  - `secure` — Contains security-related messages, such as login activity or any other act that authenticates users.
  - `XFree86.0.log` or `Xorg.0.log` — Depending on which X server you are using, contains messages about your video card, mouse, and monitor configuration.

Refer to Chapter 13, “Understanding Server Administration,” for information on configuring the `rsyslogd` facility.





## Using Other Administrative Accounts

You don’t hear much about logging in with other administrative user accounts (besides root) on Linux systems. It was a fairly common practice in UNIX systems to have several different administrative logins that allowed administrative tasks to be split among several users. For example, people sitting near a printer could have `lp` permissions to move print jobs to another printer if they knew a printer wasn’t working.



… … 



## Checking and Configuring Hardware

The growing use of removable devices has made it important for Linux to do the following:

- Efficiently manage hardware that comes and goes.
- Look at the same piece of hardware in different ways (For example, be able to see a printer as a fax machine, scanner, and storage device, as well as a printer).



This section covers several issues related to getting your hardware working properly in Linux. 

- First, it describes how to check information about the hardware components of your system. 
- It then covers how to configure Linux to deal with removable media. 
- Finally, it describes how to use tools for manually loading and working with drivers for hardware that is not detected and loaded properly.



#### Checking your hardware

*There are a few ways to view kernel boot messages after Linux comes up.*

- **`dmesg`**
  - See what hardware was detected and which drivers were loaded by the kernel at boot time.
  - *If something goes wrong detectigng your hardware or loading drivers, you can refer to this information to see the name and model number of hardware that's not working. Then, you can search Linux forums or documentation to try to solve the problem.*
- displaying the contents of the `/var/log/dmesg` file, if it exists.
- `journalctl` command to show the messages associated with a particular boot instance.



> After your system is running, many kernel messages are sent to the `/var/log/messages` file.
>
> So, for example, if you want to see what happens when you plug in a USB drive, you can type `tail -f /var/log/messages` and watch as devices and mount points are created.
>
> Likewise, you can use the `journalctl -f` command to follow messages as they come into the `systemd` journal.



After your system is up and running, some other commands let you look at detailed information about your computer's hardware:

- *The **`lspci`** command lists PCI buses on your computer and devices connected to them.*
  - If you are having trouble getting any of these devices to work, noting the model names and numbers gives you something to Google for.
  - *To get more verbose output from `lspci`, add one or more `-v` options.*


- If you are specifically interested in USB devices, try the **`lsusb`** command.
  - By default, `lsusb` *lists information about the computer’s USB hubs along with any USB devices connected to the computer’s USB ports.*
  - As with `lspci`, you can add one or more `-v` options to see more details.


- To see details about your processor, run the **`lscpu`** command. That command gives basic information about your computer’s processors.





#### Managing removable hardware

… … 



#### Working with loadable modules

If you have added hardware to your computer that isn't properly detected, you might need to manually load a module for that hardware.

- Linux comes with a set of commands for loading, unloading, and getting information about hardware modules.



Kernel modules are installed in `/lib/modules/` subdirectories.

- The name of each subdirectory is based on the release number of the kernel.
- Modules in those directories can then be loaded and unloaded as they are needed.



Commands for listing, loading, unloading, and getting information about modules are available with linux.

- The following sections describe how to use those modules.



###### Listing loaded modules

**`lsmod`**: to see which modules are currently loaded into the running kernel on your computer.

**`modinfo`**: To find information about any of the loaded modules.

- For example:

  ```
  # /sbin/modinfo -d e1000
  Intel(R) PRO/1000 Network Driver
  ```

- Not all modules have descriptions available and, if nothing is available, no data is returned.

- *You can also use the `-a` option to see the author of the module or `-n` to see the object file representing the module.*



###### Loading modules

*You can load any module (as root user) that has been compiled and installed (to a `/lib/modules` subdirectory) into your running kernel using the **`modprobe`** command.*

- A common reason for loading a module is to use a feature temporarily (such as loading a module to support a special filesystem on a floppy you want to access). 
- Another reason to load a module is to identify that module as one that will be used by a particular piece of hardware that could not be autodetected.



Example:

… … 



*The `modprobe` command loads modules temporarily — they disappear at the next reboot. To permanently add the module to your system, add the `modprobe` command line to one of the startup script run at boot time.*



###### Removing modules

**`rmmod`** : remove a module from a running kernel.

- For example, to remove the module `parrot_pc` from the current kernel, type the following:

  ```
  # rmmod parport_pc
  ```

- *If it is not currently busy, the `parport_pc` module is removed from the running kernel. If it is busy, try killing any process that might be using the device. Then run `rmmod` again.*



Sometimes, the module you are trying to remove depends on other modules that may beloaded. For instance, the `usbcore` module cannot be unloaded while the USB printer module (`usblp`) is loaded, as shown here:

```
# rmmod usbcore
ERROR: Module usbcore is in use by wacom,usblp,ehci_hcd,ohci_hcd
```

*Instead of using `rmmod` to remove modules, you could use the `modprobe -r` command. With `modprobe -r`, instead of just removing the module you request, you can also remove dependent modules that are not being used by other modules.*





# 9: Installing Linux



… … 





# 10: Getting and Managing Software



## Going Beyond the Software Window

some examples of why you might want go beyond what you can do with the Software window:

- More repositories
- Beyond desktop applications
- Flexibility
- More complex queries
  - Using commands such as `yum` and `rpm`, you can get detailed information about packages, package groups, and repositories.
- Software validation
- Managing software installation





## Understanding Linux RPM and DEB Software Packaging

On the first Linux systems, if you wanted to add software, you would grab the source code from a project that produced it, compile it into runnable binaries, and drop it onto your computer. If you were lucky, someone would have already compiled it in a form that would run on your computer.



The form of the package could be a **tarball**, containing: 

- executable files (commands)
- documentation
- configuration files
- libraries

A tarball is a single file in which multiple files are gathered together for convenient storage or distribution.

- When you install software from a tarball, the files from that tarball might be spread across your Linux system in appropriate directories.

Although it is easy to create a tarball and just drop a set of software onto your Linux system, this method of installing software makes it difficult to do these things:

- Get dependent software
  - You would need to know if the software you were installing depended on other software being installed for your software to work. Then you would have to track down that software and install that too (which might itself have some dependencies).
- List the software
  - Even if you knew the name of the command, you might not know where its documentation or configuration files were located when you looked for it later.
- Remove the software
  - Unless you kept the original tarball or a list of files, you wouldn’t know where all the files were when it came time to remove them. Even if you knew, you would have to remove each one individually.
- Update the software
  - Tarballs are not designed to hold metadata about the contents they contain. After the contents of a tarball are installed, you may not have a way to tell what version of the software you are using, making it difficult to track down bugs and get new versions of your software.

To deal with these problems, packages progressed from simple tarballs to more complex packaging. With only a few notable exceptions (such as Gentoo, Slackware, and a few others), *the majority of Linux distributions went to one of two packaging formats — DEB and RPM:*

- **DEB (.deb) packaging**
  - The Debian GNU/Linux project created `.deb` packaging, which is used by Debian and other distributions based on Debian (Ubuntu, Linux Mint, KNOPPIX, and so on). 
  - Using tools such as `apt-get` and `dpkg`, Linux distributions could install, manage, upgrade, and remove software.
- **RPM (.rpm) packaging**
  - Originally named Red Hat Package Manager but later recursively renamed RPM Package Manager, RPM is the preferred package format for SUSE, Red Hat distributions (RHEL and Fedora), and those based on Red Hat distributions (CentOS, Oracle Linux, and so on). 
  - The `rpm` command was the firsttool to manage RPMs, but later `yum` was added to enhance the RPM facility.



#### *Understanding DEB packaging*

Debian software packages hold multiple files and metadata related to some set of software in the format of an `ar` archive file.

- The files can be executables (commands), comfiguration files, documentation, and other software items.
- The metadata includes such things as dependencies, licensing, package sizes, descriptions, and other information.



Multiple command-line and graphical tools are available for working with DEB files in Ubuntu, Debian, and other Linux distributions. Some of these include the following:

- Ubuntu Software Center

- `aptitude` commands

- **`apt*`** : There is a set of apt commands (`apt-get`, `apt-config`, `apt-cache`, and so on) that you can use to manage package installation.

  - *here are a few examples of commands that can help you install and manage packages with* `apt*` *command*. In this case, I’m looking for and installing the `vsftpd` package:

    ```
    $ sudo apt-get update    #Get the latest package versions
    $ sudo apt-search vsftpd	#Find package by keyword
    $ sudo apt-cache show vsftpd	#Display information about a package
    $ sudo apt-get install vsftpd	#Install the vsftpd package
    $ sudo apt-get upgrade		#Update installed packages
    $ sudo apt-cache pkgnames	#List all packages that are installed
    ```

  - There are many other uses of `apt*` commands that you can try out.

  - *use `man apt` to get an understanding of what the `apt` and related commands can do.*



#### Understanding RPM packaging

An RPM package is a consolidation of files needed to provide a feature, such as a word processor, a photo viewer, or a file server. 

- Inside an RPM can be the commands, configuration files, and documentation that make up the software feature. 
- However, an RPM file also contains metadata that stores information about the contents of that package, where the package came from, what it needs to run, and other information.



*Managing RPM Packages:*

- The first tool to be developed for installing RPM packages, however, was the **`rpm`** command. Using `rpm`, you can install, update, query, validate, and remove RPM packages. The command, however, has some major drawbacks:
  - Dependencies
    - Most RPM packages are dependent on some other software
      (library, executables, and so on) being installed on the system for that package to work. When you try to install a package with rpm, if a dependent package is not installed, the package installation fails, telling you which components were
      needed. 
    - At that point, you have to dig around to find what package contained that component. When you go to install it, that dependent package might itself have dependencies you need to install to get it to work. *This situation is lovingly referred*
      *to as “dependency hell” and is often used as an example of why DEB packages were better than RPMs.* DEB packaging tools were made to automatically resolve package dependencies well before RPM-related packaging tools could do that.
  - Location of RPMs
    - The rpm command expects you to provide the exact location of the RPM file when you try to install it. 
- YUM project set out to solve the headache of managing dependencies with RPM packages.



## Managing RPM Packages with YUM

The **Yellowdog Updater Modified (YUM)** project set out to solve the headache of managing dependencies with RPM packages.

- *Its major contribution was to stop thinking about RPM packages as individual components and think of them as parts of larger software repositories.*
- With repositories, the problem of dealing with dependencies fell not to the person who installed the software, but to the Linux distribution or third-party software distributor that makes the software available.
- So, for example, it would be up to the Fedora project to make sure that every component needed by every package in its Linux distribution could be resolved by some other package in the repository.
- *Repositories could also build on each other.*



The yum repositories could be put in a directory on a web server(`http://`), an FTP server(`ftp://`), or a local medium such as a CD, DVD, or local directory(`file://`).

The locations of these repositories would then be stored on the user's system in the `/etc/yum.conf` file or, more typically, in separate configuration files in the `/etc/yum.repos.d` directory.



#### Understanding how yum work

Basic syntax of the **`yum`** command:

```
# yum [options] command
```

Using that syntax, you can find packages, see package information, find out about package groups, update packages, or delete packages.

With the YUM repository and configuration in place, a user can install a package by simply typing something like this:

```
# yum install firefox
```

The result of a `yum install package` command is that the package requested is copied from the yum repository to the local system. The files in the package are put in the filesystem where needed (`/etc`, `/bin`, `/usr/share/man`, and so on). Information about the package is stored in the local RPM database, where it can be queried.



<img src="images/linux-bible-chapter10-2.png" width="600">



**… … p242 **

1. Checking `/etc/yum.conf`
2. Checking `/etc/sysconfig/rhm/up2date` (RHEL only)
3. Checking `/etc/yum.repos.d/*.repo` files
4. Downloading RPM packages and metadata from a YUM repository
5. RPM packages installed to Linux file system
6. Store YUM repository metadata to local RPM database



#### Using YUM with third-party software repositories

some third-party repositories have these limitations:

- They may have less stringent requirements for redistribution and freedom from patent constraints than the Fedora and RHEL repositories have.
- They may introduce some software conflicts.
- They may include software that is not open source and, although it may be free for personal use, may not be redistributable.
- They may slow down the process of installing all your packages (because metadata is downloaded for every repository you have enabled).

… … 



#### Managing software with the YUM command

… … 







## Installing, Querying, and Verfying Software with the `rpm` command

… … 



## Managing Software in the Enterprise

… … 





# 11 Managing User Accounts

Adding and managing users are common tasks for Linux systems administrators.

- *User accounts* keep boundaries between the people who use your systems and between the processes that run on your systems.
- *Groups* are a way of assigning rights to your system that can be assigned to multiple users at once.



This chapter describes not only how to create a new user, but also how to create predefined settings and files to configure the user’s environment.

- Using tools such as the `useradd` and `usermod` commands, you can assign settings such as the location of a home directory, a default shell, a default group, and specific user ID and group ID values.



## Creating User Accounts

#### Adding users with `useradd`

After opening a Terminal window with root permission, you simply invoke `useradd` at the command prompt, with details of the new account as parameters.

*The only required parameter is the login name of the user*, but you probably want to include some additional information ahead of it.

Each item of account information is preceded by a single-letter option code with a dash in front of it. The options available with `useradd` include the following:

- `-c "comment here"`
  - Provide a description of the new user account.
  - Typically, this is the person’s full name.
  - Replace `comment` with the name of the useraccount (`-c Jake`).
  - Use quotes to enter multiple words (for example, `-c "Jake Jackson"`).
- `-d home_dir`
  - Set the home directory to use for the account.
  - The default is to name it the same as the login name and to place it in `/home`.
  - Replace `home_dir` with the directory name to use (for example, `-d /mnt/homes/jake`).
- `-D`
  - Rather than create a new account, save the supplied information as the new default settings for any new accounts that are created.
- `-e expire_date`
  - Assign the expiration date for the account in YYYY-MM-DD format. 
  - Replace `expire_date` with a date you want to use. (For example, to expire an account on May 5, 2017, use `-e 2017-05-05`.)
- `-f -1`
  - Set the number of days after a password expires until the account is permanently disabled. 
  - The default, `-1`, disables the option.
  - Setting this to `0` disables the account immediately after the password has expired. Replace -1 (that’s minusone) with the number to use.
- `-g group`
  - Set the primary group (it must already exist in the `/etc/group` file) the new user will be in.
  - Replace group with the `group` name (for example, `-g wheel`). 
  - Without this option, a new group is created that is the same as the username and is used as that user’s primary group.
- `-G grouplist`
  - Add the new user to the supplied comma-separated list of supplementary groups (for example, `-G wheel,sales,tech,lunch`).
  - (If you use `-G` later with `usermod`, be sure to use `-aG` and not just `-G`. If you don’t, existing supplementary groups are removed and the groups you provide here are the only ones assigned.)
- `-k skel_dir`
  - Set the skeleton directory containing initial configuration files and login scripts that should be copied to a new user’s home directory. 
  - This parameter can be used only in conjunction with the `-m` option. Replace `skel_dir` with the directory name to use. (Without this option, the `/etc/skel` directory is used.)


- `-m`
  - Automatically create the user’s home directory and copy the files in the skeleton directory (`/etc/skel`) to it. (This is the default action for Fedora and RHEL, so it’s not required. It is not the default for Ubuntu.)
- `-M`
  - Do not create the new user’s home directory, even if the default behavior is set to create it.
- `-n`
  - Turn off the default behavior of creating a new group that matches the name and user ID of the new user. 
  - This option is available with Fedora and RHEL systems.Other Linux systems often assign a new user to the group named users instead.
- `-o`
  - Use with `-u uid` to create a user account that has the same UID as another username.
  - (This effectively lets you have two different usernames with authority over the same set of files and directories.)
- `-p passwd`
  - Enter a password for the account you are adding.
  - This must be an encrypted password. 
  - Instead of adding an encrypted password here, you can simply use the passwd user command later to add a password for user. *(To generate an encrypted MD5 password, type `openssl passwd`.)*
- `-s shell`
  - Specify the command shell to use for this account.
  - Replace `shell` with the command shell (for example, `-s /bin/csh`).
- `-u user_id`
  - Specify the user ID number for the account (for example, `-u 793`).
  - Without the `-u` option, the default behavior is to automatically assign the next available number. Replace `user_id` with the ID number.



For example:

- Create an account for a new user.

  ```
  # useradd -c "Sara Green" sara
  ```

- Set the initial password for `sara`:

  ```
  # passwd sara
  ```

  - keep in mind that running passwd as root user lets you add short or blank passwords that regular users cannot add themselves.

*In creating the account for Sara, the `useradd` command performs several actions:*

- Reads the `/etc/login.defs` and `/etc/default/useradd` files to get default values to use when creating accounts.
- Checks command-line parameters to find out which default values to override.
- Creates a new user entry in the `/etc/passwd` and `/etc/shadow` files based on the default values and command-line parameters.
- Creates any new group entries in the `/etc/group` file. (Fedora creates a group using the new user’s name.)
- Creates a home directory, based on the user’s name, in the `/home` directory.
- Copies any files located within the `/etc/skel` directory to the new home directory. This usually includes login and application startup scripts.



Here’s an example that uses a few more options to do so:

```
# useradd -g users -G wheel,apache -s /bin/tcsh -c "Sara Green" sara
```

- In this case, `useradd` is told to make `users` the primary group sara belongs to (`-g`), add her to the wheel and apache groups, and assign `tcsh` as her primary command shell (`-s`). A home directory in `/home` under the user’s name (`/home/sara`) is created by default. 



This command line results in a line similar to the following being added to the **`/etc/passwd`** file:

```
sara:x:1002:1007:Sara Green:/home/sara:/bin/tcsh
```

- *Each line in the `/etc/passwd` file represents a single user account record.*
- *Each field is separated from the next by a colon (`:`) character. The field’s position in the sequence determines what it is:*
  - The login name is first. 
  - *The password field contains an `x` because, in this example, the shadow password file is used to store encrypted password data (in `/etc/shadow`).*
  - The user ID selected by `useradd` is 1002. 
  - The primary group ID is 1007, which corresponds to a private sara group in the `/etc/group` file.
  - The comment field was correctly set to `Sara Green`
  - the home directory was automatically assigned as `/home/sara`
  - and the command shell was assigned as `/bin/tcsh`, exactly as specified with the `useradd` options.



The **`/etc/group`** file holds information about the different groups on your Linux system and the user who belong to them.

- Groups are useful for enabling multiple users to share access to the same files while denying access to others.

- Here is the `/etc/group` entry created for `sara`:

  ```
  sara:x:1007
  ```

- Each line in the group file contains the name of a group, a group password (usually filled with an `x`), the group ID number associated with it, and a list of users in that group.

- By default, each user is added to his or her own group, beginning with the next available GID, starting with 1000.



#### Setting user defaults

*The `useradd` command determines the default values for new accounts by reading the **`/etc/login.defs`** and **`/etc/default/useradd`** files.*

- You can modify those defaults by editing the files manually with a standard text editor.



You can see default settings by typing the `useradd` command with the `-D` option:

```
# useradd -D
```

You can also use the `-D` option to change defaults. Not all useradd
options can be used in conjunction with the -D option. You can use only the five options listed here:

- `-b default_home`
  - Set the default directory in which user home directories are created. 
  - Replace `default_home` with the directory name to use (for example, `-b /garage`). Usually, this is `/home`.
- `-e default_expire_date`
  - Set the default expiration date on which the user account is disabled. 
  - The `default_expire_date` value should be replaced with a date in the form YYYY-MM-DD (for example, `-e 2011-10-17`).
- `-f default_inactive`
  - Set the number of days after a password has expired before the account is disabled.
  - Replace `default_inactive` with a number representing the number of days (for example, `-f 7`).
- `-g default_group`
  - Set the default group that new users will be placed in. 
  - Normally, `useradd` creates a new group with the same name and ID number asthe user. Replace `default_group` with the group name to use (for example, `-g bears`).
- `-s default_shell`
  - Set the default shell for new users.
  - Typically, this is `/bin/bash`. 
  - Replace `default_shell` with the full path to the shell that you want as the default for new users (for example, `-s /usr/bin/ksh`).



For example:

```
# useradd -D -b /home/everyone -s /bin/tcsh
```



In addition to setting up user defaults, an administrator can create files that are copied to each user's home directory for use.

- These files can include login scripts and shell configuration files (such as `.bashrc`).

*Other commands that are useful for working with user accounts include `usermod` and `userdel`.*



#### Modifying users with `usermod`

The **`usermod`** command provides a simple and straightforward method for changing account parameters. 

Many of the options available with it mirror those found in `useradd`. The options that can be used with this command include the following:

- `-c username`
  - Change the description associated with the user account. 
  - Replace `username` with the name of the user account (`-c jake`). Use quotes to enter multiple words (for example, `-c "Jake Jackson"`).

- `-d home_dir`

  - Change the home directory to use for the account.
  - The default is to name it the same as the login name and to place it in `/home`. Replace `home_dir` with the directory name to use (for example, `-d /mnt/homes/jake`).

- `-e expire_date`

  - Assign a new expiration date for the account in YYYY-MM-DD format.
  - Replace `expire_date` with a date you want to use. (For October 15, 2017,use `-e 2017-10-15`.)

- `-f -1`

  - Change the number of days after a password expires until the account is permanently disabled.
  - The default, `-1`, disables the option. 
  - Setting this to `0` disables the account immediately after the password has expired. Replace `-1` with the number to use.

- `-g group`

  - Change the primary group (as listed in the `/etc/group` file) the user will be in.
  - Replace group with the group name (for example, `-g wheel`).

- `-G grouplist`

  - Set the user’s secondary groups to the supplied comma-separated list of groups.
  - If the user is already in at least one group besides the user’s private group, you must add the `-a` option as well (`-Ga`). 
  - If not, the user belongs to only the new set of groups and loses membership to any previous groups.

- `-l login_name`

  - Change the login name of the account.

- `-L`

  - Lock the account by putting an exclamation point at the beginning of the encrypted password in `/etc/shadow`. 
  - This locks the account, while still allowing you to leave the password intact (the `-U` option unlocks it).

- `-m`

  - Available only when `–d` is used, this causes the contents of the user’s home directory to be copied to the new directory.

- `-o`

  - Use only with `-u uid` to remove the restriction that UIDs must be unique.

- `-s shell`

  - Specify a different command shell to use for this account. Replace

  `shell` with the command shell (for example, `-s bash`).

- `-u user_id`

  - Change the user ID number for the account. 
  - Replace `user_id` with the ID number (for example, `-u 1474`).

- `-U`

  - Unlocks the user account (by removing the exclamation mark at the beginning of the encrypted password).



For example:

```
# usermod -s /bin/csh chris
# usermod -Ga sales,marketing, chris
```



#### Deleting users with `userdel`

**`userdel`** is used to remove users. The following command removes the user chris:

```
# userdel -r chris
```

- Here, the user chris is removed from the `/etc/password` file. The `-r` option removes the user's home directory as well.

- If you choose not to use `-r`, as follows, the home directory for chris is not removed:

  ```
  # userdel chris
  ```



Keep in mind that simply removing the user account does not change anything about the files that user leaves around the system (except those that are deleted when you use `-r`). However, ownership of files left behind appears as belonging to the previous owner’s user ID number when you run `ls -l` on the files.

*Before you delete the user, you may want to run a find command to find all files that would be left behind by the user. After you delete the user, you could search on user ID tofind files left behind. Here are two find commands to do those things:???*

```
# find / -user chris -ls
# find / -uid 504 -ls
```

Because files that are not assigned to any username are considered to be a security risk, it is a good idea to find those files and assign them to a real user account. 

Here’s an example of a find command that finds all files in the file system that are not associated with any user (the files are listed by UID):

```
find / -nouser -ls
```





​			
​		

## Understanding Group Accounts	

Group accounts are useful if you want to share a set of files with multiple users. You can create a group and change the set of files to be associated with that group. The root user can assign users to that group so they can have access to files based on that group’s permission. Consider the following file and directory:

```
$ ls -ld /var/salesdocs /var/salesdocs/file.txt
drwxrwxr-x. 2 root sales 4096 Jan 14 09:32 /var/salesstuff/
-rw-rw-r--. 1 root sales 0 Jan 14 09:32 /var/salesstuff/file.txt
```



#### Using group accounts

Every user is assigned to a primary group. 

- The primary group is indicated by the number in the third field of each entry in the **`/etc/passwd`** file, for example, the group ID 1007 here:

  ```
  sara:x:1002:1007:Sara Green:/home/sara:/bin/tcsh
  ```

- That entry points to an entry in the **`/etc/group`** file:

  ```
  sara:x:1007
  ```

Here are a few facts about using groups:

- When `sara` creates a file or directory, by default, that file or directory is assigned to `sara`’s primary group (also called `sara`).

- The user `sara` can belong to zero or more **supplementary groups**.

  - If `sara` were a member of groups named `sales` and `marketing`, those entries could look like the following in the `/etc/group` file:

    ```
    sales:x:1302:joe,bill,sally,sara
    marketing:x:1303:mike,terry,sara
    ```

- The user sara can’t add herself to a supplementary group. She can’t even add another user to her sara group. Only someone with root privilege can assign users to groups.

- Any file assigned to the sales or marketing group is accessible to sara with group and other permissions (whichever provides the most access). 

  - *If sara wants to create a file with the sales or marketing groups assigned to it, she could use the **`newgrp`** command.* 

  - In this example, sara uses the `newgrp` command to have `sales` become her primary group temporarily and creates a file:

    ```
    [sara]$ touch file1
    [sara]$ newgrp sales
    [sara]$ touch file2
    [sara]$ ls -l file*
    -rw-rw-r--. 1 sara sara 0 Jan 18 22:22 file1 
    -rw-rw-r--. 1 sara sales 0 Jan 18 22:23 file2
    [sara]$ exit
    ```

- *It is also possible to allow users to temporarily become a member of a group with the `newgrp` command without actually being a member of that group.*

  - To do that, someone with root permission can use **`gpasswd`** to set a group password (such as `gpasswd sales`). 
  - After that, any user can type `newgrp` sales into a shell and temporarily use sales as their primary group by simply entering the group password when prompted.



#### Creating group accounts

As the root user, you can create new groups from:

- the User Manager window;

- the command line with the **`groupadd`** command;

  - for example:

    ```
    # groupadd kings
    # groupadd -g 1325 jokers
    ```

  - the group named `kings` is created with the next available group ID. After that, the group `jokers` is created using the `1325` group ID.

  - Some administrators like using an undefined group number under 1000 so the group they create doesn’t intrude on the group designations above 1000 (so UID and GID numbers can go along in parallel).

    ​

Group ID:

- Group ID numbers from 0 through 999 are assigned to special administrative groups. 
  - For example, the root group is associated with GID 0.
- Regular groups begin at 1000 (for some linux distributions).



To change a group later, use the **`groupmod`** command:

```
# groupmod -g 330 jokers
# groupmod -n jacks jokers
```

- In the first example, the group ID for `jokers` is changed to 330. 
- In the second, the name `jokers` is changed to `jacks`.



## Managing Users in the Enterprise

… … 



## Centralizing User Accounts

… … 





# 12 Managing Disks and Filesystems

This chapter describes how to work with hard disks. 

- Hard disk tasks include partitioning, adding filesystems, and managing those filesystems in various ways.
- Storage devices that are attached to the systems from removable devices and network devices can be partitioned and managed in the same ways.

After covering basic partitions, I describe how *logical volume management (LVM)* can be used to make it easier to grow, shrink, and otherwise manage filesystems more efficiently.



## Unserstanding Disk Storage

The basics of how data storage works are the same in most modern operating systems. 

- When you install the operating system, the disk is divided into one or more partitions.
- Each partition is formatted with a filesystem.
- In the case of Linux, some of the partitions may be specially formatted for elements such as a **swap area** or **LVM** physical volumes.
- If RAM fills up, by running too many processes or a process with memory leak, new processes fail if your system doesn't have a way to extend system memory. That's where a swap area comes in.
  - A swap space is a hard disk swap partition or a swap file where your computer can "swap out" data from RAM that isn't being used at the moment and then "swap in" the data back to RAM when it is again needed.
- Another special partition is a logical volume management (LVM) physical volume.
  - LVM physical volumes enable you to create pools of storage space called **volume groups (卷组)**. 
  - From those volume groups, you have much more flexibility for growing and shrinking logical volumes than you have resizing disk partition directly.



For Linux, at least one disk partition is required, assigned to the root(`/`) of the entire Linux system.

However, it is more common to have separate partitions that are assigned to particular directories, such as `/home`, `/var`, and/or `/tmp`. 

- Each of the partitions is connected to the larger Linux filesystem by mounting it to a point in the filesystem where you want that partition to be used.
- Any file added to the mount point directory of a partition, or a subdirectory, is stored on that partition.



> Note:
>
> The word *mount* refers to the action of connecting a filesystem from a hard disk, USB drive, or network storage device to a particular point in the filesystem.
>
> This action is done using the `mount` command, along with options to tell the command where the storage device is and what directory in the filesystem to connect it to.

An entry in the `/etc/fstab` file tells Linux each partition's device name and where to mount it (as well as other bits of information). The mounting is done when the system boots.



*Most of this chapter focuses on :*

- understanding how your computer's disk is partitioned and connected to form your linux filesystem, 
- how to partition disks, format filesystems and swap space, and have those items used when the system boots. 
- how to do partitioning and filesystem creation manually.




## Partitioning Hard Disks

Partition tables:

- **Master Boot Record (MBR)**
  - MBR partitions are limited to 2TB in size.
- **Global Unique Identifiers (GUID)**
  - GUID partitions can create partitions up to 9.4ZB



#### Viewing disk partitions

**`# fdisk -l /dev/sd?`**

Your first primary hard disk usually appears as `/dev/sda`.

When a USB flash drive is inserted, it is assigned to the next available `sd` device. For example:`# fdisk -l /dev/sdb`.



#### Creating a single-partition disk

… 



#### Creating a multiple-partition disk

… 



## Using Logical Volume Management Partitions

Logical volume management (LVM) offers lots of flexibility and efficiency in dealing with constantly changing storage needs.

- With LVM, physical disk partitions are added to pools of space called volume groups.
- Logical volumes are assigned space from volume groups as needed.
- This gives you these abilities:
  - Add more space to a logical volume from the volume group while the volume is still in use.
  - Add more physical volumes to a volume group if the volume group begins to run out of space. The physical volumes can be from disks.
  - Move data from one physical volume to another, so you can remove smaller disks and replace them with larger ones while the filesystems are still in use — again, without downtime.
  - With LVM it is also easier to shrink filesystems to reclaim disk space, although shrinking does require that you unmount the logical volume (but no reboot is needed). LVM also supports advanced features, such as mirroring and working in clusters.



#### Checking an existing LVM

The following command displays the partitions on my first hard disk:

```
# fdisk -l /dev/sda | grep /dev/sda
```

Next, use the pvdisplay command to see if that partition is being used in an LVM group:

```
# pvdisplay /dev/sda2
```



… … 



#### Creating LVM logical volumes

… … 

#### Growing LVM logical volumes

… … 



## Mounting Filesystems

How filesystems are set up to connect permanently to your Linux system.

When you boot linux, usually all the linux partitions on your hard disk are listed in your **`/etc/fstab`** file and are mounted.

- This section describes what you might expect to find in that file.
- It also describes how you can mount other partitions so that they become part of your linux filesystem.



The **`mount`** command is used not only to mount local storage devices, but also to mount other kinds of filesystems on your Linux system. For example:

- `mount` can be used to mount directories (folders) over the network from NFS or Sambra servers.
- It can be used to mount filesystems from a new hard drive or USB flash drive that is not configured to auto mount.
- It can also mount filesystem image files using loop devices.



#### Supported filesystems

To see filesystem types that are loaded in your kernel, type **`cat /proc/filesystems`**.

- befs
  - Filesystem used by the BeOS operating system.
- btrfs
  - A copy-on-write filesystem that implements advanced filesystem features. 
  - It offers fault tolerance and easy administration. 
  - The btrfs file system has recently grown in popularity for enterprise applications.
- cifs
  - Common Internet Filesystem (CIFS), the virtual filesystem used to access servers that comply with the SNIA CIFS specification.
  - CIFS is an attempt to refine and standardize the SMB protocol used by Samba and Windows file sharing.
- ext4
  - Successor to the popular ext3 filesystem.
  - It includes many improvements over ext3, such as support for volumes up to 1 exbibyte and file sizes up to 16 tebibytes. (This replaced ext3 as the default filesystem used in Fedora and RHEL. It has since been supplanted by xfs as the default for RHEL.)
- ext3
  - Ext filesystems are the most common in most Linux systems. 
  - The ext3 filesystem, also called the third extended filesystem, includes journaling features that, compared to ext2, improve a filesystem’s capability to recover from crashes.
- ext2
  - The default filesystem type for earlier Linux systems. 
  - Features are the sameas ext3, except that ext2 doesn’t include journaling features.
- ext
  - This is the first version of ext3. It is not used very often anymore.
- iso9660
  - Evolved from the High Sierra filesystem (the original standard for CD-ROMs). 
  - Extensions to the High Sierra standard (called Rock Ridge extensions) allow iso9660 filesystems to support long filenames and UNIX-style information (such as file permissions, ownership, and links).
  - Data CD-ROMs typically use this filesystem type.
- kafs
  - AFS client filesystem.
  - Used in distributed computing environments to share files with Linux, Windows, and Macintosh clients.
- minix
  - Minix filesystem type, used originally with the Minix version of UNIX.
  - It supports filenames of up to only 30 characters.
- msdos
  - An MS-DOS filesystem. You can use this type to mount floppy disks that come from Microsoft operating systems.
- vfat
  - Microsoft extended FAT (VFAT) filesystem.
- umsdos
  - An MS-DOS filesystem with extensions to allow features that are similar to UNIX (including long filenames).
- proc
  - Not a real filesystem, but rather a filesystem interface to the Linux kernel.
  - You probably won’t do anything special to set up a proc filesystem. However, the `/proc` mount point should be a proc filesystem.
  - Many utilities rely on `/proc` to gain access to Linux kernel information.
- reiserfs
  - ReiserFS journaled filesystem.
  - ReiserFS was once a common default filesystem type for several Linux distributions.
  - However, ext and xfs filesystemsare by far more common filesystem types used with Linux today.
- swap
  - Used for swap partitions.
  - Swap areas are used to hold data temporarily when RAM is used up.
  - Data is swapped to the swap area and then returned to RAM when it is needed again.
- squashfs
  - Compressed, read-only filesystem type.
  - Squashfs is popular on live CDs,where there is limited space and a read-only medium (such as a CD or DVD).
- nfs
  - Network Filesystem (NFS) type of filesystem.
  - NFS is used to mount filesystems on other Linux or UNIX computers.
- hpfs
  - Filesystem is used to do read-only mounts of an OS/2 HPFS filesystem.
- ncpfs
  - A filesystem used with Novell NetWare.
  - NetWare filesystems can be mounted over a network.
- ntfs
  - Windows NT filesystem.
  - Depending upon the distribution you have, it may be supported as a read-only filesystem (so that you can mount and copy files from it).
- affs
  - Filesystem used with Amiga computers.
- ufs
  - Filesystem popular on Sun Microsystems’ operating systems (that is, Solaris and SunOS).
- jfs
  - A 64-bit journaling filesystem by IBM that is relatively lightweight for themany features it has.
- xfs
  - A high performance filesystem originally developed by Silicon Graphics that works extremely well with large files.
  - This filesystem is the default type for RHEL 7.
- gfs2
  - A shared disk filesystem that allows multiple machines to all use the same shared disk without going through a network filesystem layer such as CIFS, NFS, and so on.



To see the list of filesystems that come with the kernel you are currently using, type `ls /lib/modules/'kernelversion'/kernel/fs/`. The 'kernelversion' need to be replaced by teh actual directory name.

- The actual modules are stored in subdirectories of that directory.
- Mounting a filesystem of a supported type causes the filesystem module to be loaded. if it is not already loaded.



*Type **`man fs`** to see descriptions of linux filesystems.*



#### Enabling swap areas

A swap area is an area of the disk that is made available to Linux if the system runs out of memory(RAM).

- If your RAM is full and you try to start another application without a swap area, that application will fail.
- With a swap area, Linux can temporarily swap out data from RAM to the swap area and then get it back when needed. You take a performance hit, but it is better than having processes fail.



To create a swap area from a partition or a file, use the **`mkswap`** command.

To temporarily enable that swap area, you can use the **`swapon`** command.



*For example, here's how to check your available swap space, create a swap file, enable the swap file, and then check that the space is available on your system: (here use a command **`dd`**)*

```
# free -m

# dd if=/dev/zero of=/var/tmp/myswap bs=1M count=1024
# mkswap /var/opt/myswap
# swapon /var/opt/myswap
# free -m
```

The `free` command shows the amount of swap before and after creating, making, and enabling the swap area with the `swapon` command. **???**

- That amount of swap is available immediately and temporarily to your system.

To make that swap area permanent, you need to add it to your **`etc/fstab`** file. Here is an example:

```
/var/opt/myswap swap swap defaults 0 0
```

This entry indicates that the swap file named `/var/opt/myswap` should be enabled at boot time.

Because there is no mount point for a swap area, the second field is just set to swap, as is the partition type.

To test that the swap file works before rebooting, you can enable it immediately (**`swapon -a`**) and check that the additional swap area appears.



#### Disabling a swap area

**`swapoff`** command.



- First, make sure that no space is being used on the swap device (using the **`free`** command).

- Then use `swapoff` to turn off the swap area so you can reuse the space. For example:

  ```
  # free -m

  # swapoff /var/opt/myswap

  # free -m
  ```

  ​

#### Using the fstab file to define mountable file systems

The **/etc/fstab** file contains definitions for each partition, along with options describing how the partition is mounted.



To see all the UUIDs assigned to storage devices on your system, type the **`blkid`** command.



… … 



To help you understand the contents of the `/etc/fstab` file, here is what is in each field of that file:

- Field 1
  - The name of the device representing the filesystem.
  - This field can include the `LABEL` or `UUID` option, with which you can indicate a volume label or universally unique identifier (UUID) instead of a device name.
  - The advantage to this approach is that because the partition is identified by volume name, you can move a volume to a different device name and not have to change the fstab file.
  - (See the description of the `mkfs` command in the section “Using the mkfsCommand to Create a Filesystem” for information on creating and using labels.)
- Field 2
  - The mount point in the filesystem.
  - The filesystem contains all data from the mount point down the directory tree structure unless another filesystem is mounted at some point beneath it.
- Field 3
  - The filesystem type.
- Field 4
  - Use defaults or a comma-separated list of options (no spaces) you want to use when the entry is mounted.
  - See the `mount` command manual page (under the `-o` option) for information on other supported options.


- Field 5
  - The number in this field indicates whether the filesystem needs to be dumped (that is, have its data backed up).
  - A `1` means that the filesystem needs to be dumped, and a `0` means that it doesn’t. (This field is no longer particularly useful because most Linux administrators use more sophisticated backup options than the dump command. Most often, a `0` is used.)
- Field 6
  - The number in this field indicates whether the indicated filesystem should be checked with `fsck` when the time comes for it to be checked: `1` means it needsto be checked first, `2` means to check after all those indicated by `1` have already been checked, and `0` means don’t check it.



*If you want to find out more about mount options as well as other features of the `/etc/fstab` file, there are several man pages you can refer to, including `man 5 nfs` and `man 8 mount`.*



#### Using the `mount` command to mount file systems

*Linux systems automatically run `mount -a` (mount all filesystems from the `/etc/fstab` file) each time you boot.*

For that reason, you generally use the **`mount`** command only for special situations. In particular, the average user or administrator *uses `mount` in two ways*:

- To display the disks, partitions, and remote filesystems currently mounted
- To temporarily mount a filesystem.



- With no options, `mount` can see what filesystems are currently mounted on the local Linux system.

- Mount a filesystem manually. 

  - For example, to mount read-only a disk partition `sdb1` that has an older `ext3` filesystem, you could type this:

  ```
  # mkdir /mnt/temp
  # mount -t ext3 -o ro /dev/sdb1 /mnt/tmp
  ```

- Another reason to use the `mount` command is to remount a partition to change its mount options. 

  - Suppose you want to remount `/dev/sdb1` as read/write, but you do not want ot unmount it (maybe someone is using it). You could use the remount option as follows:

    ```
    # mount -t ext3 -o remount,rw /dev/sdb1
    ```



#### Mounting a disk image in loopback

Another valuable way to use the `mount` command has to do with disk images. 

- If you download a CD or floppy disk image from the Internet and you want to see what it contains, you can do so without burning it to CD or floppy.

- With the image on your hard disk, create a mount point and use the `-o loop` option to mount it locally.

- For example:

  ```
  # mkdir /mnt/mycdimage
  # mount -o loop whatever-i686-disc1.iso /mnt/mycdimage
  ```

  - In this example, the `/mnt/mycdimage` directory is created, and then the disk image file `whatever-i686-disc1.iso` residing in the current directory is mounted on it.
  - You can now `cd` to that directory, view the contents of it, and copy or use any of its contents.
  - This is useful for downloaded CD images from which you want to install software without having to burn the image to CD.
  - You could also share that mount point over NFS, so you could install the software from another computer.
  - When you are finished, just type `umount/mnt/mycdimage` to unmount it.

- Other options to `mount` are available only for sepcific filesystem types. See the `mount` manual page for those and other useful options.



































