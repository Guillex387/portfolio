<template>
  <div class="flex justify-center md:justify-start mx-5 md:mx-0 py-6 md:py-12">
    <h1 class="transition-left title text-6xl font-bold">
      {{ title }}
    </h1>
  </div>
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
