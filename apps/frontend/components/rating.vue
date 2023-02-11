<script setup lang="ts">
defineProps({
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
})
</script>

<template>
    <div class="rating">
        <p class="rating__text">
            {{ rating }}
        </p>
        <NuxtIcon name="star" filled class="rating__star" />
    </div>
</template>

<style scoped lang="scss">
    @use '@/assets/styles/index.scss' as styles;
    .rating {
        display: flex;
        flex-direction: row;
        align-items: center;
        &__text {
            color: map-get(styles.$colors, white);
            @include styles.typography('body-2');
            padding: 0;
            margin: 0;
        }
        &__star {
            color: map-get(styles.$colors, yellow);
            font-size: 1rem;
        }
    }
</style>
