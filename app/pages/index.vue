<template>
  <Loader @done="loaderDone = true" />
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
     * Problem framing
     * ====================== -->
    <section class="problem-framing">
      <div class="problem-content">
        <p class="slogan-zh fragment-text">
          洞察往往支離破碎，解決方案難以回應真實需求。
        </p>
        <p class="slogan-en fragment-text">
          Where insights often stay fragmented,<br />
          and solutions fail to connect real human needs.
        </p>
      </div>
    </section>
    <!-- ======================
     * method
     * ====================== -->
    <section class="method-section">
      <div class="method-shapes">
        <div class="project-geometry square">
          <span>Systems</span>
        </div>
        <div class="project-geometry circle">
          <span>Relationships</span>
        </div>
        <div class="project-geometry triangle">
          <span>Decisions</span>
        </div>
      </div>

      <p class="method-slogan zh">我將複雜問題轉化為清晰的結構、流程與決策。</p>
      <p class="method-slogan en">
        I translate complexity into clear structures, flows, and decisions.
      </p>
    </section>
    <!-- ======================
     * Projects
     * ====================== -->
    <section id="projects" class="kv-section">
      <h2 class="section-title project-title">
        Here’s how those ideas turn into real-world work.
      </h2>

      <div class="project-card project-blocks">
        <NuxtLink
          v-for="(project, index) in projects"
          :key="project.id"
          :to="`/projects/${project.id}`"
          class="project-shape"
        >
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
      <h2 class="section-title resources-title">
        I document, reflect, and share what I learn along the way.
      </h2>
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
      <h2 class="services-title">
        If you’re facing similar challenges, this is how we can work together.
      </h2>

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

      <p class="about-slogan">
        I’m Aida — a designer-turned-developer working at the intersection of research,
        systems, and AI.
      </p>
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
import { computed, onMounted, nextTick, ref, watch } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Loader from "~/components/Loader.vue";
import Card from "@/components/Card.vue";
import Hero from "~/components/Hero.vue";

gsap.registerPlugin(ScrollTrigger);

/* -----------------------
   State（關鍵）
----------------------- */
const loaderDone = ref(false); // Loader 是否結束
const pageReady = ref(false); // DOM 是否真的 ready

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

/* ---------- Problem Fragment ---------- */
function initFragmentText() {
  document.querySelectorAll(".fragment-text").forEach((el) => {
    const text = el.innerText.trim();
    el.innerHTML = text
      .split("")
      .map((char) => (char === " " ? "&nbsp;" : `<span class="char">${char}</span>`))
      .join("");
  });

  gsap.from(".fragment-text .char", {
    opacity: 0,
    y: 12,
    rotate: -3,
    stagger: { each: 0.015, from: "random" },
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".problem-framing",
      start: "top 65%",
    },
  });
}

/* ---------- Hero ---------- */
function initHeroScrollTimeline() {
  // 防止重複建立 Hero pin
  if (ScrollTrigger.getById("hero")) return;

  const heroTl = gsap.timeline({
    scrollTrigger: {
      id: "hero",
      trigger: ".Hero-section",
      start: "top top",
      end: () => "+=" + window.innerHeight * 1.2,
      pin: true,
      pinSpacing: true,
      scrub: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onLeave: () => {
        initAfterHero(); // Hero 結束後才做後面
      },
    },
  });

  heroTl
    .from(".hero-line", {
      opacity: 0,
      y: 40,
      ease: "power3.out",
    })
    .to(".hero-line", {
      letterSpacing: "0.12em",
      ease: "power2.out",
    })
    .from(".scroll", {
      opacity: 0,
      y: -10,
      ease: "power2.out",
    });
}

/* ---------- Hover ---------- */
function initProjectHover() {
  document.querySelectorAll(".project-shape").forEach((card) => {
    const shape = card.querySelector(".project-geometry");
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
}

/* ---------- Project Section ---------- */
function initProjectTimeline() {
  const projectTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".kv-section",
      start: "top 70%",
      toggleActions: "play none none none",
    },
  });

  projectTl
    .from(".project-title", {
      x: -40,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    })
    .from(
      ".project-shape",
      {
        y: 80,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.15,
      },
      "+=0.1"
    );
}

/* ---------- Generic Reveal ---------- */
function revealOnScroll(targets, triggerEl, options = {}) {
  gsap.fromTo(
    targets,
    { opacity: 0, y: options.fromY ?? 40 },
    {
      opacity: 1,
      y: 0,
      duration: options.duration ?? 0.8,
      ease: "power3.out",
      stagger: options.stagger ?? 0.15,
      scrollTrigger: {
        trigger: triggerEl,
        start: "top 70%",
      },
    }
  );
}

function initAfterHero() {
  initFragmentText();
  animateFragmentText();
  initProjectHover();
  initProjectTimeline();

  revealOnScroll(".resource-shape", ".resources");
  revealOnScroll(".services-card .card", ".services");
  revealOnScroll(".inorganic .pill", ".about");

  ScrollTrigger.refresh();
}

/* ========================================
   DOM Ready
======================================== */
onMounted(async () => {
  await nextTick();
  requestAnimationFrame(() => {
    pageReady.value = true;
  });
});

/* ========================================
   Sequence Control（最重要）
======================================== */
watch(
  [loaderDone, pageReady],
  async ([loader, page]) => {
    if (!loader || !page) return;

    await nextTick();

    // Hero：接管 scroll
    initHeroScrollTimeline();
  },
  { once: true }
);
</script>
