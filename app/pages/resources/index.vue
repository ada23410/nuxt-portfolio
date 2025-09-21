<template>
    <div class="container">
        <div class="resources-head">
        <div class="title">
            <h1>Recent Resources</h1>
            <div class="category">
                <button
                    v-for="t in TAGS"
                    :key="t.label"
                    class="chip"
                    :class="{ active: (tag || '') === t.value }"
                    @click="tag = t.value"
                >
                    {{ t.label }}
                </button>
            </div>
        </div>
        <div>
            <p>
            專注於體驗細節與效能品質，將設計與開發融入可靠的數位服務，
            讓每一次互動都兼具人性的溫度與科技的精準。
            </p>
        </div>
        </div>

        <div class="resources-body">
            <div v-if="pending">Loading…</div>
            <div v-else-if="error">Failed: {{ error.message }}</div>
            <Card v-else :items="items" base-path="/resources" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import Card from '@/components/Card.vue'

const route = useRoute()
const router = useRouter()

// --- 讀所有分類（去重）---
const { data: catRes } = await useFetch('/api/resources/categories', {
    default: () => ({ categories: [] })
})
const categories = computed(() => {
    const arr = catRes.value?.categories ?? []
    // 去重 + 排序（依需要）
    return [...new Set(arr)].sort()
})

// --- 目前選中的 tag（與網址 ?tag= 同步）---
const tag = ref(String(route.query.tag || ''))
// 使用者點擊 chip
const setTag = (v) => {
    tag.value = v
}
// 當 tag 變動，更新網址（清空時移除參數）
watch(tag, (v) => {
    router.replace({ query: { ...route.query, tag: v || undefined } })
    // 捲回頂端（可選）
    window.scrollTo({ top: 0, behavior: 'smooth' })
})
// 使用者用瀏覽器返回/前進時，同步 tag
watch(
    () => route.query.tag,
    (q) => {
        tag.value = String(q || '')
    }
)

// --- 依 tag 抓列表 ---
const query = computed(() => ({ limit: 6, ...(tag.value ? { tag: tag.value } : {}) }))
const { data: listRes, pending, error } = await useFetch('/api/resources', {
    query,
    key: () => `resources:${tag.value || 'all'}`,
    default: () => ({ items: [] })
})
const items = computed(() => listRes.value?.items ?? [])

// --- 組合 chips（All + 動態分類）---
const TAGS = computed(() => [
    { label: 'All', value: '' },
    ...categories.value.map((n) => ({ label: n, value: n }))
])

</script>

<style lang="scss" scoped>
.container {
    padding: 10rem 14rem;
    background-color: $color-bg;
    .resources-head {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        .title {
            h1 {
                font-size: $font-size-giant;
                font-weight: 600;
            }
            .category {
                margin-top: 2.5rem;
                .chip {
                    padding: .5rem 1rem;
                    background-color: transparent;
                    font-size: $font-size-base;
                    font-weight: 400;
                    color: $color-text-light;
                    border: .5px solid $color-border;
                    border-radius: 50px;
                    margin-right: .5rem;
                    cursor: pointer;
                }
            }
        }
        p {
        max-width: 26rem;
        font-size: $font-size-base;
        line-height: 2rem;
        font-weight: 400;
        color: $color-text;
        }
    }
    .resources-body {
        margin: 8rem 0;
    }
}
</style>