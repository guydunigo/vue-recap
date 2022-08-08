<script setup lang="ts">
import type Link from "./Link";

import { inject } from "vue";

const props = defineProps<{ link: Link }>();

const networkError =
    inject<(msg: string, error: string) => void>("networkError");

const deleteLink = () =>
    fetch("http://localhost:3000/links/" + props.link.id, {
        method: "DELETE",
    })
        .then((r) => {
            if (!r.ok) {
                throw new Error("Server returned an error : " + r.status);
            }
        })
        .catch(
            (e) =>
                networkError &&
                networkError("An error occured when fetching the link list.", e)
        );
</script>

<template>
    <section>
        <header>
            <h3>{{ props.link.title }}</h3>
            <button class="flat" @click="deleteLink">Delete</button>
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
