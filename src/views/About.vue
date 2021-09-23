<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const name = computed(() => {
  return store.state.user.name;
});
</script>
<template>
  <div>
    <h1>About {{ name }}</h1>
  </div>
</template>
