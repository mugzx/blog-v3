---
title: Cloudflare R2 对象存储
description: 关于 Cloudflare R2 的开通，以及需要进行的一些配置和说明。
date: 2025-08-04 13:05:10
updated: 2025-08-27 00:52:29
categories: [分享]
tags: [Cloudflare, R2, 对象存储]
---

::alert{type="warning"}
:emoji-clock{datetime="2025-08-04 13:05:10"} 本文具有时效性，开通的方法可能会失效。
::

::chat

{LineXic}

新搞了个图床要不要瞅瞅😗

顺便测测速度😁

::

## 不必绑卡

我好奇 LineXic 是怎么不用绑卡从而开通。

::chat
{:2025-08-04 00:26}

{.Mugzx}

那 Cloudflare R2 是怎么解决的，印象中这个需要用到银行卡

{LineXic}

引用：那 Cloudflare R2 是怎么解决的，印象中这个需要用到银行卡\
你可算问到这个啦（窃喜）

等会给你看一篇文章

[https://blog.yaria.top/posts/730cf317](https://blog.yaria.top/posts/730cf317)

［图片］

{:省略了一些聊天记录...}

{.Mugzx}

这下舒服了😙

{LineXic}

有了这个 Cloudflare 的可玩性会大很多

::

见之大[喜]{.text-zoom}。一试，果真如此！

## 媒体处理

### 转换图像

```
https://<ZONE>/cdn-cgi/image/<OPTIONS>/<SOURCE-IMAGE>
```

根据 [官方文档](https://developers.cloudflare.com/images/transform-images/transform-via-url/#options) 的描述，将 `<ZONE>` 修改为你的域名，`<OPTIONS>` 修改为处理参数，`<SOURCE-IMAGE>` 修改为图片的路径即可启用 Cloudflare Images。

## 访问配置

建议除了公共使用的图片外，都去配置防盗链，可以避免盗用以及减少不必要的流量消耗，这是我的一些配置：

### CORS 策略

仅允许 `https://blog.mugzx.top` 发送 GET 请求。

```
[
  {
    "AllowedOrigins": [
      "https://blog.mugzx.top"
    ],
    "AllowedMethods": [
      "GET"
    ]
  }
]
```

在你的**存储桶**中创建。

### Referer 配置

只有从 `blog.mugzx.top` 发起的请求才能访问 `r2.mugzx.top` 的资源（允许空 Referer ），其他域名的请求则会被拒绝。

```
(http.host eq "r2.mugzx.top" and not http.referer contains "blog.mugzx.top" and http.referer ne "")
```

- 然后采取措施：阻止

在**你的域名**→**安全性**→**安全规则**→**自定义规则**中创建。

### 速率限制

```
(http.request.uri.path contains "/")
```

- 当速率在几秒内超过多少次请求
  - 最低不要超过100次请求，120次请求较为合适。
  - 可根据实际情况再进行修改。
- 然后采取措施：阻止
- 持续时间：10秒

在**你的域名**→**安全性**→**安全规则**→**速率限制规则**中创建。

### 图片缓存

缓存配置在**你的域名**→**规则**→**页面规则**中进行创建。

- URL：`https://blog.mugzx.top/*`​， 必须使用 https 协议，根据使用情况后接`*`通配符。
- 浏览器缓存 TTL：1年
- 边缘缓存 TTL：1个月
- 缓存级别：缓存所有内容
- 源服务器缓存控制：添加但不开启

经常更换图片可以设置为 7 至 14 天内，不经常更换可以设置为 1 年，缓存配置会影响文件更新，当桶内资源发生变化但链接内容**没有变化**时，可以手动清除缓存。

::alert
#title
关于 Edgeone 如何配置 R2 存储桶
#default
- [对象存储类源站配置实践](https://cloud.tencent.com/document/product/1552/122800)
- [CORS 跨域响应配置](https://cloud.tencent.com/document/product/1552/120718)
- [EdgeOne 防盗链实践教程](https://cloud.tencent.com/document/product/1552/108736)
- [自定义速率限制规则](https://cloud.tencent.com/document/product/1552/93130)
- [缓存配置](https://cloud.tencent.com/document/product/1552/94478)
::
