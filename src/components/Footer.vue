<script setup>
import {Icon} from "@iconify/vue";

const currentYear = new Date().getFullYear()

const quickLinks = [
  {label: 'About Me', href: '#about-me'},
  {label: 'Experience', href: '#experience'},
  {label: 'Skills', href: '#skills'},
  {label: 'Projects', href: '#projects'},
]

const socialLinks = [
  {icon: 'hugeicons:linkedin-02', href: 'https://www.linkedin.com/in/usmanibrahim/', label: 'LinkedIn'},
  {icon: 'hugeicons:github', href: 'https://github.com/usmanibrahim74', label: 'GitHub'},
  {icon: 'hugeicons:new-twitter', href: 'https://x.com/EngrUIbraheem', label: 'X (Twitter)'},
  {icon: 'hugeicons:facebook-02', href: 'https://web.facebook.com/engr.Uibraheem/', label: 'Facebook'},
]
</script>

<template>
  <footer id="contact" class="mt-20 lg:mt-28 border-t dark:border-darkBorderColor border-borderColor dark:bg-darkBgColor transition-all duration-500 scroll-mt-16">
    <div class="px-6 lg:px-10 w-full max-w-[1600px] mx-auto pt-12 pb-8">

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">

        <!--  identity  -->
        <div>
          <a href="/#home">
            <img src="/images/logo-dark.png" alt="logo/image" class="w-[60px] dark:hidden">
            <img src="/images/logo-light.png" alt="logo/image" class="w-[60px] hidden dark:block">
          </a>
          <p class="text-disableColor dark:text-darkDisableColor text-[0.95rem] mt-4 max-w-[320px] leading-relaxed">
            Full stack developer and Boson Studio co-founder, building practical web applications that solve real business problems.
          </p>

          <div class="flex items-center gap-[12px] mt-5">
            <a v-for="social in socialLinks" :key="social.label" :href="social.href" target="_blank" :aria-label="social.label"
               class="p-2 border hover:bg-gray-100 dark:hover:bg-slate-800 hover:border-highlightPrimary/50 dark:hover:border-highlightPrimary/50 transition-all duration-300 dark:border-darkBorderColor border-borderColor rounded-lg">
              <Icon :icon="social.icon" width="20" height="20" class="text-disableColor dark:text-darkTextColor"/>
            </a>
          </div>
        </div>

        <!--  quick links  -->
        <div>
          <p class="text-[0.8rem] font-[600] uppercase tracking-[0.25em] text-highlightPrimary">Explore</p>
          <ul class="mt-4 flex flex-col gap-[12px]">
            <li v-for="link in quickLinks" :key="link.href">
              <a :href="link.href" class="text-[0.95rem] text-textColor dark:text-darkDisableColor hover:text-highlightPrimary dark:hover:text-highlightPrimary transition duration-300">
                {{ link.label }}
              </a>
            </li>
            <li>
              <a download="resume" href="/resume.pdf" class="text-[0.95rem] text-textColor dark:text-darkDisableColor hover:text-highlightPrimary dark:hover:text-highlightPrimary transition duration-300">
                Resume
              </a>
            </li>
          </ul>
        </div>

        <!--  contact  -->
        <div>
          <p class="text-[0.8rem] font-[600] uppercase tracking-[0.25em] text-highlightPrimary">Get in touch</p>
          <ul class="mt-4 flex flex-col gap-[12px]">
            <li>
              <a href="mailto:engr.usmanibraheem@gmail.com" class="flex items-center gap-[10px] text-[0.95rem] text-textColor dark:text-darkDisableColor hover:text-highlightPrimary dark:hover:text-highlightPrimary transition duration-300">
                <Icon icon="hugeicons:mail-01" width="18" height="18" class="shrink-0"/>
                engr.usmanibraheem@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+923056230514" class="flex items-center gap-[10px] text-[0.95rem] text-textColor dark:text-darkDisableColor hover:text-highlightPrimary dark:hover:text-highlightPrimary transition duration-300">
                <Icon icon="hugeicons:call-02" width="18" height="18" class="shrink-0"/>
                +92 305 6230514
              </a>
            </li>
            <li class="flex items-center gap-[10px] text-[0.95rem] text-textColor dark:text-darkDisableColor">
              <Icon icon="hugeicons:location-04" width="18" height="18" class="shrink-0"/>
              Islamabad, Pakistan
            </li>
            <li>
              <a href="https://zcal.co/usmanibraheem/meeting" target="_blank" class="flex items-center gap-[10px] text-[0.95rem] text-highlightPrimary hover:underline transition duration-300">
                <Icon icon="hugeicons:calendar-03" width="18" height="18" class="shrink-0"/>
                Schedule a meeting
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div class="mt-12 pt-6 border-t dark:border-darkBorderColor/60 border-borderColor flex flex-col sm:flex-row items-center justify-between gap-[8px]">
        <p class="text-[0.85rem] text-disableColor dark:text-darkDisableColor">Copyright © {{ currentYear }} by Usman Ibraheem.</p>
      </div>

    </div>
  </footer>
</template>
