<template>
  <div>
    <link rel="stylesheet" href="/markdown-guillex387.css" />
    <link rel="stylesheet" href="/atom-one-dark.css" />
    <div class="markdown-body" v-html="this.render(this.src)"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MDRender from 'markdown-it';
import hjs from 'highlight.js';

const md = new MDRender({
  highlight(str, lang) {
    if (lang && hjs.getLanguage(lang)) {
      return hjs.highlight(str, { language: lang }).value;
    } else {
      return hjs.highlightAuto(str).value;
    }
  },
  html: true
});

export default Vue.extend({
  props: {
    src: String
  },
  methods: {
    render(src: string): string {
      return md.render(src);
    }
  }
});
</script>
