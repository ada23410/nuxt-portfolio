<template>
  <div class="wrap-box" :class="{ flip }">
    <!-- 左邊大卡 -->
    <NuxtLink class="card-main" :to="to(item)">
      <div class="card-head">
        <div class="img" :style="bg(item.image_url || item.cover)"></div>
      </div>
      <div class="card-body">
        <div class="title">
          <div class="text">{{ item.title }}</div>
          <div class="time">{{ item.published_at }}</div>
        </div>
        <div class="description">
          <p>{{ item.description }}</p>

          <div class="tag-list">
            <span class="tag" v-for="(t, i) in item.tags || []" :key="i">{{ t }}</span>

            <!-- MORE（整張卡已可點，這裡只做視覺，不再巢狀連結以避免 a 裡面包 a） -->
            <span class="look-more">
              <span class="look-more-text">MORE</span>
              <span class="arrow" aria-hidden="true"><i>→</i><i>→</i><i>→</i></span>
            </span>
          </div>
        </div>
      </div>
    </NuxtLink>

    <!-- 右邊小卡 -->
    <NuxtLink class="card-side" :to="to(item)">
      <div class="card-head">
        <div
          v-if="['square', 'circle', 'triangle'].includes(sideType)"
          :class="sideTypeClass"
        >
          <div class="img" :style="bg(sideImage)"></div>
        </div>

        <!-- pills -->
        <div v-else-if="sideType === 'pills'" class="inorganic">
          <div class="pill" v-for="i in 3" :key="i">
            <div class="img" :style="bg(sideImage)"></div>
          </div>
        </div>

        <!-- placeholder -->
        <div v-else class="placeholder"></div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  basePath: {
    type: String,
    default: "/projects",
  },
  flip: {
    type: Boolean,
    default: false,
  },
});

// 前端統一取後端欄位
const sideType = computed(() => String(props.item?.side_type || "").toLowerCase());

const sideImage = computed(() => props.item?.side_image_url || "");

const sideTypeClass = computed(() => {
  switch (sideType.value) {
    case "circle":
      return "circle-img";
    case "pills":
      return "inorganic";
    case "triangle":
      return "triangle-svg";
    default:
      return "square-img"; // square / image / none 預設走方形框
  }
});
const cover = computed(() => props.item?.cover || "");

const bg = (url: string) =>
  url
    ? {
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {};

const to = (it: any) =>
  `${props.basePath}/${encodeURIComponent(String(it.slug ?? it.id))}`;
</script>

<style scoped lang="scss">
.wrap-box {
  margin-bottom: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 5rem;

  &.flip {
    flex-direction: row-reverse;
  }
  .order-1 {
    order: 1;
  }
  .order-2 {
    order: 2;
  }
  .card-main {
    flex: 2;
    text-decoration: none;
    .img {
      width: 100%;
      aspect-ratio: 2 / 1;
      border-radius: 60px;
      background: $color-text-light center / cover no-repeat;
    }
    .card-body {
      margin-top: 1.5rem;
      .title {
        margin-bottom: 1rem;
        .text {
          font-size: $font-size-xl;
          font-weight: 500;
          line-height: 2rem;
          color: $color-text;
          margin-bottom: 0.2rem;
        }
        .time {
          font-size: $font-size-base;
          color: $color-text-light;
        }
      }
      .description {
        p {
          font-size: $font-size-base;
          font-weight: 300;
          color: $color-text-light;
          text-align: justify;
          line-height: 1.5rem;
        }
      }
    }
    .tag-list {
      margin-top: 1.5rem;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      color: $color-text-light;
      .tag {
        padding: 0.5rem 1rem;
        border: 0.5px solid $color-border;
        border-radius: 50px;
        margin-right: 0.5rem;
      }
    }
    .look-more {
      margin-left: auto;
      flex: 0 0 auto;
      text-align: right;
      --gap: 0.75rem;
      --dur: 0.36s;
      display: inline-flex;
      align-items: center;
      gap: var(--gap);
      text-decoration: none;
      color: $color-text;
      .look-more-text {
        font-size: $font-size-xl;
        font-weight: 500;
        transition: transform var(--dur) ease;
      }
      .arrow {
        font-size: $font-size-xl;
        display: inline-grid;
        grid-auto-flow: column;
        grid-auto-columns: 1.2em;
        overflow: hidden;
        width: 1.2em;
        transition: width var(--dur) ease;
        i {
          transform: translateX(-100%);
          opacity: 0;
          transition: transform var(--dur) ease, opacity var(--dur) ease;
          &:nth-child(1) {
            transform: translateX(0);
            opacity: 1;
          }
        }
      }
      &:hover,
      &:focus-visible {
        .look-more-text {
          transform: translateX(0.2rem);
        }
        .arrow {
          width: 4em;
          i {
            transform: translateX(0);
            opacity: 1;

            &:nth-child(2) {
              transition-delay: 0.04s;
            }
            &:nth-child(3) {
              transition-delay: 0.08s;
            }
          }
        }
      }
    }
  }

  // 右邊小卡片
  .card-side {
    flex: 1;
    text-decoration: none;
    .card-head {
      display: flex;
      justify-content: center;
      // 共用設定
      .square-img,
      .circle-img,
      .inorganic,
      .triangle-svg,
      .placeholder {
        width: 100%;
        max-width: 350px;
        aspect-ratio: 1/1;
        position: relative;
        overflow: hidden;
        .img {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
        }
      }
      // 方形
      .square-img {
        border-radius: 60px;
      }
      // 圓形
      .circle-img {
        border-radius: 50%;
      }
      // 膠囊群
      .inorganic {
        --w: clamp(80px, 8vw, 100px); /* 每顆膠囊的寬 */
        --h: clamp(200px, 18vw, 250px); /* 每顆膠囊的高 */
        --r: 60px; /* 圓角半徑 */
        --overlap: 5px; /* 重疊量 */
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 350px;
        aspect-ratio: 1/1;
        .pill {
          width: var(--w);
          height: var(--h);
          border-radius: calc(var(--r) * 1.5);
          background: $color-text-light;
          overflow: hidden;
          position: relative;
          transition: background 0.3s;
          .img {
            width: 100%;
            height: 100%;
            border-radius: inherit;
            background-size: cover;
            background-position: center;
          }
        }
        .pill + .pill {
          margin-left: calc(-1 * var(--overlap));
        }
      }
      // 三角形
      .triangle-svg {
        width: 100%;
        max-width: 350px;
        aspect-ratio: 1/1;
        position: relative;
        overflow: hidden;
        .img {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          -webkit-mask-image: url("/rounded-triangle.svg");
          -webkit-mask-repeat: no-repeat;
          -webkit-mask-size: contain;
          -webkit-mask-position: center;
          mask-image: url("/rounded-triangle.svg");
          mask-repeat: no-repeat;
          mask-size: contain;
          mask-position: center;
        }
      }
      .placeholder {
        border-radius: 60px;
        background: $color-bg-alt;
      }
    }
  }
}
</style>
