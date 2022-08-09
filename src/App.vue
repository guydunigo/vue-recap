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
    <!--<router-view />-->
    <router-view v-slot="{ Component }">
        <Transition mode="out-in">
            <KeepAlive>
                <Component :is="Component" />
            </KeepAlive>
        </Transition>
    </router-view>
</template>

<style scoped>
.v-enter-from {
    transform: translateX(-100%);
}

.v-enter-active {
    transition: all 0.1s ease-out;
}

.v-leave-active {
    transition: all 0.1s ease-in;
}

.v-enter-to,
.v-leave-from {
    transform: translateX(0);
}

.v-leave-to {
    transform: translateX(100%);
}
</style>
