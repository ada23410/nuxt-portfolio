<template>
  <div class="loader" v-if="visible">
    <div class="loader-spinner">{{ progress }}%</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";

const emit = defineEmits(["done"]);

const progress = ref(0);
const visible = ref(true);

onMounted(() => {
  // ① 倒數百分比動畫
  gsap.to(progress, {
    value: 100,
    duration: 1, // 控制整個 loader 時長
    ease: "power2.out",
    onUpdate: () => {
      progress.value = Math.round(progress.value);
    },
    onComplete: () => {
      // ② 淡出 Loader
      gsap.to(".loader", {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          visible.value = false;
          emit("done"); // 告訴首頁「我好了」
        },
      });
    },
  });
});
</script>

<style scoped lang="scss">
.loader {
  width: 100vw;
  height: 100vh;
  background-color: $color-primary;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  .loader-spinner {
    font-size: 3rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: $color-text-white;
  }
}
</style>
