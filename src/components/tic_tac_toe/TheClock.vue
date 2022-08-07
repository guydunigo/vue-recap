<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const UPDATE_INTERVAL_SECONDS = 1000;

const date = ref(new Date());

const tick = () => (date.value = new Date());
// We don't care for the type here, so any is fine
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
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
