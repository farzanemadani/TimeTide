<template>
    <div>
      <BreadCrumbs
      :isRtl="isRtl"
      :breadCrumb="routeName">
      </BreadCrumbs>
    </div>
    <div style="margin: 0 auto;max-width: 600px;">
      <Card style="margin: 20px;">
          <div :class="isRtl ? 'text-right' : 'text-left'">
            <h1 style="font-size: 18px; margin-top: 20px; padding: 0 10px;">{{ $t('localWeather') }}</h1>
            <p style="font-size: 14px; margin-top: 20px; padding: 0 10px;">{{ $t('weatherDescription') }}</p>
          </div>
          <Flex style="margin-top: 20px; padding: 0 10px;" horizontal align="center" justify="space-between">
            <AutoComplete
              v-model:value="selectedCity"
              :dropdown-match-select-width="252"
              style="width:100%"
              :options="filteredOptions"
              @search="handleSearch"
              class="mr-10"
            >
              <template v-slot:option="item">
                <div @click="selectHandle(item)" style="display: flex; justify-content: space-between">
                  <span>{{ item.city }}</span>
                </div>
              </template>
            </AutoComplete>
            <Button type="primary" @click="handleSubmit">search</Button>
          </Flex>
          <div v-if="isLoading" style="text-align: center; margin-top: 20px;">
            <Spin/>
          </div>
          <div style="text-align: center; margin-top: 20px;">
            <City
              v-if="weatherData && selectedCity"
              :weather="weatherData" />
          </div>
      </Card>
    </div>
  </template>
  
  <script lang="ts" setup>
  import BreadCrumbs from '../layout/BreadCrumbs.vue';
  import { Card,AutoComplete,Spin,Flex, Button } from 'ant-design-vue';
  import { ref ,watch} from 'vue';
  import { useRouter } from 'vue-router';
  import { cities } from '../db/cities';
  import axios from 'axios';
  import City from './City.vue';
  import { WeatherData } from '../types/WeatherData';
  import { Option } from '../types/Option';
  import { useI18n } from 'vue-i18n';
 
  const router = useRouter();
  const routeName = router.currentRoute.value.name;
  const selectedCity = ref('');
  const dataSource = ref<Option[]>(cities);
  const filteredOptions = ref<Option[]>([]);
  const weatherData = ref<WeatherData | null>(null);
  const isLoading = ref<boolean>(false);
  const i18n = useI18n();
  const isRtl = ref<boolean>(i18n.locale.value === 'fa');

  const handleSearch = (val: string) => {
    if (val) {
      filteredOptions.value = dataSource.value.filter((option) =>
        option.city.toLowerCase().includes(val.toLowerCase())
      );
    } else {
      filteredOptions.value = [];
    }
  };
  
  const selectHandle = (item: Option) => {
    selectedCity.value = item.city;
  };
  
  const handleSubmit = async () => {
    const city = dataSource.value.find((item) => item.city === selectedCity.value);
    if (city) {
      try {
        isLoading.value = true;
        // Replace with the actual latitude and longitude of the selected city
        const latitude = city.lat;
        const longitude = city.lng;
  
        const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
          params: {
            latitude: latitude,
            longitude: longitude,
            current_weather: true
          }
        });
  
        console.log(response.data); // Handle the API response
        weatherData.value = response.data;
      } catch (error) {
        console.error('API call failed:', error);
      }finally{
        isLoading.value = false;
      }
    }
  };

  watch(
    () => i18n.locale.value,
    (newLocale) => {
      isRtl.value = newLocale === 'fa';
    }
  );
  </script>
