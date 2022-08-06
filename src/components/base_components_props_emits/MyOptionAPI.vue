<script lang="ts">
import { defineComponent, type PropType } from "vue";

interface Book {
    title: string;
    author: string;
    year: number;
}

// Typing props and such need defineComponent
export default defineComponent({
    // props: ["name", "phone_number", "email_address"],
    props: {
        name: { type: String, default: "" },
        phoneNumber: { type: String, default: "" },
        emailAddress: {
            type: String,
            required: true,
            validator: (v: string) => v.indexOf("@") >= 0,
        },
        show: { type: Boolean, required: true },
        book: {
            type: Object as PropType<Book>,
            default: () => ({
                title: "The Lord of the Rings",
                author: "J.R.R. Tolkien",
                year: 1954,
            }),
        },
    },
    // Optionnal, for documentation
    // emits: ["toggle-details"],
    // Can also define types :
    emits: ["toggle-details"],
    data() {
        return { msg: "haha" };
    },
});
</script>

<template>
    <section>
        <h1>Option API</h1>
        <p>{{ msg }}</p>
        <p>{{ name }}</p>
        <div v-if="show">
            <p>{{ phoneNumber }}</p>
            <p>{{ emailAddress }}</p>
            <p>{{ book.title }} - {{ book.author }} - {{ book.year }}</p>
        </div>
        <button @click="$emit('toggle-details')">Toggle details</button>
    </section>
</template>

<!--
<style scoped>
</style>
-->
