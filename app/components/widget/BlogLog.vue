<script setup lang="ts">
const appConfig = useAppConfig()
const timeEstablished = appConfig.timeEstablished

const blogLog = [
    { date: '2077-05-24', content: '未完待续...' },
    { date: '2025-02-06', content: '基本完成了博客的修改' },
    { date: timeEstablished, content: '发布第一篇文章' },
]
</script>

<template>
    <h3 class="widget-title">
        驿站动态
    </h3>
    <!-- TODO: 优化时间线样式 -->
    <div class="widget-card">
        <ul>
            <li v-for="(item, index) in blogLog" :key="index">
                <small>{{ item.date }}</small><br>
                {{ item.content }}
            </li>
        </ul>
    </div>
</template>
