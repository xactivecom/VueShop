<script setup lang="ts">
import { ref } from "vue";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sun, Moon } from "lucide-vue-next";

// Generic select type
interface SelectType {
  id: string;
  label: string;
}

// Light theme
const setTheme = (theme: string) => {
  // Set browser-level class
  document.documentElement.className = theme;

  // Save to local storage
  localStorage.theme = theme;
  console.log("settings setTheme:", theme); // DEBUG
}

// Color scheme
const colorSchemes: SelectType[] = [
  { id: "blue", label: "Blue" },
  { id: "green", label: "Green" },
  { id: "orange", label: "Orange" },
];

const selectedScheme = ref<string>("blue"); // default

const setScheme = (value: any) => {
  if (value) {
    selectedScheme.value = value;

    // Save to local storage
    localStorage.colorScheme = value;
    console.log('settings setScheme:', value); // DEBUG
  }
};
</script>

<template>
<Card class="mx-auto max-w-sm">
  <CardHeader>
    <CardTitle class="text-2xl">Settings</CardTitle>
    <CardDescription>Custom settings for your account</CardDescription>
  </CardHeader>
  <CardContent>
    <div class="grid gap-4">
      <div class="grid gap-2">
        <Label for="Theme">Light theme</Label>
        <div class="grid grid-cols-2 gap-4">
          <Button id="themeLight" variant="outline" @click="setTheme('light')">
            <Sun class="size-4 mr-2" />
            Light
          </Button>
          <Button id="themeDark" variant="outline" @click="setTheme('dark')">
            <Moon class="size-4 mr-2" />
            Dark
          </Button>
        </div>
      </div>
      <div class="grid gap-2">
        <Label for="colorScheme">Color scheme</Label>
        <Select :model-value="selectedScheme" @update:model-value="setScheme">
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Select a color scheme" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Color Schemes</SelectLabel>
              <SelectItem
                v-for="scheme in colorSchemes"
                :key="scheme.id"
                :value="scheme.id"
              >
              {{ scheme.label }}
            </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" class="w-full">Save</Button>
    </div>
  </CardContent>
</Card>
</template>
