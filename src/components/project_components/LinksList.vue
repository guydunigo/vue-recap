<script setup lang="ts">
import type Link from "./Link";
import TheCard from "./TheCard.vue";
import LinkCard from "./LinkCard.vue";
// import { defineProps } from "vue";

const props = defineProps<{ links: Link[] }>();
</script>

<template>
    <ul>
        <li v-for="link in props.links" :key="link.link">
            <TheCard>
                <LinkCard :link="link" />
            </TheCard>
        </li>
    </ul>
</template>

<style scoped>
ul {
    list-style: none;
    padding: 0;
}
</style>
