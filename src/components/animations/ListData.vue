<script setup lang="ts">
import { ref } from "vue";

const list = ref(["Max", "Manu", "Lilly", "Guillaume", "Alan"]);
const newName = ref("");

const addUser = (name: string) => list.value.unshift(name);
const removeUser = (name: string) =>
    (list.value = list.value.filter((u) => u !== name));
</script>

<template>
    <transition-group tag="ul" name="user-list">
        <li v-for="name in list" :key="name" @click="removeUser(name)">
            {{ name }}
        </li>
    </transition-group>
    <input v-model="newName" type="text" @keydown.enter="addUser(newName)" />
    <button @click="addUser(newName)">Add User</button>
</template>

<style scoped>
ul {
    display: flex;
    flex-flow: wrap row;
    list-style: none;
    padding: 0;
    margin: 0;
}

li {
    border: 1px solid #ccc;
    padding: 1rem;
    text-align: center;
}

.user-list-enter-from {
    opacity: 0;
    transform: translateY(-30px);
}

.user-list-enter-active {
    transition: all 0.5s ease-out;
}

.user-list-leave-active {
    transition: all 0.5s ease-in;
    position: absolute;
}

.user-list-enter-to,
.user-list-leave-from {
    opacity: 1;
    transform: translateY(0);
}

.user-list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

.user-list-move {
    transition: transform 0.5s ease;
}
</style>
