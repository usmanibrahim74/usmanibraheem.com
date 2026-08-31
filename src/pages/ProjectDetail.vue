<script setup>
import { computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { useHead } from '@unhead/vue';
import Layout from "../Layout.vue";
import { Icon } from "@iconify/vue";
import { styleGuide } from "../Utils/ReusableStyles.js";
import { projectsData } from "../Utils/ProjectsData.js";

const SITE_URL = 'https://usmanibraheem.com';

const route = useRoute();

const project = computed(() =>
    projectsData.find((p) => p.slug === route.params.slug)
);

const otherProjects = computed(() =>
    projectsData.filter((p) => p.slug !== route.params.slug).slice(0, 3)
);

useHead(() => {
  if (!project.value) {
    return {
      title: 'Project not found - Usman Ibraheem',
      meta: [{ name: 'robots', content: 'noindex, nofollow' }],
    };
  }

  const title = `${project.value.name} - Usman Ibraheem`;
  const description = project.value.content.intro;
  const url = `${SITE_URL}/projects/${project.value.slug}`;
  const image = project.value.thumbnail.startsWith('http')
      ? project.value.thumbnail
      : `${SITE_URL}${project.value.thumbnail}`;

  return {
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: url },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ],
    link: [
      { rel: 'canonical', href: url },
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.value.name,
          description,
          image,
          url,
          creator: {
            '@type': 'Person',
            name: 'Usman Ibraheem',
            url: SITE_URL,
          },
        }),
      },
    ],
  };
});
</script>

<template>
  <Layout class="dark:bg-darkBgColor pt-8 pb-20 transition-all duration-500 min-h-[70vh]">

    <template v-if="project">
      <RouterLink to="/#projects" class="inline-flex items-center gap-[6px] text-[0.95rem] text-disableColor dark:text-darkDisableColor hover:text-highlightPrimary dark:hover:text-highlightPrimary transition duration-300 mt-8">
        <Icon icon="hugeicons:arrow-left-02" width="18" height="18" />
        Back to Projects
      </RouterLink>

      <div class="mt-6 rounded-xl overflow-hidden border dark:border-darkBorderColor border-borderColor max-h-[520px]">
        <img :src="project.thumbnail" :alt="project.name" class="w-full h-full object-cover object-top" />
      </div>

      <div class="mt-8 flex flex-col lg:flex-row lg:items-start gap-8">
        <div class="flex-1">
          <h1 class="font-display text-[1.8rem] sm:text-[2.2rem] font-[600] text-textColor dark:text-darkTextColor">{{ project.name }}</h1>

          <p class="text-[1.05rem] font-[400] dark:text-darkTextColor/90 text-textColor mt-4 leading-relaxed">
            {{ project.content.intro }}
          </p>

          <div v-if="project.content.highlights?.length" class="mt-7">
            <h2 class="text-[0.8rem] font-[600] uppercase tracking-[0.2em] text-highlightPrimary">Highlights</h2>
            <ul class="mt-3 flex flex-col gap-[12px]">
              <li v-for="point in project.content.highlights" :key="point" class="flex items-start gap-[10px] text-[0.95rem] dark:text-darkDisableColor text-disableColor leading-relaxed">
                <Icon icon="hugeicons:checkmark-circle-02" width="20" height="20" class="text-highlightPrimary shrink-0 mt-[2px]" />
                <span>{{ point }}</span>
              </li>
            </ul>
          </div>

          <div v-if="project.content.role" class="mt-7">
            <h2 class="text-[0.8rem] font-[600] uppercase tracking-[0.2em] text-highlightPrimary">My Role</h2>
            <p class="mt-3 text-[0.95rem] dark:text-darkDisableColor text-disableColor leading-relaxed">
              {{ project.content.role }}
            </p>
          </div>

          <div v-if="project.content.demo?.length" class="mt-7 border dark:border-darkBorderColor border-borderColor rounded-xl p-4 bg-white/50 dark:bg-slate-900/40">
            <p class="flex items-center gap-[8px] text-[0.9rem] font-[600] text-textColor dark:text-darkTextColor">
              <Icon icon="hugeicons:key-01" width="18" height="18" class="text-highlightPrimary" />
              Try the demo
            </p>
            <div class="flex flex-wrap gap-[10px] mt-3">
              <div v-for="cred in project.content.demo" :key="cred.label" class="flex items-center gap-[6px] border dark:border-darkBorderColor border-borderColor rounded-lg px-3 py-1.5 text-[0.85rem]">
                <span class="text-disableColor dark:text-darkDisableColor">{{ cred.label }}:</span>
                <span class="font-mono dark:text-darkTextColor text-textColor">{{ cred.value }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full lg:w-[280px] shrink-0 border dark:border-darkBorderColor border-borderColor rounded-xl p-5">
          <p class="text-[1rem] font-[600] dark:text-darkDisableColor text-disableColor">Technology</p>
          <div class="flex items-center flex-wrap gap-[8px] mt-3">
            <div v-for="tag in project.tags" :key="tag" class="border rounded-md dark:text-darkDisableColor dark:border-darkBorderColor capitalize px-2 py-1 text-[0.8rem] text-disableColor border-borderColor">
              {{ tag }}
            </div>
          </div>

          <div class="flex flex-col items-stretch gap-[10px] mt-6">
            <a :class="styleGuide.buttonFill" target="_blank" :href="project.live">
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

      <div v-if="otherProjects.length" class="mt-16 pt-10 border-t dark:border-darkBorderColor border-borderColor">
        <h3 class="font-display text-[1.3rem] font-[600] text-textColor dark:text-darkTextColor">More Projects</h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] mt-6">
          <RouterLink v-for="other in otherProjects" :key="other.slug" :to="`/projects/${other.slug}`"
                      class="group border dark:border-darkBorderColor border-borderColor bg-white/50 dark:bg-slate-900/40 hover:border-highlightPrimary/50 dark:hover:border-highlightPrimary/50 hover:shadow-lg hover:shadow-highlightPrimary/5 transition-all duration-300 rounded-xl flex flex-col overflow-hidden">
            <div class="h-[150px] lg:h-[180px] overflow-hidden">
              <img :src="other.thumbnail" :alt="other.name" class="w-full h-full group-hover:scale-[1.1] transition-all duration-500 object-cover object-top" />
            </div>
            <div class="p-4 flex flex-col flex-1">
              <h4 class="font-display text-[1.05rem] dark:text-darkTextColor text-textColor font-[600] group-hover:text-highlightPrimary dark:group-hover:text-highlightPrimary transition duration-300">{{ other.name }}</h4>
              <p class="text-[0.85rem] font-[400] dark:text-darkDisableColor text-disableColor mt-1.5 leading-relaxed">{{ other.summary }}</p>
              <span class="mt-auto pt-4 text-[0.85rem] font-[600] text-highlightPrimary flex items-center gap-[6px]">
                View Project
                <Icon icon="hugeicons:arrow-right-02" width="16" height="16" class="group-hover:translate-x-[3px] transition-transform duration-300" />
              </span>
            </div>
          </RouterLink>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="flex flex-col items-center text-center py-24">
        <h1 class="font-display text-[1.8rem] font-[600] text-textColor dark:text-darkTextColor">Project not found</h1>
        <p class="text-[1rem] dark:text-darkDisableColor text-disableColor mt-2">The project you're looking for doesn't exist.</p>
        <RouterLink to="/#projects" :class="[styleGuide.buttonFill, 'mt-6']">
          Back to Projects
        </RouterLink>
      </div>
    </template>

  </Layout>
</template>
