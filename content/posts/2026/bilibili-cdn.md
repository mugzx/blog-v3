---
title: b站视频CDN汇总
description: 在家中闲来无事，从简单易懂的角度写写b站目前的视频CDN分类，并将其分为了大厂，自建，以及点对点三类。
date: 2026-04-14 19:50:34
updated: 2026-04-14 19:50:34
categories: [分享]
tags: [哔哩哔哩, CDN]
references:
  - title: 写了个本版块老哥们应该会喜欢玩的脚本：自定义 B 站的 CDN（CCB） - V2EX
    link: https://www.v2ex.com/t/1112897
  - title: 【Bilibili】关于屏蔽 PCDN 的指引 - 开发调优 - LINUX DO
    link: https://linux.do/t/topic/642419
  - title: B站卡顿优化-PC端禁用PCDN – 栋dong的个人站点
    link: https://itdong.me/bilibili_pcdn
---

## 大厂CDN

目前b站在国内主要使用了阿里，腾讯，华为等大厂的CDN，国内似乎还有百度， :tip[天翼云（存疑）]{tip="域名为upos-sz-mirrorzos.bilivideo.com"} 的CDN，主要特征是都有开头的 `upos` 域名格式：

- 其中带 ov 字样的为海外节点，带 bstar 字样的则为哔哩哔哩东南亚区域服务节点。

具有此特征的CDN也有直接从对象存储中读取的，所以有两种类型：

- 域名符合正则表达式 `^upos-(sz|hz|bstar)-mirror([0-9,a-z]+)\.(bilivideo\.com|akamaized\.net)$` 的第一种。
- 符合正则表达式 `upos-sz-estg([0-9,a-z]*).bilivideo.com` 的第二种。

不过更具体的判断应该要结合CDN的视频参数以及相应的域名命名才更加准确。

## 自建CDN

b站在国内自建的CDN特征可以大致理解为省份+城市的简称，再加上运营商以及编号。更具体的信息可参考：

::link-card
---
icon: https://rec.danmuji.org/favicon.svg
title: CDN 信息 | 录播姬
link: https://rec.danmuji.org/dev/cdn-info
---
::

## PCDN

最被人诟病，质量差，为b站省流。建议使用相应的脚本或第三方客户端规避这种视频 CDN 的使用。

```
||*pcdn*.biliapi.net^$important
||mcdn.bilivideo.cn^$important
||mcdn.bilivideo.com^$important
||szbdyd.com^$important
||cn-*.bilivideo.com^$important
||edge.mountaintoys.cn^$important
```

如果你有安装 uBlock Origin 这类去广告扩展，可以使用以上规则屏蔽。

## 总结

简单来说，在CDN的选择中，应只考虑b站自建与大厂的 CDN，其它的都不推荐，PCDN 更是能避就避。
