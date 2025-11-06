<template>
    <div class="resources-main">
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
        <Card v-else :items="items" base-path="/resources" class="resource-shape" />
        </div>
    </div>
</template>

<style src="@/assets/css/pages/resources.scss" lang="scss"></style>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import Card from '@/components/Card.vue'

const route = useRoute()
const router = useRouter()

/* ---------- 分類資料 ---------- */
const { data: catRes } = await useFetch('/api/resources/categories', {
  default: () => ({ categories: [] })
})
const categories = computed(() => {
  const arr = catRes.value?.categories ?? []
  return [...new Set(arr)].sort()
})

/* ---------- Tag 同步 ---------- */
const tag = ref(String(route.query.tag || ''))
watch(tag, (v) => {
  router.replace({ query: { ...route.query, tag: v || undefined } })
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
watch(
  () => route.query.tag,
  (q) => (tag.value = String(q || ''))
)

/* ---------- 列表資料 ---------- */
const query = computed(() => ({ limit: 6, ...(tag.value ? { tag: tag.value } : {}) }))
const { data: listRes, pending, error } = await useFetch('/api/resources', {
    query,
    key: () => `resources:${tag.value || 'all'}`,
    default: () => ({ items: [] })
})
const items = computed(() => listRes.value?.items ?? [])

/* ---------- Chips ---------- */
const TAGS = computed(() => [
    { label: 'All', value: '' },
    ...categories.value.map((n) => ({ label: n, value: n }))
])

/* ---------- 最簡 scroll reveal ---------- */
onMounted(async () => {
    await nextTick()
    const elements = document.querySelectorAll(
        '.resource-shape'
    )
    console.log('Found elements:', elements)

    const onScroll = () => {
        const triggerY = window.innerHeight * 0.7
        elements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top < triggerY) el.classList.add('visible')
        })
    }

    onScroll() // 一開始檢查一次
    window.addEventListener('scroll', onScroll, { passive: true })

    onBeforeUnmount(() => {
        window.removeEventListener('scroll', onScroll)
    })
})
</script>