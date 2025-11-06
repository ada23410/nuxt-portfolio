<template>
  <div class="home-main">
    <div class="Hero-section">
      <div>
        <h1 id="typed-line1"></h1>
        <h2 id="typed-line2"></h2>
        <h3 id="typed-line3"></h3>
      </div>
      <div>
        <p id="typed-line4"></p>
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
import Typed from "typed.js";
import Card from "@/components/Card.vue";

/* ---------- Constants ---------- */
const TYPE_SPEED = 50;
const START_DELAY_LINE1 = 500;
const START_DELAY_BETWEEN_LINES = 300;
const START_DELAY_LINE3 = 450;
const START_DELAY_LINE4 = 450;

/* ---------- Utilities ---------- */
// 以 Promise 包住 Typed，讓流程用 await 寫起來更直覺
function typeLine(el, text, { startDelay = 0 } = {}) {
  return new Promise((resolve) => {
    const instance = new Typed(el, {
      strings: [text],
      typeSpeed: TYPE_SPEED,
      backSpeed: 0,
      startDelay,
      showCursor: false,
      onComplete: () => resolve(instance),
    });
  });
}

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

/* ---------- Typed.js flow ---------- */
const typedInstances = [];

async function initTyping() {
  // Line 1
  const t1 = await typeLine("#typed-line1", "Turning insights", {
    startDelay: START_DELAY_LINE1,
  });
  document.querySelector("#typed-line1").classList.add("underline-animate");
  document.querySelector("#typed-line1").insertAdjacentHTML(
    "beforeend",
    `<img 
        src="/hero_animate.gif" 
        class="underline-gif"
        alt="underline animation"
        >`
  );
  typedInstances.push(t1);

  // Line 2
  const t2 = await typeLine("#typed-line2", "into stories", {
    startDelay: START_DELAY_BETWEEN_LINES,
  });
  const line2 = document.querySelector("#typed-line2");
  line2.innerHTML = line2.innerHTML.replace(
    "stories",
    '<span class="highlight-green" style="color: #66cc66;">stories</span>'
  );
  line2.classList.add("underline-animate");
  typedInstances.push(t2);

  // 等下劃線動畫結束再打第三行
  await new Promise((res) => line2.addEventListener("animationend", res, { once: true }));

  // Line 3
  const t3 = await typeLine("#typed-line3", "that inspire change.", {
    startDelay: START_DELAY_LINE3,
  });
  const line3 = document.querySelector("#typed-line3");
  line3.classList.add("underline-animate");
  line3.insertAdjacentHTML(
    "beforeend",
    `<img 
        src="/hero_animate_2.gif" 
        class="underline-gif-2" 
        alt="underline animation"
        >`
  );
  typedInstances.push(t3);

  // Line 4（副標）
  const t4 = await typeLine("#typed-line4", "從理解人開始，邁向解決問題的設計", {
    startDelay: START_DELAY_LINE4,
  });
  typedInstances.push(t4);
}

onMounted(async () => {
  initTyping();
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
