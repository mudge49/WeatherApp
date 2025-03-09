<script setup lang="ts">
defineProps<{
  location: string
  temperature: string
  condition: string
  icon: string
}>()
</script>

<template>
  <div class="flex flex-col items-center p-4 bg-white shadow-lg rounded-xl">
    <img :src="icon" alt="Weather icon" class="w-20 h-20" />
    <p class="text-lg font-semibold">{{ condition }}</p>
    <p class="text-2xl font-bold">{{ temperature }}°C</p>
    <p class="text-sm text-gray-500">{{ location }}</p>
  </div>
</template>
