<template>
  <div v-if="pending" class="container"><p>Loading…</p></div>
  <div v-else-if="error" class="container"><p>Failed: {{ error.message }}</p></div>

  <div class="project-detail-main" v-else-if="post">
    <div class="article-head">
      <div class="title">
        <h1>{{ post.title }}</h1>
        <h2>{{ post.published_at }}</h2>
      </div>
    </div>

    <div class="article-body">
      <!-- 有 cover 再套背景，避免 url(undefined) -->
      <div class="img" :style="post.cover ? { backgroundImage: `url(${post.cover})` } : {}"></div>
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
          <!-- blocks -> nodes 渲染 -->
          <template v-if="nodes.length">
            <template v-for="(n, i) in nodes" :key="i">
              <p v-if="n.type === 'p'">{{ n.text }}</p>
              <h1 v-else-if="n.type === 'h1'">{{ n.text }}</h1>
              <h2 v-else-if="n.type === 'h2'">{{ n.text }}</h2>
              <h3 v-else-if="n.type === 'h3'">{{ n.text }}</h3>
              <blockquote v-else-if="n.type === 'quote'">{{ n.text }}</blockquote>
              <ul v-else-if="n.type === 'ul'">
                <li v-for="(li, j) in n.children" :key="j">{{ li.text }}</li>
              </ul>
              <hr v-else-if="n.type === 'divider'" />
              <figure v-else-if="n.type === 'img'" class="img-wrap">
                <img :src="n.src" :alt="n.caption || ''" />
                <figcaption v-if="n.caption">{{ n.caption }}</figcaption>
              </figure>
            </template>
          </template>

          <!-- 沒 nodes：用描述切段 -->
          <div v-else>
            <p v-for="(p, i) in paragraphs" :key="i" class="paragraph">{{ p }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 理論上不會到這裡（保險） -->
  <div v-else class="container"><p>Loading…</p></div>
</template>

<style src="@/assets/css/pages/project-detail.scss" lang="scss"></style>
<script setup>
import { computed, watchEffect } from 'vue'

const route = useRoute()
const id = computed(() => String(route.params.id))

// 這裡改成 projects API
const { data, pending, error } = await useFetch(
  () => `/api/projects/${id.value}`,
  { key: () => `project:${id.value}`, default: () => ({ post: null, blocks: [], nodes: [] }) }
)

/* Notion rich_text[] -> 文字 */
const rtText = (rt) => (rt ?? []).map(t => t?.plain_text ?? '').join('')

/* blocks -> nodes（支援你的簡化格式與原生 Notion block） */
function toNodes(input) {
  const out = []
  let ulBuf = null
  const flushUl = () => { if (ulBuf?.length) out.push({ type: 'ul', children: ulBuf }); ulBuf = null }

  for (const b of (input ?? [])) {
    // 你的簡化格式 { id, type, ... }
    if (b && typeof b === 'object' && 'type' in b && !('paragraph' in b)) {
      switch (b.type) {
        case 'p':       flushUl(); if (b.text) out.push({ type: 'p', text: b.text }); break
        case 'h1':      flushUl(); if (b.text) out.push({ type: 'h1', text: b.text }); break
        case 'h2':      flushUl(); if (b.text) out.push({ type: 'h2', text: b.text }); break
        case 'h3':      flushUl(); if (b.text) out.push({ type: 'h3', text: b.text }); break
        case 'quote':   flushUl(); if (b.text) out.push({ type: 'quote', text: b.text }); break
        case 'divider': flushUl(); out.push({ type: 'divider' }); break
        case 'img':     flushUl(); if (b.src) out.push({ type: 'img', src: b.src, caption: b.caption }); break
        case 'li':
          if (b.text) { if (!ulBuf) ulBuf = []; ulBuf.push({ type: 'li', text: b.text }) }
          break
        default: flushUl()
      }
      continue
    }

    // 原生 Notion block
    const t = b?.type
    switch (t) {
      case 'paragraph':       flushUl(); { const text = rtText(b.paragraph?.rich_text); if (text) out.push({ type: 'p', text }) } break
      case 'heading_1':
      case 'heading_2':
      case 'heading_3':       flushUl(); { const text = rtText(b[t]?.rich_text); if (text) out.push({ type: t === 'heading_1' ? 'h1' : t === 'heading_2' ? 'h2' : 'h3', text }) } break
      case 'quote':           flushUl(); { const text = rtText(b.quote?.rich_text); if (text) out.push({ type: 'quote', text }) } break
      case 'bulleted_list_item': { const text = rtText(b.bulleted_list_item?.rich_text); if (text) { if (!ulBuf) ulBuf = []; ulBuf.push({ type: 'li', text }) } } break
      case 'divider':         flushUl(); out.push({ type: 'divider' }); break
      case 'image':           flushUl(); { const src = b.image?.file?.url || b.image?.external?.url; const caption = rtText(b.image?.caption); if (src) out.push({ type: 'img', src, caption }) } break
      default:                flushUl()
    }
  }
  flushUl()
  return out
}

/* 直接用 API 回傳的 post */
const post = computed(() => data.value?.post ?? null)

/* 有 nodes 就用 nodes；否則把 blocks 轉成 nodes */
const nodes = computed(() => {
  const given = data.value?.nodes
  if (given?.length) return given
  const blocks = data.value?.blocks ?? []
  return toNodes(blocks)
})

/* 沒有 nodes 時，用 description 當後備段落 */
const paragraphs = computed(() => {
  if (nodes.value.length) return []
  const desc = post.value?.description ?? ''
  return desc.split(/\n{2,}/).map(s => s.trim()).filter(Boolean)
})

/* 除錯觀察（上線可移除） */
watchEffect(() => {
  console.log('PROJECT post →', post.value)
  console.log('PROJECT nodes →', nodes.value)
})
</script>