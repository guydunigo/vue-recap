<script setup lang="ts">
// this.$router.push("/teams");
// this.$router.forward();
// this.$router.back();
// ...
</script>

<template>
    <header>
        <nav>
            <ul>
                <li v-for="route in $router.options.routes" :key="route.name">
                    <router-link :to="route.path">
                        {{ route.path }}
                    </router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
nav {
    background-color: hsl(160deg 100% 37% / 100%);
    z-index: 101;
    display: block;
    left: 0;
    top: 0;

    /* position: fixed; */
}

ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

a {
    background: transparent;
    cursor: pointer;
    padding: 0.5rem 1.5rem;
    display: inline-block;
    color: white;
}

a:hover,
a:active,
a.router-link-active {
    color: hsl(160deg 100% 37% / 100%);
    background-color: white;
}
</style>
