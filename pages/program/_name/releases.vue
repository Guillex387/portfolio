<template>
  <div>
    <div v-if="loading" class="h-screen flex items-center justify-center">
      <Spinner />
    </div>
    <div v-else>
      <div v-if="releases">
        <article class="min-h-screen mx-auto max-w-lg md:max-w-3xl lg:max-w-6xl pt-6 md:pt-12" v-if="releases">
          <div class="transition-left pb-6 md:pb-12 mx-5 md:m-0" v-for="release in releases" :key="release.tag_name">
            <Relese :obj="release" />
          </div>
        </article>
        <Footer />
      </div>
      <div v-else class="h-screen flex items-center justify-center">
        <h1 class="text-7xl font-bold text-white">Error {{ errorCode }}</h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Footer from '@/components/Footer.vue';
import Relese from '@/components/Release.vue';

interface State {
  loading: boolean;
  errorCode: number;
  releases: ReleaseI[] | null;
}
export interface ReleaseI {
  tag_name: string;
  published_at: string;
  assets: {
    name: string;
    size: number;
    download_count: number;
    browser_download_url: string;
  }[];
}

export default Vue.extend({
  components: {
    Footer,
    Relese
  },
  data(): State {
    return {
      loading: false,
      errorCode: 0,
      releases: null
    };
  },
  async asyncData(ctx) {
    return { programAsync: ctx.params.name };
  },
  mounted() {
    let programName: string = (this as any).programAsync;
    this.fetchReleases(programName).then(releases => {
      this.releases = releases;
      this.loading = false;
    });
  },
  methods: {
    async fetchReleases(name: string) {
      let response = await fetch(`/api/program/${name}/releases`);
      if (!response.ok) {
        this.errorCode = response.status;
        return null;
      }
      let releases: ReleaseI[] = await response.json();
      return releases;
    }
  }
});
</script>
