<script setup>
import Footer from "./components/Footer.vue";
import MobileNavbar from "./components/MobileNavbar.vue";
import Navbar from "./components/Navbar.vue";
import {ref} from "vue";

const currentTheme = ref(null)

const handleThemeUpdate = (theme)=> {
  currentTheme.value = theme;
}

</script>

<template>

<div class="dark:bg-darkBgColor">
  <MobileNavbar/>
  <Navbar @update:theme="handleThemeUpdate"/>
  <router-view :theme="currentTheme"/>
  <Footer/>
</div>

</template>
