<template>
  <div v-if="pending" class="container"><p>Loading…</p></div>
  <div v-else-if="error" class="container">
    <p>Failed: {{ error.message }}</p>
  </div>

  <div class="resources-detail-main" v-else-if="post">
    <div class="article-head">
      <div class="title">
        <h1>{{ post.title }}</h1>
        <h2>{{ post.published_at }}</h2>
      </div>
    </div>

    <div class="article-body">
      <!-- 建議不用自閉合，寫成成對標籤更直觀 -->
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
              <p v-if="n.type === 'p'">{{ n.text }}</p>

              <h1 v-else-if="n.type === 'h1'">{{ n.text }}</h1>
              <h2 v-else-if="n.type === 'h2'">{{ n.text }}</h2>
              <h3 v-else-if="n.type === 'h3'">{{ n.text }}</h3>

              <blockquote v-else-if="n.type === 'quote'">{{ n.text }}</blockquote>

              <ul v-else-if="n.type === 'ul'">
                <li v-for="(li, j) in n.children" :key="j">{{ li.text }}</li>
              </ul>

              <ol v-else-if="n.type === 'ol'">
                <li v-for="(li, j) in n.children" :key="j">{{ li.text }}</li>
              </ol>

              <hr v-else-if="n.type === 'divider'" />

              <div v-else-if="n.type === 'img'" class="img-wrap">
                <img :src="n.src" :alt="n.caption || ''" />
                <figcaption v-if="n.caption">{{ n.caption }}</figcaption>
              </div>

              <pre v-else-if="n.type === 'code'" class="code-block">
                <code :data-lang="n.language">
              {{ n.text }}
                </code>
              </pre>

              <a
                v-else-if="n.type === 'bookmark'"
                :href="n.url"
                target="_blank"
                class="bookmark"
              >
                <!-- <span class="title">
                  {{ n.caption || n.url }}
                </span> -->
                <span class="url">{{ n.url }}</span>
              </a>
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

  <div v-else class="container"><p>Loading…</p></div>
</template>

<style src="@/assets/css/pages/resources-detail.scss" lang="scss"></style>
<script setup>
import { computed, watchEffect } from "vue";

const route = useRoute();
const id = computed(() => String(route.params.id));

/* --------------------------------------------------
 * API
 * -------------------------------------------------- */
const { data, pending, error } = await useFetch(() => `/api/resources/${id.value}`, {
  key: () => `resource:${id.value}`,
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
const rtText = (richText = []) => richText.map((t) => t?.plain_text ?? "").join("");

/* --------------------------------------------------
 * blocks → nodes
 *（前端唯一轉換入口）
 * -------------------------------------------------- */
function toNodes(blocks = []) {
  const nodes = [];

  let ulBuffer = null;
  let olBuffer = null;

  const flushLists = () => {
    if (ulBuffer?.length) {
      nodes.push({ type: "ul", children: ulBuffer });
    }
    if (olBuffer?.length) {
      nodes.push({ type: "ol", children: olBuffer });
    }
    ulBuffer = null;
    olBuffer = null;
  };

  for (const block of blocks) {
    /* ---------- 原生 Notion block ---------- */
    switch (block?.type) {
      case "paragraph": {
        flushLists();
        const text = rtText(block.paragraph?.rich_text);
        if (text) nodes.push({ type: "p", text });
        break;
      }

      case "heading_1":
      case "heading_2":
      case "heading_3": {
        flushLists();
        const text = rtText(block[block.type]?.rich_text);
        if (text) {
          nodes.push({
            type: block.type.replace("heading_", "h"),
            text,
          });
        }
        break;
      }

      case "quote": {
        flushLists();
        const text = rtText(block.quote?.rich_text);
        if (text) nodes.push({ type: "quote", text });
        break;
      }

      case "bulleted_list_item": {
        const text = rtText(block.bulleted_list_item?.rich_text);
        if (text) {
          if (!ulBuffer) ulBuffer = [];
          ulBuffer.push({ text });
        }
        break;
      }

      case "numbered_list_item": {
        const text = rtText(block.numbered_list_item?.rich_text);
        if (text) {
          if (!olBuffer) olBuffer = [];
          olBuffer.push({ text });
        }
        break;
      }

      case "divider":
        flushLists();
        nodes.push({ type: "divider" });
        break;

      case "image": {
        flushLists();
        const src = block.image?.file?.url || block.image?.external?.url;
        const caption = rtText(block.image?.caption);
        if (src) nodes.push({ type: "img", src, caption });
        break;
      }

      case "code": {
        flushLists();

        const text = rtText(block.code?.rich_text);
        const language = block.code?.language || "";

        if (text) {
          nodes.push({
            type: "code",
            text,
            language,
          });
        }
        break;
      }

      case "bookmark": {
        flushLists();

        const url = block.bookmark?.url;
        const caption = rtText(block.bookmark?.caption);

        if (url) {
          nodes.push({
            type: "bookmark",
            url,
            caption,
          });
        }
        break;
      }

      default:
        flushLists();
    }
  }

  flushLists();
  return nodes;
}

/* --------------------------------------------------
 * Computed data
 * -------------------------------------------------- */

const post = computed(() => data.value?.post ?? null);

/**
 * ⭐ 關鍵修改在這裡 ⭐
 *
 * 改成「永遠優先使用 blocks」
 * 確保：
 * - 使用的是最新、正確的 Notion 結構
 * - 不會吃到 server 舊版 nodes
 */
const nodes = computed(() => {
  const blocks = data.value?.blocks;
  if (Array.isArray(blocks) && blocks.length) {
    return toNodes(blocks);
  }
  return [];
});

/* 沒有 nodes 時的 fallback */
const paragraphs = computed(() => {
  if (nodes.value.length) return [];
  const desc = post.value?.description ?? "";
  return desc
    .split(/\n{2,}/)
    .map((s) => s.trim())
    .filter(Boolean);
});

/* --------------------------------------------------
 * Debug
 * -------------------------------------------------- */
watchEffect(() => {
  console.group("[detail] content layers");
  console.log("raw blocks →", data.value?.blocks);
  console.log("nodes (frontend normalized) →", nodes.value);
  console.log("post →", post.value);
  console.groupEnd();
});
</script>
