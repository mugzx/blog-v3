import type { ArticleOrderType } from './types/article'
import type { Nav, NavItem } from '~/types/nav'
import blogConfig from '~~/blog.config'

export default defineAppConfig({
    // 将 blog.config.ts 中的配置项复制到 appConfig
    ...blogConfig,

    article: {
        categories: <{ [key: string]: { icon: string, color?: string } }>{
            观点分享: { icon: 'ph:mouse-bold', color: '#3af' },
            生活随笔: { icon: 'ph:shooting-star-bold', color: '#3ba' },
            代码编程: { icon: 'ph:code-bold', color: '#77f' },
            未分类: { icon: 'ph:folder-dotted-bold' },
        },
        defaultCategoryIcon: 'ph:folder-bold',
        order: {
            date: '创建日期',
            updated: '更新日期',
            // title: '标题',
        },
    },

    content: {
        codeblockCollapsibleRows: 16,
    },

    footer: {
        copyright: `© ${new Date().getFullYear()} ${blogConfig.author.name}`,
        iconNav: <NavItem[]>[
            { icon: 'ph:house-bold', text: '个人主页', url: blogConfig.author.homepage },
            { icon: 'ri:qq-line', text: 'MC交流电台', url: 'https://qm.qq.com/q/lZxfLjrbxu' },
            { icon: 'ph:github-logo-bold', text: 'GitHub: Mugzx', url: 'https://github.com/mugzx' },
            { icon: 'ph:rss-simple-bold', text: 'Atom订阅', url: '/atom.xml' },
            { icon: 'ph:subway-bold', text: '开往', url: 'https://www.travellings.cn/plain.html' },
        ],
        nav: <Nav>[
            {
                title: '探索',
                items: [
                    { icon: 'ph:rss-simple-bold', text: 'Atom订阅', url: '/atom.xml' },
                    { icon: 'ph:subway-bold', text: '开往', url: 'https://www.travellings.cn/plain.html' },
                    { icon: 'ph:flying-saucer-bold', text: '异次元旅行', url: 'https://travel.moe/go.html?travel=on' },
                ],
            },
            {
                title: '社交',
                items: [
                    { icon: 'ph:github-logo-bold', text: 'GitHub: Mugzx', url: 'https://github.com/mugzx' },
                    { icon: 'ri:qq-line', text: 'MC交流电台', url: 'https://qm.qq.com/q/lZxfLjrbxu' },
                    { icon: 'ph:envelope-simple-bold', text: blogConfig.author.email, url: `mailto:${blogConfig.author.email}` },
                ],
            },
            {
                title: '信息',
                items: [
                    { icon: 'simple-icons:nuxtdotjs', text: '博客开源自纸鹿大佬', url: 'https://github.com/L33Z22L11/blog-v3' },
                    { icon: 'ph:swatches-bold', text: '博客主题相关介绍', url: '/theme' },
                    { icon: 'ph:certificate-bold', text: '萌ICP备20259900号', url: 'https://icp.gov.moe/?keyword=20259900' },
                ],
            },
        ],
        message: '',
    },

    header: {
        logo: 'https://q1.qlogo.cn/g?b=qq&nk=2111829348&src_uin=www.jlwz.cn&s=0',
        /** 展示标题，否则展示纯 Logo */
        showTitle: true,
        subtitle: blogConfig.subtitle,
        emojiTail: ['🌙', '🌱', '💤', '✨', '🌏'],
    },

    pagination: {
        perPage: 10,
        sortOrder: <ArticleOrderType>'date',
        /** 允许（普通/预览/归档）文章列表正序 */
        allowAscending: false,
    },

    nav: <Nav>[
        {
            title: '',
            items: [
                { icon: 'ph:files-bold', text: '驻站笔记', url: '/' },
                { icon: 'ph:link-bold', text: '站友电台', url: '/link' },
                { icon: 'ph:archive-bold', text: '驿站仓库', url: '/archive' },
            ],
        },
    ],

    seasonal: {
        widgetBackground: 'https://mumu.s3.bitiful.net/2025/02/82102a3b8a103df3d48cc089c58b8fbe.avif',
        emoji: '🧧',
    },

    stats: {
        /** 归档页面每年标题对应的年龄 */
        birthYear: 2009,
        /** BlogStats 组件的预置文本 */
        wordCount: '约10万',
    },

    themes: {
        light: {
            icon: 'ph:sun-bold',
            tip: '浅色模式',
        },
        system: {
            icon: 'ph:monitor-bold',
            tip: '跟随系统',
        },
        dark: {
            icon: 'ph:moon-bold',
            tip: '深色模式',
        },
    },
})
