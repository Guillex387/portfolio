<template>
  <div class="p-4 text-white bg-white bg-opacity-10 rounded-lg">
    <h3 class="font-bold text-xl">{{ title }}</h3>
    <hr class="my-2 opacity-50" />
    <slot></slot>
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
