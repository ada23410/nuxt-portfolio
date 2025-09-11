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
            <div
                class="img"
                :style="{ backgroundImage: item.image_url ? `url(${item.image_url})` : '' }"
            />
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

<script setup lang="ts">
type Item = {
    id: string | number
    title: string
    published_at?: string
    description?: string
    image_url?: string
    tags?: string[]
}

const props = withDefaults(defineProps<{
    items: Item[]
    basePath?: string
}>(), {
    basePath: '/resources'
})

const { items, basePath } = toRefs(props)
const itemTo = (it: Item) => `${basePath.value}/${encodeURIComponent(String(it.id))}`
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
        text-decoration: none; 
    }
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
        display: flex; 
        justify-content: space-between;
        align-items: baseline; 
    }
    .text { 
        font-size: $font-size-xxl; 
        font-weight: 500; 
    }
    .time { 
        font-size: $font-size-lg;
        color: $color-text-light; 
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
