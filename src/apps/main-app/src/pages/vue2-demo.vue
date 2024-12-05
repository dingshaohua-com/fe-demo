<template>
    <!-- <micro-app name="vue2-demo" url="http://localhost:8080/"/> -->
    <micro-app name="vue2-demo" :url="`${origin}/vue2-demo`"/>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const origin = ref(window.location.origin);
</script>