<script setup>
import { ref } from "vue";

defineProps({
  titulo: String,
});
</script>

<template>
  <h1>{{ titulo }}</h1>
</template>

<style scoped></style>
