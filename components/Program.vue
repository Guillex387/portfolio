<template>
  <div class="p-0.5 text-white">
    <Container :title="obj.title">
      <p class="text-sm md:text-lg w-72">
        {{ obj.description }}
      </p>
      <a v-if="obj['repo-name']" class="transition duration-500 text-blue-600 hover:text-blue-700" href="#">More info</a>
      <div class="grid grid-cols-2 gap-2 mt-3">
        <p v-if="obj['release-date']">{{ launchDate() }}</p>
        <div v-else></div>
        <Github
          v-if="obj.github_url"
          class="ml-auto w-6 transition duration-500 opacity-30 hover:opacity-100"
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
