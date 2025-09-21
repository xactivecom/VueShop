<script setup lang="ts">
// Properties
defineProps<{
  text?: string;
}>();
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="spinner"></div>
    <p v-if="text" class="mt-2 text-gray-600 text-sm">{{ text }}</p>
  </div>
</template>

<style scoped>
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb; /* light gray */
  border-top: 4px solid #3b82f6; /* blue */
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: auto;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
