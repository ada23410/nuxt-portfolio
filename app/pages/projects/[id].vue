<template>
  <div v-if="pending" class="container"><p>Loading…</p></div>
  <div v-else-if="error" class="container">
    <p>Failed: {{ error.message }}</p>
  </div>

  <div class="project-detail-main" v-else-if="post">
    <div class="article-head">
      <div class="title">
        <h1>{{ post.title }}</h1>
        <h2>{{ post.published_at }}</h2>
      </div>
    </div>

    <div class="article-body">
      <!-- 有 cover 再套背景，避免 url(undefined) -->
      <div
        class="img"
        :style="post.cover ? { backgroundImage: `url(${post.cover})` } : {}"
      ></div>
      <div class="content">
        <div class="author">
          <div class="name">
            <span>&ensp;Author / </span>
            <span>{{ post.author || "Aida Wu" }}</span>
          </div>
          <div class="tag" v-if="post.tags?.length">
            <span v-for="t in post.tags" :key="t">{{ t }}</span>
          </div>
        </div>

        <div class="contents">
          <!-- blocks -> nodes 渲染 -->
          <template v-if="nodes.length">
            <template v-for="(n, i) in nodes" :key="i">
              <p v-if="n.type === 'p'" class="paragraph">
                {{ n.text }}
              </p>

              <h1 v-else-if="n.type === 'h1'" class="paragraph">
                {{ n.text }}
              </h1>

              <h2 v-else-if="n.type === 'h2'" class="paragraph">
                {{ n.text }}
              </h2>

              <h3 v-else-if="n.type === 'h3'" class="paragraph">
                {{ n.text }}
              </h3>

              <blockquote v-else-if="n.type === 'quote'" class="paragraph">
                {{ n.text }}
              </blockquote>

              <ul v-else-if="n.type === 'ul'" class="paragraph">
                <li v-for="(li, j) in n.children" :key="j">
                  {{ li.text }}
                </li>
              </ul>

              <hr v-else-if="n.type === 'divider'" />

              <figure v-else-if="n.type === 'img'" class="img-wrap">
                <img :src="n.src" :alt="n.caption || ''" />
                <figcaption v-if="n.caption">
                  {{ n.caption }}
                </figcaption>
              </figure>
            </template>
          </template>

          <!-- 沒 nodes：用描述切段 -->
          <template v-else>
            <p v-for="(p, i) in paragraphs" :key="i" class="paragraph">
              {{ p }}
            </p>
          </template>
        </div>
      </div>
    </div>
  </div>

  <!-- 理論上不會到這裡（保險） -->
  <div v-else class="container"><p>Loading…</p></div>
</template>

<style src="@/assets/css/pages/project-detail.scss" lang="scss"></style>
<script setup>
import { computed, watchEffect } from "vue";
import { useRoute } from "vue-router";

/* --------------------------------------------------
 * Route / API
 * -------------------------------------------------- */
const route = useRoute();
const id = computed(() => String(route.params.id));

const { data } = await useFetch(() => `/api/projects/${id.value}`, {
  key: () => `project:${id.value}`,
  default: () => ({
    post: null,
    blocks: [],
    nodes: [],
  }),
});

/* --------------------------------------------------
 * Utils
 * -------------------------------------------------- */

/* Notion rich_text[] → 純文字 */
const richTextToString = (richText = []) =>
  richText.map((t) => t?.plain_text ?? "").join("");

/* blocks → 統一 nodes 格式 */
function normalizeBlocksToNodes(blocks = []) {
  const nodes = [];
  let listBuffer = null;

  const flushList = () => {
    if (listBuffer?.length) {
      nodes.push({ type: "ul", children: listBuffer });
      listBuffer = null;
    }
  };

  for (const block of blocks) {
    // ---- 自訂簡化格式 ----
    if (block?.type && !block.paragraph) {
      flushList();
      if (block.text) {
        nodes.push({ type: block.type, text: block.text });
      }
      continue;
    }

    // ---- 原生 Notion block ----
    switch (block?.type) {
      case "paragraph": {
        flushList();
        const text = richTextToString(block.paragraph?.rich_text);
        if (text) nodes.push({ type: "p", text });
        break;
      }

      case "heading_1":
      case "heading_2":
      case "heading_3": {
        flushList();
        const text = richTextToString(block[block.type]?.rich_text);
        if (text) {
          nodes.push({
            type: block.type.replace("heading_", "h"),
            text,
          });
        }
        break;
      }

      case "quote": {
        flushList();
        const text = richTextToString(block.quote?.rich_text);
        if (text) nodes.push({ type: "quote", text });
        break;
      }

      case "bulleted_list_item": {
        const text = richTextToString(block.bulleted_list_item?.rich_text);
        if (text) {
          if (!listBuffer) listBuffer = [];
          listBuffer.push({ type: "li", text });
        }
        break;
      }

      case "divider":
        flushList();
        nodes.push({ type: "divider" });
        break;

      case "image": {
        flushList();
        const src = block.image?.file?.url || block.image?.external?.url;
        const caption = richTextToString(block.image?.caption);
        if (src) nodes.push({ type: "img", src, caption });
        break;
      }

      default:
        flushList();
    }
  }

  flushList();
  return nodes;
}

/* --------------------------------------------------
 * Data sources
 * -------------------------------------------------- */

const post = computed(() => data.value?.post ?? null);
const apiNodes = computed(() => data.value?.nodes ?? []);
const apiBlocks = computed(() => data.value?.blocks ?? []);

/* 單一內容來源（安全、永遠是陣列） */
const contentNodes = computed(() => {
  if (Array.isArray(apiNodes.value) && apiNodes.value.length) {
    return apiNodes.value;
  }
  if (Array.isArray(apiBlocks.value) && apiBlocks.value.length) {
    return normalizeBlocksToNodes(apiBlocks.value);
  }
  return [];
});

/* ⭐ 關鍵：提供 template 使用的 nodes（alias） */
const nodes = computed(() => contentNodes.value);

/* description fallback（只在沒 nodes 時用） */
const descriptionParagraphs = computed(() => {
  const desc = post.value?.description ?? "";
  return desc
    .split(/\n{2,}/)
    .map((s) => s.trim())
    .filter(Boolean);
});

/* 顯示模式（讓 template 一眼看懂） */
const renderMode = computed(() => {
  if (nodes.value.length) return "nodes";
  if (descriptionParagraphs.value.length) return "description";
  return "empty";
});

/* --------------------------------------------------
 * Debug（可移除）
 * -------------------------------------------------- */
watchEffect(() => {
  console.log("renderMode →", renderMode.value);
  console.log("nodes →", nodes.value);
});
</script>
