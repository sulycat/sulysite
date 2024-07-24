<script setup>
import Discord from './Discord.vue';
import Clock from './Clock.vue';
</script>

<template>
  <div class="mb-10">
    <h1 class="font-bold text-4xl mb-4 text-warm-gray-100">Suly :D</h1>
    <p class="mb-6 text-lg">Web developer, anime enthusiast, and tea lover.</p>
    
    <Clock class="mb-4" />
    <Discord />
    
    <div class="flex space-x-6 mt-8 text-2xl text-warm-gray-400">
      <a href="https://www.instagram.com/shorxyy" target="_blank" class="hover:text-warm-gray-100 transition-colors">
        <font-awesome-icon :icon="['fab', 'instagram']" />
      </a>
      <a href="https://discord.com/users/765321694272684067" target="_blank" class="hover:text-warm-gray-100 transition-colors">
        <font-awesome-icon :icon="['fab', 'discord']" />
      </a>
    </div>
  </div>
</template>