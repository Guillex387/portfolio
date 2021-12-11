<template>
  <Container title="About me">
    <div class="grid grid-cols-none md:grid-cols-3">
      <p class="md:flex-1 text-sm md:text-lg row-span-2 md:row-auto col-auto md:col-span-2">
        {{ text }}
      </p>
      <img class="m-auto" :src="logo" alt="QPT logo" />
    </div>
  </Container>
</template>

<script lang="ts">
import Vue from 'vue';
import Container from './Container.vue';
export default Vue.extend({
  components: { Container },
  props: {
    text: String,
    logo: String
  }
});
</script>
