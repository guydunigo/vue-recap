<script setup lang="ts">
// Generating custom v-model + writable computed.

import { computed } from "vue";

const props = defineProps<{ modelValue: Date }>();
const year = computed({
    get() {
        return props.modelValue.getFullYear();
    },
    set(e) {
        update(e, month.value, day.value);
    },
});
const month = computed(() => props.modelValue.getMonth());
const monthHuman = computed({
    get() {
        return month.value + 1;
    },
    set(e) {
        update(year.value, e - 1, day.value);
    },
});
const day = computed({
    get() {
        return props.modelValue.getDate();
    },
    set(e) {
        update(year.value, month.value, e);
    },
});
const maxDay = computed(() =>
    new Date(year.value, month.value + 1, 0).getDate()
);

// const emit = defineEmits<{ (e: "update:modelValue", new: Date): void }>();
const emit = defineEmits(["update:modelValue"]);
const update = (y: number, m: number, d: number) =>
    emit("update:modelValue", new Date(y, m, d));
</script>

<template>
    <form>
        <label for="year">Year</label>
        <input id="year" v-model="year" type="number" placeholder="Year" />
        <label for="month">Month : {{ monthHuman }}</label>
        <input
            id="month"
            v-model="monthHuman"
            type="range"
            min="1"
            max="12"
            placeholder="Month"
        />
        <label for="day">Day : {{ day }}</label>
        <input
            id="day"
            v-model="day"
            type="range"
            min="1"
            :max="maxDay"
            placeholder="Day"
        />
    </form>
</template>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}
</style>
