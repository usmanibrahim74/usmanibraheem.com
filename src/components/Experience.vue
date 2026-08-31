<script setup>
import Layout from "../Layout.vue";
import SectionTitle from "./SectionTitle.vue";
import {experienceData} from "../Utils/ExperienceData.js";
import {Icon} from "@iconify/vue";
import {ref} from "vue";

// Create a reactive state to track expanded descriptions
const expandedDescriptions = ref(
    experienceData.reduce((acc, experience) => {
      acc[experience.description] = false;
      return acc;
    }, {})
);

// Function to toggle description
const toggleDescription = (description) => {
  expandedDescriptions.value[description] = !expandedDescriptions.value[description];
};

</script>

<template>
  <Layout id="experience" class="dark:bg-darkBgColor pt-12 lg:pt-0 transition-all duration-500">
    <div class="pt-8">
      <SectionTitle eyebrow="Where I've worked" title="Experience"/>
    </div>

    <div class="pt-10 lg:pt-14 grid grid-cols-1 lg:grid-cols-3 gap-[20px]">
      <div v-for="experience in experienceData" :key="experience.company_name"
           class="lg:first:mt-8 lg:last:mt-8 w-full h-max border border-borderColor dark:border-darkBorderColor bg-white/50 dark:bg-slate-900/40 hover:border-highlightPrimary/50 dark:hover:border-highlightPrimary/50 hover:shadow-lg hover:shadow-highlightPrimary/5 transition-all duration-300 rounded-xl py-6 px-4 flex gap-[12px]">

        <a :href="experience.website" target="_blank" class="min-w-[60px]">
          <img alt="company/logo" :src="experience.logo"
               class="w-[60px] h-[60px] rounded-xl border border-borderColor/60 dark:border-darkBorderColor/60 object-cover bg-white"/>
        </a>

        <div>

          <h3 class="font-display text-[1.3rem] text-textColor dark:text-darkTextColor font-[500]">{{experience.position}}</h3>

          <p class="flex items-center text-textColor dark:text-darkDisableColor font-[400] gap-[5px] text-[0.9rem]">
            <span>{{experience.company_name}}</span>
            <Icon icon="material-symbols-light:circle" width="6" height="6" class="text-gray-400"/>
            <span class="capitalize">{{experience.jobType}}</span>
          </p>

          <p class="flex items-center text-disableColor dark:text-darkDisableColor font-[400] text-[0.9rem]">
            <span>{{experience.start_date}}</span>
            <Icon icon="material-symbols-light:check-indeterminate-small-rounded" width="24" height="24" class="text-gray-400"/>
            <span class="capitalize">{{experience.end_date ? experience.end_date : 'present'}}</span>
          </p>

          <p class="flex items-center flex-wrap text-disableColor dark:text-darkDisableColor gap-[5px] font-[400] text-[0.9rem]">
            <span>{{experience.location}}</span>
            <Icon icon="material-symbols-light:circle" width="6" height="6" class="text-gray-400"/>
            <span class="capitalize">{{experience.is_onsite ? 'on-site' : 'remote'}}</span>
          </p>

          <div class="text-[0.9rem] font-[400] dark:text-darkDisableColor text-disableColor mt-1">

            <template v-if="!expandedDescriptions[experience.description]">
              {{experience.description.slice(0, 90)}}
              <span v-if="experience.description.length > 100" class="text-highlightPrimary/80 underline cursor-pointer ml-1"
                    @click="toggleDescription(experience.description)">
                See More
              </span>
            </template>

            <template v-else>
              {{experience.description}}
              <span class="text-highlightPrimary/80 underline cursor-pointer ml-1"
                    @click="toggleDescription(experience.description)">
                See Less
              </span>
            </template>

          </div>

        </div>
      </div>
    </div>
  </Layout>
</template>
