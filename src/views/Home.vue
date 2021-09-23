<script setup>
defineProps({
  opcion: Boolean,
});

import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const name = computed(() => store.state.user.name);
const newName = ref("");

function saveName() {
  console.log(store);
  store.dispatch("saveName", newName.value);
  newName.value = "";
  router.push("/about");
}
</script>

<template>
  <main>
    <span>
      {{ name }}
    </span>
    <input type="text" name="newName" v-model="newName" />
    <button class="btn btn-primary" @click="saveName">Registrar</button>
  </main>
</template>
