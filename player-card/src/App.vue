<script setup lang="ts">
//import { h, ref, onMounted } from "vue";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import AppNav from "@/pages/AppNav.vue";
import LoginForm from "@/pages/admin/LoginForm.vue";
import SignupForm from "@/pages/admin/SignupForm.vue";
import SettingsForm from "@/pages/admin/SettingsForm.vue";

import type { Season } from "@/types/index";

const seasons: Season[] = [];
</script>


<template>


  <AppNav />
  <br />

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

  </template>
