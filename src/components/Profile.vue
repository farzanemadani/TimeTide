<template>
    <div>
      <BreadCrumbs
      :isRtl="isRtl"
      :breadCrumb="routeName">
      </BreadCrumbs>
    </div>
    <div style="margin: 0 auto;max-width: 600px;">
      <Card :class="isRtl ? 'rtl' : 'ltr'" style="margin: 20px;">
        <Form
          :model="formState"
          name="basic"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 12 }"
          autocomplete="off"
          @finish="onFinish">
              <!-- username -->
              <FormItem
                  :label="$t('username')"
                  name="username"
                  :rules="[{ required: true, message: 'Please input your username!' }]"
                  >
                  <Input v-model:value="formState.username" />
              </FormItem>

              <!-- theme -->
              <FormItem
                  :label="$t('theme')"
                  name="theme"
                  :rules="[{ required: true, message: 'Please input your favorit theme!' }]"
                  >
                  <Select
                  ref="select"
                  v-model:value="formState.theme"
                  style="width: 100%"
                  :options="themes"
                  >
                  </Select>
              </FormItem>

              <!-- language -->
              <FormItem
                  :label="$t('language')"
                  name="language"
                  :rules="[{ required: true, message: 'Please select your language!' }]"
              >
                  <Select
                  ref="select"
                  v-model:value="formState.language"
                  style="width: 100%"
                  :options="languages"
                  >
                  </Select>
              </FormItem>
              <FormItem :wrapper-col="{ offset: 8, span: 16 }">
                  <Button type="primary" html-type="submit">Submit</Button>
              </FormItem>
        </Form>
      </Card>
    </div>
    
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import BreadCrumbs from '../layout/BreadCrumbs.vue';
import { Card ,Button, Form ,Input,Select ,FormItem} from 'ant-design-vue';
import { reactive,watch ,ref,onMounted} from 'vue';
import { useI18n } from 'vue-i18n';
import { FormState } from '../types/FormState';

const router = useRouter();
const routeName = router.currentRoute.value.name;

const languages = reactive([
  { label: 'persian', value: 'fa' },
  { label: 'english', value: 'en' },
])
const themes = reactive([
  { label: 'dark', value: 'dark' },
  { label: 'light', value: 'light' },
])
const i18n = useI18n();
const isRtl = ref<boolean>(i18n.locale.value === 'fa');

const formState = reactive<FormState>({
    username: '',
    theme: 'light',
    language: 'en',
});

const emit = defineEmits(['languageChanged']);



const onFinish = (values: any) => {
  console.log('Success:', values);
  // Serialize formState to JSON and save it in local storage
  localStorage.setItem('profileForm', JSON.stringify(formState));
  i18n.locale.value = formState.language;
  emit('languageChanged', formState.language);
};



onMounted(() => {
  const savedForm = localStorage.getItem('profileForm');
  if (savedForm) {
    Object.assign(formState, JSON.parse(savedForm));
  }
});


watch(
  () => i18n.locale.value,
  (newLocale) => {
    isRtl.value = newLocale === 'fa';
  }
);

</script>