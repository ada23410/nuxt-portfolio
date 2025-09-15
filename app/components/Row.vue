<template>
    <div class="wrap-box" :class="{ flip }">
        <!-- 左邊大卡：同一個 item -->
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
                <span class="tag" v-for="(t,i) in (item.tags || [])" :key="i">{{ t }}</span>

                <!-- MORE（整張卡已可點，這裡只做視覺，不再巢狀連結以避免 a 裡面包 a） -->
                <span class="look-more">
                <span class="look-more-text">MORE</span>
                <span class="arrow" aria-hidden="true"><i>→</i><i>→</i><i>→</i></span>
                </span>
            </div>
            </div>
        </div>
        </NuxtLink>

        <!-- 右邊小卡：同一個 item 的「side_*」決定要顯示什麼 -->
        <NuxtLink class="card-side" :to="to(item)">
            <div class="card-head">
                <!-- 第二張圖片 -->
                <div
                    v-if="sideType === 'image'"
                    class="square-img"
                    :style="bg(sideImage)"
                />
                <!-- 圓形 -->
                <div v-else-if="sideType === 'circle'" class="circle-img" />
                <!-- 膠囊群 -->
                <div v-else-if="sideType === 'pills'" class="inorganic">
                <span class="pill"></span>
                <span class="pill"></span>
                <span class="pill"></span>
                <span class="pill"></span>
                </div>
                <!-- 三角形 -->
                <div v-else-if="sideType === 'triangle'" class="triangle-svg">
                    <svg viewBox="0 0 350 350" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 160 44 Q 180 15, 200 44 L 265 214 Q 270 235, 248 244 L 96 244 Q 80 230, 85 215 Z" fill="#666666"/>
                    </svg>
                </div>
                <!-- none / 空：不顯示 -->
            </div>
            <div class="card-body">
                <div class="title">
                <div class="text">{{ item.title }}</div>
                </div>
            </div>
        </NuxtLink>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    item:     { type: Object, required: true },
    basePath: { type: String, default: '/projects' },
    flip:     { type: Boolean, default: false } // 交錯左右
})

const item = computed(() => props.item)
const sideType  = computed(() => String(item.value?.side_type || '').toLowerCase())
const sideImage = computed(() => item.value?.side_image || item.value?.image_url || item.value?.cover || '')

const bg = (url) => (url ? { backgroundImage: `url(${url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {})
const to = (it) => `${props.basePath}/${encodeURIComponent(String(it.slug ?? it.id))}`
</script>

<style scoped lang="scss">
.wrap-box {
    margin-bottom: 14rem;
    display: flex; 
    justify-content: space-between; 
    align-items: flex-start; 
    gap: 5rem;
    .order-1 { 
        order: 1; 
    } .order-2 { 
        order: 2; 
    }
    .card-main {
        flex: 2;

        .img {
            width: 100%;
            aspect-ratio: 2 / 1;
            border-radius: 60px;
            background: $color-text-light center / cover no-repeat;
        }

        .card-body {
            margin-top: 1.5rem;
        }

        .title {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 1rem;

            .text {
            font-size: $font-size-xxl;
            font-weight: 500;
            }

            .time {
            font-size: $font-size-lg;
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

            a {
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
    }   
    .card-side { 
        flex: 1;
        .card-head {
            .square-img { 
                width: 100%; 
                aspect-ratio: 1/1; 
                border-radius: 60px; 
                background: $color-text-light center/cover no-repeat; 
            }
            .circle-img { 
                width: 100%;
                aspect-ratio: 1/1; 
                background: $color-text-light; 
                border-radius: 50%; 
            }
            .inorganic { 
                display: flex; 
                gap: .5rem; 
                align-items: center; 
                justify-content: center;
                .pill { 
                    flex: 1; 
                    max-width: 110px; 
                    aspect-ratio: 1/3; 
                    border-radius: 90px; 
                    background: $color-text-light; 
                }
            }
            .triangle-svg { 
                width: 100%; 
                max-width: 350px; 
                aspect-ratio: 1/1; 
            }
            .placeholder { 
                width: 100%; 
                aspect-ratio: 1/1; 
                border-radius: 60px; 
                background: $color-bg-alt; 
            }
        }
    }
}
</style>
