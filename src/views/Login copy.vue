<script setup>
import InitSesion from "../components/InitSesion.vue";
// defineProps({
//   opcion: Boolean,
// });

import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const name = computed(() => store.state.user.name);
const newName = ref("");

function saveName() {
  store.dispatch("saveName", newName.value);
  newName.value = "";
  router.push("/about");
}
</script>

<template>
  <main>
    <InitSesion />
  </main>
</template>
