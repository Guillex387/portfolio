<template>
  <h1 class="title text-6xl font-bold">
    {{ title }}
  </h1>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    title: String
  }
});
</script>

<style scoped>
.title {
  -webkit-text-stroke: 1px white;
  color: transparent;
  transition-duration: 500ms;
}
.title:hover {
  color: white;
}
</style>
