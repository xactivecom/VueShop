<script setup lang="ts">
import type { EventProps } from "../../types";

// Properties
const props = defineProps<{
  event: EventProps
}>();
const { event } = props;
</script>

<template :event>
  <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
  <p>{{ event.description }}</p>
</template>
