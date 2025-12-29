<template>
  <h1 class="hero">
    <div class="line">
      <span class="word turning">
        <span class="box">
          <span class="handle tl"></span>
          <span class="handle tc"></span>
          <span class="handle tr"></span>
          <span class="handle ml"></span>
          <span class="handle mr"></span>
          <span class="handle bl"></span>
          <span class="handle bc"></span>
          <span class="handle br"></span>
        </span>
        Turning
      </span>
      <span class="word insights mask-area">
        <!-- 原本的字（底層） -->
        <span class="text-base">insights</span>

        <!-- 放大鏡層 -->
        <span class="lens">
          <span class="text-zoom"> insights <span class="symbol">◉</span> </span>
        </span>
      </span>
    </div>
    <div class="line">
      <span class="word into">
        int
        <span class="o-stack">
          <span class="o o-1"></span>
          <span class="o o-2"></span>
          <span class="o o-3"></span>
        </span>
      </span>
      <span class="word stories">
        stories
        <span class="underline"></span> </span
      ><br />
    </div>

    <div class="line">
      <span class="word that">that</span>
      <span class="word inspire"> in<span class="spire">spire</span> </span>
      <span class="word change"> change. </span>
    </div>
  </h1>
  <h2 class="subtitle">從理解人開始，邁向解決問題的設計</h2>
</template>
<script setup>
import { computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ---------- data fetch（你原本的） ---------- */

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

/* ---------- helpers ---------- */

function shapeClass(index) {
  if (index === 0) return "square";
  if (index === 1) return "circle";
  if (index === 2) return "triangle";
  return "";
}

/* ---------- onMounted ---------- */

onMounted(async () => {
  if (process.server) return;

  await nextTick();
  requestAnimationFrame(() => {
    emit("ready"); // 告訴父層：hero DOM OK
  });

  /* ===============================
     Hero GSAP timeline（新增）
     =============================== */

  const tl = gsap.timeline({ delay: 0.25 });

  tl.from(".turning", { opacity: 0, y: 12, duration: 0.35 })
    .fromTo(
      ".turning .box",
      { scaleX: 0, opacity: 0 },
      { scaleX: 1.05, opacity: 1, duration: 0.45, ease: "power3.out" },
      "-=0.15"
    )
    .to(".turning .box", { scaleX: 1, duration: 0.18 }, "-=0.12")

    .from(".insights", {
      x: -56,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    })
    .to(
      ".insights",
      {
        skewX: -5,
        duration: 0.4,
        ease: "power2.inOut",
      },
      "-=0.25"
    )

    .from(".o-1", { scale: 0, opacity: 0, duration: 0.28, ease: "back.out(1.6)" })
    .from(
      ".o-2",
      { scale: 0, opacity: 0, duration: 0.28, ease: "back.out(1.6)" },
      "-=0.14"
    )
    .from(
      ".o-3",
      { scale: 0, opacity: 0, duration: 0.28, ease: "back.out(1.6)" },
      "-=0.14"
    )

    .fromTo(
      ".stories .underline",
      { width: "0%", x: "-10%" },
      { width: "100%", x: "0%", duration: 0.5, ease: "power3.out" }
    )

    .fromTo(
      ".inspire",
      { backgroundColor: "transparent", color: "#000" },
      { backgroundColor: "#000", color: "#fff", duration: 0.35 }
    )
    .to(".spire", { color: "#5bc95b", duration: 0.25 }, "-=0.1");

  ScrollTrigger.create({
    trigger: ".hero",
    start: "top 70%",
    animation: tl,
    once: true,
  });
  /* ===============================
     scroll reveal
     =============================== */

  const elements = document.querySelectorAll(
    ".project-shape, .look-more, .resource-shape, .services-card, .inorganic"
  );

  const onScroll = () => {
    const triggerY = window.innerHeight * 0.7;
    elements.forEach((el) => {
      if (el.getBoundingClientRect().top < triggerY) {
        el.classList.add("visible");
      }
    });
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", onScroll);
  });
});
</script>

<style lang="scss" scoped>
/* Hero 容器：只負責排版，不負責字級 */
.hero {
  width: 100%;
  text-align: center;
  font-size: 1rem;
  line-height: 1.1;
  font-weight: 700;
}

.subtitle {
  font-size: $font-size-lg;
  font-weight: 400;
  margin-top: 2rem;
}
.line {
  display: block;
  margin: 0.5em 0;
}

/* =========================
 * Words
 * ========================= */

.word {
  display: inline-block;
  position: relative;
  font-size: clamp(48px, 6vw, 96px); // 主字級控制點
  margin: 0;

  // &:hover {
  //   transform: translateY(-4px);
  //   transition: transform 0.3s;
  // }
}

.hover-focus {
  display: inline-block; // 🔥 必須
  transform-origin: center;
  will-change: transform;
}

/* =========================
 * Turning (boxed word)
 * ========================= */

.turning {
  position: relative;
  padding: 0.07em 0.15em;
  margin-right: 0.22em;

  .box {
    position: absolute;
    inset: -0.01em -0.0001em;
    border: 2px solid #000;
    pointer-events: none;
    opacity: 0;
    transform: scaleX(0);
    transform-origin: left center;
  }
}

/* 控制點（小方塊） */
.handle {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #fff;
  border: 2px solid #000;
  box-sizing: border-box;

  /* top */
  &.tl {
    top: -7px;
    left: -6px;
  }
  &.tc {
    top: -7px;
    left: 50%;
    transform: translateX(-50%);
  }
  &.tr {
    top: -7px;
    right: -6px;
  }

  /* middle */
  &.ml {
    top: 50%;
    left: -6px;
    transform: translateY(-50%);
  }
  &.mr {
    top: 50%;
    right: -6px;
    transform: translateY(-50%);
  }

  /* bottom */
  &.bl {
    bottom: -7px;
    left: -6px;
  }
  &.bc {
    bottom: -7px;
    left: 50%;
    transform: translateX(-50%);
  }
  &.br {
    bottom: -7px;
    right: -6px;
  }
}

/* =========================
 * Insights
 * ========================= */

.insights {
  font-style: italic;
  transform: skewX(0deg);
}

.mask-area {
  position: relative;
}

.text-base {
  position: relative;
  z-index: 1;
}

.lens {
  position: absolute;
  top: 0;
  left: 0;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  pointer-events: none;

  opacity: 0;
  z-index: 2;
}

.text-zoom {
  font-size: 1.3em; // 🔥 放大倍率
  font-weight: inherit;
  white-space: nowrap;

  transform: translate(-20%, -20%);
}

.symbol {
  color: #5bc95b;
  margin-left: 0.1em;
}
/* =========================
 * Into (o-stack)
 * ========================= */

.into {
  display: inline-block;
}

.o-stack {
  position: relative;
  display: inline-block;
  width: 0.6em;
  height: 0.6em;
  margin: 0 0.05em;
  vertical-align: middle;

  .o {
    position: absolute;
    inset: 0;
    border-radius: 50%;
  }

  .o-1 {
    background: #9be28f; // 淺綠
    transform: translate(-0.4em, 0);
  }

  .o-2 {
    background: #5bc95b; // 主綠
    transform: translate(-0.3em, 0);
  }

  .o-3 {
    background: #2f9e44; // 深綠
    transform: translate(-0.2em, 0);
  }
}

/* =========================
 * Stories (underline)
 * ========================= */

.stories {
  position: relative;
  z-index: 0;

  .underline {
    position: absolute;
    left: 0;
    bottom: 0.1em;
    height: 0.5em;
    width: 0%;
    background: #5bc95b;
    z-index: -1;
  }
}

/* =========================
 * Inspire
 * ========================= */

.inspire {
  background: #000;
  color: #fff;
  padding: 0.05em 0.2em;
  margin: 0 0.22em;

  &.is-active {
    background: #000;
    color: #fff;
  }
}

.spire {
  &.is-green {
    color: #5bc95b;
  }
}
</style>
