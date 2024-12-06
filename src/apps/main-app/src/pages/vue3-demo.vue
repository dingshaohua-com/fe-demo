<template>
    <micro-app name="vue3-demo" :url="`${origin}/vue3-demo`" iframe/>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const origin = ref(window.location.origin);
if (import.meta.env.MODE === "development") {
  origin.value = "http://localhost:8081";
}
console.log(`${origin.value}/vue3-demo`);

</script>