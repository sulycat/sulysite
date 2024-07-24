<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { formatDistanceToNow } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import ColorThief from 'colorthief';

const props = defineProps({
  isDarkMode: Boolean
});

const USER_ID = "469192248807129089";
const discordStatus = ref('offline');
const discordUser = ref(null);
const discordActivities = ref([]);
const discordAvatar = ref(null);
const spotify = ref(null);
const customStatus = ref(null);
const now = ref(new Date());
const bgColor = ref('');
const hoverColor = ref('');

const statusColors = {
  online: 'bg-[#3ba55c]',
  idle: 'bg-[#faa61a]',
  dnd: 'bg-[#ed4245]',
  offline: 'bg-[#747f8d]'
};

const getStatusColor = computed(() => statusColors[discordStatus.value] || 'bg-[#747f8d]');

const getActivityType = (type) => {
  const types = ['Playing', 'Streaming', 'Listening to', 'Watching', 'Custom Status', 'Competing in'];
  return types[type] || 'Doing';
};

const otherActivities = computed(() => 
  discordActivities.value.filter(activity => activity.type !== 2 && activity.type !== 4)
);

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const connectWebSocket = () => {
  const ws = new WebSocket('wss://api.lanyard.rest/socket');

  ws.onopen = () => {
    ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: USER_ID } }));
  };

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.t === "INIT_STATE" || message.t === "PRESENCE_UPDATE") {
      const data = message.d;
      
      discordAvatar.value = `https://cdn.discordapp.com/avatars/${USER_ID}/${data.discord_user.avatar}.${data.discord_user.avatar.startsWith("a_") ? "gif" : "webp"}?size=256`;
      discordUser.value = data.discord_user;
      discordStatus.value = data.discord_status;
      discordActivities.value = data.activities;
      customStatus.value = data.activities.find(activity => activity.type === 4);

      updateSpotifyData(data);
    }
  };

  return ws;
};

const updateSpotifyData = (data) => {
  if (data.spotify) {
    spotify.value = data.spotify;
    if (spotify.value.album_art_url) {
      getImageColor(spotify.value.album_art_url);
    }
  } else {
    spotify.value = null;
  }
};

const getImageColor = (url) => {
  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = url;
  img.onload = () => {
    const colorThief = new ColorThief();
    const color = colorThief.getColor(img);
    setColors(color);
  };
};

const setColors = (color) => {
  const [r, g, b] = color;
  bgColor.value = `rgba(${r}, ${g}, ${b}, ${props.isDarkMode ? 0.2 : 0.1})`;
  hoverColor.value = `rgba(${r}, ${g}, ${b}, ${props.isDarkMode ? 0.4 : 0.3})`;
};

let ws;
let timer;

onMounted(() => {
  ws = connectWebSocket();
  timer = setInterval(() => {
    now.value = new Date();
  }, 1000);
});

onUnmounted(() => {
  if (ws) ws.close();
  clearInterval(timer);
});
</script>

<template>
  <div class="mb-4 flex gap-4 items-center text-base leading-snug">
    <div v-if="discordAvatar" class="w-16 h-16 flex-shrink-0 relative group">
      <img :src="discordAvatar" alt="Discord Avatar" class="rounded-full w-full h-full transition-transform duration-400 transform group-hover:scale-105">
      <div :class="['absolute bottom-0 right-0 w-4 h-4 rounded-full border-2', getStatusColor, isDarkMode ? 'border-warm-dark-800' : 'border-warm-light-100']"></div>
    </div>
    <div v-else class="w-16 h-16 bg-warm-gray-700 rounded-full"></div>
    
    <div v-if="discordUser" class="flex-grow">
      <p class="font-semibold" :class="isDarkMode ? 'text-warm-gray-100' : 'text-warm-gray-800'">
        {{ discordUser.display_name || discordUser.username }}
        <span class="ml-2 opacity-80 font-normal" :class="isDarkMode ? 'text-warm-gray-300' : 'text-warm-gray-600'">{{ discordUser.username }}</span>
      </p>
      <p v-if="customStatus" :class="isDarkMode ? 'text-warm-gray-300' : 'text-warm-gray-600'">
        <span v-html="customStatus.emoji ? `<img src='https://cdn.discordapp.com/emojis/${customStatus.emoji.id}.webp' alt='${customStatus.emoji.name}' class='inline-block w-5 h-5 mr-1'>` : ''"></span>
        {{ customStatus.state }}
      </p>
      <div v-for="activity in otherActivities" :key="activity.id" :class="isDarkMode ? 'text-warm-gray-400' : 'text-warm-gray-500'">
        <p class="flex-grow">
          <span class="opacity-80">{{ getActivityType(activity.type) }}</span>
          {{ activity.name }}
          <span class="opacity-80">
            for {{ formatDistanceToNow(new Date(activity.timestamps?.start || activity.created_at)) }}
          </span>
        </p>
        <p v-if="activity.details" class="text-sm opacity-80">{{ activity.details }}</p>
        <p v-if="activity.state" class="text-sm opacity-80">{{ activity.state }}</p>
      </div>
    </div>
    <div v-else class="w-32 opacity-80" :class="isDarkMode ? 'text-warm-gray-400' : 'text-warm-gray-500'">Loading...</div>
  </div>
  
  <div v-if="spotify" class="mt-4 p-4 rounded-lg transition-all duration-400 overflow-hidden relative group hover:shadow-md" :style="{ backgroundColor: 'transparent' }">
    <div class="flex items-center space-x-4 relative z-10">
      <FontAwesomeIcon :icon="faSpotify" class="text-3xl text-green-400 group-hover:scale-110 transition-transform duration-400" />
      <div class="flex-grow">
        <div class="text-sm group-hover:text-warm-gray-300 transition-colors duration-400" :class="isDarkMode ? 'text-warm-gray-400' : 'text-warm-gray-600'">
          Listening to Spotify
        </div>
        <div class="font-medium transition-colors duration-400" :class="isDarkMode ? 'text-warm-gray-100' : 'text-warm-gray-800'">
          <a :href="`https://open.spotify.com/track/${spotify.track_id}`" target="_blank" class="hover:underline">
            {{ spotify.song }}
          </a>
        </div>
        <div class="text-sm group-hover:text-warm-gray-200 transition-colors duration-400" :class="isDarkMode ? 'text-warm-gray-300' : 'text-warm-gray-600'">
          <a :href="`https://open.spotify.com/artist/${spotify.artist_id}`" target="_blank" class="hover:underline">
            {{ spotify.artist }}
          </a>
        </div>
      </div>
      <img v-if="spotify.album_art_url" :src="spotify.album_art_url" alt="Album Art" class="w-16 h-16 rounded-md shadow-md transition-transform duration-400 group-hover:scale-105">
    </div>
    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" :style="{ backgroundColor: hoverColor }"></div>
  </div>
</template>

<style scoped>
.group:hover .absolute {
  background-color: v-bind(hoverColor);
}
img[alt="Album Art"] {
  box-shadow: 0 0 20px v-bind(bgColor);
}
.group:hover img[alt="Album Art"] {
  box-shadow: 0 0 30px v-bind(hoverColor);
}
</style>