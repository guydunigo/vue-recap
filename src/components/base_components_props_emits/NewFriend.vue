<script setup lang="ts">
import { ref, computed /* , defineEmits */ } from "vue";

const name = ref("");
const phone = ref("");
const age = ref(0);

const cannot_send = computed(
    () => name.value === "" || phone.value === "" || age.value <= 0
);

const emit = defineEmits<{
    (e: "new-friend", name: string, phone: string, age: number): void;
}>();
const new_friend = () => {
    if (!cannot_send.value) {
        emit("new-friend", name.value, phone.value, age.value);
    }
};

const setName = (e: Event) =>
    (name.value = (e.target as HTMLInputElement).value.trim().toUpperCase());
</script>

<template>
    <form @submit.prevent="new_friend">
        <input :value="name" type="text" placeholder="Name" @input="setName" />
        <input v-model="phone" type="tel" placeholder="Phone number" />
        <input v-model.number="age" type="number" placeholder="Age" />

        <button :disabled="cannot_send">Add contact</button>
    </form>
</template>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}
</style>
