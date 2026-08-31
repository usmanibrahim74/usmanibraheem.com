<script setup>
import AboutMe from "../components/AboutMe/Index.vue";
import Hero from "../components/Hero.vue";
import Skill from "../components/Skill.vue";
import Experience from "../components/Experience.vue";
import Projects from "../components/Projects.vue";
import { useHead } from '@unhead/vue';

defineProps({
  theme: {
    type: String,
    default: null
  }
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://usmanibraheem.com/' },
  ],
});
</script>

<template>
  <Hero :theme="theme"/>
  <AboutMe/>
  <Experience/>
  <Skill/>
  <Projects/>
</template>
