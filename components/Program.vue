<template>
  <div class="m-1 text-white">
    <Container :title="obj.title">
      <p class="line-clamp text-sm md:text-md sm:w-60 mb-3">
        {{ obj.description }}
      </p>
      <a class="text-blue-600 hover:underline cursor-pointer" v-if="obj['repo-name']" :href="`/program/${obj['repo-name']}`">
        More info
      </a>
      <div class="grid grid-cols-2 gap-2">
        <p class="md:w-40" v-if="obj['release-date']">{{ launchDate() }}</p>
        <div v-else></div>
        <Github
          v-if="obj.github_url"
          class="ml-auto mt-auto w-6 transition duration-500 opacity-30 hover:opacity-100"
          :link="obj.github_url"
        />
      </div>
    </Container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Container from './Container.vue';
import Github from './Github.vue';

export interface ProgramI {
  id: number;
  title: string;
  released: boolean;
  description: string;
  owner: string;
  'repo-name'?: string;
  github_url?: string;
  'release-date'?: string;
}

export function filterPrograms(programs: ProgramI[]) {
  let out = {
    releasedPrograms: [] as ProgramI[],
    prereleasedPrograms: [] as ProgramI[]
  };
  for (const program of programs) {
    if (program.released) out.releasedPrograms.push(program);
    else out.prereleasedPrograms.push(program);
  }
  return out;
}

export default Vue.extend({
  components: {
    Container,
    Github
  },
  props: {
    obj: {
      type: Object as () => ProgramI
    }
  },
  methods: {
    launchDate() {
      if (this.obj.released) return '';
      const weeksDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const monthsNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];
      let date = new Date(this.obj['release-date'] as string);
      let day = date.getDate();
      let month = monthsNames[date.getMonth()];
      let weekDay = weeksDays[date.getDay()];
      let year = date.getFullYear();
      return `${weekDay}, ${month} ${day}, ${year}`;
    }
  }
});
</script>

<style scoped>
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 4.5em;
  line-height: 1.5em;
}
</style>
