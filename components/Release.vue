<template>
  <Container :title="release.tag_name">
    <table class="table-auto w-full">
      <thead>
        <tr>
          <th>Asset</th>
          <th>Size</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="asset.name" v-for="asset in release.assets">
          <td class="border border-opacity-50 bg-white bg-opacity-10 py-2 text-center">{{ asset.name }}</td>
          <td class="border border-opacity-50 bg-white bg-opacity-10 py-2 text-center">{{ sizeText(asset.size) }}</td>
          <td class="border border-opacity-50 bg-white bg-opacity-10 py-2 text-center">
            <a class="text-blue-600 hover:underline cursor-pointer" @click="downloadFile(asset.browser_download_url, asset.name)"
              >Download</a
            >
          </td>
        </tr>
      </tbody>
    </table>
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
    obj: Object
  },
  data() {
    return {
      release: this.obj as ReleaseI
    };
  },
  methods: {
    async downloadFile(link: string, name: string) {
      let response = await fetch(link);
      if (!response.ok) {
        alert('Error downloading file');
        return null;
      }
      let data = await response.blob();
      let blobUrl = URL.createObjectURL(data);
      let htmlLink = document.createElement('a');
      htmlLink.setAttribute('href', blobUrl);
      htmlLink.setAttribute('download', name);
      htmlLink.click();
    },
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
