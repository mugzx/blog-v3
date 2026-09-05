---
title: Ungoogled Chromium 简单体验及配置
description: 介绍 Ungoogled Chromium 的优势，分享安装方法及常用实验功能设置，替代原版 Google Chrome，提升隐私与使用体验。
date: 2025-10-24 00:11:45
updated: 2026-05-24 03:58:22
categories: [分享]
tags: [Google Chrome, Ungoogled Chromium]
references:
  - title: 📋 ungoogled chromium 安装配置 - 布铃酱的点心铺
    link: https://blyrin.cn/notes/ungoogled-chromium/
  - title: 谷歌 Chrome 浏览器将允许用户关闭检测诈骗端侧 AI 模型
    link: https://www.ithome.com/0/914/184.htm
---

## 换一个

Google Chrome 总是会在用户数据的路径中生成AI模型相关文件，占用了我很多磁盘空间。

:copy{prompt="Chrome" code="%LOCALAPPDATA%\Google\Chrome\User Data\OptGuideOnDeviceModel"}

而这个东西无法通过 `chrome://flags` 实验特性管理将其关闭。当然，你也可以通过修改文件夹权限，注册表等操作来限制这个东西的生成，但我始终觉得不如 :tip[换个浏览器来的好]{tip="其实是当时的Mugzx把谷歌账号搞没了🫠"}。

## 来安装吧

:copy{lang="sh" prompt="PS>" code="scoop bucket add extras"}

:copy{lang="sh" prompt="PS>" code="scoop install ungoogled-chromium"}

我推荐 Windows 系统使用 Scoop 安装 Ungoogled Chromium，这在更新时比较方便。

::quote
也可自行探索另外的安装方式。
::

其余系统的安装流程详见 [Downloads](https://github.com/ungoogled-software/ungoogled-chromium#downloads) 的说明内容。

### Widevine DRM

观看受版权保护的视频需要安装 Widevine DRM 组件。不过目前从 `dl.google.com` 安装组件的方式已经失效，Arch Linux 有社区维护的组件与包含 Widevine 组件的版本。

而其他系统仅推荐从文件路径中手动提取。

## 功能配置

这是我开启一些实验功能，可以参考一下。

| 实验功能（原生自带） | 选项 | 作用 |
| - | - | - |
| chrome://flags/#enable-parallel-downloading | Enabled | 开启多线程下载 |
| chrome://flags/#enable-tab-audio-muting | Enabled | :tip[控制单个标签页静音]{tip="可以参考 Edge 和 Firefox 的标签页"} |
| :tip[~~chrome://flags/#side-by-side~~]{tip="已被移出实验功能"} | Enabled - hide mini toolbar on active view | 左右分屏 |
| chrome://flags/#vertical-tabs | Enabled | 垂直标签页 |

### 增强功能

Ungoogled Chromium 不依赖于 Google 的网络服务。它在继承使用体验的同时，也增加了一些自己的新功能，详见 [Feature Overview](https://github.com/ungoogled-software/ungoogled-chromium#feature-overview) 的说明内容。

| 实验功能（ungoogled-chromium flag） | 选项 | 作用 |
| - | - | - |
| chrome://flags/#extension-mime-request-handling | Always prompt for install | 始终提示安装扩展 |
| chrome://flags/#show-avatar-button | Incognito and Guest | 仅打开访客和无痕式窗口时显示头像 |
| chrome://flags/#scroll-tabs | Always | 使用滚轮切换标签页 |
| chrome://flags/#keep-old-history | Enabled | 保留三个月内的历史记录 |

::alert
安装扩展还需要搭配 [Chromium Web Store](https://github.com/NeverDecaf/chromium-web-store/releases) 使用。
::

### 新标签页

| 实验功能（ungoogled-chromium flag） | 选项 | 作用 |
| - | - | - |
| chrome://flags/#custom-ntp | chrome://new-tab-page | 内容同下方介绍 |

Ungoogled Chromium 的默认标签页仅显示快捷方式，修改新标签地址就可以用回原来的搜索页啦。

### 书签同步

~~使用 [BookmarkHub](#) 将你的书签上传至 GitHub Gist，随时同步数据。~~

建议使用 [floccus](https://github.com/floccusaddon/floccus)。

::folding
#title
一些扩展程序
#default
这部分的内容和本文所写的关联并不大，但还是值得推荐一下。

| 扩展程序 | 作用 |
| - | - |
| [Atomic CSS Devtools](https://github.com/astahmer/atomic-css-devtools) | 开发专用 |
| [BewlyCat](https://github.com/keleus/BewlyCat) | b 站优化 |
| [Refined GitHub](https://github.com/refined-github/refined-github) | GitHub 优化 |
| [uBlock Origin](https://github.com/gorhill/uBlock) | 去广告 |
| [Vue force dev](https://github.com/hzmming/vue-force-dev) | 开发专用 |
| [Vue.js devtools](https://github.com/vuejs/devtools) | 开发专用 |
| [Wappalyzer](https://github.com/wappalyzer) | 查看网站架构 |
| [小电视空降助手](https://github.com/hanydd/BilibiliSponsorBlock) | b 站优化 |
| [脚本猫](https://github.com/scriptscat/scriptcat) | 油猴脚本 |
| [陪读蛙](https://github.com/mengxi-ream/read-frog) | 翻译 |
::


## 后续

根据 IT 之家的报道，似乎支持关闭了。
