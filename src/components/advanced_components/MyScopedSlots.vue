<script setup lang="ts">
import MySlots from "./MySlots.vue";
import { defineProps } from "vue";

defineProps<{ goals: string[] }>();
</script>

<!-- If you want to provide variables to the provided slot template -->

<template>
    <MySlots>
        <ul>
            <li v-for="goal in goals" :key="goal">
                <slot :goal="goal" :another-prop="goal.length"></slot>
            </li>
        </ul>
    </MySlots>
</template>

<style scoped>
div {
    margin: 2rem auto;
    max-width: 30rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0 0 0 / 26%);
    padding: 1rem;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
