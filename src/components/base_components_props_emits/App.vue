<script setup lang="ts">
import MyOption from "./MyOptionAPI.vue";
import MyComp from "./MyCompositionAPI.vue";
import NewFriend from "./NewFriend.vue";
import TheInput from "./TheInput.vue";

import { ref, computed } from "vue";

const show = ref(false);
interface Friend {
    name: string;
    phone: string;
    age: number;
    show: boolean;
}
const friends = ref<Friend[]>([]);
const are_all_friends_hidden = computed(() => {
    return (
        friends.value.map((f) => !f.show).reduce((a, b) => a && b, true) &&
        !show.value
    );
});

const toggleDetails = () => (show.value = !show.value);

const toggleDetailsFor = (index = -1) => {
    show.value = false;

    friends.value.forEach((f, i) => {
        f.show = i === index ? (f.show = !f.show) : (f.show = false);
    });
};
const showAllDetails = () => {
    show.value = true;
    friends.value.forEach((f) => (f.show = true));
};

const newFriend = (name: string, phone: string, age: number): void => {
    toggleDetailsFor();
    friends.value.push({ name, phone, age, show: true });
};

const date = ref(new Date());
</script>

<template>
    <article>
        <div>
            <button
                :disabled="are_all_friends_hidden"
                @click="toggleDetailsFor()"
            >
                Hide all details
            </button>
            <button @click="showAllDetails">Show all details</button>
            <NewFriend @new-friend="newFriend"></NewFriend>
        </div>
        <MyOption
            name="John"
            phone-number="555"
            email-address="g@g.g"
            :show="show"
            @toggle-details="toggleDetails"
        />
        <MyComp
            v-for="(friend, index) in friends"
            :key="friend.name"
            :name="friend.name"
            :phone-number="friend.phone"
            :age="friend.age"
            :show="friend.show"
            boolean
            @toggle-details="toggleDetailsFor(index)"
        />
    </article>
    <article>
        <TheInput v-model="date" />
        <p>{{ date.toLocaleDateString("fr") }}</p>
    </article>
</template>

<style scoped>
article {
    display: flex;
    flex-flow: wrap row;
}

article > * {
    flex: 30%;
    margin: 1rem;
}
</style>
