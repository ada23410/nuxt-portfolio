<template>
  <div class="projects-main">
    <div class="project-head">
      <div class="title">
        <h1>Recent Project</h1>
        <div class="category">
          <button
            v-for="chip in TAGS"
            :key="chip.value || 'all'"
            class="chip"
            :class="{ active: tag === chip.value }"
            @click="selectTag(chip.value)"
          >
            {{ chip.label }}
          </button>
        </div>
      </div>
      <div>
        <p>專注於體驗細節與效能品質，將設計與開發融入可靠的數位服務，讓每一次互動都兼具人性的溫度與科技的精準。</p>
      </div>
    </div>

    <!-- 載入 / 錯誤 -->
    <div v-if="pending" class="loading">Loading…</div>
    <div v-else-if="error" class="empty">Failed: {{ error.message }}</div>

    <!-- 列表 -->
    <!-- 列表 -->
    <TransitionGroup
      v-else
      name="stack"
      tag="div"
      class="project-body"
      appear
    >
      <div
        v-for="(it, idx) in items"
        :key="it.id"
        class="row stack-item"
        :style="{ '--i': idx }"
      >
        <ProjectRow :item="it" :flip="idx % 2 === 1" />
      </div>
    </TransitionGroup>

    <!-- 空狀態（放在 group 外，避免被 transition class 影響） -->
    <div v-if="!items.length" class="empty">No projects.</div>
  </div>
</template>

<style src="@/assets/css/pages/projects.scss" lang="scss"></style>
<script setup>
import { computed, ref, watch } from 'vue'
import ProjectRow from '@/components/Row.vue'

const route = useRoute()
const router = useRouter()

// 1) 讀取分類（失敗時退回靜態預設）
const { data: catRes } = await useFetch('/api/projects/categories', {
  default: () => ({ categories: [] })
})
const categories = computed(() =>
  (catRes.value?.categories?.length
    ? catRes.value.categories
    : ['Branding', 'Graphic', 'Website', 'Illustration'])
)
const TAGS = computed(() => [
  { label: 'All', value: '' },
  ...categories.value.map(n => ({ label: n, value: n }))
])

// 2) tag 與網址同步
const tag = ref(typeof route.query.tag === 'string' ? route.query.tag : '')
watch(tag, v => router.replace({ query: { ...route.query, tag: v || undefined } }))

// 3) 依 tag 取列表
const query = computed(() => ({ limit: 6, ...(tag.value ? { tag: tag.value } : {}) }))
const { data: listRes, pending, error } = await useFetch('/api/projects', {
  query,
  key: () => `projects:${tag.value || 'all'}`,
  default: () => ({ items: [] })
})
const items = computed(() => listRes.value?.items ?? [])

// 4) 兩兩一組 → 給 Row.vue：{ main, side }
const rows = computed(() => {
  const out = []
  for (let i = 0; i < items.value.length; i += 2) {
    out.push({ main: items.value[i], side: items.value[i + 1] ?? null })
  }
  return out
})

// 5) 點選分類
const selectTag = (v) => (tag.value = v)
</script>