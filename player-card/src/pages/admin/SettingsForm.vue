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

// Language
const languages: SelectType[] = [
  { id: "english", label: "English" },
  { id: "french", label: "Français" },
];

const selectedLanguage = ref<string>("english"); // default

const setLanguage = (value: any) => {
  if (value) {
    selectedLanguage.value = value;

    // Save to local storage
    localStorage.language = value;
    console.log('settings setLanguage:', value); // DEBUG
  }
};

// Time zone
const timezones: SelectType[] = [
  { id: "utc-12:00", label: "UTC−12:00 - Baker Island" },
  { id: "utc-11:00", label: "UTC−11:00 - Pago Pago" },
  { id: "utc-10:00", label: "UTC−10:00 - Honolulu" },
  { id: "utc-09:30", label: "UTC−09:30 - Marquesas Islands" },
  { id: "utc-09:00", label: "UTC−09:00 - Anchorage" },
  { id: "utc-08:00", label: "UTC−08:00 - Los Angeles" },
  { id: "utc-07:00", label: "UTC−07:00 - Denver" },
  { id: "utc-06:00", label: "UTC−06:00 - Chicago" },
  { id: "utc-05:00", label: "UTC−05:00 - New York" },
  { id: "utc-04:00", label: "UTC−04:00 - Halifax" },
  { id: "utc-03:30", label: "UTC−03:30 - St. John's" },
  { id: "utc-03:00", label: "UTC−03:00 - Buenos Aires" },
  { id: "utc-02:00", label: "UTC−02:00 - South Georgia" },
  { id: "utc-01:00", label: "UTC−01:00 - Azores" },
  { id: "utc-00:00", label: "UTC±00:00 - London" },
  { id: "utc+01:00", label: "UTC+01:00 - Paris" },
  { id: "utc+02:00", label: "UTC+02:00 - Athens" },
  { id: "utc+03:00", label: "UTC+03:00 - Moscow" },
  { id: "utc+03:30", label: "UTC+03:30 - Tehran" },
  { id: "utc+04:00", label: "UTC+04:00 - Dubai" },
  { id: "utc+04:30", label: "UTC+04:30 - Kabul" },
  { id: "utc+05:00", label: "UTC+05:00 - Karachi" },
  { id: "utc+05:30", label: "UTC+05:30 - New Delhi" },
  { id: "utc+06:00", label: "UTC+06:00 - Dhaka" },
  { id: "utc+06:30", label: "UTC+06:30 - Yangon" },
  { id: "utc+07:00", label: "UTC+07:00 - Bangkok" },
  { id: "utc+08:00", label: "UTC+08:00 - Beijing" },
  { id: "utc+09:00", label: "UTC+09:00 - Tokyo" },
  { id: "utc+09:30", label: "UTC+09:30 - Darwin" },
  { id: "utc+10:00", label: "UTC+10:00 - Sydney" },
  { id: "utc+11:00", label: "UTC+11:00 - Honiara" },
  { id: "utc+12:00", label: "UTC+12:00 - Auckland" },
];

const selectedTimezone = ref<string>("utc-05:00"); // default

const setTimezone = (value: any) => {
  if (value) {
    selectedTimezone.value = value;

    // Save to local storage
    localStorage.Timezone = value;
    console.log('settings setTimezone:', value); // DEBUG
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
        <Label for="themeLight">Light theme</Label>
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
        <Select id="colorScheme" :model-value="selectedScheme" @update:model-value="setScheme">
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Select a color scheme" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
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

      <div class="grid gap-2">
        <Label for="language">Language</Label>
        <Select id="language" :model-value="selectedLanguage" @update:model-value="setLanguage">
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                v-for="language in languages"
                :key="language.id"
                :value="language.id"
              >
              {{ language.label }}
            </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div class="grid gap-2">
        <Label for="timezone">Timezone</Label>
        <Select id="timezone" :model-value="selectedTimezone" @update:model-value="setTimezone">
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Select timezone" />
          </SelectTrigger>
          <SelectContent class="max-h-[300px] overflow-y-auto">
            <SelectGroup>
              <SelectItem
                v-for="timezone in timezones"
                :key="timezone.id"
                :value="timezone.id"
              >
              {{ timezone.label }}
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
