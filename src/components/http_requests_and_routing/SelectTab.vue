<script setup lang="ts">
import type TabInfo from "./TabInfo";
import TheCard from "./TheCard.vue";

// import { defineProps, defineEmits } from "vue";

const props = defineProps<{ tabs: TabInfo[]; activeTab: TabInfo }>();

const emit = defineEmits<{
    (e: "select-tab", tab: TabInfo): void;
}>();
const selectTab = (t: TabInfo) => emit("select-tab", t);
</script>

<template>
    <TheCard>
        <section>
            <button
                v-for="t in props.tabs"
                :key="t.text"
                :class="['flat', { active: props.activeTab === t }]"
                @click="selectTab(t)"
            >
                {{ t.text }}
            </button>
        </section>
    </TheCard>
</template>

<style scoped>
section {
    display: flex;
    flex-flow: wrap row;
}
</style>
