import type { ArticleOrderType } from './types/article'
import type { Nav, NavItem } from '~/types/nav'
import blogConfig from '~~/blog.config'

export default defineAppConfig({
    ...blogConfig,

    article: {
        categories: <{ [key: string]: { icon: string, color?: string } }>{
            观点解释: { icon: 'ph:mouse-bold', color: '#3af' },
            日常生活: { icon: 'ph:shooting-star-bold', color: '#3ba' },
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
            { icon: 'ri:qq-line', text: '交流群: 938973313', url: 'https://qm.qq.com/q/lZxfLjrbxu' },
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
                    { icon: 'ph:github-logo-bold', text: 'Mugzx', url: 'https://github.com/mugzx' },
                    { icon: 'ri:qq-line', text: '群: 938973313', url: 'https://qm.qq.com/q/lZxfLjrbxu' },
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
        text: true,
        subtitle: blogConfig.subtitle,
        emojiTail: ['🌏', '🌊️', '🌍', '🦦', '🌎'],
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
                { icon: 'ph:files-bold', text: '文章', url: '/' },
                { icon: 'ph:link-bold', text: '友链', url: '/link' },
                { icon: 'ph:archive-bold', text: '归档', url: '/archive' },
            ],
        },
    ],

    seasonal: {
        widgetBackground: 'https://wsrv.nl/?url=i2.hdslb.com/bfs/archive/46165212e09842103752c453d7987a470059760b.jpg@320w',
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
