<script setup lang="ts">
import TheWelcome from "./TheWelcome.vue";
import HelloWorld from "./HelloWorld.vue";
</script>

<template>
    <section>
        <header>
            <img
                alt="Vue logo"
                class="logo"
                src="../assets/logo.svg"
                width="125"
                height="125"
            />

            <div class="wrapper">
                <HelloWorld msg="You did it!" />
            </div>
        </header>

        <main>
            <TheWelcome />
        </main>
    </section>
</template>

<style scoped>
section {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    font-weight: normal;
}

header {
    line-height: 1.5;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
    section {
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 0 2rem;
        flex: 100%;
    }

    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }
}
</style>
