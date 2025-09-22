<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import EventService from "@/services/EventService.js";
import { type EventProps } from "@/types";

const props = defineProps(["id"]);
const router = useRouter();

const event = ref<EventProps | null>(null);
const id = computed(() => props.id);

// Lifecycle hook before first render of component
onMounted(async () => {
  try {
    // Get event using API
    const response = await EventService.getEvent(id.value);
    event.value = response.data;
  } catch (error: any) {
    if (error.response && error.response.status == 404) {
      router.push({
        name: "404Resource",
        params: { resource: "event" }
      });
    } else {
      router.push({ name: "NetworkError" });
    }
  }
});
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>

    <!-- Secondary navigation -->
    <div id="nav">
      <router-link :to="{ name: 'EventDetails' }">Details</router-link>
      |
      <router-link :to="{ name: 'EventRegister' }">Register</router-link>
      |
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </div>
    <router-view :event="event" />
  </div>
</template>
