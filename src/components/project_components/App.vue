<script setup lang="ts">
import type Link from "./Link";
import type TabInfo from "./TabInfo";

import SelectTab from "./SelectTab.vue";
import LinksList from "./LinksList.vue";
import AddLink from "./AddLink.vue";

import { ref, shallowRef, provide } from "vue";

const links = ref<Link[]>([
    {
        title: "Official Guide",
        description: "The official Vue.js documentation.",
        link: "https://vuejs.org/",
    },
    {
        title: "Google",
        description: "Learn to google...",
        link: "https://google.org/",
    },
]);

const deleteLink = (title: string) => {
    links.value = links.value.filter((l) => l.title !== title);
};
provide("deleteLink", deleteLink);

const addLink = (link: Link) => {
    links.value.push(link);
    activeTab.value = tabs[0];
};

const tabs: TabInfo[] = [
    {
        text: "Stored Resources",
        component: LinksList,
    },
    {
        text: "Add Resource",
        component: AddLink,
    },
];
// No need for a full ref, we just need to watch the generic reference. Would loose performance to try and watch all sub-properties.
const activeTab = shallowRef<TabInfo>(tabs[0]);
const selectTab = (t: TabInfo) => (activeTab.value = t);
</script>

<template>
    <section>
        <header>
            <h1>RememberMe</h1>
        </header>
        <main>
            <SelectTab
                :tabs="tabs"
                :active-tab="activeTab"
                @select-tab="selectTab"
            />
            <!-- No need to cache the input, better empty it -->
            <KeepAlive include="LinksList">
                <Component
                    :is="activeTab.component"
                    :links="links"
                    @add-link="addLink"
                />
            </KeepAlive>
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
button.flat {
    background-color: transparent;
    color: #3a0061;
    border: none;
    padding: 0.75rem 1.5rem;
}

button.flat:hover {
    background-color: #edd2ff;
    border-color: #270041;
    cursor: pointer;
}

button.flat.active {
    background-color: #3a0061;
    color: white;
    border: 1px solid #3a0061;
}

button.flat.active:hover {
    background-color: #270041;
    border-color: #270041;
}
</style>
