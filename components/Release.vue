<template>
  <Container :title="obj.tag_name">
    <table class="table-auto w-full">
      <thead>
        <tr>
          <th>Asset</th>
          <th>Size</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="asset.name" v-for="asset in obj.assets">
          <td class="border border-opacity-50 bg-white bg-opacity-10 py-2 text-center">{{ asset.name }}</td>
          <td class="border border-opacity-50 bg-white bg-opacity-10 py-2 text-center">{{ sizeText(asset.size) }}</td>
          <td class="border border-opacity-50 bg-white bg-opacity-10 py-2 text-center">
            <a class="text-blue-600 hover:underline cursor-pointer" :href="asset.browser_download_url" :download="asset.name">
              Download
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="releasesPage" class="mt-5">
      <a class="text-blue-600 hover:underline cursor-pointer" :href="releasesPage">
        More releases
      </a>
    </div>
  </Container>
</template>

<script lang="ts">
import Vue from 'vue';
import Container from './Container.vue';
import { ReleaseI } from '@/pages/program/_name/releases.vue';

export default Vue.extend({
  components: {
    Container
  },
  props: {
    obj: Object as () => ReleaseI,
    releasesPage: Object as () => string | undefined
  },
  methods: {
    sizeText(size: number) {
      const formatSizes = [
        {
          size: 1000000000,
          text: 'Gb'
        },
        {
          size: 1000000,
          text: 'Mb'
        },
        {
          size: 1000,
          text: 'Kb'
        }
      ];
      for (const formatSize of formatSizes) {
        if (size >= formatSize.size) {
          return `${(size / formatSize.size).toFixed(1)} ${formatSize.text}`;
        }
      }
      return `${size} b`;
    }
  }
});
</script>
