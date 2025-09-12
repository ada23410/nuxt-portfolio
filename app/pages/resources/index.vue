<template>
    <div class="container">
        <div class="resources-head">
        <div class="title">
            <h1>Recent Resources</h1>
            <div class="category">
            <span>All</span>
            <span>Vue.js</span>
            <span>Nuxt.js</span>
            <span>P5.js</span>
            <span>JavaScript</span>
            <span>Generative AI</span>
            <span>UI / UX</span>
            </div>
        </div>
        <div>
            <p>
            專注於體驗細節與效能品質，將設計與開發融入可靠的數位服務，
            讓每一次互動都兼具人性的溫度與科技的精準。
            </p>
        </div>
        </div>

        <div class="resources-body">
            <Card :items="data?.items ?? []" />
            <div v-if="pending">Loading…</div>
            <div v-if="error">Failed: {{ error.message }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Card from '@/components/Card.vue'

const { data, pending, error } = await useFetch('/api/resources', { 
    default: () => ({ 
        items: [] 
    }) 
})

</script>

<style lang="scss" scoped>
.container {
    padding: 10rem 14rem;
    background-color: $color-bg;

    .resources-head {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        .title {
        h1 {
            font-size: $font-size-giant;
            font-weight: 600;
        }
        .category {
            margin-top: 2.5rem;
            font-size: $font-size-base;
            font-weight: 400;
            color: $color-text-light;

            span {
            padding: .5rem 1rem;
            border: .5px solid $color-border;
            border-radius: 50px;
            margin-right: .5rem;
            }
        }
        }
        p {
        max-width: 26rem;
        font-size: $font-size-base;
        line-height: 2rem;
        font-weight: 400;
        color: $color-text;
        }
    }
}
</style>