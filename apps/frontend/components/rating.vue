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
    .rating {
        display: flex;
        flex-direction: row;
        align-items: center;
        &__text {
            color: #fff;
            padding: 0;
            margin: 0;
        }
        &__star {
            color: #C79E0E;
            font-size: 1rem;
        }
    }
</style>
