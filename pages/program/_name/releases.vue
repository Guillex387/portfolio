<template>
  <!-- TODO: Make the component releases and put a list here -->
</template>

<script lang="ts">
import Vue from 'vue';

export interface Release {
  tag_name: string;
  published_at: string;
  assets: {
    name: string;
    size: number;
    download_count: number;
    browser_download_url: string;
  }[];
}

export default Vue.extend({});
</script>
