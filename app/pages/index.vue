<template>
    <div class="container">
        <div class="Hero-section">
        <div>
            <h1>Designing with Empathy,</h1>
            <h2>Developing with Precision.</h2>
        </div>
        <div>
            <p>
            專注於體驗細節與效能品質，將設計與開發融入可靠的數位服務，讓每一次互動都兼具人性的溫度與科技的精準。
            </p>
        </div>
        </div>
        <div class="kv-section" ref="projectSection">
        <div class="section-title">Project</div>
        <div class="project-card">
            <div class="square" data-speed="0.15"></div>
            <div class="circle" data-speed="0.25"></div>
            <div class="triangle-svg" data-speed="0.35">
                <svg viewBox="0 0 387 370">
                    <path
                    d="M 193.5 15
                        Q 208.5 0, 223.5 15
                        L 372 340
                        Q 390 370, 323 390
                        L 15 370
                        Q 0 360, 15 335
                        Z"
                    fill="#666666"
                    />
                </svg>
            </div>
        </div>
        <div class="look-more">
            <NuxtLink to="/projects">
            <div class="description">DISCOVER PROJECTS</div>
            <div class="arrow" aria-hidden="true">
                <i>→</i><i>→</i><i>→</i>
            </div>
            </NuxtLink>
        </div>
        </div>

        <div class="resources" ref="resourcesRef">
        <div class="resources-title">Resources</div>
        <div class="resource-card" data-speed="0.22">
            <!-- 先保留靜態卡片；之後可換成 v-for 渲染 Notion posts -->
            <div class="card">
            <div class="card-head"><div class="img" /></div>
            <div class="card-body">
                <div class="title">
                <div class="text">Title</div>
                <div class="time">2025.06.01_______</div>
                </div>
                <div class="description">
                <p>Lorem ipsum dolor sit amet…</p>
                <div class="tag"><span>tag</span><span>tag</span></div>
                </div>
            </div>
            </div>

            <div class="card">
            <div class="card-head"><div class="img" /></div>
            <div class="card-body">
                <div class="title">
                <div class="text">Title</div>
                <div class="time">2025.06.01_______</div>
                </div>
                <div class="description">
                <p>Lorem ipsum dolor sit amet…</p>
                <div class="tag"><span>tag</span><span>tag</span></div>
                </div>
            </div>
            </div>
        </div>

        <div class="look-more">
            <NuxtLink to="/resources">
            <div class="description">DISCOVER RESOURCES</div>
            <div class="arrow" aria-hidden="true">
                <i>→</i><i>→</i><i>→</i>
            </div>
            </NuxtLink>
        </div>
        </div>

        <div class="about" ref="aboutRef">
        <div class="about-title">About</div>
        <div class="inorganic" data-speed="0.40">
            <span class="pill"></span><span class="pill"></span><span class="pill"></span>
            <span class="pill"></span><span class="pill"></span><span class="pill"></span>
        </div>
        <div class="look-more">
            <NuxtLink to="/about">
            <div class="description">DISCOVER ABOUT ME</div>
            <div class="arrow" aria-hidden="true">
                <i>→</i><i>→</i><i>→</i>
            </div>
            </NuxtLink>
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

/** 啟用某個區塊內的視差 */
function useParallaxSection(sectionEl: HTMLElement, selector: string, strength = 220) {
    if (!sectionEl) return () => {}
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = Array.from(sectionEl.querySelectorAll<HTMLElement>(selector))
    const layers = els.map(el => ({ el, speed: Number(el.dataset.speed || 0.2), y: 0, target: 0 }))
    let ticking = false

    const getProgress = () => {
        const r = sectionEl.getBoundingClientRect()
        const vh = window.innerHeight
        const sectionCenter = r.top + r.height / 2
        const viewportCenter = vh / 2
        const dist = sectionCenter - viewportCenter
        const maxDist = (vh + r.height) / 2
        const p = dist / maxDist
        return Math.max(-1, Math.min(1, p))
    }

    const update = () => {
        const p = getProgress()
        for (const s of layers) {
        s.target = p * strength * s.speed
        s.y += (s.target - s.y) * 0.12
        s.el.style.transform = reduced ? '' : `translate3d(0, ${s.y.toFixed(2)}px, 0)`
        }
        ticking = false
    }

    const onScroll = () => {
        if (ticking) return
        ticking = true
        requestAnimationFrame(update)
    }

    els.forEach(el => (el.style.willChange = 'transform'))
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()

    return () => {
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onScroll)
    }
}

/* refs */
const projectSection = ref<HTMLElement | null>(null)
const resourcesRef   = ref<HTMLElement | null>(null)
const aboutRef       = ref<HTMLElement | null>(null)
const cleanups: Array<() => void> = []

onMounted(() => {
    if (projectSection.value) {
        cleanups.push(useParallaxSection(projectSection.value, '.square, .circle, .triangle-svg', 220))
    }
    if (resourcesRef.value) {
        cleanups.push(useParallaxSection(resourcesRef.value, '.resource-card', 220))
    }
    if (aboutRef.value) {
        cleanups.push(useParallaxSection(aboutRef.value, '.inorganic', 220))
    }
})

onBeforeUnmount(() => { cleanups.forEach(fn => fn()) })
</script>

<style lang="scss" scoped>
.container {
    padding: 10rem 14rem;
    background-color: $color-bg;

    .Hero-section {
        display: flex; justify-content: space-between; align-items: end;
        h1 { font-size: $font-size-giant; font-family: "La Belle Aurore", cursive; line-height: 5.5rem; }
        h2 { font-size: $font-size-giant; font-weight: 600; line-height: 5rem; width: 70%; }
        p  { max-width: 26rem; font-size: $font-size-base; line-height: 2rem; font-weight: 400; color: $color-text; }
    }

    .kv-section, .resources, .about {
        position: relative; margin-bottom: 8rem;

        .section-title {
        position: absolute; left: 50%; top: 15%; transform: translateX(-50%);
        font-size: 15rem; font-weight: 800; letter-spacing: -10px; font-style: italic;
        color: $color-bg-alt; z-index: 0;
        }
        .resources-title { @extend .section-title; top: -3%; }
        .about-title     { @extend .section-title; top: 0%; }

        .project-card {
        position: relative; z-index: 1; padding: 10rem 0; width: 100%; min-height: 600px;
        display: flex; justify-content: space-between; gap: 2rem;
        > div { will-change: transform; }

        .square {
            width: 100%; max-width: 387px; aspect-ratio: 1 / 1;
            background-color: $color-text-light; border-radius: 60px; align-self: center;
        }
        .circle {
            width: 100%; max-width: 387px; aspect-ratio: 1 / 1;
            background-color: $color-text-light; border-radius: 50%; align-self: flex-end;
        }
        .triangle-svg { width: 100%; max-width: 387px; aspect-ratio: 387 / 370; align-self: flex-start;
            svg { width: 100%; height: 100%; }
        }
        }

        .resource-card {
        position: relative; z-index: 1; padding: 10rem 0;
        display: grid; justify-items: center; align-items: center;
        grid-template-columns: repeat(2, 1fr); gap: 5rem;

        .card {
            max-width: 540px; width: 100%;
            .img { width: 100%; aspect-ratio: 1 / 1; border-radius: 60px; background-color: $color-text-light; }
            .card-body { margin-top: 1.5rem; }
            .title { display: flex; justify-content: space-between; align-items: baseline;
            .text { font-size: $font-size-xxl; font-weight: 500; }
            .time { font-size: $font-size-lg; font-weight: 400; color: $color-text-light; }
            }
            .description { margin-top: 1rem;
            p { font-size: $font-size-base; font-weight: 300; color: $color-text-light; text-align: justify; line-height: 1.5rem; }
            }
            .tag { margin-top: 1.5rem; font-size: $font-size-base; font-weight: 400; color: $color-text-light;
            span { padding: .5rem 1rem; border: .5px solid $color-border; border-radius: 50px; margin-right: .5rem; }
            }
        }
        }

        .inorganic {
        --h: clamp(540px, 30vw, 630px);
        --w: clamp(260px, 20vw, 260px);
        --r: 90px;
        --overlap: 10px;
        display: flex; align-items: center; justify-content: center; padding: 10rem 0;
        .pill { width: var(--w); height: var(--h); border-radius: calc(var(--r) * 1.5); background: $color-text-light; position: relative; }
        .pill + .pill { margin-left: calc(-1 * var(--overlap)); }
        }

        .look-more {
        text-align: left; --gap: .75rem; --dur: .36s;
        a { display: inline-flex; align-items: center; gap: var(--gap); text-decoration: none; color: $color-text;
            .description { font-size: $font-size-xxl; font-weight: 500; margin-right: .25rem; transition: transform var(--dur) ease; }
            .arrow { font-size: $font-size-xxl; position: relative; display: inline-grid; grid-auto-flow: column; grid-auto-columns: 1.2em; overflow: hidden; width: 1.2em; transition: width var(--dur) ease;
            i { display: inline-block; transform: translateX(-100%); opacity: 0; transition: transform var(--dur) ease, opacity var(--dur) ease;
                &:nth-child(1) { transform: translateX(0); opacity: 1; }
            }
            }
            &:hover, &:focus-visible {
            color: $color-text;
            .description { transform: translateX(.2rem); }
            .arrow { width: 4em;
                i { transform: translateX(0); opacity: 1; &:nth-child(2) { transition-delay: .04s; } &:nth-child(3) { transition-delay: .08s; } }
            }
            }
        }
        }
    }
}
</style>
