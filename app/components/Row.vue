<template>
    <div class="wrap-box">
        <!-- 左側大卡（flip=false 在左、flip=true 在右） -->
        <div :class="['card-main', flip ? 'order-2' : 'order-1']">
        <div class="card-head">
            <div class="img" :style="bg(item.image_url)"></div>
        </div>
        <div class="card-body">
            <div class="title">
                <div class="text">{{ item.title }}</div>
                <div class="time">{{ item.published_at }}</div>
            </div>
            <div class="description">
            <p>{{ item.description }}</p>
            <div class="tag-list">
                <span v-for="(t, i) in item.tags" :key="i" class="tag">{{ t }}</span>
                <span class="look-more">
                <NuxtLink :to="`/projects/${encodeURIComponent(item.slug || item.id)}`">
                    <div class="look-more-text">MORE</div>
                    <div class="arrow" aria-hidden="true"><i>→</i><i>→</i><i>→</i></div>
                </NuxtLink>
                </span>
            </div>
            </div>
        </div>
        </div>

        <!-- 右側小卡（flip=false 在右、flip=true 在左） -->
        <div :class="['card-side', flip ? 'order-1' : 'order-2']">
        <div class="card-head">
            <!-- 根據 side_type 顯示造型：image / circle / pills / triangle / none -->
            <div v-if="item.side_type === 'image' && item.side_image_url"
                class="square-img" :style="bg(item.side_image_url)"></div>

            <div v-else-if="item.side_type === 'circle'" class="circle-img"></div>

            <div v-else-if="item.side_type === 'pills'" class="inorganic">
            <span class="pill"></span><span class="pill"></span><span class="pill"></span><span class="pill"></span>
            </div>

            <div v-else-if="item.side_type === 'triangle'" class="triangle-svg">
            <svg viewBox="0 0 350 350" xmlns="http://www.w3.org/2000/svg">
                <path d="M160 44 Q180 15,200 44 L265 214 Q270 235,248 244 L96 244 Q80 230,85 215 Z" fill="#666"/>
            </svg>
            </div>

            <div v-else class="placeholder"></div>
        </div>
        <div class="card-body">
            <div class="title"><div class="text">{{ item.title }}</div></div>
        </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    item: { type: Object, required: true },
    flip: { type: Boolean, default: false }
})
const bg = (url) => url ? ({ backgroundImage: `url(${url})` }) : {}
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
            aspect-ratio: 2/1; 
            border-radius: 60px; 
            background: $color-text-light center/cover no-repeat; 
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
        .description p { 
            font-size: $font-size-base; 
            font-weight: 300; 
            color: $color-text-light; 
            text-align: justify; 
            line-height: 1.5rem; 
        }
        .tag-list { 
            margin-top: 1.5rem; 
            display: flex; 
            align-items: center; 
            flex-wrap: wrap; 
            color: $color-text-light;
            .tag { 
                padding: .5rem 1rem; 
                border: .5px solid $color-border; 
                border-radius: 50px; 
                margin-right: .5rem; 
            } 
        }
        .look-more { 
            margin-left: auto; 
            flex: 0 0 auto; 
            text-align: right;
            --gap: .75rem; 
            --dur: .36s;
        a { display: inline-flex; align-items: center; gap: var(--gap); text-decoration: none; color: $color-text; }
        .look-more-text { font-size: $font-size-xl; font-weight: 500; transition: transform var(--dur) ease; }
        .arrow { font-size: $font-size-xl; display: inline-grid; grid-auto-flow: column; grid-auto-columns: 1.2em; overflow: hidden; width: 1.2em; transition: width var(--dur) ease; }
        .arrow i { transform: translateX(-100%); opacity: 0; transition: transform var(--dur) ease, opacity var(--dur) ease; }
        .arrow i:nth-child(1) { transform: translateX(0); opacity: 1; }
        a:hover .look-more-text { transform: translateX(.2rem); }
        a:hover .arrow { width: 4em; }
        a:hover .arrow i { transform: translateX(0); opacity: 1; }
        a:hover .arrow i:nth-child(2) { transition-delay: .04s; }
        a:hover .arrow i:nth-child(3) { transition-delay: .08s; }
        }
    }

    .card-side { flex: 1;
        .square-img { width: 100%; aspect-ratio: 1/1; border-radius: 24px; background: $color-text-light center/cover no-repeat; }
        .circle-img { width: 100%; aspect-ratio: 1/1; background: $color-text-light; border-radius: 50%; }
        .inorganic { display: flex; gap: .5rem; align-items: center; justify-content: center;
        .pill { flex: 1; max-width: 110px; aspect-ratio: 1/3; border-radius: 90px; background: $color-text-light; }
        }
        .triangle-svg { width: 100%; max-width: 350px; aspect-ratio: 1/1; }
        .placeholder { width: 100%; aspect-ratio: 1/1; border-radius: 24px; background: $color-bg-alt; }
        .card-body { margin-top: 1.5rem; }
        .title .text { font-size: $font-size-xxl; font-weight: 500; }
    }
}
</style>
