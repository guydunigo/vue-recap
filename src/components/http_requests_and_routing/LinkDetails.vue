<script setup lang="ts">
import type Link from "./Link";

import TheCard from "./TheCard.vue";
import AddLinkError from "./AddLinkError.vue";

import { ref, onBeforeMount, watch, computed } from "vue";
import { onBeforeRouteUpdate } from "vue-router";

const props = defineProps<{ id: string }>();

const link = ref<Link | null>(null);

// ----------------------------------------------------------------
// Network Error management
const errorMsg = ref<undefined | { msg: string; error: string }>(undefined);
const networkError = (msg: string, error: string) =>
    (errorMsg.value = {
        msg,
        error,
    });
const closeError = () => (errorMsg.value = undefined);

const getLink = (id: string, inc: number): string => {
    const id_number = Number(id);
    if (!Number.isNaN(id_number)) {
        return "/link/" + (id_number + inc);
    } else {
        return "/http/base";
    }
};

const is_loading = ref(false);
const load_link = function (id: string) {
    is_loading.value = true;
    fetch("http://localhost:3000/links/" + id)
        .then((r) => {
            if (r.ok) {
                return r.json();
            } else if (r.status === 404) {
                return null;
            }
            throw new Error("Server returned an error : " + r.status);
        })
        .then((http_link) => {
            is_loading.value = false;
            link.value = http_link;
        })
        .catch((e) => {
            // is_loading.value = false;
            networkError &&
                networkError(
                    "An error occured when fetching the link " + props.id + ".",
                    e
                );
        });
};

onBeforeMount(() => load_link(props.id));
// Couldn't watch the props directly...
// So do this :
// const id = computed(() => props.id);
// watch(id, (n) => load_link(n.toString()));
//
// Or watch the route parameter
//
// Or mutch better :
onBeforeRouteUpdate((to) => load_link(to.params.id.toString()));
// Also : onBeforeRouteLeave, see ../http_with_routing_2/AddLink.vue
</script>

<template>
    <article>
        <header>
            <h1>Détails du lien #{{ props.id }}</h1>
        </header>
        <TheCard>
            <nav>
                <!-- Or router-link ? but no param change -->
                <router-link class="flat" :to="getLink(props.id, -1)">
                    Précédent
                </router-link>
                <router-link class="flat middle" to="/http/base">
                    Retour à la liste
                </router-link>
                <router-link class="flat" :to="getLink(props.id, 1)">
                    Suivant
                </router-link>
            </nav>
        </TheCard>
        <AddLinkError v-if="errorMsg" @confirm="closeError">
            <template #header>
                <h1>Nework Error</h1>
            </template>
            <template #default>
                <p>{{ errorMsg.msg }}</p>

                <p>{{ errorMsg.error }}</p>
            </template>
        </AddLinkError>
        <TheCard v-if="is_loading">
            <main>
                <h1 id="loading">Loading...</h1>
            </main>
        </TheCard>
        <TheCard v-if="link || !is_loading">
            <main v-if="link == null && !is_loading">
                <h3>Link #{{ props.id }} was not found in database.</h3>
            </main>
            <main v-else>
                <section>
                    <h1>{{ link?.title }}</h1>
                </section>
                <section>
                    <h2>Description</h2>
                    <p>{{ link?.description }}</p>
                </section>
                <section>
                    <h2>Lien</h2>
                    <a :href="link?.link">{{ link?.link }}</a>
                </section>
            </main>
        </TheCard>
    </article>
</template>

<style scoped>
header {
    background-color: #640032;
    width: 100%;
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

header > h1 {
    margin: 0;
    color: white;
}

nav {
    display: flex;
    flex-flow: wrap row;
}

nav > * {
    flex: 33%;
}

.flat {
    background-color: transparent;
    color: #3a0061;
    border: none;
    padding: 0.75rem 1.5rem;
    text-align: center;
}

.flat:hover {
    background-color: #edd2ff;
    border-color: #270041;
    cursor: pointer;
}

.flat.active {
    background-color: #3a0061;
    color: white;
    border: 1px solid #3a0061;
}

.flat.active:hover {
    background-color: #270041;
    border-color: #270041;
}

section {
    margin: 1rem;
    margin-bottom: 2rem;
}

#loading {
    text-align: center;
}

h1 {
    font-size: 32px;
}

h2 {
    margin-bottom: 1rem;
    color: #640032;
}

h3 {
    text-align: center;
}
</style>
