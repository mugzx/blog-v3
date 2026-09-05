---
title: 【转载】在 Linux 发行版下运行星露谷时遇到的错误
description: 在 Arch Linux 更新 glibc 2.41 后遇到星露谷物语 Galaxy API 初始化错误？本文提供使用 patchelf 清除 execstack 的临时解决方案，修复多人联机问题。
date: 2026-08-23 18:22:23
categories: [分享]
tags: [转载, 星露谷物语, Bug, Linux]
references:
  - title: 临时解决 Arch Linux 原生运行星露谷物语时由 glibc 导致的 Galaxy API 初始化错误 - Yamrc
    link: https://yamr.cc/posts/err-smapi-galaxy-glibc-2-41/
---

## 起因

我最近开始使用 Arch Linux，并且沉迷星露谷物语。我在进行一次 **愉 快 的** 滚动更新后，发现启动游戏时终端输出了如下错误：

```
[game] Error initializing the Galaxy api.
TypeInitializationException: The type initializer for 'Galaxy.Api.GalaxyInstancePINVOKE' threw an exception.
 ---> ...其他错误信息...
[SMAPI] Type 'help' for help, or 'help <cmd> for a command's usage
[game] Galaxy SignInSteam failed with an exception:
TypeInitializationException: The type initializer for 'Galaxy.Api.GalaxyInstance' threw an exception.
 ---> ...其他错误信息...
```

这个问题会导致无法进行多人游戏，合作界面卡在 “正在连接到在线服务…” 无法联机。

## 问题解析

经过一番折腾（主要靠搜索引擎，欸嘿），我发现这个问题是由于 `glibc` 在 `2.41` 版本引入的兼容性变化，导致 `GOG Galaxy API` 库（`libGalaxy64.so` 和 `libGalaxyCSharpGlue.so`）加载失败。具体原因是新版本对 `GNU_STACK` 段进行了更严格的检查。简单说，就是新官上任三把火，`glibc` 现在对 `GNU_STACK` 段的检查更严格了，而老库有点跟不上节奏。通常只需要等一段时间就会有人修复这个问题，但是现在我们被虫（Bug）淹没不知所措，十分甚至九分的急急急急急。

::alert{type="warning"}
不建议尝试降级 glibc！这可能会导致不可预测的问题，包括但不限于企鹅恐慌（Panic）、程序飞天、数据变成滚木等。总之就是非常可怕！
::

## 解决方法

那么，该如何解决这个问题呢？其实非常简单，只需要去除 `execstack` 段即可。具体步骤如下：

1. 安装 `patchelf` 或者其他工具：

```bash
sudo pacman -S patchelf
```

2. 找到 `libGalaxy64.so` 和 `libGalaxyCSharpGlue.so` 文件的位置。在星露谷物语安装目录下，通常位于 `~/.steam/steam/steamapps/common/Stardew\ Valley` 目录下。

3. 使用 `patchelf` 去除 `execstack` 段：

```bash
patchelf --clear-execstack libGalaxy64.so
patchelf --clear-execstack libGalaxyCSharpGlue.so
```

**搞定！** 通常情况下，执行完以上步骤，`Error initializing the Galaxy api` 就应该消失了，如果没有，那你遇到的大概不是这个问题。恢复也很简单，删掉这两个库，使用 Steam 检查游戏文件完整性即可。
