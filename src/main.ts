import { createApp } from "vue";
import App from "./App.vue";

import HelloWorldWelcome from "./components/HelloWorldWelcome.vue";
import BaseComponentsPropsEmits from "./components/base_components_props_emits/App.vue";
import ProvideInject from "./components/provide_inject/App.vue";
import AdvancedComps from "./components/advanced_components/App.vue";
import ProjectComponents from "./components/project_components/App.vue";
import TicTacToe from "./components/tic_tac_toe/App.vue";
import HttpRequests from "./components/http_requests/App.vue";
import LinkDetails from "./components/http_requests/LinkDetails.vue";

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
        },
        { path: "/provide", component: ProvideInject },
        { path: "/advanced", component: AdvancedComps },
        { path: "/links", component: ProjectComponents },
        { path: "/tic", component: TicTacToe },
        { path: "/http/:subpath", component: HttpRequests },
        { path: "/link/:id", component: LinkDetails, props: true },
        { path: "/:notFound(.*)", redirect: "/" }
    ],
});

import "./assets/main.css";

const app = createApp(App);

app.use(router);

app.mount("#app");
