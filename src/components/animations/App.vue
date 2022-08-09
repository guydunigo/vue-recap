<script setup lang="ts">
import BaseModal from "./BaseModal.vue";
import ListData from "./ListData.vue";
import { ref } from "vue";

const dialogIsVisible = ref(false);
const animatedBlock = ref(false);
function showDialog() {
    dialogIsVisible.value = true;
}
function hideDialog() {
    dialogIsVisible.value = false;
}
function animateBlock() {
    animatedBlock.value = !animatedBlock.value;
}
</script>

<template>
    <div class="container">
        <ListData />
    </div>
    <div class="container">
        <div class="block" :class="{ animate: animatedBlock }"></div>
        <button @click="animateBlock">Animate</button>
    </div>
    <!-- Only one sub-element -->
    <!-- See in styles below, name="v" by default -->
    <!-- full flexibility on classes : enter-to-class, ... -->
    <!-- events to do stuff in JS : v-on:before-enter(element, done()), leave, ... : call done() when finished -->
    <!-- cancel -->
    <!-- :css=false disable css transition detection (slightly better perf) -->
    <transition name="para" enter-to-class="" :css="true">
        <base-modal v-if="dialogIsVisible" @close="hideDialog">
            <p>This is a test dialog!</p>
            <button @click="hideDialog">Close it!</button>
        </base-modal>
    </transition>
    <!-- if-else guaranties only one is show at the same time -->
    <!-- out-in : remove one first and then second -->
    <transition class="blue" name="txt" mode="out-in">
        <button v-if="animatedBlock">Animating</button>
        <button v-else>Not animating</button>
    </transition>
    <div class="container">
        <button @click="showDialog">Show Dialog</button>
    </div>
</template>

<style scoped>
* {
    box-sizing: border-box;
}

html {
    font-family: sans-serif;
}

body {
    margin: 0;
}

button {
    font: inherit;
    padding: 0.5rem 2rem;
    border: 1px solid #810032;
    border-radius: 30px;
    background-color: #810032;
    color: white;
    cursor: pointer;
}

button:hover,
button:active {
    background-color: #a80b48;
    border-color: #a80b48;
}

.block {
    width: 8rem;
    height: 8rem;
    background-color: #290033;
    margin-bottom: 2rem;

    /* transition: transform 0.3s ease-out; */
}

.container {
    max-width: 40rem;
    margin: 2rem auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 2rem;
    border: 2px solid #ccc;
    border-radius: 12px;
}

.animate {
    animation: slide-scale 1s ease-out forwards;

    /* See transition above */

    /* transform: translateX(-150px) translateY(-10); */
}

@keyframes slide-scale {
    0% {
        transform: translateX(0) scale(1);
    }

    70% {
        transform: translateX(-120px) scale(1.1);
    }

    100% {
        transform: translateX(-150px) scale(1);
    }
}

/* Vue adds these classes with <transition> */

.para-enter-from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
}

.para-enter-active {
    transition: all 0.1s ease-out;

    /* Can also use animation: ... css without to and from */
}

.para-enter-to {
    opacity: 1;
    transition: translateY(0) scale(1);
}

.para-leave-from {
    opacity: 1;
    transform: translateY(0) scale(1);
}

.para-leave-active {
    transition: all 0.1s ease-in;
}

.para-leave-to {
    opacity: 0;
    transform: translateY(100px) scale(0.9);
}

p.blue {
    background-color: cyan;
}

.txt-enter-from,
.txt-leave-to {
    opacity: 0;
}

.txt-enter-active {
    transition: all 0.1s ease-out;
}

.txt-leave-active {
    transition: all 0.1s ease-in;
}

.txt-enter-to,
.txt-leave-from {
    opacity: 1;
}
</style>
