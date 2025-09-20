<script setup lang="ts">
import type { EventItem } from "../../types";

defineProps<{
  event: EventItem
}>();
</script>

<template :event>
  <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
  <p>{{ event.description }}</p>
</template>
