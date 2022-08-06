<template>
    <section>
        <MySlots>
            <!-- use named slots : v-slot:"header" or #"header" -->
            <template #header>
                <h3>{{ fullName }}</h3>
                <base-badge
                    :type="role"
                    :caption="role.toUpperCase()"
                ></base-badge>
            </template>
            <!-- All the rest goes in the default (unnamed) slot -->
            <!-- Optional #default indicator -->
            <template #default>
                <p>{{ infoText }}</p>
            </template>
        </MySlots>
    </section>
</template>

<script lang="ts">
import MySlots from "./MySlots.vue";
import BaseBadge from "./BaseBadge.vue";

export default {
    components: { MySlots, BaseBadge },
    props: ["fullName", "infoText", "role"],
};
</script>
