import type { FeedGroup } from '~/types/feed'
import { getGhAvatar } from './utils/img'

export default <FeedGroup[]>[{
    name: '相谈甚多',
    desc: '',
    entries: [{
        author: 'LineXic',
        desc: '念念不忘，必有回响',
        link: 'https://linexic.top',
        feed: 'https://linexic.top/atom.xml',
        icon: 'https://linexic.top/logo.png',
        avatar: 'https://linexic.top/logo.png',
        archs: ['Hexo', 'Vercel'],
        date: '2025-01-24',
        comment: '前端学习，高中生活。',
    },],
    },{
    name: '网上邻居',
    desc: '哔——啵——电波通讯中，欢迎常来串门。',
    entries: [{
        author: '枫落丰源',
        desc: '只要开始追赶，就已经走在胜利的路上',
        link: 'https://feng1026.fun',
        feed: 'https://feng1026.fun/feed',
        icon: 'https://s21.ax1x.com/2024/10/19/pAaAoIx.png',
        avatar: 'https://s21.ax1x.com/2024/10/19/pAaAoIx.png',
        archs: ['Typecho', '服务器'],
        date: '2025-01-24',
        comment: '无',
    },{
        author: 'MeowcoQAQ',
        desc: '还是音 MIDI 大佬',
        link: 'https://blog.mcneko.com',
        feed: 'https://blog.mcneko.com/feed',
        icon: 'https://sc.midishow.net/source/avatar/91/914504.jpg?_=1729531639',
        avatar: 'https://sc.midishow.net/source/avatar/91/914504.jpg?_=1729531639',
        archs: ['WordPress', '服务器'],
        date: '2025-01-24',
        comment: '无',
    },],
}]
