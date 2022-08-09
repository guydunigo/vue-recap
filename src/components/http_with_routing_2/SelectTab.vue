<script setup lang="ts">
import type TabInfo from "./TabInfo";
import TheCard from "../http_requests_and_routing/TheCard.vue";

const props = defineProps<{ tabs: TabInfo[] }>();
</script>

<template>
    <TheCard>
        <router-link
            v-for="t in props.tabs"
            :key="t.path"
            class="flat"
            :to="t.path"
        >
            {{ t.text }}
        </router-link>
    </TheCard>
</template>

<style scoped>
section {
    display: flex;
    flex-flow: wrap row;
}
</style>
