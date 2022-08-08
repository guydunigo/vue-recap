<script setup lang="ts"></script>

<template>
    <section>
        <slot />
    </section>
</template>

<style scoped>
section {
    border-radius: 12px;
    box-shadow: 0 2px 8px rgb(0 0 0 / 26%);
    padding: 1rem;
    margin: 2rem auto;
    max-width: 40rem;
}
</style>
