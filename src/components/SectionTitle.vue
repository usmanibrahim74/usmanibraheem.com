<script setup>
defineProps({
  eyebrow: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="w-max mx-auto flex flex-col items-center">
    <p class="text-[0.8rem] font-[600] uppercase tracking-[0.25em] text-highlightPrimary">{{ eyebrow }}</p>
    <h4 class="font-display text-[2rem] sm:text-[2.2rem] font-[600] text-textColor dark:text-darkTextColor text-center mt-1">{{ title }}</h4>
    <div class="w-[60px] h-[3px] rounded-full bg-gradient-to-r from-highlightPrimary to-highlightColor mt-2"></div>
  </div>
</template>
