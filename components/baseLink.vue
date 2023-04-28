<script lang="ts" setup>
import { e } from 'ofetch/dist/error-04138797';

const { url } = defineProps({
    text: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
})

const emit = defineEmits(['clicked'])
const onClick = () => emit('clicked')
const validatedUrl = (url[0] === '/') ? url : `/${url}`
</script>

<template>
    <NuxtLink :to="validatedUrl" @click="onClick">
        <div class="link">
            <p>{{ text }}</p>
            <NuxtIcon class="arrow" name="arrow" />
        </div>
    </NuxtLink>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/index.scss' as styles;
.arrow {
    color: map-get(styles.$colors, white);
}
.link {
        width: fit-content;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-around;
        align-items: center;
        gap: 5px;
        padding: 2px 20px;
        border-radius: 8px;
        background: linear-gradient(91.81deg, map-get(styles.$colors, violet) 0%, map-get(styles.$colors, green) 100%);
    }
.link > * {
    padding: 0;
    margin: 0;
}
a {
    @include styles.typography('body-2');
    text-decoration: none;
    color: map-get(styles.$colors, white);
}
a:hover {
    text-decoration: underline;
}
</style>
