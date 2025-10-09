<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
</script>

<template>
<Card class="mx-auto max-w-sm">
  <CardHeader>
    <CardTitle class="text-2xl">Sign Up</CardTitle>
    <CardDescription>Enter your information to create an account</CardDescription>
  </CardHeader>
  <CardContent>
    <div class="grid gap-4">
      <div class="grid grid-cols-2 gap-4">
        <div class="grid gap-2">
          <Label for="firstName">First name</Label>
          <Input id="firstName" placeholder="Jim" required />
        </div>
        <div class="grid gap-2">
          <Label for="lastName">Last name</Label>
          <Input id="latName" placeholder="Smith" required />
        </div>
      </div>
      <div class="grid gap-2">
        <Label for="email">Email</Label>
        <Input id="email" type="email" placeholder="jim.smith@example.com" required />
      </div>
      <div class="grid gap-2">
        <Label for="password">Password</Label>
        <Input id="password" type="password" required />
      </div>
      <Button type="submit" class="w-full">Create an account</Button>
    </div>
    <div class="mt-4 text-center text-sm">
      Already have an account?
      <a href="#" class="underline">Sign in</a>
    </div>
  </CardContent>
</Card>
</template>
