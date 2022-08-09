<script setup lang="ts">
/*
import { computed, ref, watch } from "vue";
const pageSelectedIndex = ref(7);
const pageSelected = computed(() => pages[pageSelectedIndex.value]);

watch(pageSelectedIndex, (newPage) => {
    if (newPage >= pages.length || newPage < 0) {
        pageSelectedIndex.value = 0;
    }
});
*/

import NavBar from "./components/NavBar.vue";
</script>

<template>
    <!--<nav>-->
    <!--    <button @click="pageSelectedIndex++">Next</button>-->
    <!--</nav>-->
    <NavBar />

    <!-- keep alive : keeps state even while hidden -->
    <!-- component : dynamically displaying components, avoids v-if, v-else-if, ... -->
    <!--<KeepAlive>-->
    <!--    <component :is="pageSelected" />-->
    <!--</KeepAlive>-->
    <router-view />
</template>
