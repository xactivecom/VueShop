
<script setup lang="ts">
import { ref } from 'vue'
import { useTheme, type Theme } from '@/composables/useTheme'

defineProps<{
  showDropdown?: boolean
}>()

const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme()
const isOpen = ref(false)

const selectTheme = (newTheme: Theme) => {
  setTheme(newTheme)
  isOpen.value = false
}
</script>

<template>
  <div class="inline-flex items-center gap-2">
    <button
      @click="toggleTheme"
      class="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      :aria-label="`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`"
    >
      <!-- Sun icon for light mode -->
      <svg
        v-if="resolvedTheme === 'dark'"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="transition-transform duration-200"
      >
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2"></path>
        <path d="M12 20v2"></path>
        <path d="m4.93 4.93 1.41 1.41"></path>
        <path d="m17.66 17.66 1.41 1.41"></path>
        <path d="M2 12h2"></path>
        <path d="M20 12h2"></path>
        <path d="m6.34 17.66-1.41 1.41"></path>
        <path d="m19.07 4.93-1.41 1.41"></path>
      </svg>

      <!-- Moon icon for dark mode -->
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="transition-transform duration-200"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
      </svg>
    </button>

    <!-- Optional: Dropdown for light/dark/system selection -->
    <div v-if="showDropdown" class="relative">
      <button
        @click="isOpen = !isOpen"
        class="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        {{ theme }}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          :class="{ 'rotate-180': isOpen }"
          class="transition-transform"
        >
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </button>

      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-32 rounded-lg border border-border bg-card shadow-lg"
      >
        <button
          v-for="option in ['light', 'dark', 'system']"
          :key="option"
          @click="selectTheme(option as Theme)"
          class="w-full px-4 py-2 text-left text-sm text-card-foreground hover:bg-accent hover:text-accent-foreground first:rounded-t-lg last:rounded-b-lg"
          :class="{ 'bg-accent': theme === option }"
        >
          {{ option }}
        </button>
      </div>
    </div>
  </div>
</template>
