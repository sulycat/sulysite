<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  isDarkMode: Boolean
});

const currentTime = ref(new Date());
const timeEmoji = ref('');

function updateTime() {
  currentTime.value = new Date();
  const hours = currentTime.value.getHours();
  
  if (hours >= 5 && hours < 12) {
    timeEmoji.value = '🌅';
  } else if (hours >= 12 && hours < 18) {
    timeEmoji.value = '☀️';
  } else if (hours >= 18 && hours < 22) {
    timeEmoji.value = '🌆';
  } else {
    timeEmoji.value = '🌙';
  }
}

let timer;

onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <p class="text-lg" :class="isDarkMode ? 'text-warm-gray-300' : 'text-warm-gray-700'">
    {{ timeEmoji }} {{ currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }}
  </p>
</template>