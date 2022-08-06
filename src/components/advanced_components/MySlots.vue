<script setup lang="ts">
// Use slots in the script :
// import { onMounted, useSlots } from "vue";
// const slots = useSlots();
// onMounted(() => console.log(slots));
</script>

<template>
    <div>
        <!-- We can use $slots.header to display or not different slots -->
        <!--<header v-if="$slots.header">-->
        <header>
            <!-- Accept multiple parts with name -->
            <slot name="header">
                <h2>Generic header</h2>
            </slot>
        </header>
        <p v-if="!$slots.header">
            <i>No slots header, one was provided by default</i>
        </p>
        <!-- Accept sub-elements with slot -->
        <!-- One unnamed slot only, the default -->
        <slot />
    </div>
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
