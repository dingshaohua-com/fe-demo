<template>
  <micro-app name="vue2-demo" :url="`${origin}/vue2-demo`" />
</template>
<script setup lang="ts">
import { ref } from "vue";

let origin = ref(window.location.origin);
if (import.meta.env.MODE === "development") {
  origin.value = "http://localhost:8080";
}
console.log(`${origin.value}/vue2-demo`);
</script>
