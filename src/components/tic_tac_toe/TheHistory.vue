<script setup lang="ts">
// import { ref, computed } from "vue";

const props = defineProps<{ history: number[]; historyIndex: number }>();

const emit = defineEmits<{ (e: "go-to-history-index", index: number): void }>();
const go_to_history_index = (index: number): void =>
    emit("go-to-history-index", index);
</script>

<template>
    <section>
        <h3>History</h3>
        <button
            :disabled="props.historyIndex === 0"
            @click="go_to_history_index(props.historyIndex - 1)"
        >
            Prev
        </button>
        <button
            :disabled="props.history.length === props.historyIndex"
            @click="go_to_history_index(props.historyIndex + 1)"
        >
            Next
        </button>
        <ol>
            <li>
                <button
                    :disabled="0 === props.historyIndex"
                    @click="go_to_history_index(0)"
                >
                    Start
                </button>
            </li>
            <li v-for="(boxIndex, index) in props.history" :key="index">
                <button
                    :disabled="index === props.historyIndex - 1"
                    @click="go_to_history_index(index + 1)"
                >
                    <code>
                        {{ index % 2 ? "X" : "O" }} : {{ boxIndex % 3 }},
                        {{ Math.floor(boxIndex / 3) }}
                    </code>
                </button>
            </li>
        </ol>
    </section>
</template>

<style scoped>
main {
    margin: 10rem;
    width: min-content;
}

h3 {
    text-align: center;
}

button {
    border: 1px grey solid;
    width: 5rem;
    height: 1.5rem;
    margin: 2px;
}
</style>
