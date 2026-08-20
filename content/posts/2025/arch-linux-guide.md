---
title: Arch Linux 安装记录
description: 文章记录了手动安装 Arch Linux 过程中一些问题的解决方法以及基础的系统美化，以便快速上手。
date: 2025-11-23 19:59:22
updated: 2026-05-02 12:19:33
categories: [随笔]
tags: [Arch, Linux, 指南]
references:
  - title: archlinux 简明指南
    link: https://arch.icekylin.online/guide/rookie/basic-install
  - title: SHORiNのArch Linux实践经历与指南
    link: https://github.com/SHORiN-KiWATA/ShorinArchExperience-ArchlinuxGuide/wiki
---

::timeline
{2025年11月13日}

成功安装了Arch Linux，但又因为一些操作把系统搞寄了。

{2025年11月23日}

第二次成功安装了 Arch Linux，遂准备写下这篇文章进行记录。
::

## 注意事项

你可以在不同的硬盘中安装 Arch Linux，这样可以更安全地折腾😘。

### Ventoy 的启动模式

如果 :tip[以正常模式启动]{tip="Boot in normal mode"} 安装但无法进入系统的话，可以试试 :tip[以 grub2 模式启动]{tip="Boot in grub2 mode"}。

### 引导与参数

::chat
{:省略了很多聊天记录...}

{.Mugzx}

［一张关于报错信息的图片］

{Pinpe}

🤔

可能是驱动/硬件问题？

::

Pinpe 大佬指出我的无线网卡 intel 3165AC 可能与 Linux 有一些 :tip[兼容问题]{tip="比如以 pcieport 为开头的报错信息"}。

:copy{lang="bash" code="vim /etc/default/grub"}

如果这个报错信息也影响了你输入命令的话，可以在 `GRUB_CMDLINE_LINUX` 中添加 `pci=noaer`，禁用这个报错信息，除此之外，还需要调整 grub 的引导参数。

- 取消 `GRUB_DISABLE_OS_PROBER=false` 的注释，以便进行双系统引导。
  - **（可选）** 选择 rEFind 进行引导则不添加。

- 英特尔的硬件请在 `GRUB_CMDLINE_LINUX_DEFAULT` 中添加 `nowatchdog` 和 `modprobe.blacklist=iTCO_wdt` 。

## 基本美化

### 字体

:copy{lang="bash" code="sudo pacman -S noto-fonts noto-fonts-emoji ttf-sarasa-gothic"}
:copy{lang="bash" code="sudo pacman -S ttf-jetbrains-mono-nerd"}

调整所有字体为 Sans Serif 12pt ，等宽字体设置为 Monospace ，大小同样为12pt。

### 窗口

窗口可以在显示和监视器-显示器配置中调整屏幕缩放率，推荐为100%。

在颜色和主题-窗口装饰元素中可以调整右上角的窗口按钮大小，推荐设置为中等。

### 桌面配置

::pic
---
src: https://i.redd.it/5jwtpab3nny81.png
mirror: fly
caption: Arch Linux-chan
---
::

壁纸出自 [RealShovelKun](https://www.reddit.com/r/MoeMorphism/comments/umjhgw/oc_arch_linuxchan_by_myself)，我的 KDE Plasma 和 Niri 桌面环境目前都在用这个。

## 软件包

有些包来自 `multilib` `archlinuxcn` 的源，记得取消注释和提前添加上去。

### 透明代理

:copy{lang="bash" code="echo 'c3VkbyBwYWNtYW4gLVMgY2xhc2gtdmVyZ2UtcmV2' | base64 -d"}

::link-card
---
title: 入手 Cudy TR3000
description: 我出于系统的安装便利，入手了一台小巧的路由器，同时也发现了该路由器的不足之处。
link: /2026/cudy-tr3000
---
::

### 杂项

建议取消 `/etc/pacman.conf` 的 `Color` 和 `VerbosePkgLists` 注释，有更好的可读性。

## 硬件驱动

前往 Arch Wiki 进行更仔细的阅读，这是最好的。

### Intel/AMD

[Intel 图形处理器](https://wiki.archlinux.org/title/Intel_graphics)

[硬件视频加速](https://wiki.archlinux.org/title/Hardware_video_acceleration)

:copy{prompt="$" code='sudo pacman -S mesa lib32-mesa vulkan-intel lib32-vulkan-intel'}

:copy{prompt="$" code='sudo pacman -S mesa lib32-mesa xf86-video-amdgpu vulkan-radeon lib32-vulkan-radeon'}

在2018年之前推出的 CPU ，需要安装的是 `libva-intel-driver`，具体可见关于 [Coffee Lake](https://wiki.archlinux.org/title/Hardware_video_acceleration#VA-API) 的介绍。

:copy{prompt="$" code='sudo pacman -S intel-media-driver'}

### NVIDIA

[NVIDIA](https://wiki.archlinux.org/title/NVIDIA)

[硬件视频加速](https://wiki.archlinux.org/title/Hardware_video_acceleration)

:copy{prompt="$" code='sudo pacman -S nvidia-open-dkms nvidia-utils lib32-nvidia-utils libva-nvidia-driver opencl-nvidia lib32-opencl-nvidia'}

在 Linux 上玩游戏时显卡不一定会调用独显，配合 `prime-run` 就可以了。

:copy{prompt="$" code='sudo pacman -S nvidia-prime'}

驱动持久化，我认为这可以让 NVIDIA 显卡在 Linux 下更省电。

:copy{prompt="$" code='sudo systemctl enable --now nvidia-persistenced'}

### 蓝天公模

蓝天公模在 Arch Linux 上没有键盘背光，需要安装 `tuxedo-control-center-bin`。

:copy{prompt="$" code='paru -S tuxedo-control-center-bin'}

## 尝试更多

了解完 Linux 的基本知识，也许就可以尝试更多了。

:quote[比如 Window Manager。]

安装部分可以查看参考链接内的内容，按步骤安装即可。需要注意的就是**安装前创建快照**与**具体问题具体分析**。
