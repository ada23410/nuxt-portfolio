<template>
    <div class="container">
        <div class="project-head">
        <div class="title">
            <h1>Recent Project</h1>
            <div class="category">
                <button
                    v-for="t in TAGS"
                    :key="t.value"
                    :class="['chip', { active: tag === t.value }]"
                    @click="selectTag(t.value)"
                >
                    {{ t.label }}
                </button>
            </div>
        </div>
        <div>
            <p>專注於體驗細節與效能品質，將設計與開發融入可靠的數位服務，讓每一次互動都兼具人性的溫度與科技的精準。</p>
        </div>
        </div>

        <div class="project-body">
        <ProjectRow
            v-for="(it, idx) in items"
            :key="it.id"
            :item="it"
            :flip="idx % 2 === 1"
        />
        </div>

        <div v-if="pending" class="loading">Loading…</div>
        <div v-else-if="!items.length" class="empty">No projects.</div>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import ProjectRow from '@/components/Row.vue'

const route = useRoute()
const router = useRouter()

// 可先做靜態分類；之後要從 API 取 categories 再換
const TAGS = [{ 
    label: 'All', 
    value: '' 
}, 'Branding','Graphic','Website','Illustration']
  .map(n => typeof n === 'string' ? ({ label: n, value: n }) : n)

const tag = ref(String(route.query.tag || ''))
watch(tag, v => router.replace({ query: { ...route.query, tag: v || undefined } }))

const query = computed(() => ({ limit: 6, ...(tag.value ? { tag: tag.value } : {}) }))
const { data, pending, error } = await useFetch('/api/projects', {
  query,
  key: () => `projects:${tag.value || 'all'}`,
  default: () => ({ items: [] })
})
const items = computed(() => data.value?.items ?? [])
const selectTag = (v) => (tag.value = v)
</script>

<style scoped lang="scss">
.container { padding: 10rem 14rem; background: $color-bg; }
.project-head {
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
        color: $color-text; }
}
.project-body { 
    margin: 8rem 0; 
}
.loading, .empty { 
    text-align: center; 
    color: $color-text-light; 
}
</style>