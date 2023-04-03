<script setup lang="ts">
import type { PropType } from 'vue'

import type { AvatarVariant } from '@types'

defineProps({
    variant: {
        type: String as PropType<AvatarVariant>,
        required: false,
        default: 'default',
    },
    avatarURL: {
        type: String,
        required: true,
    },
})
</script>

<template>
    <div class="avatar">
        <img class="avatar__image" :class="`avatar__image--${variant}`" :src="avatarURL">
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/index.scss' as styles;
.avatar {
    width: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    &__image {
        height: inherit;
        width: inherit;
        object-fit: cover;
        aspect-ratio: 1;
        border-radius: 50%;
        &--bordered {
            border: 4px solid map-get(styles.$colors, white);
        }
    }
}
</style>
