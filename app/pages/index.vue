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
            <NuxtLink
                    v-for="(project, index) in projects"
                    :key="project.id"
                    :to="`/projects/${project.id}`"
                    class="project-shape"
                >
                    <div
                        :class="shapeClass(index)"
                        :style="{ backgroundImage: `url(${project.cover || ''})` }"
                    >
                </div>
            </NuxtLink>
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
            <Card :items="items" base-path="/resources"/>
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

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import Card from '@/components/Card.vue'

function shapeClass(index) {
    if (index === 0) return 'square'
    if (index === 1) return 'circle'
    if (index === 2) return 'triangle'
    return ''
}
// get resources
const { data: resourcesData } = await useFetch('/api/resources', {
    query: { 
        limit: 2 
    },
    default: () => ({ 
        items: [] 
    })
})

const items = computed(() => resourcesData.value?.items ?? [])

// get projects
const { data: projectsData } = await useFetch('/api/projects', {
    query: { 
        limit: 3 
    },
    default: () => ({ 
        items: [] 
    })
})

// 取出 items，避免 null
const projects = computed(() => projectsData.value?.items ?? [])

/** 啟用某個區塊內的視差 */
function useParallaxSection(sectionEl, selector, strength = 220) {
    if (!sectionEl || typeof window === 'undefined') return () => {}

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    const els = Array.from(sectionEl.querySelectorAll(selector))
    const layers = els.map(el => ({
        el,
        speed: Number(el.dataset.speed || 0.2),
        y: 0,
        target: 0
    }))
    let ticking = false

    const getProgress = () => {
        const r = sectionEl.getBoundingClientRect()
        const vh = window.innerHeight || document.documentElement.clientHeight
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
const projectSection = ref(null)
const resourcesRef   = ref(null)
const aboutRef       = ref(null)
const cleanups = []

onMounted(() => {
    if (projectSection.value) {
        cleanups.push(
        useParallaxSection(projectSection.value, '.square, .circle, .triangle-svg', 220)
        )
    }
    if (resourcesRef.value) {
        cleanups.push(useParallaxSection(resourcesRef.value, '.resource-card', 220))
    }
    if (aboutRef.value) {
        cleanups.push(useParallaxSection(aboutRef.value, '.inorganic', 220))
    }
})

onBeforeUnmount(() => {
    cleanups.forEach(fn => fn())
})
</script>

<style lang="scss" scoped>
.container {
    padding: 10rem 14rem;
    background-color: $color-bg;

    .Hero-section {
        display: flex; 
        justify-content: space-between; 
        align-items: end;
        h1 { 
            font-size: $font-size-giant; 
            font-family: "La Belle Aurore", cursive; 
            line-height: 5.5rem; }
        h2 { 
            font-size: $font-size-giant; 
            font-weight: 600; 
            line-height: 5rem; 
            width: 70%; 
        }
        p  {
            max-width: 26rem; 
            font-size: $font-size-base; 
            line-height: 2rem; 
            font-weight: 400; 
            color: $color-text; 
        }
    }

    .kv-section, .resources, .about {
        position: relative; 
        margin-bottom: 8rem;
        .section-title {
            position: absolute; 
            left: 50%; 
            top: 15%; 
            transform: translateX(-50%);
            font-size: 15rem; 
            font-weight: 800; 
            letter-spacing: -10px; 
            font-style: italic;
            color: $color-bg-alt;
            z-index: 0;
        }
        .resources-title { 
            @extend .section-title; 
            top: -3%; 
        }
        .about-title     { 
            @extend .section-title; 
            top: 0%; 
        }
        .project-card {
            display: flex;
            justify-content: space-between;
            min-height: 600px;
            gap: 2rem; 
            padding: 5rem 0;
            .project-shape {
                width: 378px;
                aspect-ratio: 1/1;
                background-size: cover;
                background-position: center;
                display: flex;                  // 內層再包 shape
                justify-content: center;
                align-items: center;
                .square {
                    align-self: center;
                    width: 100%;
                    max-width: 387px;
                    aspect-ratio: 1/1;
                    background-color: $color-text-light;
                    border-radius: 60px;
                }

                .circle {
                    align-self: flex-end;
                    width: 100%;
                    max-width: 387px;
                    aspect-ratio: 1/1;
                    background-color: $color-text-light;
                    border-radius: 50%;
                }

                .triangle {
                    align-self: flex-start;
                    width: 100%;
                    max-width: 387px;
                    aspect-ratio: 1/1;
                    background-color: $color-text-light;
                    -webkit-mask-image: url('/rounded-triangle.svg');
                    -webkit-mask-repeat: no-repeat;
                    -webkit-mask-size: contain;
                    -webkit-mask-position: center;
                    mask-image: url('/rounded-triangle.svg');
                    mask-repeat: no-repeat;
                    mask-size: contain;
                    mask-position: center;
                }
            }
        }

        .inorganic {
                --h: clamp(540px, 30vw, 630px);
                --w: clamp(260px, 20vw, 260px);
                --r: 90px;
                --overlap: 10px;

                display: flex;
                align-items: center;
                justify-content: center;
                padding: 5rem 0;

                .pill {
                    width: var(--w);
                    height: var(--h);
                    border-radius: calc(var(--r) * 1.5);
                    background: $color-text-light;
                    position: relative;
                }

                .pill + .pill {
                    margin-left: calc(-1 * var(--overlap));
                }
            }

            .look-more {
            text-align: left;
            --gap: .75rem;
            --dur: .36s;

            a {
                display: inline-flex;
                align-items: center;
                gap: var(--gap);
                text-decoration: none;
                color: $color-text;

                .description {
                font-size: $font-size-xxl;
                font-weight: 500;
                margin-right: .25rem;
                transition: transform var(--dur) ease;
                }

                .arrow {
                font-size: $font-size-xxl;
                position: relative;
                display: inline-grid;
                grid-auto-flow: column;
                grid-auto-columns: 1.2em;
                overflow: hidden;
                width: 1.2em;
                transition: width var(--dur) ease;

                i {
                    display: inline-block;
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
                color: $color-text;

                .description {
                    transform: translateX(.2rem);
                }

                .arrow {
                    width: 4em;

                    i {
                    transform: translateX(0);
                    opacity: 1;

                    &:nth-child(2) { transition-delay: .04s; }
                    &:nth-child(3) { transition-delay: .08s; }
                    }
                }
                }
            }
        }
    }
}
</style>
