<template>
  <button @click="toggleTheme" class="relative w-14 h-7 rounded-full overflow-hidden focus:outline-none transition-colors duration-300 border-2" 
          :class="isDarkMode ? 'bg-warm-dark-800 border-warm-dark-600' : 'bg-warm-light-200 border-warm-light-400'">
    <div class="absolute inset-0 flex items-center justify-between px-1">
      <span class="text-xs z-10">🌙</span>
      <span class="text-xs z-10">☀️</span>
    </div>
    <div class="absolute top-0.5 w-5 h-5 rounded-full transition-all duration-300 ease-in-out bg-white shadow-md"
         :style="{ left: isDarkMode ? '2px' : 'calc(100% - 22px)' }">
    </div>
  </button>
</template>

<script setup>
const props = defineProps({
  isDarkMode: Boolean
});

const emit = defineEmits(['toggle']);

const toggleTheme = () => {
  emit('toggle');
};
</script>