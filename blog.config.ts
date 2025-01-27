import type { BundledLanguage, BundledTheme } from 'shiki'
import type { FeedEntry } from '~/types/feed'
import { zhCN } from 'date-fns/locale'

// 存储 nuxt.config 和 app.config 共用的配置
const blogConfig = {
    title: '地球驿站',
    subtitle: '希望,寄托在你们身上。',
    description: '木姜丝的个人博客，目前分享马哲与生活。这个博客记录了他在生活和学习中的点滴经历。网站界面开源自纸鹿,简洁美观是该开源项目的特点之一，且为读者提供了卓越的阅读体验。',
    author: {
        name: '木姜丝_Mugzx',
        avatar: 'https://q1.qlogo.cn/g?b=qq&nk=2111829348&src_uin=www.jlwz.cn&s=0',
        email: 'lunar@mugzx.top',
        homepage: 'https://home.mugzx.top',
    },
    copyright: {
        abbr: 'CC BY-NC-SA 4.0',
        name: '署名-非商业性使用-相同方式共享 4.0 国际',
        url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans',
    },
    favicon: 'https://www.gstatic.com/android/keyboard/emojikitchen/20201001/u1f30d/u1f30d_u2601-ufe0f.png',
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
        // '7.isyangs.cn',
    ],

    robotsNotIndex: ['/preview', '/previews/*'],

    scripts: [
        { 'src': 'https://zhi.zhilu.cyou/zhi.js', 'data-website-id': 'a1997c81-a42b-46f6-8d1d-8fbd67a8ef41', 'defer': true },
        { 'src': 'https://static.cloudflareinsights.com/beacon.min.js', 'data-cf-beacon': '{"token": "97a4fe32ed8240ac8284e9bffaf03962"}', 'defer': true },
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
