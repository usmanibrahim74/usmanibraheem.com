<script setup>
import Layout from "../Layout.vue";
import SectionTitle from "./SectionTitle.vue";
import {projectsData} from "../Utils/ProjectsData.js";
import {Icon} from "@iconify/vue";
import {styleGuide} from "../Utils/ReusableStyles.js";
</script>

<template>
  <Layout id="projects" class="dark:bg-darkBgColor pt-8 transition-all duration-500">
    <div class="pt-12">
      <SectionTitle eyebrow="Things I've built" title="Projects"/>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] mt-12">
      <div v-for="project in projectsData" :key="project.name" class="border dark:border-darkBorderColor border-borderColor bg-white/50 dark:bg-slate-900/40 hover:border-highlightPrimary/50 dark:hover:border-highlightPrimary/50 hover:shadow-lg hover:shadow-highlightPrimary/5 transition-all duration-300 rounded-xl flex flex-col">

        <RouterLink :to="`/projects/${project.slug}`" class="h-[150px] lg:h-[210px] overflow-hidden rounded-t-xl block">
          <img
              :alt="project.name"
              :src="project.thumbnail"
              class="w-full h-full hover:scale-[1.1] transition-all duration-500 object-cover object-top"
          />
        </RouterLink>

        <div class="p-4 flex flex-col flex-1">
          <RouterLink :to="`/projects/${project.slug}`">
            <h3 class="font-display text-[1.3rem] dark:text-darkTextColor text-textColor font-[600] hover:text-highlightPrimary dark:hover:text-highlightPrimary transition duration-300">{{project.name}}</h3>
          </RouterLink>

          <p class="text-[0.9rem] font-[400] dark:text-darkDisableColor text-disableColor mt-1.5 leading-relaxed">
            {{project.summary}}
          </p>

          <div class="mt-3">
            <p class="text-[0.7rem] font-[600] uppercase tracking-[0.15em] text-highlightPrimary">Technology</p>
            <div class="flex items-center flex-wrap gap-[8px] mt-2">
              <div v-for="tag in project.tags" :key="tag" class="border rounded-md dark:text-darkDisableColor dark:border-darkBorderColor capitalize px-2 py-1 text-[0.8rem] text-disableColor border-borderColor">
                {{tag}}
              </div>
            </div>
          </div>

          <div class="flex items-center flex-wrap gap-[10px] mt-auto pt-5">
            <RouterLink :to="`/projects/${project.slug}`" :class="styleGuide.buttonFill">
              <Icon icon="hugeicons:file-01" width="20" height="20" />
              View Project
            </RouterLink>
            <a :class="styleGuide.buttonOutline" target="_blank" :href="project.live">
              <Icon icon="hugeicons:link-square-02" width="20" height="20" />
              Live
            </a>
            <a v-if="project.github" :class="styleGuide.buttonOutline" target="_blank" :href="project.github">
              <Icon icon="hugeicons:github-01" width="20" height="20" />
              Github
            </a>
          </div>

        </div>
      </div>
    </div>
  </Layout>
</template>
