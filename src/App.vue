<template>
  <div>
    <div>
      <ConfigProvider :direction="isRtl ? 'rtl' : 'ltr'">
        <MobileHeader v-if="isMobile" :style="headerStyle"></MobileHeader>
        <HeaderDesktop v-else></HeaderDesktop>
      </ConfigProvider>
    </div>
    <router-view @languageChanged="onLanguageChange"></router-view>
  </div>
</template>

<script setup lang="ts">
import { ref ,computed,onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterView } from 'vue-router';
import 'ant-design-vue/dist/reset.css';
import MobileHeader from './layout/MobileHeader.vue';
import HeaderDesktop from './layout/DesktopHeader.vue';
import { ConfigProvider } from 'ant-design-vue'; 

const i18n = useI18n();

const isRtl = ref<boolean>(i18n.locale.value === 'fa'); // Set isRtl to true if the locale is 'fa'

 
const isMobile = computed(() => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
})

const headerStyle = ref({
      //textAlign: 'center',
      // minHeight: '120px',
      // lineHeight: '120px',
      //color: '#fff',
      backgroundColor: '#fff',
});

const onLanguageChange = (newLanguage: string) => {
  i18n.locale.value = newLanguage;
  isRtl.value = newLanguage === 'fa';
};

const updateLocale = () => {
  const profileForm = JSON.parse(localStorage.getItem('profileForm') as string);
  if (profileForm) {
    i18n.locale.value = profileForm.language;
    isRtl.value = profileForm.language === 'fa';
  }
};
onMounted(() => {
  updateLocale();
});

</script>
