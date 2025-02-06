<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
    <h3 class="widget-title">
        驿站公告
    </h3>
    <div
        class="widget-card seasonal"
        :style="{
            '--seasonal-bg': `url(${appConfig.seasonal.widgetBackground})`,
            '--seasonal-emoji': `'${appConfig.seasonal.emoji}'`,
        }"
    >
        <!-- TODO: 优化技术架构展示 -->
        <p>[驿站域名] 2024~2026
        <br>[托管平台] Vercel
        <br>[博客驱动] Nuxt Content
        <br>[图床存储] 缤纷云</p>
    </div>
</template>

<style lang="scss" scoped>
.seasonal {
    position: relative;
    overflow: hidden;
    z-index: 0;

    &::before {
        content: "";
        position: absolute;
        opacity: 0.2;
        inset: 0;
        background: center / cover;
        background-image: var(--seasonal-bg, "https://mumu.s3.bitiful.net/202502%2F82102a3b8a103df3d48cc089c58b8fbe.avif");
        z-index: -1;
    }
}

.seasonal-emoji::before, .seasonal-emoji::after {
    // 文明用语😋
    content: var(--seasonal-emoji, "\1F595");
}
</style>
