<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-container>
        <h2 class="text-center">Bankaita Weather API</h2>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container class="mt-10">
        <app-home></app-home>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Home from "@/views/Home.vue";
export default {
  name: "App",
  components: {
    "app-home": Home
  }
};
</script>
