# 地球驿站

![框架](https://img.shields.io/badge/框架-Nuxt-00DC82?logo=Nuxt.js)
![CMS](https://img.shields.io/badge/CMS-Nuxt%20Content-00DC82?logo=Nuxt.js)
![部署平台](https://img.shields.io/badge/部署平台-Vercel-000000?logo=Vercel)
![访问统计](https://img.shields.io/badge/访问统计-Umami-000000?logo=Umami)
![代码风格](https://img.shields.io/badge/代码风格-ESLint-4B32C3?logo=ESLint)
![代码风格](https://img.shields.io/badge/代码风格-Stylelint-263238?logo=Stylelint)

博客于 2025 年 1 月 24 日上线。

## 使用本主题的博客

- [纸鹿摸鱼处 @L33Z22L11](https://blog.zhilu.cyou/) · [开发经历](https://blog.zhilu.cyou/2024/blog-using-nuxt)
- [希乐博客 @Xlenco](https://blog.xlenco.top)
- [SteinsNote @Labmem-00](https://blog.labmem.chat/) · [迁移经历](https://blog.labmem.chat/2024/beforeeverything)
- [月空人 @Whbbit1999](https://whbbit.cn/) · [迁移评价](https://whbbit.cn/2025/why-migrate-to-nuxt)
- [地球驿站 @mugzx](https://blog.mugzx.top/)

## 目录结构

```sh
.
├── app # 前端
│   ├── assets # 资源文件
│   ├── components # 组件
│   │   ├── content # 内容组件
│   │   ├── partial # 模块组件
│   │   ├── widget # 小组件
│   │   ├── zhilu # 个人 VI 组件
│   │   └── ... # 布局组件
│   ├── composables # 组合式函数
│   ├── pages # 页面
│   │   ├── [...slug].vue # 正文、404
│   │   ├── page.vue # 首页
│   │   ├── page/[[id]].vue # 首页动态路由
│   │   ├── archive.vue # 归档
│   │   ├── link.vue # 友链
│   │   └── preview.vue # 预览的文章
│   ├── plugins # Nuxt / Vue 插件
│   ├── stores # Pinia 状态管理
│   ├── types # 类型定义
│   ├── utils # 工具函数
│   ├── app.config.ts # 前端配置
│   ├── app.vue # 布局
│   └── error.vue # 错误页
├── content # 文章
│   ├── posts # 文章
│   ├── previews # 预览文章，可被站内搜索
│   ├── link.md # 友链（正文）
│   └── theme.md # 主题介绍
├── patches # npm 包补丁
├── public # 静态资源
│   └── fonts # 字体
├── server # 服务端
│   ├── api # 接口
│   │   └── stats.get.ts # 博客静态统计
│   ├── plugins # Nitro 插件
│   │   ├── anti-mirror.ts # 恶意反代跳转
│   │   └── fix-post.ts # 修复文章时区/链接
│   └── routes # 路由
│       └── atom.xml.get.ts # Atom 订阅源
├── blog.config.ts # 博客公共配置
├── nuxt.config.ts # Nuxt 配置
├── redirects.ts # 旧站点重定向配置
└── vercel.json # Vercel 配置
```

## 许可证

[MIT](LICENSE)

## 部署记录

博客部署从[第12次](https://github.com/mugzx/blog-v3/deployments)开始正式算入更新日志
