---
title: 我的 mihomo 配置与理解
description: 记录我对 mihomo 配置的理解与总结，解释 DNS、hosts、规则集、节点线路等每一项为什么要这样写。
date: 2026-08-27 18:20:47
updated: 2026-09-06 03:54:32
categories: [随笔]
tags: [mihomo, 配置, 分流]
references:
  - title: Clash 中 GeoSite 分流的正确使用方式
    link: https://www.aloxaf.com/2025/04/how_to_use_geosite/
  - title: 终于解决Google play商店下载等待中的问题 - 开发调优 - LINUX DO
    link: https://linux.do/t/topic/176332
  - title: 生活在字典树上 —— 存储和匹配海量的域名和 IP 地址 | Sukka's Blog
    link: https://blog.skk.moe/post/how-to-store-way-too-many-domains-and-ips-101/
  - title: Clash.Meta DNS 配置指南 - AA博客
    link: https://blog.akise.app/posts/clash-dns-configure/
  - title: Telegram View @appshub_channel
    link: https://t.me/appshub_channel
---

::alert
#default
以下规则集都以 [MetaCubeX/meta-rules-dat](https://github.com/MetaCubeX/meta-rules-dat/) 官方的规则集仓库为例。
::

~~我的记忆力已经有点不太好了，这篇文章主要是为了写为什么这样做。~~ 本文我经常写一会想一会，生怕 :tip[漏了内容]{tip="后面可能还要修修补补💦"}，所以写得有点长。但基本是我对配置的理解和他人的总结，所讲的内容不是配置的全部，完整的可以前往 [MyClash/Config/myclash.yaml](https://github.com/Mugzx/MyClash/blob/main/Config/myclash.yaml) 查看。

## DNS

与 DNS 分流有关的主要是最后 5 行，以及 DNS 解析的流程，搭配 [解析流程 - 虚空终端 Docs](https://wiki.metacubex.one/config/dns/diagram/#_3) 图文会更清晰一些。

```yaml
chinaDNS: &chinaDNS ['https://dns.alidns.com/dns-query', 'https://doh.pub/dns-query']
foreignDNS: &foreignDNS ['https://dns.cloudflare.com/dns-query#默认代理', 'https://dns.google/dns-query#默认代理']

dns:
  enable: true
  cache-algorithm: arc
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  fake-ip-range6: fdfe:dcba:9876::1/64
  fake-ip-filter: ['rule-set:private', 'rule-set:fakeip_filter', 'rule-set:geolocation-cn']
  use-hosts: true
  use-system-hosts: true
  nameserver: *foreignDNS
  nameserver-policy:
    'rule-set:cn': *chinaDNS
  proxy-server-nameserver: *chinaDNS
  direct-nameserver: *chinaDNS
```

- `default-nameserver` 是「默认解析 DNS 的 DNS」解析服务器，不填也会有内核进行处理。
- `nameserver` 是「默认的 DNS」解析服务器，在这里需要配置兜底的国外 DNS。
- `nameserver-policy` 是「指定默认的 DNS」解析服务器，在这里配置「国内域名」规则集使用国内 DNS。
- `proxy-server-nameserver` 是「代理节点的 DNS」解析服务器，不填会遵循 `nameserver` 的设置，但这样会使用国外 DNS，遇到「先有鸡还是先有蛋」问题，所以需要与 `nameserver-policy` 一样使用国内 DNS。
- `direct-nameserver` 是「直连的 DNS」解析服务器，如果按照上文一样的配置，即使去除最终的解析结果也不会有 :tip[太大变化]{tip="对目标 IP 规则来说，反而可以说减少一次 DNS 解析"}。
  - 但从解析流程图上看，其实增加了域名规则的解析过程，所以还是更推荐填写。

## hosts

### 域名映射

上文没有配置 `default-nameserver`，就是因为已经在 hosts 字段里做了防污染——把 DNS 服务器域名直接映射到对应 IP。

```yaml
hosts:
  'dns.alidns.com': ['223.5.5.5', '223.6.6.6']
  'doh.pub': ['1.12.12.12', '120.53.53.53']
  'dns.cloudflare.com': ['1.1.1.1', '1.0.0.1']
  'dns.google': ['8.8.8.8', '8.8.4.4']
```

不过 :tip[加上]{tip="我有强迫症不想看到一行 IP 在那"} 这字段也是可以的。

### Google Play 商店无法下载

如果不想折腾路由规则，用 hosts 就是最简单的方式。

```yaml
hosts:
  'services.googleapis.cn': ['services.googleapis.com']
```

成因是该域名被解析为国内 IP，只要让 `services.googleapis.cn` 走代理就没有问题。

### B 站 PCDN

屏蔽 B 站的视频和直播 PCDN，没什么好说的。

```yaml
hosts:
  '+.mcdn.bilivideo.com': ['0.0.0.0']
  '+.mcdn.bilivideo.cn': ['0.0.0.0']
  '+.edge.mountaintoys.cn': ['0.0.0.0']
  '+.h2.smtcdns.net': ['0.0.0.0']
```

后面两条来自 [the1812/Bilibili-Evolved#5438](https://github.com/the1812/Bilibili-Evolved/discussions/5438) 与 [MBGA#272113](https://greasyfork.org/zh-CN/scripts/415714-make-bilibili-great-again/discussions/272113)。

## 规则与规则集

::alert{type="warning"}
#default
GeoData 臃肿的体积对软、硬路由这类设备十分甚至九分的不友好，更推荐用 `RULE-SET` 按需添加。
::

规则大致可以分为**三类两种**：三类指的是 [规则集合内容 - 虚空终端 Docs](https://wiki.metacubex.one/config/rule-providers/content/)，两种指的是域名规则和目标 IP 规则。

### 关于排序

更精细化的分流需要把**子规则排在父规则之前**。

*「规则将按照从上到下的顺序匹配，列表顶部的规则优先级高于其底下的规则。」*

下文的 `cn_ip` 放在 `MATCH` 规则之前，可以避免多余的 DNS 解析。

### 屏蔽国外 QUIC，但排除国内

作用写在小标题上了。这条规则略有争议，主要是它并没有完整地放行国内流量。

```yaml
rules:
  - AND,((NETWORK,UDP),(DST-PORT,443),(NOT,((OR,((RULE-SET,geolocation-cn),(RULE-SET,cn_ip,no-resolve)))))),REJECT
```

但多数时候，规则所放行的就足够使用了。

### no-resolve

*「如在更早的匹配中触发了 dns 解析，则依旧会匹配到添加了 `no-resolve` 选项的 `目标IP` 类规则。」*

另外，我参考了 [路由规则 - 虚空终端 Docs](https://wiki.metacubex.one/config/rules/#no-resolve) 对 `no-resolve` 的描述：

- 一旦触发了 DNS 解析，之后的规则中，域名都会先被解析成 IP，再参与后续的域名匹配。

- 对于 DNS 记录被修改、或被污染为 `0.0.0.0` 或 `127.0.0.1` 的域名，一旦触发解析，就可能让它走直连。

- 目标 IP 规则除了直接匹配 IP 段，也会尝试把域名解析成 IP 再匹配，所以要用 `no-resolve` 阻止它触发解析。

总之可以这样理解：如果在 `no-resolve` 之前已经触发了 DNS 解析，那么 `no-resolve` 就白写了——解析结果已经产生，会影响后续规则的命中。

### geolocation

`geolocation-!cn` 里包含 `gfw`，`geolocation-cn` 比「国内域名」规则集更准确，后者比较宽泛，更适合用来做 DNS 分流而不是路由分流。

```yaml
rules:
  - RULE-SET,geolocation-!cn,默认代理
  - RULE-SET,geolocation-cn,本地直连
  - RULE-SET,cn_ip,本地直连
  - match,漏网之鱼
```

~~如果有和 `geolocation-cn` 一样定位但更全面的规则，`cn_ip` 加上 `no-resolve` 也不是不行。~~

### @ 和 !

这套命名太容易让人迷惑了，上游传下来后还很少有说明。

- `-cn` 属于中国大陆。
- `-!cn` 不属于中国大陆。
- `-@cn` 一般在中国大陆有接入点。
- `-@!cn` 一般在中国大陆没有接入点。
- `@ads` 被用于展示广告。

具体可见 [v2fly/domain-list-community#91](https://github.com/v2fly/domain-list-community/issues/91) 与 [v2fly/domain-list-community#notice](https://github.com/v2fly/domain-list-community#notice)。

`-cn@cn`、`-cn@!cn`、`-!cn@cn`、`-!cn@!cn` 四条我觉得怎么理解都有歧义，大致结合上面的基础标签看就好。

- `-cn@!cn` 这类规则在 [v2fly/domain-list-community#390](https://github.com/v2fly/domain-list-community/issues/390#issuecomment-3649035102) 已移除。
- `-!cn@cn` 在某些规则集中这个可能等同于上文的 `@cn`。

`cn_ip` 会根据 `nameserver-policy` 的 `'rule-set:cn': *chinaDNS` 解析国内域名规则集，这里不能用 `no-resolve`——前面的铺垫都是为了最后的兜底，如果这里不做 DNS 解析，就变成纯目标 IP 匹配了。

## 节点线路分配

::alert
#default
这里默认你是直接使用自己写的配置，并且在使用多个节点提供商。
::

中转和专线的代理提供商分配代理节点线路的方式大致有两种：私有 DNS 和 hosts 字段映射，也有同时使用两种的。它们用这两种方式来决定节点走哪条线路；如果使用公共 DNS，可能被分配到较差的线路，甚至节点不可用。

### 私有 DNS

主要是用 `nameserver-policy` 字段来分配线路。

```yaml
dns:
  enable: true
  use-hosts: true
  nameserver:
    - 223.5.5.5
    - 114.114.144.114
    - 1.1.1.1
    - 8.8.8.8
  nameserver-policy:
    - # 这里会是私有 DNS
```

在自己的配置里，把 `nameserver-policy` 改写成 `proxy-server-nameserver-policy` 即可解决；一般这种写法不会出现 :tip[`proxy-server-nameserver`]{tip="如果只有这个字段出现，同样指定代理节点的 DNS 即可"}。

### hosts 字段映射

::alert
我只遇到过私有 DNS 的配置，对 hosts 字段映射的处理没什么把握，不一定可用。
::

`proxy-server-nameserver` 一般搭配 `udp://127.0.0.1:1053` 以及 hosts 字段出现。

```yaml
dns:
  enable: true
  listen: 127.0.0.1:1053
  use-hosts: true
  nameserver:
    - 119.29.29.29
    - 223.5.5.5
    - 1.1.1.1
  proxy-server-nameserver:
    - udp://127.0.0.1:1053
```

指定节点域名用 `udp://127.0.0.1:1053` 解析。

```yaml
proxy-server-nameserver-policy:
  proxy1.test.com:
    - udp://127.0.0.1:1053
  proxy2.test.com:
    - udp://127.0.0.1:1053
  proxy3.test.com:
    - udp://127.0.0.1:1053
```

操作大概类似这样，再 :key{code="C" ctrl} 对应的 hosts 映射到自己的配置里。

::folding
#title
用 `override-expr` 处理
#default
不过在 mihomo 中可以使用 `proxy-providers` 的 `override.override-expr` 更优雅地解决。

```yaml
proxy-providers:
  provider1:
    type: http
    url: "http://test.com"
    path: ./proxy_providers/provider1.yaml
    override:
      override-expr:
          - '(select(.server == "A") | .server) = "B"'
```

A 是 `proxies` 里的 `server` 字段，B 应该填 IP。
::

## 健康检查测试地址

选择标准很简单：任播（Anycast），国内测速不超时、延迟别太高即可。

代理组我用 Google 的 `connectivitycheck.gstatic.com`，而直连组则换成了华为的 `connectivitycheck.platform.hicloud.com`。

## 联机

我玩的联机游戏不多，但遇到的联机方式基本都是走 `IP:Port` 加高位端口的 UDP 协议，也有用域名连接的《Minecraft》。

《泰坦陨落2》用 AWS，《饥荒》用 Beeline Home，《星露谷物语》用 Valve 等服务器；在覆盖面上，GeoIP 不如 ASN 覆盖得全，它只覆盖主流、常见的 IP 段，一些小众 IP 段就无法用 GeoIP 控制分流，此时用 ASN 是更合适的选择。

## 一些过时配置

`fallback`、`redir-host`、`sniffer` 这三个配置我了解不多，只知道它们大多存在一些问题或已经过时，现在不再推荐使用。
