<script setup lang="ts">
import type Link from "./Link";
import TheCard from "./TheCard.vue";
import AddLinkError from "./AddLinkError.vue";
import { ref /*, defineProps, defineEmits */ } from "vue";

// To remove the warning because of the dynamic component.
defineProps<{ links: Link[] }>();

const title = ref("");
const description = ref("");
const link = ref("");

const emit = defineEmits<{
    (e: "add-link", link: Link): void;
}>();

const addLinkEmit = (link: Link) => emit("add-link", link);

const isError = ref(false);
function addLink() {
    if (title.value === "" || description.value === "" || link.value === "") {
        isError.value = true;
    } else {
        const new_link = {
            title: title.value,
            description: description.value,
            link: link.value,
        };
        addLinkEmit(new_link);
    }
}

function closeError() {
    isError.value = false;
}
</script>

<template>
    <AddLinkError v-if="isError" @confirm="closeError">
        <template #header>
            <h1>Invalid Input</h1>
        </template>
        <template #default>
            <p>Unfortunately, at least one input value is invalid.</p>

            <p>
                Please check all inpts and make sure you enter at least a few
                characters into each input field.
            </p>
        </template>
    </AddLinkError>
    <TheCard>
        <form @submit.prevent="addLink">
            <div>
                <label for="title">Title</label>
                <input id="title" v-model="title" type="text" />
            </div>

            <div>
                <label for="description">Description</label>
                <textarea id="description" v-model="description" />
            </div>

            <div>
                <label for="link">Link</label>
                <input id="link" v-model="link" type="url" />
            </div>

            <div>
                <button class="flat active">Add Resource</button>
            </div>
        </form>
    </TheCard>
</template>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}

div {
    margin: 1rem 0;
}

div > * {
    display: block;
}

label {
    font-weight: bold;
    margin-bottom: 0.5rem;
}

input,
textarea {
    width: 100%;
    padding: 0.15rem;
    border: 1px solid #ccc;
    font: inherit;
}
</style>
