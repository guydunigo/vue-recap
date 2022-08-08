<script setup lang="ts">
import type Link from "./Link";
import TheCard from "./TheCard.vue";
import LinkCard from "./LinkCard.vue";

import { ref, onBeforeMount, inject } from "vue";

const links = ref<Link[]>([]);

const networkError =
    inject<(msg: string, error: string) => void>("networkError");

const is_loading = ref(false);
const load_links = function () {
    is_loading.value = true;
    fetch("http://localhost:3000/links")
        .then((r) => {
            if (r.ok) {
                return r.json();
            }
            throw new Error("Server returned an error : " + r.status);
        })
        .then((http_links) => {
            is_loading.value = false;
            links.value = http_links;
        })
        .catch((e) => {
            // is_loading.value = false;
            networkError &&
                networkError(
                    "An error occured when fetching the link list.",
                    e
                );
        });
};

onBeforeMount(load_links);
</script>

<template>
    <TheCard>
        <button class="flat active" @click="load_links">
            Update links list
        </button>
    </TheCard>
    <TheCard v-if="is_loading">
        <h1>Loading...</h1>
    </TheCard>
    <TheCard v-else-if="links.length === 0">
        <h1>Our database is empty.</h1>
    </TheCard>
    <!-- v-else : Perf problem because the component is lost on v-if and we have to re-create the list after ? -->
    <!--<ul v-else>-->
    <ul>
        <li v-for="link in links" :key="link.id">
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
