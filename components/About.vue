<template>
  <div class="transition-right pb-6 md:pb-12 mx-5 md:m-0">
    <Container title="About me">
      <div class="grid grid-cols-none md:grid-cols-3">
        <p class="md:flex-1 text-sm md:text-lg row-span-2 md:row-auto col-auto md:col-span-2">
          {{ text }}
        </p>
        <img class="m-auto" :src="logo" alt="QPT logo" />
      </div>
    </Container>
  </div>
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
