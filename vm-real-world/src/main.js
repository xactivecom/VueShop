import { createApp, reactive } from "vue";

import App from "./App.vue";
import router from "./router";

// Reactive global flash message store
const GStore = reactive({ flashMessage: "" });

// Create app instance
const app = createApp(App);

// Add app middleware
app.use(router);
app.provide("GStore", GStore);
app.mount("#app");
