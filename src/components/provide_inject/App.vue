<script setup lang="ts">
import KnowledgeBase from "./KnowledgeBase.vue";
import ActiveElement from "./ActiveElement.vue";
import type Topic from "./Topic";

import { ref, provide } from "vue";

const topics = ref<Topic[]>([
    {
        id: "basics",
        title: "The Basics",
        description: "Core Vue basics you have to know",
        fullText:
            "Vue is a great framework and it has a couple of key concepts: Data binding, events, components and reactivity - that should tell you something!",
    },
    {
        id: "components",
        title: "Components",
        description:
            "Components are a core concept for building Vue UIs and apps",
        fullText:
            "With components, you can split logic (and markup) into separate building blocks and then combine those building blocks (and re-use them) to build powerful user interfaces.",
    },
]);

const activeTopic = ref<Topic | null>(null);

function activateTopic(topicId: string) {
    activeTopic.value =
        topics.value.find((topic: Topic) => topic.id === topicId) || null;
}

provide("topics", topics);
provide("selectTopic", activateTopic);

/*
export default {
    components: {
        KnowledgeBase,
        ActiveElement,
    },
    // provide can be an object or a function returning an object
    provide(): { topics: Topic[], selectTopic(topicId: string) } {
        return {
            topics: this.topics,
            selectTopic: this.activateTopic,
        };
    },
    data(): { topics: Topic[]; activeTopic?: Topic } {
        return {
            topics: [
                {
                    id: "basics",
                    title: "The Basics",
                    description: "Core Vue basics you have to know",
                    fullText:
                        "Vue is a great framework and it has a couple of key concepts: Data binding, events, components and reactivity - that should tell you something!",
                },
                {
                    id: "components",
                    title: "Components",
                    description:
                        "Components are a core concept for building Vue UIs and apps",
                    fullText:
                        "With components, you can split logic (and markup) into separate building blocks and then combine those building blocks (and re-use them) to build powerful user interfaces.",
                },
            ],
            activeTopic: undefined,
        };
    },
    methods: {
        activateTopic(topicId: string) {
            this.activeTopic = this.topics.find(
                (topic: Topic) => topic.id === topicId
            );
        },
    },
};
*/
</script>

<template>
    <div id="topics">
        <KnowledgeBase :topics="topics" @select-topic="activateTopic" />
        <ActiveElement
            v-if="activeTopic != undefined"
            :topic-title="activeTopic && activeTopic.title"
            :text="activeTopic && activeTopic.fullText"
        />
    </div>
</template>

<style>
#topics * {
    box-sizing: border-box;
}

#topics html {
    font-family: sans-serif;
}

#topics body {
    margin: 0;
}

#topics section {
    box-shadow: 0 2px 8px rgb(0 0 0 / 26%);
    margin: 2rem auto;
    max-width: 40rem;
    padding: 1rem;
    border-radius: 12px;
}

#topics ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
}

#topics li {
    border-radius: 12px;
    border: 1px solid #ccc;
    padding: 1rem;
    width: 15rem;
    margin: 0 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

#topics h2 {
    margin: 0.75rem 0;
    text-align: center;
}

#topics button {
    font: inherit;
    border: 1px solid #c70053;
    background-color: #c70053;
    color: white;
    padding: 0.75rem 2rem;
    border-radius: 30px;
    cursor: pointer;
}

#topics button:hover,
#topics button:active {
    background-color: #e24d8b;
    border-color: #e24d8b;
}
</style>
