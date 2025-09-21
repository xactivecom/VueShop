import { createApp, reactive } from 'vue';

import App from './App.vue';
import router from "./router";

// Reactive global flash message container
const gstore = reactive({ flashMessage: "" });

// Create app instance
const app = createApp(App);

// Add app middleware
app.use(router);
app.provide("gstore", gstore);
app.mount("#app");

