<script setup lang="ts">
import type TabInfo from "../http_with_routing_2/TabInfo";

import SelectTab from "./SelectTab.vue";
import AddLinkError from "../http_requests_and_routing/AddLinkError.vue";

import { ref, computed, provide } from "vue";
import { useRouter, useRoute } from "vue-router";

// ----------------------------------------------------------------
// Network Error management
const errorMsg = ref<undefined | { msg: string; error: string }>(undefined);
const networkError = (msg: string, error: string) =>
    (errorMsg.value = {
        msg,
        error,
    });
provide("networkError", networkError);

const closeError = () => (errorMsg.value = undefined);

// ----------------------------------------------------------------
// Tab and subroutes

const tabs: TabInfo[] = [
    {
        text: "Stored Resources",
        path: "base",
    },
    {
        text: "Add Resource",
        path: "new",
    },
];
</script>

<template>
    <section>
        <AddLinkError v-if="errorMsg" @confirm="closeError">
            <template #header>
                <h1>Nework Error</h1>
            </template>
            <template #default>
                <p>{{ errorMsg.msg }}</p>

                <p>{{ errorMsg.error }}</p>
            </template>
        </AddLinkError>
        <header>
            <h1>RememberMe but with Rest Backend</h1>
        </header>
        <main>
            <SelectTab :tabs="tabs" />
            <!-- No need to cache the input, better empty it -->
            <router-view v-slot="{ Component }">
                <KeepAlive include="LinksList">
                    <component :is="Component" />
                </KeepAlive>
            </router-view>
        </main>
    </section>
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
</style>

<style>
.flat {
    background-color: transparent;
    color: #3a0061;
    border: none;
    padding: 0.75rem 1.5rem;
}

.flat:hover {
    background-color: #edd2ff;
    border-color: #270041;
    cursor: pointer;
}

.flat.active,
.flat.router-link-active {
    background-color: #3a0061;
    color: white;
    border: 1px solid #3a0061;
}

.flat.active:hover,
.flat.router-link-active:hover {
    background-color: #270041;
    border-color: #270041;
}
</style>
