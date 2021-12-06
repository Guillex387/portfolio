<template>
  <div>
    <div v-if="loading" class="h-screen flex items-center justify-center">
      <Spinner />
    </div>
    <div v-else>
      <div v-if="program">
        <article class="min-h-screen mx-auto max-w-lg md:max-w-3xl lg:max-w-6xl">
          <section class="transition-left py-6 md:py-12 mx-5 md:m-0">
            <Container class="p-9" title="">
              <Markdown :src="program.readme" />
            </Container>
          </section>
          <section v-if="lastRelease" class="transition-right pb-6 md:pb-12 mx-5 md:m-0">
            <Release :obj="lastRelease" />
          </section>
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
import Spinner from '@/components/Spinner.vue';
import Container from '@/components/Container.vue';
import Markdown from '@/components/Markdown.vue';
import Footer from '@/components/Footer.vue';
import { ReleaseI } from './releases.vue';
import Release from '@/components/Release.vue';

interface State {
  loading: boolean;
  errorCode: number;
  program: ProgramData | null;
  lastRelease: ReleaseI | null;
}
interface ProgramData {
  title: string;
  released: boolean;
  'repo-name': string;
  owner: string;
  github_url: string;
  description: string;
  readme: string;
}

export default Vue.extend({
  data(): State {
    return {
      loading: true,
      program: null,
      lastRelease: null,
      errorCode: 0
    };
  },
  async asyncData(ctx) {
    return { programAsync: ctx.params.name };
  },
  mounted() {
    let programName: string = (this as any).programAsync;
    Promise.all([this.fetchProgram(programName), this.fetchLastRelease(programName)]).then(([program, release]) => {
      this.program = program;
      this.lastRelease = release;
      this.loading = false;
    });
  },
  components: {
    Spinner,
    Container,
    Markdown,
    Footer,
    Release
  },
  methods: {
    async fetchProgram(name: string) {
      let response = await fetch(`/api/program/${name}`);
      if (!response.ok) {
        this.errorCode = response.status;
        return null;
      }
      let programAny = await response.json();
      if (!programAny['repo-name']) {
        this.errorCode = 404;
        return null;
      }
      return programAny as ProgramData;
    },
    async fetchLastRelease(name: string) {
      let response = await fetch(`/api/program/${name}/releases/last`);
      if (!response.ok) {
        this.errorCode = response.status;
        return null;
      }
      let release = await response.json();
      return release;
    }
  }
});
</script>
