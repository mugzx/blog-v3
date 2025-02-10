import type { BundledLanguage, BundledTheme } from 'shiki'
import type { FeedEntry } from '~/types/feed'
import { zhCN } from 'date-fns/locale'

// 存储 nuxt.config 和 app.config 共用的配置
const blogConfig = {
    title: '地球驿站',
    subtitle: '希望,寄托在你们身上。',
    description: '这里是 Mugzx 的个人博客,名为地球驿站,平时会记录我对日常生活的一些观点看法,偶尔也会回归正业写一点技术型文章💦,欢迎大家多多前来访问!',
    author: {
        name: 'Mugzx',
        avatar: 'https://q1.qlogo.cn/g?b=qq&nk=2111829348&src_uin=www.jlwz.cn&s=0',
        email: 'lunar@mugzx.top',
        homepage: 'https://mugzx.top',
    },
    copyright: {
        abbr: 'CC BY-NC-SA 4.0',
        name: '署名-非商业性使用-相同方式共享 4.0 国际',
        url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans',
    },
    favicon: 'https://mugzx.top/_vercel/image?url=%2Ficon.png&w=1536&q=100',
    language: 'zh-CN',
    qqGroup: '938973313',
    timeEstablished: '2025-01-24',
    timezone: 'Asia/Shanghai',
    url: 'https://blog.mugzx.top',

    feed: {
        limit: 50,
    },

    hideContentPrefixes: ['/posts'],

    imageDomains: [
        // 自动启用本域名的 Nuxt Image
        // 'home.mugzx.top',
        // 'mugzx.s3.bitiful.net',
    ],

    robotsNotIndex: ['/preview', '/previews/*'],

    scripts: [
        // umami 统计服务
        { 'src': 'https://u.linexic.top/script.js', 'data-website-id': '9e529a32-b09e-430f-82eb-9e8536f5d7de', 'defer': true },
        // Cloudflare Insights 统计服务
        { 'src': 'https://static.cloudflareinsights.com/beacon.min.js', 'data-cf-beacon': '{"token": "d5877d013fc345b2879dbd36b2d3f1db"}', 'defer': true },
    ],

    // 用于 Shiki、Plain Shiki 引入代码高亮
    // 同时用于显示代码块语言对应的 Iconify Catppuccin 图标
    shiki: {
        bundledLangs: <BundledLanguage[]>['bat', 'log', 'sh', 'powershell'],
        langs: <BundledLanguage[]>['bat', 'c', 'cpp', 'css', 'diff', 'html', 'ini', 'java', 'js', 'json', 'log', 'makefile', 'matlab', 'md', 'mdc', 'powershell', 'python', 'sh', 'sql', 'ssh-config', 'toml', 'ts', 'tsx', 'vb', 'vue', 'xml', 'yaml'],
        themes: <BundledTheme[]>['catppuccin-latte', 'one-dark-pro'],
        defaultTheme: <BundledTheme>'catppuccin-latte',
        darkTheme: <BundledTheme>'one-dark-pro',
    },

    twikoo: {
        js: 'https://gcore.jsdelivr.net/npm/twikoo@1.6.40/dist/twikoo.all.min.js',
        envId: 'https://twikoo.mugzx.top/',
        preload: 'https://twikoo.mugzx.top/',
    },
}

export const dateLocale = zhCN

// 用于生成 OPML 和友链页面配置
export const myFeed = <FeedEntry>{
    author: blogConfig.author.name,
    sitenick: '驿站',
    title: blogConfig.title,
    desc: blogConfig.subtitle || blogConfig.description,
    link: blogConfig.url,
    feed: new URL('/atom.xml', blogConfig.url).toString(),
    icon: blogConfig.favicon,
    avatar: blogConfig.author.avatar,
    archs: ['Nuxt', 'Vercel'],
    date: blogConfig.timeEstablished,
    comment: '记得常来呀',
}

export default blogConfig
