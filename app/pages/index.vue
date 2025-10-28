<template>
    <div class="container">
        <div class="Hero-section">
        <div>
            <h1 id="typed-line1"></h1>
            <h2 id="typed-line2"></h2>
            <h3 id="typed-line3"></h3>
        </div>
        <div>
            <p>
                From understanding people to shaping meaningful change.
            </p>
        </div> 
        </div>
        <div class="kv-section" ref="projectSection">
        <!-- <div class="section-title">Project</div> -->
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
import Typed from 'typed.js'
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
    // 第一行
    new Typed('#typed-line1', {
    strings: ["Turning insights"],
    typeSpeed: 60,
    backSpeed: 0,
    startDelay: 500,
    showCursor: false,
    onComplete: () => {
        document.querySelector('#typed-line1').classList.add('underline-animate');
        new Typed('#typed-line2', {
        strings: ["into stories"],
        typeSpeed: 60,
        startDelay: 300,
        showCursor: false,
        onComplete: () => {
            document.querySelector('#typed-line2').classList.add('underline-animate');
            new Typed('#typed-line3', {
            strings: ["that create impact."],
            typeSpeed: 60,
            startDelay: 300,
            showCursor: false,
            onComplete: () => {
                document.querySelector('#typed-line3').classList.add('underline-animate');
            }
            })
        }
        })
    }
    })
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
        max-width: 50vw;
        margin: 0 auto;
        #typed-line1 { 
            text-align: center;
            color: $color-text;
            font-size: 7rem;
            font-weight: 500;  
            line-height: 7rem; 
            display: inline-block;
            position: relative;
            z-index: 1;
        }
        #typed-line2 { 
            text-align: left;
            color: $color-text;
            font-size: 7rem; 
            font-weight: 500;  
            line-height: 7rem;
            display: inline-block;
            position: relative; 
            z-index: 1;
        }
        #typed-line3 {
            text-align: right;
            color: $color-text;
            font-size: 7rem; 
            font-weight: 500;  
            line-height: 7rem;
            display: inline-block;
            position: relative; 
            z-index: 1; 
        } 
        p  {
            margin: 1rem 0;
            text-align: right;
            font-size: $font-size-base; 
            line-height: 1rem;
            font-weight: 400; 
            color: $color-text; 
        }
        .underline-animate::after {
                content: '';
                position: absolute;
                bottom: 1rem;
                left: 0;
                width: 0;
                height: 2px;
                background: $color-border;
                z-index: -1;    
                animation: underlineGrow 0.6s ease forwards;
            }
            @keyframes underlineGrow {
            to {
                width: 100%;
            }
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
            font-size: $font-size-xxl; 
            color: $color-text;
            z-index: 0;
        }
        .resources-title { 
            @extend .section-title; 
            top: -5%; 
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
                display: flex;                  
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
            --h: clamp(540px, 30vw, 630px);   // 高度（響應式）
            --w: clamp(260px, 20vw, 260px);   // 寬度
            --r: 90px;                        // 圓角
            --overlap: 10px;                  // 重疊量（越大縫隙越小）
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5rem 0;
            .pill {
                width: var(--w);
                height: var(--h);
                border-radius: calc(var(--r) * 1.5);
                background-image: url('/avatar-01.png'); 
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center; // 預設
                background-blend-mode: multiply; 
                &:nth-child(1) { 
                    background-position: 0% 20%; 
                    filter: brightness(1.2);
                }
                &:nth-child(2) { 
                    background-position: 20% 40%; 
                    filter: brightness(1);
                }
                &:nth-child(3) { 
                    background-position: 40% 60%; 
                    filter: brightness(.9);
                }
                &:nth-child(4) { 
                    background-position: 60% 80%; 
                    filter: brightness(.8);
                }
                &:nth-child(5) { 
                    background-position: 80% 100%; 
                    filter: brightness(.7);
                }
                &:nth-child(6) { 
                    background-position: 100% 50%; 
                    filter: brightness(.6);
                }
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
