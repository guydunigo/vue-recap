<script setup lang="ts">
import type Link from "./Link";
import { defineProps, inject } from "vue";

const props = defineProps<{ link: Link }>();

const deleteLink: (title: string) => null = inject("deleteLink");
const deleteThisLink = () => deleteLink(props.link.title);
</script>

<template>
    <section>
        <header>
            <h3>{{ props.link.title }}</h3>
            <button class="flat" @click="deleteThisLink">Delete</button>
        </header>
        <p>{{ props.link.description }}</p>
        <a :href="props.link.link">View Resource</a>
    </section>
</template>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

header > h3 {
    font-size: 1.25rem;
}

header > h3,
p {
    margin: 0.5rem 0;
    white-space: pre-line;
}
</style>
