<script setup lang="ts">
import { BoxState, type GameState, type Winner } from "./types";

const props = defineProps<{ state: GameState; winner: Winner }>();
const emit = defineEmits<{ (e: "play", index: number): void }>();

const play = (index: number): void => emit("play", index);

const is_winning_box = (index: number): boolean =>
    props.winner != null &&
    (index === props.winner.a ||
        index === props.winner.b ||
        index === props.winner.c);
</script>

<template>
    <section>
        <button
            v-for="(box, index) in props.state"
            :key="index"
            :class="{ winning: is_winning_box(index) }"
            :disabled="box !== BoxState.Empty || props.winner != null"
            @click="play(index)"
        >
            {{ box === BoxState.O ? "O" : box === BoxState.X ? "X" : "" }}
        </button>
    </section>
</template>

<style scoped>
section {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 0.25rem;
    width: 5rem;
}

button {
    border: 1px black solid;
    background-color: white;
    width: 1.5rem;
    height: 1.5rem;
}

.winning {
    background-color: salmon;
    color: white;
}
</style>
