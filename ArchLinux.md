# Installation

## 1. Pre-installation

##### 1. Set the keyboard layout

- *The default console keymap is US.*

- Available layouts can be listed with:

  ```shell
  ls /usr/share/kbd/keymaps/**/*.map.gz
  ```

- To modify the layout, append a corresponding file name to **`loadkeys`**, omitting path and file extension. For example:

  ```shell
  # set a German keyboard layout
  loadkeys de-latin1
  ```



*Console fonts* are located in `/usr/share/kbd/consolefonts/` and can likewise be set with **`setfont`**.



##### 2. Verify the boot mode

- There are two boot modes: 

  - UEFI
  - BIOS

- *Verify the boot mode*:

  - list the `efivars` directory:

    ```shell
    ls /sys/firmware/efi/efivars
    ```

  - If the directory exist, the system booted in UEFI.

  - if the directory does not exist, the system may be booted in BIOS.

- *Note: boot mode需要于硬盘分区模式相匹配*

  - **UEFI + GPT**（新）
    - 最大支持18EB的硬盘。
    - 支持无限个分区（目前微软限定为128个）。
  - **BIOS + MBR**（旧）
    - *BIOS+GPT 无法启动系统。*
    - BIOS+MBR 可启动，不支持2T以上的硬盘，最多支持4个主分区。



##### 3. Connect to the internet

Use **`ping`** to check internet connection :

 ```shell
# sending ECHO_REQUEST packets 4 times to archlinux.org
ping -c 4 archlinux.org
 ```

... 



##### 4. Update the system clock

Use **`timedatectl`** to ensure the system clock is accurate:

```shell
# enable and start the systemd-timesyncd.service unit 开启系统时间的网络同步服务
timedatectl set-ntp true

# check the service status 检查系统时间状态
timedatectl status
```



##### 5. Partition the disks

> To manipulate disk partition table, we have several tools. For example:`fdisk`, `cfdisk`.

- *List block devices:*

  - **`lsblk`** or **`fdisk -l`**

- *Partition the disks:*

  - **`fdisk`** or **`cfdisk`** 

    ```shell
    fdisk /dev/sda
    # or
    cfdisk
    ```

  - 这两个工具可以任选其一，重点是：

    - 将物理存储设备（如果只有一个，一般是`sda`）分区（例如：`sda1`, `sda2`，可以只有一个分区）。
    - *分区格式需要与主板的boot mode相匹配*：
      - BIOS 选择**MBR**类分区，并开启bootable（打上星号）
      - UEFI 选择**GPT**类分区



The following partitions are required for a chosen device:

- One partition for the root directory `/`.
- If [UEFI](https://wiki.archlinux.org/index.php/UEFI) is enabled, an [EFI System Partition](https://wiki.archlinux.org/index.php/EFI_System_Partition).





##### 6. Format the partitions

*Once the partitions have been created, each must be formatted with an appropriate **file system**.* For example: **`mkfs.ext4`**

- ```shell
  mkfs.ext4 /dev/sda1
  ```

  ​

If you created a partition for swap (for example `/dev/sda3`), initialize it with **`mkswap`**:

- ```shell
  mkswap /dev/sda3
  swapon /dev/sda3
  ```



See [File systems#Create a file system](https://wiki.archlinux.org/index.php/File_systems#Create_a_file_system) for details.



##### 7. Mount the file systems

**`mount`** the file system on the root partition to `/mnt`, for example:

```shell
# mount /dev/sda1 to /mnt
mount /dev/sda1 /mnt
```

Create mount points for any remaining partitions and mount then accordingly:

```shell
# creat mount point /mnt/boot
mkdir /mnt/boot
#mount /dev/sda2 to /mnt/boot
mount /dev/sda2 /mnt/boot
```



> [genfstab](https://git.archlinux.org/arch-install-scripts.git/tree/genfstab.in) will later detect mounted file systems and swap space.



## 2. Installation

##### 1. Select the mirrors

Packages to be installed must be downloaded from mirror servers, which are defined in **`/etc/pacman.d/mirrorlist`**.

- The higher a mirror is placed in the list, the more priority it is given when downloading a package.
- You may want to move the geographically closest mirrors to the top of the list.
- This file will later be copied to the new system by `pacstrap`, so it is worth getting right.

For example :

```shell
# copy all china mirrors to the top of the list (this is not the best way)
grep -A 1 'China' /etc/pacman.d/mirrorlist | grep -v '\-\-' > /etc/pacman.d/mr

cat /etc/pacman.d/mirrorlist >> /etc/pacman.d/mr

mv /etc/pacman.d/mr /etc/pacman.d/mirrorlist
```



##### 2. Install the base packages

Use the **[pacstrap](https://projects.archlinux.org/arch-install-scripts.git/tree/pacstrap.in)** script to install the [base](https://www.archlinux.org/groups/x86_64/base/) package group:

```shell
pacstrap -i /mnt base
```

This group does not include all tools from the live installation, such as [btrfs-progs](https://www.archlinux.org/packages/?name=btrfs-progs) or specific wireless firmware; see [packages.both](https://projects.archlinux.org/archiso.git/tree/configs/releng/packages.both) for comparison.

To [install](https://wiki.archlinux.org/index.php/Install) packages and other groups such as [base-devel](https://www.archlinux.org/groups/x86_64/base-devel/), append the names to *pacstrap* (space separated) or to individual [pacman](https://wiki.archlinux.org/index.php/Pacman) commands after the [#Chroot](https://wiki.archlinux.org/index.php/Installation_guide#Chroot) step.



## 3. Configure the system

##### 1. Fstab

Generate an **`fstab`** file (use `-U` or `-L` to define by `UUID` or labels, respectively):

```shell
genfstab -U /mnt >> /mnt/etc/fstab
```

Check the resulting file in `/mnt/etc/fstab` afterwards, and edit it in case of errors.



> `/etc/fstab`: *static information about the filesystems.*
>
> - The file `fstab` contains descriptive information about the filesystems the system can mount.
> - `fstab` is only read by programs, and not written, it is the duty of the system administrator to properly create and maintain this file.
> - *The order of records in `fstab` is important because `fsck`(8), `mount`(8), and `umount`(8) sequentially iterate through `fstab` doing their thing.*
> - Each filesystem is described on a separate line. Fields on each line are separated by tabs or spaces.



##### 2. Chroot

Change root into the new system:

```shell
arch-chroot /mnt
```



> **Chroot** is an operation that changes the apparent root directory for the current running process and their children. A program that is run in such a modified environment cannot access files and commands outside that environmental directory tree. This modified environment is called a *chroot jail*.



##### 3. Time zone

Set the Time zone:

```shell
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

Run [hwclock(8)](https://jlk.fjfi.cvut.cz/arch/manpages/man/hwclock.8) to generate `/etc/adjtime`:

```shell
# Set the Hardware Clock from the System Clock, and update the timestamps in /etc/adjtime
hwclock --systohc
```



> `ln` - make links between files



##### 4. Locale

Uncomment `en_US.UTF-8 UTF-8` and other needed [localizations](https://wiki.archlinux.org/index.php/Localization) in `/etc/locale.gen`, and generate them with `locale-gen`:

```shell
# edit /etc/locale.gen, uncomment en_US.UTF-8 UTF-8 zh_CN.UTF-8 zh_TW.UTF-8, then save file
nano /etc/locale.gen

# generate locale:
locale-gen
```



Set the `LANG` [variable](https://wiki.archlinux.org/index.php/Variable) in [locale.conf(5)](https://jlk.fjfi.cvut.cz/arch/manpages/man/locale.conf.5) accordingly, for example:

```shell
# if you want use chinese text
echo LANG=zh_CN.UTF-8 > /etc/locale.conf
```

> The `/etc/locale.conf file` configures system-wide locale settings. It is read at early boot by `systemd`(1).



If you [set the keyboard layout](https://wiki.archlinux.org/index.php/Installation_guide#Set_the_keyboard_layout), make the changes persistent in [vconsole.conf(5)](https://jlk.fjfi.cvut.cz/arch/manpages/man/vconsole.conf.5):

```Shell
/etc/vconsole.conf
-------------------------
# 示例未完成
```

> The `/etc/vconsole.conf` file configures the virtual console, i.e. keyboard mapping and console font.



##### 5. Hostname

Create the [hostname](https://wiki.archlinux.org/index.php/Hostname) file:

```shell
echo justinLinux > /etc/hostname
```

> Hostname is a unique name created to identify a machine on a network, configured in `/etc/hostname`. 
>
> - The `/etc/hostname` file configures the name of the local system that is set during boot using the `sethostname`(2) system call. 
> - It should contain a single newline-terminated hostname string.



Add matching entries to [hosts(5)](https://jlk.fjfi.cvut.cz/arch/manpages/man/hosts.5):

```shell
/etc/hosts
-------------------------
127.0.0.1	localhost
::1			localhost
127.0.1.1	justinLinux.localdomain	justinLinux
```

> If the system has a permanent IP address, it should be used instead of `127.0.1.1`.



##### 6. Network configuration

```shell
systemctl enable dhcpcd.service
```



The newly installed environment has no network connection activated by default. See [Network configuration#Network managers](https://wiki.archlinux.org/index.php/Network_configuration#Network_managers).

For [Wireless configuration](https://wiki.archlinux.org/index.php/Wireless_configuration), [install](https://wiki.archlinux.org/index.php/Install) the [iw](https://www.archlinux.org/packages/?name=iw) and [wpa_supplicant](https://www.archlinux.org/packages/?name=wpa_supplicant) packages, as well as needed [firmware packages](https://wiki.archlinux.org/index.php/Wireless#Installing_driver.2Ffirmware). Optionally install [dialog](https://www.archlinux.org/packages/?name=dialog) for usage of *wifi-menu*.



##### 7. Root password

```shell
passwd
```



##### 8. Boot loader

A Linux-capable boot loader must be installed in order to boot Arch Linux. See [Category:Boot loaders](https://wiki.archlinux.org/index.php/Category:Boot_loaders) for available choices.

If you have an Intel CPU, install the [intel-ucode](https://www.archlinux.org/packages/?name=intel-ucode) package in addition, and [enable microcode updates](https://wiki.archlinux.org/index.php/Microcode#Enabling_Intel_microcode_updates).



In order to boot Arch Linux, you must install a Linux-capable boot loader to the [Master Boot Record](https://wiki.archlinux.org/index.php/Master_Boot_Record) or the [GUID Partition Table](https://wiki.archlinux.org/index.php/GUID_Partition_Table). The boot loader is the first piece of software started by the [BIOS](https://en.wikipedia.org/wiki/BIOS) or [UEFI](https://wiki.archlinux.org/index.php/UEFI). It is responsible for loading the kernel with the wanted [kernel parameters](https://wiki.archlinux.org/index.php/Kernel_parameters), and [initial RAM disk](https://wiki.archlinux.org/index.php/Mkinitcpio) before initiating the [boot process](https://wiki.archlinux.org/index.php/Boot_process). 

> - Boot loaders only need to support the file system on which kernel and initramfs reside (the file system on which `/boot` is located).



Now we use boot loader **grub** :

- install grub package:

  ```shell
  pacman -S grub
  ```

- Then, install GRUB on your drive:

  ```shell
  grub-install --recheck /dev/sda
  ```

- Generate a default configuration file:

  ```shell
  grub-mkconfig -o /boot/grub/grub.cfg
  ```



## 4. Reboot

```shell
exit

umount -R /mnt

reboot
```



## 5. Post-installation

See [General recommendations](https://wiki.archlinux.org/index.php/General_recommendations) for system management directions and post-installation tutorials (like setting up a graphical user interface, sound or a touchpad).

For a list of applications that may be of interest, see [List of applications](https://wiki.archlinux.org/index.php/List_of_applications).





# General recommendations

## System administration

##### Users and groups

You should create and use unprivileged user account for more tasks, only using the root account for system adminstration.

- Users and groups are a mechanism for access control.
  - See [Users and groups#User management](https://wiki.archlinux.org/index.php/Users_and_groups#User_management) for details.
- Administrators may fine-tune group membership and ownership to grant or deny users and services access to system resources. 
  - Read the [Users and groups](https://wiki.archlinux.org/index.php/Users_and_groups) article for details and potential security risks.



##### Privilege escalation

**`su`** and **`sudo`** commands allow you to run commands as another user.



##### Service management

Arch Linux uses **`systemd`** as the **`init`** process, which is a system and service manager for Linux.



##### System maintenance

Arch is a rolling release system and has rapid package turnover, so users have to take some time to do [system maintenance](https://wiki.archlinux.org/index.php/System_maintenance). Read [Security](https://wiki.archlinux.org/index.php/Security) for recommendations and best practices on hardening the system.



## Package management

For more, please see [FAQ#Package management](https://wiki.archlinux.org/index.php/FAQ#Package_management) and [Category:Package management](https://wiki.archlinux.org/index.php/Category:Package_management).



**`pacman`** : package manager.

- It combines a simple binary package format with ABS(Arch Build System).
- Pacman is written in the C programming language and uses the `tar` format for packaging.
- *The `pacman` package contains other useful tools*:
  - such as `makepkg`, `pactree`, `vercmp` and `checkupdates`. 
  - Run `pacman -Qlq pacman | grep bin` to see the full list.
- ​



##### **pacman**

[pacman](https://wiki.archlinux.org/index.php/Pacman) is the Arch Linux package manager: all users are required to become familiar with it before reading any other articles.

- The `pacman` package manager is one of the major distinguishing features of Arch Linux.
- Pacman keeps the system up to date by synchronizing package lists with the master server. This server/client model also allows the user to download/install packages with a simple command, complete with all required dependencies.
- Pacman is written in the C programming language and uses the `tar` format for packaging.

See [pacman/Tips and tricks](https://wiki.archlinux.org/index.php/Pacman/Tips_and_tricks) for suggestions on how to improve your interaction with `pacman` and package management in general.

- For general methods to improve the flexibility of the provided tips or `pacman` itself, see [Core utilities](https://wiki.archlinux.org/index.php/Core_utilities) and [Bash](https://wiki.archlinux.org/index.php/Bash).



##### Repositories

See [Official repositories](https://wiki.archlinux.org/index.php/Official_repositories) for details about the purpose of each officially maintained repository.

- If you plan on using 32-bit applications, you will want to enable the [multilib](https://wiki.archlinux.org/index.php/Multilib) repository.
- [Unofficial user repositories](https://wiki.archlinux.org/index.php/Unofficial_user_repositories) lists several other unsupported repositories.
- You may consider installing the [pkgstats](https://wiki.archlinux.org/index.php/Pkgstats) service.



##### Mirrors

Visit [Mirrors](https://wiki.archlinux.org/index.php/Mirrors) for steps on taking full advantage of using the fastest and most up to date mirrors of the official repositories. 

- As explained in the article, a particularly good advice is to routinely check the [Mirror Status](https://www.archlinux.org/mirrors/status/) page for a list of mirrors that have been recently synced.



##### **Arch Build System**

The Arch Build System is a *ports-like* system for building and packaging software from source code. 

- While `pacman` is the specialized Arch tool for binary package management (including packages built with the ABS),  *ABS is a collection of tools for compiling source into installable `.pkg.tar.xz` packages.*



- **ports-like system**: 
  - *Ports* is a system used by BSD to *automate the process of building software from source code*. 
  - The system uses a *port* to download, unpack, patch, compile, and install the given software. 
  - A port is merely a small directory on the user's computer, named after the corresponding software to be installed, that contains a few files with the instructions for building and installing the software from source. This makes installing software as simple as typing `make` or `make install clean` within the port's directory.
- **ABS** is a similar concept:
  - ABS  is made up of a directory tree that can be checked out using SVN.
  - This tree represents, but does not contain, all official Arch software.
  - Subdirectories do not contain the software package not the source but rather a [PKGBUILD](https://wiki.archlinux.org/index.php/PKGBUILD) file and sometimes other files.
  - By issuing [`makepkg`](https://wiki.archlinux.org/index.php/Makepkg) inside a directory containing a `PKGBUILD`, the software is first compiled and then packaged within the build directory. 
  - Then you can use `pacman` to install or upgrade your new package.



##### **ABS overview**

'ABS' may be used as an umbrella term since it includes and relies on several other components; therefore, though not technically accurate, 'ABS' can refer to the following tools as a complete toolkit:

- **SVN tree**

  - The directory structure containing files needed to build all official packages but not the packages themselves nor the source files of the software. It is available in svn and git repositories.

- **PKGBUILD**

  - `PKGBUILD` is a Bash script that contains the URL of the source code along with the compilation and packaging instructions.

- **`makepkg`**

  - Packages in Arch Linux are built using the [makepkg](https://wiki.archlinux.org/index.php/Makepkg) utility. 

  - `makepkg` is a shell command tool. 

  - When `makepkg` is run, it searches for a `PKGBUILD` file in the current directory and reads it. automatically downloads and compiles the sources and creates a `.pkg.tar*` according to the `PKGEXT` array in `makepkg.conf`. 

  - The resulting package contains binary files and installation instructions, readily installable with `pacman`.

    > You may also use `makepkg` to make your own custom packages from the [AUR](https://wiki.archlinux.org/index.php/AUR) or third-party sources. See [Creating packages](https://wiki.archlinux.org/index.php/Creating_packages) for more information.

- **`pacman`**

  - pacman is completely separate, but is necessarily invoked either by makepkg or manually, to install and remove the built packages and for fetching dependencies.

- **AUR** : Arch User Repository

  - A community-driven repository.
  - It contains package descriptions ([PKGBUILDs](https://wiki.archlinux.org/index.php/PKGBUILD)) that allow you to compile a package from source with [makepkg](https://wiki.archlinux.org/index.php/Makepkg) and then install it via [pacman](https://wiki.archlinux.org/index.php/Pacman#Additional_commands).
  - The AUR was created to organize and share new packages from the community and to help expedite popular packages' inclusion into the [community](https://wiki.archlinux.org/index.php/Community) repository.

https://wiki.archlinux.org/index.php/Arch_Build_System







# `man`

system's manual pager.

## Sections

- The default action is to search in all of the available sections following a pre-defined order, and to show only the first page found.

  > Pre-defined order: `1 8 3 0 2 5 6 9 6 7 ` by default. It can be overridden by the SECTION directive in `/etc/man_db.conf`.



- **Manual Page Sections:** 

  | Section Number | Section Name                             |
  | -------------- | ---------------------------------------- |
  | `1`            | Executable programs or shell commands    |
  | `2`            | System Calls                             |
  | `3`            | C Library Functions                      |
  | `4`            | Devices and Special Files (usually in `/dev`) |
  | `5`            | File Formats and Conventions(specific configuration files, such as `/etc/passwd`) |
  | `6`            | Games                                    |
  | `7`            | Miscellaneous (including macro packages and conventions such as protocols, filesystems, character set standards) |
  | `8`            | System Administration Tools and Daemons (for root) |
  | `9`            | Kernel routines [Non standard]           |

  ​

- *Find manual page in certain sections:*

  ```shell
  # find passwd(1)
  man passwd.1
  man 1 passwd
  # find passwd(5)
  man passwd.5
  man 5 passwd
  ```



- *Search manual pages:* **`man -k`** or **`apropos`**

  ```shell
  # search the short descriptions and manual page names for the keyword printf as regular expression
  man -k printf
  apropos printf
  ```

  ​

## Manual Page constitution

A manual page consists of several sections(different from the 'section' above).

Conventional section names include:

- NAME
- SYNOPSIS
- CONFIGURATION
- DESCRIPTION
- OPTIONS
- EXIT STATUS
- RETURN VALUE
- ERRORS
- ENVIRONMENT
- FILES
- VERSIONS
- CONFORMING TO
- NOTES
- BUGS
- EXAMPLE
- AUTHORS
- SEE ALSO

*Reading manual page*:

<img src='images/arch-linux-manual-page-conventions.png' width='700'>

The following conventions apply to the **SYNOPSIS** section and can be used as a guide in other sections.

| **bold text**      | type exactly as shown.                   |
| ------------------ | ---------------------------------------- |
| *italic text*      | replace with appropriate argument.       |
| [**-abc**]         | any or all arguments within [ ] are optional. |
| **-a**\|**-b**     | options delimited by \| cannot be used together. |
| *argument* ...     | *argument* is repeatable.                |
| [*expression*] ... | entire *expression* within [ ] is repeatable. |

Exact rendering may vary depending on the output device. For instance, man will usually not be able to render italics when running in a terminal, and will typically use underlined or coloured text instead.



## Overview



# Variables

The shell itself stores information that may be useful to the user's shell session in what are called **variables**. 

- By convention, linux shell variables will have their names in UPPERCASE.


- *You can see all variables set for your current shell by typing the **`set`** command.*

Examples:

- `$SHELL` : the shell you are using
- `$PS1` : defines your shell prompt
- `$MAIL` : the location of your mailbox

…….???

## Environment variables

A subset of your local variables are referred to as **environment variables**.

environment variables provide a simple way to share configuration settings between multiple applications and processes in Linux.

- Environment variables are variables that are exported to any new shells opened from the current shell.

  ​


To list the current environmental variables with values: **`env`** or **`printenv`** 



???


# Terminology

- **IEEE**
  - Institute of Electrical and Electronics Engineers,  电气电子工程师学会
- **POSIX**
  - The Portable Operating System Interface
  - This is a family of standards specified by the IEEE Computer Society for maintaining compatibility between operating systems.
  - POSIX defines the application programming interface(API), along with command line shells and utility interfaces, for software compatibility with variants of Unix and other operating systems.

