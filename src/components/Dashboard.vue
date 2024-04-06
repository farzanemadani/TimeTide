<template>
  <div>
    <BreadCrumbs
     :isRtl="isRtl"
     :breadCrumb="routeName" />
  </div>
  <div style="margin: 0 auto; max-width: 600px;">
    <Card style="margin: 20px;">
      <h4 style="margin: 16px 0; text-align: center;">{{ $t('currentTime') }}:</h4>
      <Flex justify="center" style="margin: 16px 0">
        <Tag color="blue">{{ currentTime.hour }}</Tag>
        <span style="margin-right: 10px">:</span>
        <Tag color="blue">{{ currentTime.minute }}</Tag>
        <span style="margin-right: 10px">:</span>
        <Tag color="blue">{{ currentTime.second }}</Tag>
      </Flex>
      <div style="margin: 40px 0; text-align: center;">
        {{ $t(personalizedMessage) }}
        <span v-if="userName">{{ userName }}</span>!
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { reactive,watch, onMounted, computed,ref } from 'vue';
import BreadCrumbs from '../layout/BreadCrumbs.vue';
import { useRouter } from 'vue-router';
import { Card, Tag, Flex } from 'ant-design-vue';
import { useI18n } from 'vue-i18n';
const router = useRouter();
const routeName = router.currentRoute.value.name;

const i18n = useI18n();
const isRtl = ref<boolean>(i18n.locale.value === 'fa');

const currentTime = reactive({
  hour: 0,
  minute: 0,
  second: 0
});

const personalizedMessage = computed(() => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return 'GoodMorning';
  } else if (currentHour < 18) {
    return 'GoodAfternoon';
  } else {
    return 'GoodNight';
  }
});

const userName = computed(() => {
  const profileForm = localStorage.getItem('profileForm')
    ? JSON.parse(localStorage.getItem('profileForm') as string)
    : null;
  return profileForm ? profileForm.username : '';
});

const updateTime = () => {
  const now = new Date();
  currentTime.hour = now.getHours().toString().padStart(2, '0');
  currentTime.minute = now.getMinutes().toString().padStart(2, '0');
  currentTime.second = now.getSeconds().toString().padStart(2, '0');
};

let intervalId = null;
onMounted(() => {
  setInterval(updateTime, 1000);
});

watch(
  () => i18n.locale.value,
  (newLocale) => {
    isRtl.value = newLocale === 'fa';
  }
);

</script>
