import { createApp, reactive } from "vue";

import App from "./App.vue";
import router from "./router";

// Reactive global flash message store
const GStore = reactive({ flashMessage: "" });

const app = createApp(App);

app.use(router);
app.provide("GStore", GStore);

app.mount("#app");
