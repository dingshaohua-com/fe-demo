<template>
    <!-- <micro-app name="vue3-demo" url="http://localhost:8081/" iframe/> -->
    <micro-app name="vue3-demo" :url="`${origin}/vue3-demo`" iframe/>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const origin = ref(window.location.origin);
</script>