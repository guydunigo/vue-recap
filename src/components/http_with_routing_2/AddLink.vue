<script setup lang="ts">
import type Link from "../http_requests_and_routing/Link";
import TheCard from "../http_requests_and_routing/TheCard.vue";
import AddLinkError from "../http_requests_and_routing/AddLinkError.vue";
import { ref, inject } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";

const title = ref("");
const description = ref("");
const link = ref("");

const router = useRouter();
const backToBase = () => router.push({ path: "base" });

const networkError =
    inject<(msg: string, error: string) => void>("networkError");

const isError = ref(false);

// Ensure person has saved before letting go...
onBeforeRouteLeave(() => {
    if (title.value !== "" || description.value !== "" || link.value !== "") {
        const userWantsToLeave = confirm(
            "You have unsaved changes, are you sure you want to leave ?"
        );
        title.value = "";
        description.value = "";
        link.value = "";
        return userWantsToLeave;
    }
});

function addLink() {
    if (title.value === "" || description.value === "" || link.value === "") {
        isError.value = true;
    } else {
        const new_link: Link = {
            title: title.value,
            description: description.value,
            link: link.value,
            id: 0, // Dummy value replaced by json-server
        };

        fetch("http://localhost:3000/links", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(new_link),
        })
            .then((r) => {
                if (r.ok) {
                    backToBase();
                } else {
                    throw new Error("Server returned an error : " + r.status);
                }
            })
            .catch(
                (r) =>
                    networkError &&
                    networkError(
                        "An error occured when posting the new link.",
                        r
                    )
            );
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
                Please check all inputs and make sure you enter at least a few
                characters into each input field.
            </p>
        </template>
    </AddLinkError>
    <TheCard>
        <form @submit.prevent="addLink">
            <div>
                <label for="title">Title</label>
                <input id="title" v-model.trim="title" type="text" />
            </div>

            <div>
                <label for="description">Description</label>
                <textarea id="description" v-model.trim="description" />
            </div>

            <div>
                <label for="link">Link</label>
                <input id="link" v-model.trim="link" type="url" />
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
