<script setup lang="ts">
import { computed, ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

import EventCard from "../components/EventCard.vue";
import EventService from "../services/EventService.js";
import LoadingIndicator from "../components/LoadingIndicator.vue";
import { type EventProps } from "../types";

// Properties
const props = defineProps(["page"]);
const router = useRouter();

// Data loading indicator
const isLoading = ref(false);

// Event list reference
const events = ref<EventProps[] | null>(null);

// Number of total events
const totalEvents = ref(0);

// Fetch events from the EventService
const fetchEvents = async () => {
  // Look busy
  isLoading.value = true;

  // Get events using API
  try {
	  const response = await EventService.getEvents(2, props.page);
    events.value = response.data;

    // The number of total events is indicated in the response header
    totalEvents.value = response.headers["x-total-count"];
	} catch (_error) {
    router.push({ name: "NetworkError" });
  } finally {
    isLoading.value = false;
  }
};

// Determine if at the end of event data
const hasNextPage = computed(() => {
	const totalPages = Math.ceil(totalEvents.value / 2);
	return props.page < totalPages;
});

// Lifecycle hook before first render of component
onMounted(async () => {
	await fetchEvents();
});

// Watch for page property change, then call function to fetch events
watch(
  () => props.page, 
  async () => {
    events.value = null;
    await fetchEvents();
  }
)
</script>

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <LoadingIndicator v-if="isLoading == true" text="Loading events..." />
    <div v-if="events && !isLoading">
      <EventCard v-for="event in events" :key="event.id" :event="event" />

      <div class="pagination">
        <router-link
          :to="{ name: 'EventList', query: { page: page - 1 } }"
          rel="prev"
          v-if="page != 1"
        >&#60; Prev</router-link>
        <router-link
          :to="{ name: 'EventList', query: { page: page + 1 } }"
          rel="next"
          v-if="hasNextPage"
        >Next &#62;</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
	display: flex;
	width: 290px;
}
.pagination a {
	flex: 1;
	text-decoration: none;
	color: #2c3e50;
}

#page-prev {
	text-align: left;
}

#page-next {
	text-align: right;
}
</style>
