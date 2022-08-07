<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const UPDATE_INTERVAL_SECONDS = 1000;

const date = ref(new Date());

const tick = () => (date.value = new Date());
let timerId: any | null = null;

onMounted(() => (timerId = setInterval(tick, UPDATE_INTERVAL_SECONDS)));
onBeforeUnmount(() => clearInterval(timerId));
</script>

<template>
    <p>{{ date.toLocaleTimeString() }}</p>
</template>

<style scoped>
p {
    text-align: center;
}
</style>
