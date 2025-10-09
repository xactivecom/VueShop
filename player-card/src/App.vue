<script setup lang="ts">
//import { h, ref, onMounted } from "vue";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import LoginForm from "@/components/auth/LoginForm.vue";
import SignupForm from "@/components/auth/SignupForm.vue";
import SettingsForm from "@/components/auth/SettingsForm.vue";

import type { Season } from "@/types/index";

const seasons: Season[] = [];
</script>


<template>
  <!-- Header - fixed to top -->
  <div class="fixed top-0 left-0 w-full h-8 mb-4 bg-blue-500">
    <button class="p-2 hover:underline cursor-pointer test-sm" onclick="document.documentElement.classList.toggle('dark')">Color</Button>
  </div>

  <div class="m-2">
    <h1 class="text-2xl">Portal Blocks Demo</h1>
  </div>

  <!-- Text input field, label -->
  <div class="my-4 border border-solid">
    <div class="p-2 grid w-full max-w-sm items-center gap-1.5">
      <Label for="playerName">Player Name</Label>
      <Input id="playerName" type="text" placeholder="Enter name" />
    </div>
    <div class="p-2">
      <Button size="lg">Do Something</Button>
    </div>
  </div>

  <div class="p-2 flex items-center space-x-2">
    <Switch id="airplane-mode" />
    <Label for="airplane-mode">Airplane Mode</Label>
  </div>

  <LoginForm />
  <br />
  <SignupForm />
  <br />
  <SettingsForm />
  <br />

  <br />

  <!-- Footer - fixed to bottom -->
  <div class="fixed bottom-0 left-0 w-full h-4 mt-4 bg-yellow-200"></div>
  
  </template>
