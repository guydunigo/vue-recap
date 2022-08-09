<script setup lang="ts">
import type Link from "./Link";
import TheCard from "./TheCard.vue";
import LinkCard from "./LinkCard.vue";

import { ref, onBeforeMount, inject, computed } from "vue";
import { useRoute } from "vue-router";

const links = ref<Link[]>([]);

const route = useRoute();
const sort_desc = computed(() => route.query.sort === "desc");

const links_sorted = computed(() => {
    const links_sorted = [...links.value];
    if (sort_desc.value) {
        links_sorted.sort((l1: Link, l2: Link) => {
            if (l1.id < l2.id) {
                return 1;
            } else {
                return -1;
            }
        });
    } else {
        links_sorted.sort((l1: Link, l2: Link) => {
            if (l1.id > l2.id) {
                return 1;
            } else {
                return -1;
            }
        });
    }
    return links_sorted;
});

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
        <router-link class="notflat" :to="{ query: { sort: 'desc' } }">
            Sort Desc
        </router-link>
        <router-link class="notflat" :to="{ query: { sort: 'asc' } }">
            Sort Asc
        </router-link>
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
        <li v-for="link in links_sorted" :key="link.id">
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

.notflat {
    background-color: transparent;
    color: #3a0061;
    border: none;
    padding: 0.75rem 1.5rem;
}
</style>
