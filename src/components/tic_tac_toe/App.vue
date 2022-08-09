<script setup lang="ts">
import { BoxState, type GameState, type Winner } from "./types";
import TheGrid from "./TheGrid.vue";
import TheHistory from "./TheHistory.vue";
import TheClock from "./TheClock.vue";
import { ref, computed, type ComputedRef, provide } from "vue";

const START_STATE = Array.from({ length: 3 * 3 }, () => BoxState.Empty);
const WINNING_STATES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const history = ref<number[]>([]);
const history_index = ref(0);

const current_player = computed<BoxState.O | BoxState.X>(() =>
    history_index.value % 2 ? BoxState.X : BoxState.O
);

const current_state = computed<GameState>(() =>
    history.value.slice(0, history_index.value).reduce(
        (s, h, i) => {
            if (h < s.length) {
                s[h] = i % 2 ? BoxState.X : BoxState.O;
            }
            return s;
        },
        [...START_STATE]
    )
);
const go_to_history_index = (index: number): void => {
    if (index >= 0 && index <= history.value.length) {
        history_index.value = index;
    }
};

// BoxState.{O,X} if someone won
// BoxState.Empty if it's a draw
// null if game isn't done yet
const get_winner = function (state: GameState): {
    box: BoxState;
    a: number | null;
    b: number | null;
    c: number | null;
} | null {
    for (const [a, b, c] of WINNING_STATES) {
        if (
            state[a] !== BoxState.Empty &&
            state[a] === state[b] &&
            state[b] === state[c]
        ) {
            return {
                box: state[a],
                a,
                b,
                c,
            };
        }
    }

    if (current_state.value.indexOf(BoxState.Empty) < 0) {
        return { box: BoxState.Empty, a: null, b: null, c: null };
    }

    return null;
};
const winner: ComputedRef<Winner> = computed(() =>
    get_winner(current_state.value)
);

const play = (index: number) => {
    // Si la case n'a pas déjà été jouée :
    if (
        winner.value == null &&
        index < current_state.value.length &&
        current_state.value[index] === BoxState.Empty
    ) {
        current_state.value[index] = current_player.value;
        history.value = history.value.slice(0, history_index.value);
        history.value.push(index);
        history_index.value++;
    }
};
provide("play", play);

const prompt_text = computed<string>(() => {
    if (winner.value == null) {
        return (history.value.length % 2 ? "X" : "O") + " can play.";
    } else if (winner.value.box === BoxState.Empty) {
        return "It's a draw !";
    } else if (winner.value.box === BoxState.X) {
        return "X won !";
    } else {
        return "O won !";
    }
});
</script>

<template>
    <article>
        <main>
            <TheClock />
            <h4>
                {{ prompt_text }}
            </h4>
            <div>
                <TheGrid :state="current_state" :winner="winner" @play="play" />
            </div>
        </main>
        <aside>
            <TheHistory
                :history="history"
                :history-index="history_index"
                @go-to-history-index="go_to_history_index"
            />
        </aside>
    </article>
</template>

<style scoped>
article {
    display: flex;
    flex-flow: wrap row;
    margin: 5rem auto;
    width: max-content;
}

main {
    width: min-content;
}

h4 {
    text-align: center;
    margin-bottom: 0.5rem;
}

h4,
div,
aside {
    border: 1px dashed black;
}

div {
    padding: 0.5rem;
}

aside,
main {
    margin-top: 0.5rem;
    margin-left: 0.5rem;
}

aside {
    padding: 0.5rem;
}

aside h3 {
    text-align: right;
}
</style>
