---
title: 对“机场”面板的不完整调查
description: 如题所示这其实是算一篇不完整的文章，写得有点累了就不想再写。可能后继有人，也可能后继无人来续写？总之，之后就看心情或者有能力再写了。
date: 2026-07-23 16:29:01
updated: 2026-08-01 00:06:21
categories: [分享]
tags: [研究, 调查, 识别]
references:
  - title: Understanding the "Airport" Censorship Circumvention Ecosystem in China
    link: https://arxiv.org/abs/2606.18427
---

## 事出有因的开头

自己也是挺闲的，一开始是为了解决某云容易设备过多的问题（恼），打算逆向去扒网页研究研究，但一开始都没法扒。不过鹿佬说的好：

*「从来没有一种方法能真正的禁用开发者工具，反而只会恶心到用户和开发者。」*

除去去远程调试也能用 [Anti Anti Debug](https://github.com/Andrews54757/Anti-Anti-Debug/releases) 解决。

稍微参考了同类网站，最后确定用的是 [codeman857/EZ-THEME-R](https://github.com/codeman857/EZ-THEME-R) 前端主题，另外还有一些配置也被打包进来，可以明文查看。`PANEL_TYPE` 字段写的是 `Xiao-V2board`，又或者是商品简介上的**自研高性能后端**。

逆向调查到这里就应该结束，很无奈我最终也不知道怎么解决，大概这个机场主是故意不开IP去重的。写到篇幅多少有点短，我决定把这个话题延伸下去。

## 主题

找起来还是很轻松滴，一般绕过反调试后重新加载网页，优先级较高的几个 `.js` 文件中就有明文配置，有添加混淆的话还需要解密下。

### 识别

像某分一样风格的机场，是默认的v2board主题。特征为资源存储在 `./theme/default/assets/` 路径中，但这个特征不适用于所有主题。比如上述的 [codeman857/EZ-THEME-R](https://github.com/codeman857/EZ-THEME-R) 前端主题就是一个例子，资源存储在 `./static/` 路径下。

某山使用的是 [vlesstop/v2board-theme-buddy](https://github.com/vlesstop/v2board-theme-buddy) 前端主题。在 `./theme/rocket/config.js` 可以找到闭源构建地址，目前已经停更。

L站内有名的某梦，同样的步骤发现可能是 [MALA主题高级版](https://yuzaimala.store/archives/a96d87be-be48-4877-aa6c-1edb734a27f9)，是一个需要付费的主题。

::quote{icon="tabler:files"}
（待补充...）
::

## 面板

根据 arXiv 上的相关论文统计，95%的机场所使用的面板为 V2board 和 SSPanel 后端。如果有漏洞的话还是比较危险的，比如 [Xboard / V2Board: Magic Link Token Leak - Unauthenticated Account Takeover](https://chocapikk.com/posts/2026/xboard-v2board-account-takeover/)。

以下是开源地址，这些面板绝大多数是由 PHP 开发而来的，我只梳理了大概的前后时间关系，写得也很大概，并没有太深入研究。

| 名字 | 简介 | 备注 |
|------|------|------|
| [V2board](https://github.com/v2board/v2board) | 基于 Laravel + PHP | 原项目，停更中 |
| [Xboard](https://github.com/cedar2025/Xboard) | 基于 V2board 二次开发 | - |
| [Xiao-V2board](https://github.com/wyx2685/v2board) | 一个二改分支 | - |
| [V3board](https://github.com/codeman857/v3board) | 基于 Xiao-V2board 二次开发 | - |

| 名字 | 简介 | 备注 |
|------|------|------|
| [SSPanel](https://github.com/orvice/ss-panel) | 基于 LightFish + Vue | 原项目，停更中 |
| [SSPanel-UIM](https://github.com/Anankke/SSPanel-Uim) | 基于 PHP + Bootstrap 5 | - |
| [SSPanel-Metron](https://github.com/BobCoderS9/SSPanel-Metron) | - | ~~（推测为 bob）~~ |
| [SSpanel-django](https://github.com/ehco1996/django-sspanel) | 基于 Diango 开发 | 已归档 |
| [PPanel](https://github.com/perfect-panel) | 前端 TS，后端 Go | - |

<!-- ::folding
#title
其它
#default
暂不明确：

| 名字 | 简介 | 备注 |
|------|------|------|
| aurora | 未找到明确公开链接 | 信息不明 |
| bob | 未找到公开链接 | 信息不明 |
| vendor | 未找到明确公开链接 | 信息不明 |
| zeropanel | 未找到明确公开链接 | 信息不明 |
:: -->

因为面板也是我之前从未了解的事物，写出来后其实自己的底气也不是很足。

## 客户端

机场的闭源商业客户端也有些发展，除了熟知的那些开源客户端外。目前机场也有以 FlClash 为核心的闭源客户端（暂时没找到信息源头），这部分客户端目前是可以 [抓取订阅解密](https://linux.do/t/topic/2456497) 的。

还有 [Atlas App](https://t.me/AtlasSuperClient/2)，以及 [Nextin](https://apps.apple.com/us/app/nextin-%E6%98%9F%E6%8B%93/id6754002454?l=zh-Hans-CN) 等闭源商业客户端，暂时不清楚是否同上文一样解密。

## 总结

后半段的内容，有另外的原因是没有找到有机场面板服务端汇总的文章（可能已经有了但是没找到），思考自己也写一个行不行？

~~有一说一，开头的内容其实是我写博文以来思路最好的一次（）~~
