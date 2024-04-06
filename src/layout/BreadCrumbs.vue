<template>
     <ConfigProvider :direction="isRtl ? 'rtl' : 'ltr'">
        <Breadcrumb style="padding: 0 10px;">
            <BreadcrumbItem><HomeOutlined /></BreadcrumbItem>
            <BreadcrumbItem>{{ $t(breadCrumb) }}</BreadcrumbItem>
        </Breadcrumb>
    </ConfigProvider>
</template>
<script setup lang="ts">
import { ConfigProvider,Breadcrumb, BreadcrumbItem } from 'ant-design-vue';
import { ref,defineProps, PropType } from 'vue';
import { HomeOutlined } from '@ant-design/icons-vue';
const props = defineProps({
  breadCrumb: {
    type: String,
    default: ''
  },
  isRtl:{
    type: Boolean,
    default: false
  }
});


</script>