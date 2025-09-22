<script setup lang="ts">

// Properties
const props = withDefaults(defineProps<{
  resource: string,
}>(), {
  resource: "page",
});
const { resource } = props;
</script>

<template>
  <h1>Oops!</h1>
  <h3>The {{ resource }} you're looking for is not here.</h3>
  <router-link :to="{ name: 'EventList' }">Back to the home page</router-link>
</template>
