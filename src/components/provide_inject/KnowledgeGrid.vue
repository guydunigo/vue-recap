<script setup lang="ts">
import KnowledgeElement from "./KnowledgeElement.vue";
import type Topic from "./Topic";

import { inject } from "vue";

const topics = inject<Topic[]>("topics");
</script>

<template>
    <ul>
        <knowledge-element
            v-for="topic in topics"
            :id="topic.id"
            :key="topic.id"
            :topic-name="topic.title"
            :description="topic.description"
        ></knowledge-element>
    </ul>
</template>
