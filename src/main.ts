import { createApp } from "vue";
import App from "./App.vue";

import HelloWorldWelcome from "./components/HelloWorldWelcome.vue";
import BaseComponentsPropsEmits from "./components/base_components_props_emits/App.vue";
import ProvideInject from "./components/provide_inject/App.vue";
import AdvancedComps from "./components/advanced_components/App.vue";
import ProjectComponents from "./components/project_components/App.vue";
import TicTacToe from "./components/tic_tac_toe/App.vue";
import HttpRequests from "./components/http_requests_and_routing/App.vue";
import LinkDetails from "./components/http_requests_and_routing/LinkDetails.vue";
import RoutingAdv from "./components/http_with_routing_2/App.vue";
import LinksList from "./components/http_requests_and_routing/LinksList.vue";
import AddLink from "./components/http_with_routing_2/AddLink.vue";
import TheAnimation from "./components/animations/App.vue";

import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    // Browser default history
    history: createWebHistory(),
    routes: [
        { path: "/", redirect: "/welcome" },
        { path: "/welcome", component: HelloWorldWelcome, alias: "/" },
        {
            path: "/base",
            component: BaseComponentsPropsEmits,
            // Can also be done in the component beforeRouteEnter
            beforeEnter(to, from) {
                console.log("got intercepted to", to);
                console.log("got intercepted from", from);
            },
        },
        { path: "/provide", component: ProvideInject },
        { path: "/advanced", component: AdvancedComps },
        { path: "/links", component: ProjectComponents },
        { path: "/tic", component: TicTacToe, meta: { requiresAuth: true } },
        { path: "/http/:subpath", component: HttpRequests },
        {
            path: "/link/:id",
            component: LinkDetails,
            props: true,
            // Easier to set route : router.push({ name: "link", params: { id: 3 } })
            name: "link",
        },
        { path: "/routing", redirect: "/routing/base" },
        {
            path: "/routing",
            component: RoutingAdv,
            children: [
                {
                    path: "base",
                    component: LinksList,
                },
                {
                    path: "new",
                    component: AddLink,
                },
                { path: ":notFound(.*)", redirect: "/routing/base" }, // Catch all unknown
            ],
        },
        {
            path: "/:notFound(.*)", // Catch all unknown
            redirect: "/",
        },
        { path: "/animations", component: TheAnimation },
    ],
    // linkActiveClass: "..." control which class is set

    // Control scrolling (back to top, ...) on route change.
    // scrollBehavior(to (route), from (route), savePosition (previous pos)) {
    scrollBehavior() {
        return { left: 0, top: 0 };
    },
});

// Global guards :

// Act before anything happends : check auth, query, ...
// true continue, false don't move
router.beforeResolve((to) => {
    // const isAuthenticated = true;
    const isAuthenticated = to.query.isAuthenticated;
    if (to.meta.requiresAuth && !isAuthenticated) {
        alert("Needs query parameter isAuthenticated=1 !");
        return false;
    }
});
// Manage redirects, ...
router.beforeEach((to, from) => {
    if (!to.query.intercepted) {
        return {
            ...to,
            query: { ...from.query, ...to.query, intercepted: "1" },
        };
    } else if (
        to.query.isAuthenticated == null &&
        from.query.isAuthenticated != null
    ) {
        return {
            ...to,
            query: { ...to.query, isAuthenticated: from.query.isAuthenticated },
        };
    }
});
// router.afterEach((to, from) => {}) // more for logging, ...

// Order :
//
// global    beforeResolve
// global    beforeEach
// route     beforeEnter
// component beforeRouteEnter
// component beforeRouteUpdate

import "./assets/main.css";

const app = createApp(App);

app.use(router);

// Wait for first route to be ready before mounting app :
//  => prevents animations and all on loading
router.isReady().then(() => app.mount("#app"));
