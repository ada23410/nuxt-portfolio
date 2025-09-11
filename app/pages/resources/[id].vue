<template>
    <div class="container" v-if="post">
        <div class="article-head">
            <div class="title">
                <h1>{{ post.title }}</h1>
                <h2>{{ post.date }}</h2>
            </div>
        </div>
        <div class="article-body">
        <div v-if="post.cover" class="img" :style="{ backgroundImage: `url(${post.cover})` }" />
        <div class="content">
            <div class="author">
            <div class="name">
                <span>&ensp;Author / </span>
                <span>{{ post.author || 'Aida Wu' }}</span>
            </div>
            <div class="tag" v-if="post.tags?.length">
                <span v-for="t in post.tags" :key="t">{{ t }}</span>
            </div>
            </div>

            <div class="contents">
            <!-- 簡述（如果有） -->
            <p v-if="post.excerpt" class="paragraph">{{ post.excerpt }}</p>

            <!-- 內容區（若你之後接 Notion blocks，可以在這裡 render） -->
            <div v-if="blocks?.length">
                <p v-for="b in blocks" :key="b.id" class="paragraph">
                {{ b.text }}
                </p>
            </div>

            <!-- 目前先放一張示意圖 -->
            <div class="img" v-else />
            </div>
        </div>
        </div>
    </div>

    <div v-else class="container">
        <p>Loading…</p>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const id = computed(() => 
    String(route.params.id || ''
    ))

// 跟列表頁用同一個 key 拿到假資料
const resources = useState<any[]>('resources', () => [])

// 依 id 找出該篇
const post = computed(() => resources.value.find(r => String(r.id) === id.value) || null)

// blocks：之後接 API 再真的回傳陣列，現在先保底為 []
const blocks = computed(() => {
    const raw = (post.value as any)?.blocks
    return Array.isArray(raw) ? raw : []
})

// 若沒有 blocks，就把描述字串切成段落
const paragraphs = computed(() => {
    const d = post.value?.description?.trim() ?? ''
    return d ? d.split(/\n{2,}/) : []
})

useSeoMeta({
    title: () => (post.value ? `${post.value.title} | Resources` : 'Resources'),
    description: () => post.value?.description || 'Resource detail'
})

// 找不到就 404（直接顯示 Nuxt 的 404 畫面）
if (!post.value) {
    throw createError({ statusCode: 404, statusMessage: 'Resource not found' })
}
</script>

<style lang="scss" scoped>
.container {
    padding: 10rem 14rem;
    background-color: $color-bg;
    .article-head {
        display: flex; justify-content: space-between; align-items: flex-start;
        .title {
            h1 { 
                font-size: $font-size-giant; 
                font-weight: 600; 
                margin-bottom: 1rem; }
            h2 { 
                font-size: $font-size-xl; 
                font-weight: 500; 
                color: $color-text-light; 
            }
        }
    }

    .article-body {
        .img {
        margin: 5rem 0; width: 100%; max-height: 540px; aspect-ratio: 1 / 1;
        border-radius: 60px; background-color: $color-text-light; background-size: cover; background-position: center;
        }

        .content {
        display: flex; justify-content: space-between; align-items: flex-start; gap: 5rem;

        .author {
            flex: 1;
            .name { font-size: $font-size-lg; font-weight: 500; }
            .tag {
            margin-top: 2rem; font-size: $font-size-sm; color: $color-text-light;
            span { padding: .5rem 1rem; border: .5px solid $color-border; border-radius: 50px; margin-right: .5rem; }
            }
        }

        .contents {
            flex: 4;
            .subtitle { font-size: $font-size-xxl; font-weight: 500; margin-bottom: 1rem; }
            .paragraph { font-size: $font-size-base; font-weight: 300; color: $color-text-light; text-align: justify; line-height: 1.5rem; margin-bottom: 2rem; }
            .img { margin: 5rem 0; width: 100%; max-height: 540px; aspect-ratio: 1 / 1; border-radius: 60px; background-color: $color-text-light; }
        }
        }
    }
}
</style>
