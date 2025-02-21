import type { FeedGroup } from '~/types/feed'
import { getGhAvatar } from './utils/img'

export default <FeedGroup[]>[{
    name: '漫游',
    desc: '网上冲浪时发现的精彩内容与常读订阅，与君共享。',
    entries: [{
        author: '纸鹿',
        sitenick: '摸鱼处',
        title: '纸鹿摸鱼处',
        desc: '纸鹿至麓不知路，支炉制露不止漉',
        feed: 'https://blog.zhilu.cyou/atom.xml',
        link: 'https://blog.zhilu.cyou',
        icon: 'https://www.zhilu.cyou/icon.png',
        avatar: 'https://www.zhilu.cyou/api/avatar.png',
        archs: ['Nuxt', 'Vercel'],
        date: '2024-01-28',
        comment: '博客主题的原作者,文笔很好很有趣~',
    }, ],
}]
