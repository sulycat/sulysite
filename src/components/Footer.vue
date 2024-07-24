<script setup>
const props = defineProps({
  isDarkMode: Boolean
});
</script>

<template>
  <div class="mt-10 pt-6 text-sm flex justify-center items-center" :class="isDarkMode ? 'border-t border-warm-gray-700 text-warm-gray-500' : 'border-t border-warm-gray-300 text-warm-gray-600'">
    <a href="https://www.instagram.com/shorxyy/" target="_blank" class="hover:text-warm-gray-300 transition-colors">
      i ❤️ milfs
    </a>
  </div>
</template>