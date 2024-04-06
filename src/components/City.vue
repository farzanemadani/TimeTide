<template>
  <!--- weather overview --->
  <Card style="width: 200px; margin: 0 auto">
    <p class="text-secondary mb-12">{{ formattedDate }} {{ formattedTime }}</p>
    <Typography :level="1" class="mb-0">
      {{ temperature }} &deg;
    </Typography>
  </Card>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { PropType } from 'vue';
import { Card, Typography } from 'ant-design-vue';
import moment from 'moment';

const props = defineProps({
  weather: {
    type: Object as PropType<{
      current_weather: {
        time: string;
        temperature: number;
      };
    }>,
    default: () => ({
      current_weather: {
        time: new Date().toISOString(),
        temperature: 0,
      },
    }),
  }
});

const formattedDate = computed(() => moment(props.weather.current_weather.time).format('ddd, D MMM'));
const formattedTime = computed(() => moment(props.weather.current_weather.time).format('h:mm A'));
const temperature = computed(() => Math.round(props.weather.current_weather.temperature));
</script>


<style>
</style>