<template>
  <div class="home-main">
    <!-- ======================
     * Hero
     * ====================== -->
    <section class="Hero-section">
      <ClientOnly>
        <Hero />
      </ClientOnly>

      <div class="scroll">
        <a class="scroll-link" href="#projects">
          <span class="description">SCROLL TO DISCOVER</span>
          <span class="arrow" aria-hidden="true">
            <svg class="chev" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
            <svg class="chev" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
            <svg class="chev" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
          </span>
        </a>
      </div>
    </section>

    <!-- ======================
     * Projects
     * ====================== -->
    <section id="projects" class="kv-section">
      <h2 class="section-title project-title">Where insights take shape</h2>

      <div class="project-card project-blocks">
        <NuxtLink
          v-for="(project, index) in projects"
          :key="project.id"
          :to="`/projects/${project.id}`"
          class="project-shape"
        >
          <!-- ✅ 修正：class 命名與 SCSS 對應 -->
          <div
            class="project-geometry"
            :class="shapeClass(index)"
            :style="{ backgroundImage: `url(${project.cover || ''})` }"
          />
        </NuxtLink>
      </div>

      <div class="look-more">
        <NuxtLink to="/projects">
          <span class="description">DISCOVER PROJECTS</span>
          <span class="arrow" aria-hidden="true"> <i>→</i><i>→</i><i>→</i> </span>
        </NuxtLink>
      </div>
    </section>

    <!-- ======================
     * Resources
     * ====================== -->
    <section class="resources">
      <h2 class="section-title resources-title">Resources</h2>

      <!-- ✅ 修正：確保 resource-card 是容器，resource-shape 是子元素 -->
      <div class="resource-card">
        <!-- Card 組件本身應該要帶有 resource-shape class -->
        <Card class="resource-shape" :items="items" base-path="/resources" />
      </div>

      <div class="look-more">
        <NuxtLink to="/resources">
          <span class="description">DISCOVER RESOURCES</span>
          <span class="arrow"><i>→</i><i>→</i><i>→</i></span>
        </NuxtLink>
      </div>
    </section>

    <!-- ======================
     * Services
     * ====================== -->
    <section class="services">
      <h2 class="services-title">Services</h2>

      <div class="services-card">
        <div class="card" v-for="n in 3" :key="n">
          <div class="card-head"></div>
          <div class="card-body">
            <div class="card-title">Service title</div>
            <div class="card-subtitle">Service subtitle</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ======================
     * About
     * ====================== -->
    <section class="about">
      <h2 class="section-title about-title">About</h2>

      <NuxtLink class="inorganic">
        <span class="pill" v-for="n in 6" :key="n" />
      </NuxtLink>

      <div class="look-more">
        <NuxtLink to="/about">
          <span class="description">DISCOVER ABOUT ME</span>
          <span class="arrow"><i>→</i><i>→</i><i>→</i></span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<style src="@/assets/css/pages/home.scss" lang="scss"></style>
<script setup>
import { computed, onMounted, nextTick } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Card from "@/components/Card.vue";
import Hero from "~/components/Hero.vue";

gsap.registerPlugin(ScrollTrigger);

/* ========================================
   Data Fetching
======================================== */
const { data: resourcesData } = await useFetch("/api/resources", {
  query: { limit: 2 },
  default: () => ({ items: [] }),
});
const items = computed(() => resourcesData.value?.items ?? []);

const { data: projectsData } = await useFetch("/api/projects", {
  query: { limit: 3 },
  default: () => ({ items: [] }),
});
const projects = computed(() => projectsData.value?.items ?? []);

/* ========================================
   Helpers
======================================== */
function shapeClass(index) {
  const shapes = ["square", "circle", "triangle"];
  return shapes[index] || "";
}

/* ========================================
   GSAP Scroll Reveal（改進版）
======================================== */
function revealOnScroll(selector, options = {}) {
  // 等待 DOM 完全渲染
  gsap.utils.toArray(selector).forEach((el) => {
    // ✅ 使用 to 而不是 from，確保元素一開始是隱藏狀態
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        end: "top 50%",
        toggleActions: "play none none reverse",
        // 取消 once，允許重複動畫
      },
      y: 0,
      opacity: 1,
      duration: options.duration ?? 0.7,
      ease: options.ease ?? "power3.out",
      delay: options.delay ?? 0,
    });
  });
}

/* ========================================
   Mounted Hook
======================================== */
onMounted(async () => {
  await nextTick();

  /* ==========================
     Project Hover Interaction
     ========================== */
  document.querySelectorAll(".project-shape").forEach((card) => {
    const shape = card.querySelector(".project-geometry");

    // ✅ 確保 shape 存在
    if (!shape) return;

    card.addEventListener("mouseenter", () => {
      gsap.to(shape, {
        x: gsap.utils.random(-8, 8),
        y: gsap.utils.random(-6, 6),
        rotate: gsap.utils.random(-4, 4),
        duration: 0.4,
        ease: "power3.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(shape, {
        x: 0,
        y: 0,
        rotate: 0,
        duration: 0.5,
        ease: "power3.inOut",
      });
    });
  });

  /* ==========================
     Project Timeline Animation
     ========================== */
  const projectTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".kv-section",
      start: "top 70%",
      toggleActions: "play none none none",
    },
  });

  projectTl
    .fromTo(
      ".project-title",
      { x: -40, opacity: 0 },
      {
        x: -230,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      }
    )
    .fromTo(
      ".project-shape",
      { y: 80, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.15,
      },
      "+=0.1"
    );

  /* ==========================
     Universal Reveal Animations
     ========================== */
  // ✅ 確保初始隱藏狀態
  gsap.set([".resource-shape", ".services-card", ".inorganic"], {
    opacity: 0,
    y: 40,
  });

  revealOnScroll(".resource-shape", { y: 30, duration: 0.7 });
  revealOnScroll(".services-card", { y: 40, duration: 0.7 });
  revealOnScroll(".inorganic", { y: 20, duration: 0.7 });
  revealOnScroll(".look-more", { y: 20, duration: 0.6 });
});
</script>
