<script setup lang="ts">
import HelloWorldWelcome from "./components/HelloWorldWelcome.vue";
import BaseComponentsPropsEmits from "./components/base_components_props_emits/App.vue";
import ProvideInject from "./components/provide_inject/App.vue";
import AdvancedComps from "./components/advanced_components/App.vue";
import ProjectComponents from "./components/project_components/App.vue";
import TicTacToe from "./components/tic_tac_toe/App.vue";

import { computed, ref, watch } from "vue";

const pages = [
    HelloWorldWelcome,
    BaseComponentsPropsEmits,
    ProvideInject,
    AdvancedComps,
    ProjectComponents,
    TicTacToe,
];
const pageSelectedIndex = ref(5);
const pageSelected = computed(() => pages[pageSelectedIndex.value]);

watch(pageSelectedIndex, (newPage) => {
    if (newPage >= pages.length || newPage < 0) {
        pageSelectedIndex.value = 0;
    }
});
</script>

<template>
    <nav>
        <button @click="pageSelectedIndex++">Next</button>
    </nav>

    <!-- keep alive : keeps state even while hidden -->
    <!-- component : dynamically displaying components, avoids v-if, v-else-if, ... -->
    <KeepAlive>
        <component :is="pageSelected" />
    </KeepAlive>
</template>

<style>
nav {
    z-index: 101;
    display: block;
    position: fixed;
    left: 0;
    top: 0;
}
</style>
