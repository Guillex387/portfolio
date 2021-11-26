<template>
  <div>
    <div v-if="loading" class="h-screen flex items-center justify-center">
      <Spinner />
    </div>
    <div v-else>
      <article class="mx-auto max-w-lg md:max-w-3xl lg:max-w-6xl">
        <Title title="Guillex387" />
        <About
          text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit debitis ratione consequuntur distinctio corporis deleniti
        eius voluptates cum dolor fuga voluptatibus facere culpa magni quisquam eos asperiores cupiditate assumenda, atque
        dignissimos explicabo autem ex sed velit quo. Nesciunt vel corrupti quaerat officiis blanditiis, fugit neque iste
        necessitatibus animi placeat aperiam illum, omnis, magni ea amet excepturi odit error repellat! Modi nisi eligendi maiores
        beatae dolores harum odio ullam esse sed, dolore incidunt reiciendis iste, tempora consequuntur ad atque reprehenderit
        quibusdam velit nulla? Laborum corporis eaque totam amet ducimus quas rem id mollitia incidunt cupiditate, qui aut
        quisquam dolores maxime. Eum!"
          logo="/qpt.png"
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
  methods: {
    async getPrograms() {
      // let response = await fetch('/api/programs');
      // if (!response.ok) return alert('Error fetching data');
      // let programs: Object[] = await response.json();
      let programs: Object[] = [
        {
          title: 'released_program',
          released: true,
          'repo-name': 'my_repo',
          owner: 'User1234',
          github_url: 'https://github.com/User1234/my_repo',
          description: 'Some of the project'
        },
        {
          title: 'unreleased_program',
          released: false,
          'repo-name': 'holamundo',
          owner: 'User1234',
          description: 'Some of the project',
          'release-date': '2023-11-21',
          github_url: 'https://github.com/User1234/my_repo'
        },
        {
          title: 'unreleased_program',
          released: false,
          'repo-name': 'holamundo',
          owner: 'User1234',
          description: 'Some of the project',
          'release-date': '2023-11-21',
          github_url: 'https://github.com/User1234/my_repo'
        },
        {
          title: 'unreleased_program',
          released: false,
          'repo-name': 'holamundo',
          owner: 'User1234',
          description: 'Some of the project',
          'release-date': '2023-11-21',
          github_url: 'https://github.com/User1234/my_repo'
        },
        {
          title: 'unreleased_program',
          released: false,
          'repo-name': 'holamundo',
          owner: 'User1234',
          description: 'Some of the project',
          'release-date': '2023-11-21',
          github_url: 'https://github.com/User1234/my_repo'
        },
        {
          title: 'unreleased_program',
          released: false,
          'repo-name': 'holamundo',
          owner: 'User1234',
          description: 'Some of the project',
          'release-date': '2023-11-21',
          github_url: 'https://github.com/User1234/my_repo'
        }
      ];
      console.log(programs);
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
