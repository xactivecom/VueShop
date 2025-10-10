<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Leaders</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="grid w-[200px] gap-4">
            <li>
              <NavigationMenuLink as-child>
                <NuxtLink to="#">
                  League leaders
                </NuxtLink>
              </NavigationMenuLink>
              <NavigationMenuLink as-child>
                <NuxtLink to="#">
                  Standings/Playoffs
                </NuxtLink>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>History</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="grid w-[200px] gap-4">
            <li>
              <NavigationMenuLink as-child>
                <NuxtLink to="#">
                  Leaders
                </NuxtLink>
              </NavigationMenuLink>
              <NavigationMenuLink as-child>
                <NuxtLink to="#">
                  Era adjusted leaders
                </NuxtLink>
              </NavigationMenuLink>
              <NavigationMenuLink as-child>
                <NuxtLink to="#">
                  Draft history
                </NuxtLink>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Profile</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="grid w-[200px] gap-4">
            <li>
              <NavigationMenuLink as-child>
                  View profile
              </NavigationMenuLink>
              <NavigationMenuLink as-child>
                <NuxtLink to="#">
                  Settings
                </NuxtLink>
              </NavigationMenuLink>
              <NavigationMenuLink as-child>
                <NuxtLink to="#">
                  Help
                </NuxtLink>
              </NavigationMenuLink>
              <NavigationMenuLink as-child>
                <NuxtLink to="#">
                  Logout
                </NuxtLink>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
