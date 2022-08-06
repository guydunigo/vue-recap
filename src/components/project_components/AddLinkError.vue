<script setup lang="ts">
import { ref, onMounted } from "vue";

const confirmBtn = ref<null | { focus(): void }>(null);
onMounted(() => confirmBtn.value?.focus());

const emit = defineEmits<{ (e: "confirm"): void }>();
const confirm = () => emit("confirm");
</script>

<template>
    <Teleport to="body">
        <div id="background" @click="confirm"></div>
        <dialog open>
            <header v-if="$slots.header">
                <slot name="header">
                    <h1>Error</h1>
                </slot>
            </header>
            <main>
                <slot />
            </main>
            <menu>
                <button ref="confirmBtn" class="flat active" @click="confirm">
                    Okay
                </button>
            </menu>
        </dialog>
    </Teleport>
</template>

<style scoped>
dialog {
    position: fixed;
    top: 20vh;
    left: 10%;
    width: 80%;
    z-index: 100;
    border-radius: 12px;
    border: none;
    box-shadow: 0 2px 8px rgba(0 0 0 / 26%);
    padding: 0;
    overflow: hidden;
}

@media (min-width: 768px) {
    dialog {
        left: calc(50% - 20rem);
        width: 40rem;
    }
}

dialog > * {
    width: 100%;
}

header {
    color: white;
    background-color: #3a0061;
    padding: 1rem;
}

main {
    padding: 1rem;
}

menu {
    display: flex;
    justify-content: flex-end;
    margin: 0;
    padding: 1rem;
}

#background {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: rgb(0 0 0 / 75%);
    z-index: 10;
}
</style>
