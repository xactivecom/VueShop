<script setup lang="ts">
import { inject } from "vue";
import { useRouter } from "vue-router";

import type { EventProps, GStore } from "@/types";

// Properties
const { event } = defineProps<{
  event: EventProps
}>();

// Router for page transition
const router = useRouter();

// Reactive global store for messages
const gstore = inject<GStore>("gstore");

const register = () => {
  // TODO: Call API

  // Flash a success message
  if (gstore) {
    gstore.flashMessage = "You are successfully registered for " + event.title;
    setTimeout(() => {
      gstore.flashMessage = "";
    }, 3000);
  }

  // If registered then redirect to event details
  router.push({
    name: "EventDetails",
  });
};
</script>

<template>
  <p>Register for the event here.</p>
  <button @click="register">Register Me</button>
</template>
