<template>
  <div>
    <div v-if="loading" class="h-screen flex items-center justify-center">
      <Spinner />
    </div>
    <div v-else>
      <article class="min-h-screen mx-auto max-w-lg md:max-w-3xl lg:max-w-6xl">
        <Title title="Guillex387" />
        <About
          text="I'm Guillex387, an indie developer, I have developed programs related to cybersecurity, cryptography, web, desktop, cli, data structures, algorithms... All my projects are open source and completely free to use, the purpose of these is simply to help and to learn. In my opinion, programming is something unique, you can create and destroy worlds only with a keyboard, in a virtual world where you have to be creative, ingenious and intelligent."
          logo="/qpt-mini.png"
        />
        <!-- Skills part -->
        <section class="transition-left pb-6 md:pb-12 mx-5 md:m-0">
          <Container class="z-index-10" v-if="releasedPrograms !== null" title="Programs">
            <div class="flex justify-center md:justify-start flex-wrap">
              <Program v-for="program in releasedPrograms" class="transition-left z-index-20" :key="program.id" :obj="program" />
            </div>
          </Container>
        </section>
        <section class="transition-right pb-6 md:pb-12 mx-5 md:m-0">
          <Container class="z-index-10" v-if="prereleasedPrograms" title="Coming soon programs">
            <div class="flex justify-center md:justify-start flex-wrap">
              <Program
                v-for="program in prereleasedPrograms"
                class="transition-right z-index-20"
                :key="program.id"
                transition="left"
                :obj="program"
              />
            </div>
          </Container>
        </section>
      </article>
      <Footer />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import About from '@/components/About.vue';
import Title from '@/components/Title.vue';
import Spinner from '@/components/Spinner.vue';
import Container from '@/components/Container.vue';
import Footer from '@/components/Footer.vue';
import Program, { ProgramI, filterPrograms } from '@/components/Program.vue';

interface State {
  loading: boolean;
  releasedPrograms: ProgramI[] | null;
  prereleasedPrograms: ProgramI[] | null;
}

export default Vue.extend({
  components: {
    About,
    Title,
    Spinner,
    Program,
    Container,
    Footer
  },
  data(): State {
    return {
      loading: true,
      releasedPrograms: null,
      prereleasedPrograms: null
    };
  },
  head() {
    return {
      title: 'Guillex387',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            "I'm Guillex387, an indie developer, I have developed programs related to cybersecurity, cryptography, web, desktop, cli, data structures, algorithms... All my projects are open source and completely free to use, the purpose of these is simply to help and to learn. In my opinion, programming is something unique, you can create and destroy worlds only with a keyboard, in a virtual world where you have to be creative, ingenious and intelligent."
        },
        {
          name: 'keywords',
          content: 'Guillex387, indie, developer, open, source, qpt, software'
        }
      ]
    };
  },
  methods: {
    async getPrograms() {
      let response = await fetch('/api/programs');
      if (!response.ok) return alert('Error fetching data');
      let programs: Object[] = await response.json();
      let formattedPrograms: ProgramI[] = [];
      for (let i = 0; i < programs.length; i++) {
        const program = programs[i];
        formattedPrograms.push({
          id: i,
          ...program
        } as ProgramI);
      }
      let filteredPrograms = filterPrograms(formattedPrograms);
      this.releasedPrograms = filteredPrograms.releasedPrograms;
      this.prereleasedPrograms = filteredPrograms.prereleasedPrograms;
    }
  },
  mounted() {
    this.getPrograms().then(() => (this.loading = false));
  }
});
</script>
