<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useWeather } from '@/composables/useWeather'
  
  const { weatherData, fetchWeather } = useWeather()
  
  onMounted(() => {
    fetchWeather('auto:ip')
  })
  
  function formatTime(localtime: string) {
    const parts = localtime.split(' ')
    return parts[1] ?? localtime
  }
  const weatherBgClass = computed(() => {
  if (!weatherData.value) {
    return 'bg-gray-200'
  }
  
  const conditionText = weatherData.value.current.condition.text.toLowerCase()
  if (conditionText.includes('rain')) {
    return 'bg-gradient-to-b from-gray-600 to-gray-800'
  } else if (conditionText.includes('cloud')) {
    return 'bg-gradient-to-b from-gray-300 to-gray-500'
  } else if (conditionText.includes('sun') || conditionText.includes('clear')) {
    return 'bg-gradient-to-b from-blue-400 to-blue-600'
  } else {
    return 'bg-gray-200'
  }
  })
</script>

<template>
    <div :class="['min-h-screen flex items-center justify-center', weatherBgClass]">
      <div class="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div class="flex flex-col items-center justify-center bg-white p-6 shadow-md rounded-md">
          <img
            v-if="weatherData"
            :src="weatherData.current.condition.icon"
            :alt="weatherData.current.condition.text"
            class="w-24 h-24 mb-4"
          />

          <p class="text-xl font-semibold mb-2">
            {{ weatherData ? weatherData.current.condition.text : 'Loading...' }}
          </p>
          
          <p class="text-gray-500">
            <span v-if="weatherData">
              {{ weatherData.current.temp_c }} °C
            </span>
          </p>

        </div>
  
        <div class="flex flex-col gap-6">
          <div class="flex flex-row md:flex-col items-center justify-around bg-white p-6 shadow-md rounded-md">
            <div class="flex items-center mb-4 md:mb-6 md:justify-center">
              <img
                src="https://img.icons8.com/ios-filled/50/null/marker.png"
                alt="Location Icon"
                class="w-6 h-6 mr-2"
              />
              <p class="text-lg font-semibold">
                {{ weatherData ? weatherData.location.name : 'Loading...' }}
              </p>
            </div>
  
            <div class="flex items-center md:justify-center">
              <img
                src="https://img.icons8.com/ios-filled/50/null/thermometer.png"
                alt="Temperature Icon"
                class="w-6 h-6 mr-2"
              />
              <p class="text-lg font-semibold">
                <span v-if="weatherData">
                  {{ weatherData.current.temp_c }}°C
                </span>
              </p>
            </div>
          </div>
  
          <div class="bg-white p-6 shadow-md rounded-md flex items-center justify-center">
            <p class="text-2xl font-bold">
              <span v-if="weatherData">
                {{ formatTime(weatherData.location.localtime) }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
</template>
  
  
  