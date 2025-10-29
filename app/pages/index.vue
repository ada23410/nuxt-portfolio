<template>
    <div class="home-main">
        <div class="Hero-section">
            <div>
                <h1 id="typed-line1"></h1>
                <h2 id="typed-line2"></h2>
                <h3 id="typed-line3"></h3>
            </div>
            <div>
                <p id="typed-line4"></p>
            </div>
            <div class="scroll">
                <a class="scroll-link" href="#next">
                    <span class="description">SCROLL TO DISCOVER</span>
                    <span class="arrow" aria-hidden="true">
                    <svg class="chev" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                    <svg class="chev" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                    <svg class="chev" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                    </span>
                </a>
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

<style src="@/assets/css/pages/home.scss" lang="scss"></style>
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
        document.querySelector('#typed-line1').insertAdjacentHTML(
            'beforeend',
            `<img 
                src="/hero_animate.gif" 
                class="underline-gif" style="width: 300px;
                height: auto;  
                position: absolute;
                bottom: 1rem;
                right: -15rem;
                transform: rotate(-15deg);
                transform-origin: left bottom;"
                alt="underline animation"
            >`
        );
        new Typed('#typed-line2', {
        strings: ["into stories"],
        typeSpeed: 60,
        startDelay: 300,
        showCursor: false,
        onComplete: () => {
            const line2 = document.querySelector('#typed-line2');
            line2.innerHTML = line2.innerHTML.replace(
                'stories',
                '<span class="highlight-green" style="color: #66cc66;">stories</span>'
                );
            line2.classList.add('underline-animate');
            line2.addEventListener('animationend', () => {
                new Typed('#typed-line3', {
                    strings: ["that inspire change."],
                    typeSpeed: 60,
                    startDelay: 450,
                    showCursor: false,
                    onComplete: () => {
                        document.querySelector('#typed-line3').classList.add('underline-animate');
                        document.querySelector('#typed-line3').insertAdjacentHTML(
                            'beforeend',
                            `<img 
                                src="/hero_animate_2.gif" 
                                class="underline-gif-2" style="width: 250px;
                                height: auto;  
                                position: absolute;
                                bottom: -15rem;
                                left: -15rem;
                                transform: rotate(0deg);
                                transform-origin: left bottom;"
                                alt="underline animation"
                            >`
                        );
                        new Typed('#typed-line4', {
                            strings: ["從理解人開始，邁向解決問題的設計"],
                            typeSpeed: 60,
                            startDelay: 450,
                            showCursor: false,
                        })
                    }
                });
            }, { once: true });
        }
        });
    }
    })
})

onBeforeUnmount(() => {
    cleanups.forEach(fn => fn())
})
</script>