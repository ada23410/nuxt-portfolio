<template>
  <div class="home-main">
    <div class="Hero-section">
      <div>
        <ClientOnly>
          <Hero />
        </ClientOnly>
      </div>
      <div class="scroll">
        <a class="scroll-link" href="#next">
          <span class="description">SCROLL TO DISCOVER</span>
          <span class="arrow" aria-hidden="true">
            <svg class="chev" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
            <svg class="chev" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
            <svg class="chev" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
          </span>
        </a>
      </div>
    </div>
    <div class="kv-section">
      <div class="section-title">Project</div>
      <div class="project-card">
        <NuxtLink
          v-for="(project, index) in projects"
          :key="project.id"
          :to="`/projects/${project.id}`"
          class="project-shape"
        >
          <div
            :class="shapeClass(index)"
            :style="{ backgroundImage: `url(${project.cover || ''})` }"
          ></div>
        </NuxtLink>
      </div>
      <div class="look-more">
        <NuxtLink to="/projects">
          <div class="description">DISCOVER PROJECTS</div>
          <div class="arrow" aria-hidden="true"><i>→</i><i>→</i><i>→</i></div>
        </NuxtLink>
      </div>
    </div>

    <div class="resources">
      <div class="resources-title">Resources</div>
      <div class="resource-card">
        <Card :items="items" base-path="/resources" class="resource-shape" />
      </div>

      <div class="look-more">
        <NuxtLink to="/resources">
          <div class="description">DISCOVER RESOURCES</div>
          <div class="arrow" aria-hidden="true"><i>→</i><i>→</i><i>→</i></div>
        </NuxtLink>
      </div>
    </div>

    <div class="services">
      <div class="services-title">Services</div>
      <div class="services-card">
        <div class="card">
          <div class="card-head">
            <img src="/hero_animate.gif" alt="" />
          </div>
          <div class="card-body">
            <div class="card-title">Research & Discovery</div>
            <div class="card-subtitle">釐清問題與使用者實際需求</div>
            <div class="card-content">
              <ul>
                <li>品牌競品分析</li>
                <li>使用者旅程與痛點盤點</li>
                <li>問卷與訪談設計</li>
                <li>可用性測試規劃</li>
                <li>報告與洞察摘要</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-head">
            <img src="/animate_3.gif" alt="" />
          </div>
          <div class="card-body">
            <div class="card-title">UX / UI Design Strategy</div>
            <div class="card-subtitle">把研究轉化為產品結構與互動邏輯</div>
            <div class="card-content">
              <ul>
                <li>使用者流程與 IA 規劃</li>
                <li>Wireframe / Prototype 製作</li>
                <li>設計系統與元件庫建立</li>
                <li>品牌視覺語彙設計</li>
                <li>前後端協作文件</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-head">
            <img src="/animate_4.gif" alt="" />
          </div>
          <div class="card-body">
            <div class="card-title">Front-End Development</div>
            <div class="card-subtitle">讓設計落地兼顧互動與效能</div>
            <div class="card-content">
              <ul>
                <li>Vue / Nuxt 專案架構與前端開發</li>
                <li>響應式與互動畫面設計（RWD / Motion）</li>
                <li>前後端串接（API Integration）</li>
                <li>網站部署與最佳化</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="about">
      <div class="about-title">About</div>
      <NuxtLink class="inorganic" data-speed="0.40">
        <span class="pill"></span>
        <span class="pill"></span>
        <span class="pill"></span>
        <span class="pill"></span>
        <span class="pill"></span>
        <span class="pill"></span>
      </NuxtLink>
      <div class="look-more">
        <NuxtLink to="/about">
          <div class="description">DISCOVER ABOUT ME</div>
          <div class="arrow" aria-hidden="true"><i>→</i><i>→</i><i>→</i></div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style src="@/assets/css/pages/home.scss" lang="scss"></style>
<script setup>
import { computed, ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import Card from "@/components/Card.vue";
import Hero from "~/components/Hero.vue";

/* ---------- Data Fetching ---------- */
// resources
const { data: resourcesData } = await useFetch("/api/resources", {
  query: { limit: 2 },
  default: () => ({ items: [] }),
});
const items = computed(() => resourcesData.value?.items ?? []);

// projects
const { data: projectsData } = await useFetch("/api/projects", {
  query: { limit: 3 },
  default: () => ({ items: [] }),
});
const projects = computed(() => projectsData.value?.items ?? []);

/* ---------- Helpers ---------- */
function shapeClass(index) {
  if (index === 0) return "square";
  if (index === 1) return "circle";
  if (index === 2) return "triangle";
  return "";
}

onMounted(async () => {
  await nextTick();
  const elements = document.querySelectorAll(
    ".project-shape, .look-more, .resource-shape, .services-card, .inorganic"
  );
  console.log("Found elements:", elements);

  const onScroll = () => {
    const triggerY = window.innerHeight * 0.7;
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < triggerY) {
        el.classList.add("visible");
      }
    });
  };

  onScroll(); // 初始檢查（防止一開始就該出現的被漏掉）
  window.addEventListener("scroll", onScroll, { passive: true });

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", onScroll);
  });
});

onBeforeUnmount(() => {
  // 只需要清掉 Typed 實例
  typedInstances.forEach((inst) => inst?.destroy?.());
});
</script>
