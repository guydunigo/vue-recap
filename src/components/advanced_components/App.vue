<template>
    <div>
        <the-header></the-header>
        <badge-list></badge-list>
        <user-info
            :full-name="activeUser.name"
            :info-text="activeUser.description"
            :role="activeUser.role"
        ></user-info>
        <MySlots>Test</MySlots>
        <!-- Here, MyScopedSlots gives us access to a goal in the template to configure it -->
        <!-- Access the scoped exported variables with v-slot= -->
        <MyScopedSlots v-slot="scopedProps" :goals="goals">
            "{{ scopedProps.goal }}" is {{ scopedProps.anotherProp }} characters
            long
        </MyScopedSlots>

        <MySlots>
            <input
                ref="goalInput"
                type="text"
                placeholder="Describe your goal"
                @keyup.enter="setGoal"
                @keydown="resetInvalid"
            />
            <button @click="setGoal">Set Goal</button>

            <!-- teleport to generate elements in another part of the page at 'to' css selector -->
            <Teleport to="body">
                <ErrorAlert v-if="inputIsInvalid" @click="resetInvalid">
                    <h2>Input is invalid</h2>
                    <p>Please enter at least a few characters...</p>
                </ErrorAlert>
            </Teleport>
        </MySlots>
    </div>
</template>

<script setup lang="ts">
import TheHeader from "./TheHeader.vue";
import BadgeList from "./BadgeList.vue";
import UserInfo from "./UserInfo.vue";
import MySlots from "./MySlots.vue";
import MyScopedSlots from "./MyScopedSlots.vue";
import ErrorAlert from "./ErrorAlert.vue";

import { ref } from "vue";

const activeUser = ref({
    name: "Maximilian Schwarzmüller",
    description: "Site owner and admin",
    role: "admin",
});

const goals = ref(["Do this", "Achieve that"]);

// const refs = withRefs();

// Ref to component : Name must match ref="goalInput"
// Typescript screams here because of null, you give a type :
// And use it by checking its nullity before using it
const goalInput = ref<null | { value: string }>(null);

const inputIsInvalid = ref(false);

function setGoal() {
    if (goalInput.value) {
        if (goalInput.value.value === "") {
            inputIsInvalid.value = true;
        } else {
            goalInput.value.value = "";
        }
    } else {
        console.error(
            "goalInput is null and hasn't been filled with the real ref to input !"
        );
    }
}
const resetInvalid = () => (inputIsInvalid.value = false);
</script>

<style scoped>
html {
    font-family: sans-serif;
}

body {
    margin: 0;
}
</style>
