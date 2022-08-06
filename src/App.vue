<script setup lang="ts">
import HelloWorldWelcome from "./components/HelloWorldWelcome.vue";
import BaseComponentsPropsEmits from "./components/base_components_props_emits/App.vue";
import ProvideInject from "./components/provide_inject/App.vue";
import AdvancedComps from "./components/advanced_components/App.vue";

import { ref, watch } from "vue";

const pages = [
    HelloWorldWelcome,
    BaseComponentsPropsEmits,
    ProvideInject,
    AdvancedComps,
];
const pageSelected = ref(2);

watch(pageSelected, (newPage) => {
    if (newPage >= pages.length || newPage < 0) {
        pageSelected.value = 0;
    }
});
</script>

<template>
    <nav>
        <button @click="pageSelected++">Next</button>
    </nav>

    <!-- keep alive : keeps state even while hidden -->
    <!-- component : dynamically displaying components, avoids v-if, v-else-if, ... -->
    <KeepAlive>
        <component :is="pages[pageSelected]" />
    </KeepAlive>
</template>

<style>
nav {
    display: block;
    position: fixed;
    left: 0;
    top: 0;
}
</style>
