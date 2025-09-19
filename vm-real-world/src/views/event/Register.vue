<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";

// Properties
const { event } = defineProps(["event"]);
const router = useRouter();

// Reactive global store for messages
const GStore = inject("GStore");

const register = () => {
  // TODO: Call API

  // Flash a success message
  GStore.flashMessage = "You are successfully registered for " + event.title;
  setTimeout(() => {
    GStore.flashMessage = "";
  }, 3000);

  // If registered then redirect to event details
  router.push({
    name: "EventDetails",
  });
};
</script>

<template>
  <p>Register for the event here</p>
  <button @click="register">Register Me</button>
</template>
