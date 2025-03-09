import { ref } from 'vue'

/** Describe the WeatherAPI response shape (simplified). */
interface WeatherApiResponse {
  location: {
    name: string
    region: string
    country: string
    localtime: string
  }
  current: {
    temp_c: string
    condition: {
      text: string
      icon: string
    }
  }
}

export function useWeather() {
  // weatherData can be either WeatherApiResponse or null
  const weatherData = ref<WeatherApiResponse | null>(null)

  async function fetchWeather(location: string) {
    try {
      const apiKey = '0e292ce5c2a34454b32142902250803'
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`
      const res = await fetch(url)
      const data = (await res.json()) as WeatherApiResponse
      weatherData.value = data
    } catch (error) {
      console.error('Error fetching weather:', error)
    }
  }

  return {
    weatherData,
    fetchWeather,
  }
}
