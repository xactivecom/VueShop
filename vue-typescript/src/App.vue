<script setup lang="ts">
import { inject } from "vue";
import { type GStore } from "./types";

// Flash message store
const gstore = inject<GStore>("gstore");
</script>

<template>
  <div id="app">
    <!-- Flash message area-->
    <div id="flashMessage" v-if="gstore?.flashMessage">
      {{ gstore.flashMessage }}
    </div>

    <!-- Top navigation -->
    <div id="nav">
      <router-link :to="{ name: 'EventList' }">Events</router-link> |
      <router-link :to="{ name: 'About' }">About</router-link>
    </div>
    <router-view />
  </div>
</template>

 <!-- Global styles -->
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

@keyframes yellowfade {
  from {
    background: yellow;
  }
  to {
    background: transparent;
  }
}

/* Flash message ID style */
#flashMessage {
  animation-name: yellowfade;
  animation-duration: 3s;
}

#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}

h2 {
  font-size: 20px;
}
</style>
