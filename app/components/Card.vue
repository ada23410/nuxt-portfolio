<template>
<div class="wrap-box">
    <NuxtLink
        v-for="item in items"
        :key="item.id"
        class="card-link"
        :to="itemTo(item)"
        :aria-label="`Open resource ${item.title}`"
        >
        <article class="card">
            <div class="card-head">
            <!-- 有圖用 <img>，提升 LCP/SEO；沒圖給純背景色 -->
            <img
                v-if="item.image_url"
                :src="item.image_url"
                :alt="item.title"
                loading="lazy"
                class="img"
            />
            <div v-else class="img img--placeholder" />
            </div>

            <div class="card-body">
            <div class="title">
                <div class="text">{{ item.title }}</div>
                <div class="time">{{ item.published_at }}</div>
            </div>
            <div class="description">
                <p>{{ item.description }}</p>
                <div class="tag">
                <span v-for="(t, i) in item.tags" :key="i">{{ t }}</span>
                </div>
            </div>
            </div>
        </article>
        </NuxtLink>
    </div>
</template>

<script setup>
const props = defineProps({
    items: { 
        type: Array, 
        default: () => [] 
    },
    basePath: { 
        type: String, 
        default: '/resources' 
    }
})

const itemTo = (it) => `${props.basePath}/${encodeURIComponent(String(it.id))}`
</script>

<style scoped lang="scss">
.wrap-box {
    position: relative; 
    z-index: 1; 
    padding: 10rem 0;
    display: grid; 
    grid-template-columns: repeat(2, 1fr); 
    justify-items: center; 
    align-items: center; 
    gap: 5rem;
    .card-link { 
        display: block; 
        width: 100%; 
        max-width: 540px; 
        color: inherit; 
        text-decoration: none; }
    .img { 
        width: 100%; 
        aspect-ratio: 1 / 1; 
        border-radius: 60px; 
        background-color: $color-text-light; 
        background-size: cover; 
        background-position: center; }
    .card-body { 
        margin-top: 1.5rem; }
    .title { 
        .text { 
            font-size: $font-size-xxl; 
            font-weight: 500; 
            margin-bottom: 1rem;
        }
        .time { 
            font-size: $font-size-lg;
            color: $color-text-light; 
        }
    }
    .description p {  
        margin-top: 1rem; 
        color: $color-text-light; 
        line-height: 1.5rem; 
        text-align: justify; 
    }
    .tag { 
        margin-top: 1.5rem; 
        color: $color-text-light; 
    }
    .tag span { 
        padding: .5rem 1rem; 
        border: .5px solid $color-border; 
        border-radius: 50px; 
        margin-right: .5rem; 
    }
}
</style>
