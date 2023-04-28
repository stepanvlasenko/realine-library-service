<script setup lang="ts">

</script>

<template>
    <div class="app">
        <div class="page">
            <Search />
            <NuxtPage />
        </div>
    </div>

</template>

<style scoped lang="scss">
@use './assets/styles/index.scss' as styles;

.app {
    background-color: map-get(styles.$colors, black);
}

.page {
    max-width: 1000px;
    margin: 0 auto;
}
</style>
