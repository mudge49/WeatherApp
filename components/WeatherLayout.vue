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
    return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-UmZ2e59CEDpbymVrp3RerdeyNlyuAUKnUA&s'
  }
  
  const conditionText = weatherData.value.current.condition.text.toLowerCase()
  if (conditionText.includes('rain')) {
    return 'https://wallpapers.com/images/hd/aesthetic-rain-wkfiz5qfrxlbx4fl.jpg'
  } else if (conditionText.includes('cloud')) {
    return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh6qGRri3Bo_40zeHb7uByM0od5yVtjyu6wQ&s'
  } else if (conditionText.includes('sun') || conditionText.includes('clear')) {
    return 'https://i.gifer.com/Iqp.gif'
  } else {
    return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-UmZ2e59CEDpbymVrp3RerdeyNlyuAUKnUA&s'
  }
  })

  const weatherColorClass = computed(() => {
  if (!weatherData.value) {
    return 'bg-gray-500'
  }
  
  const conditionText = weatherData.value.current.condition.text.toLowerCase()
  if (conditionText.includes('rain')) {
    return 'bg-white '
  } else if (conditionText.includes('cloud')) {
    return 'bg-black-100'
  } else if (conditionText.includes('sun') || conditionText.includes('clear')) {
    return 'bg-blue-500'
  } else {
    return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-UmZ2e59CEDpbymVrp3RerdeyNlyuAUKnUA&s'
  }
  })
</script>

<template>
    <div :style="{ backgroundImage: `url(${weatherBgClass})` }" class="min-h-screen bg-cover bg-center flex items-center justify-center">
      <div class="w-full md:max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-0">
        <div class="flex flex-col text-white items-center justify-center bg-blue-500 border-white border-8 p-6 shadow-md rounded-md">
          <img
            v-if="weatherData"
            :src="weatherData.current.condition.icon"
            :alt="weatherData.current.condition.text"
            class="w-24 h-24 mb-4"
          />

          <p class="text-xl font-semibold mb-2">
            {{ weatherData ? weatherData.current.condition.text : 'Loading...' }}
          </p>

        </div>
  
        <div class="flex flex-col gap-6">
          
          <div class="flex flex-row md:flex-col items-center justify-around bg-white p-6 shadow-md rounded-md">
            <div class="flex items-center md:justify-center">

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
  
  
  