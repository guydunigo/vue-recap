<script setup lang="ts">
import { ref, withDefaults /* defineProps, defineEmits */ } from "vue";

// This data can change like usual data
const msg = ref("haha");

// These fields are hard coded variables that can't even be changed in webtools
const msg2 = "haha";
// const msg3 = "ahah";

interface Book {
    title: string;
    author: string;
    year: number;
}

// Runtime check
// defineProps({
//     name: { type: String, default: "" },
//     phoneNumber: { type: String, default: "" },
//     emailAddress: {
//         type: String,
//         required: true,
//         validator: (v: string) => v.indexOf("@") >= 0,
//     },
//     book: { // Object prop :
//         type: Object as PropType<Book>,
//         default: () => ({
//             title: "The Lord of the Rings",
//             author: "J.R.R. Tolkien",
//             year: 1954,
//         }),
//     },
// });

// Compile time, nicer and cleaner, with true typescript types :
// TODO: no validators ?
withDefaults(
    // withDefaults(
    defineProps<{
        name: string;
        phoneNumber: string;
        age: number;
        boolean?: boolean; // doesn't need value in html, undefined (falsy) if not given
        show?: boolean;
        book?: Book;
    }>(),
    {
        book: () => ({
            title: "The Lord of the Rings",
            author: "J.R.R. Tolkien",
            year: 1954,
        }),
    }
);

// Prop fallthrough : props can be passed to first inner html tag if not defined here.
// You can access them with $attrs in template, this.$attrs (Option), or useAttr (composition)

// Communicate from component to father, defined same as Props : table, object with types (validator, ...) or generics
const emit = defineEmits<{
    (e: "toggle-details"): void;
}>();
const toggleDetails = () => emit("toggle-details");
</script>

<template>
    <section>
        <h1>Composition API</h1>
        <p>{{ msg + " " + msg2 }}</p>
        <p>{{ name }}</p>
        <div v-if="show">
            <p>{{ phoneNumber }}</p>
            <p>{{ age }}</p>
            <p>{{ book.title }} - {{ book.author }} - {{ book.year }}</p>
        </div>
        <button @click="toggleDetails">Toggle details</button>
        <!--<button @click="$emit('toggle-details')">Change</button>-->
    </section>
</template>

<!--
<style scoped>
</style>
-->
