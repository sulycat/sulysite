<script setup>
import { ref } from 'vue';
import Clock from './components/Clock.vue';
import Discord from './components/Discord.vue';
import ThemeToggle from './components/ThemeToggle.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const isDarkMode = ref(true);

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
};
</script>

<template>
  <div :class="[
    'min-h-screen p-5 sm:p-10 transition-all duration-500',
    isDarkMode 
      ? 'bg-gradient-to-br from-warm-dark-800 to-warm-dark-900 text-warm-gray-300' 
      : 'bg-gradient-to-br from-warm-light-100 to-warm-light-200 text-warm-gray-700'
  ]">
    <div class="max-w-3xl mx-auto relative">
      <div class="absolute top-0 right-0 text-8xl select-none transition-opacity duration-500" :class="isDarkMode ? 'opacity-20' : 'opacity-40'"></div>
      <div class="flex justify-between items-center mb-6">
        <h1 class="font-bold text-4xl transition-colors duration-500" :class="isDarkMode ? 'text-warm-gray-100' : 'text-warm-gray-900'">Suly :D</h1>
        <ThemeToggle :isDarkMode="isDarkMode" @toggle="toggleTheme" />
      </div>
      <p class="mb-6 text-lg">Web developer, anime enthusiast, and tea lover.</p>
      
      <Clock class="mb-4" :isDarkMode="isDarkMode" />
      <Discord :isDarkMode="isDarkMode" />
      
      <div class="flex space-x-6 mt-8 text-2xl transition-colors duration-500" :class="isDarkMode ? 'text-warm-gray-400' : 'text-warm-gray-600'">
        <a href="https://www.instagram.com/shorxyy" target="_blank" :class="isDarkMode ? 'hover:text-warm-gray-100' : 'hover:text-warm-gray-900'" class="transition-colors duration-300">
          <FontAwesomeIcon :icon="['fab', 'instagram']" />
        </a>
        <a href="https://discord.com/users/765321694272684067" target="_blank" :class="isDarkMode ? 'hover:text-warm-gray-100' : 'hover:text-warm-gray-900'" class="transition-colors duration-300">
          <FontAwesomeIcon :icon="['fab', 'discord']" />
        </a>
      </div>
    </div>
    <div class="mt-10 pt-6 border-t text-sm flex justify-center items-center transition-colors duration-500" :class="isDarkMode ? 'border-warm-gray-700 text-warm-gray-500' : 'border-warm-gray-400 text-warm-gray-600'">
      <a href="https://www.instagram.com/shorxyy/" target="_blank" :class="isDarkMode ? 'hover:text-warm-gray-300' : 'hover:text-warm-gray-900'" class="transition-colors duration-300">
        i ❤️ milfs
      </a>
    </div>
  </div>
</template>