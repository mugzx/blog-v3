---
title: 从 VSCode 到 VSCodium
description: 一款完全开源的代码编辑器替代方案，轻松从 VSCode 迁移到 VSCodium，享受去遥测的纯净开发体验。
date: 2025-12-07 15:37:12
updated: 2025-12-07 18:32:54
categories: [分享]
tags: [vscode, vscodium, 开源]
references:
  - title: 如何從 VSCode 搬遷到 VSCodium
    link: https://xn--8z3a.net/%E5%A6%82%E4%BD%95%E5%BE%9E-vscode-%E6%90%AC%E9%81%B7%E5%88%B0-vscodium/
---

~~不知道微软出于什么原因要收集一个代码编辑器的数据。~~

## 认识

VSCodium 与 VSCode 相比去除了遥测功能，并使用 OpenVSX 这个开源的扩展插件市场。

## 迁移

数据是通用的，如果需要数据同步安装 [Syncing](https://open-vsx.org/extension/nonoroazoro/syncing) 扩展即可。

### 注册表

- 添加右键菜单
  :copy{prompt="PS>" code='reg import "C:\Users\Mugzx\scoop\apps\vscodium\current\install-context.reg"'}

- 设置文件默认打开的应用
  :copy{prompt="PS>" code='reg import "C:\Users\Mugzx\scoop\apps\vscodium\current\install-associations.reg"'}

注意要修改为你自己的安装路径。

## 市场

如果在 OpenVSX 这个市场里面没有想要的扩展，替换为官方的市场即可。

```json [C:\Users\Mugzx\scoop\apps\vscodium\current\resources\app\product.json]
{
  "extensionsGallery": {
    "serviceUrl": "https://marketplace.visualstudio.com/_apis/public/gallery",
    "itemUrl": "https://marketplace.visualstudio.com/items",
    "latestUrlTemplate": "https://www.vscode-unpkg.net/_gallery/{publisher}/{name}/latest",
    "controlUrl": "https://main.vscode-cdn.net/extensions/marketplace.json"
  }
}
```

VSCode还有更完整的`product.json`配置文件，可以选择性的添加对应字段。

```json [%LOCALAPPDATA%\Programs\Microsoft VS Code\resources\app\product.json]
{
  "extensionsGallery": {
    "serviceUrl": "https://marketplace.visualstudio.com/_apis/public/gallery",
    "itemUrl": "https://marketplace.visualstudio.com/items",
    "nlsBaseUrl": "https://www.vscode-unpkg.net/_lp/",
    "serviceUrl": "https://marketplace.visualstudio.com/_apis/public/gallery",
    "itemUrl": "https://marketplace.visualstudio.com/items",
    "publisherUrl": "https://marketplace.visualstudio.com/publishers",
    "resourceUrlTemplate": "https://{publisher}.vscode-unpkg.net/{publisher}/{name}/{version}/{path}",
    "extensionUrlTemplate": "https://www.vscode-unpkg.net/_gallery/{publisher}/{name}/latest",
    "controlUrl": "https://main.vscode-cdn.net/extensions/marketplace.json",
    "mcpUrl": "https://main.vscode-cdn.net/mcp/servers.json"
  }
}
```

## 体验

除了数据同步我觉得麻烦，其它都还好，反正喜欢开源那就用呗😋。
