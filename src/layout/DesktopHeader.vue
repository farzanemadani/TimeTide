<template>
  <Header style="margin: 10px 20px; border-bottom: 1px solid #ccc;">
    <Flex horizontal align="center" justify="space-between">
      <Flex horizontal align="center">
        <RouterLink
          style="font-size:18px; margin-right: 40px;"
          to="/"
        >logo</RouterLink>
        <Menu
          theme="light"
          mode="horizontal"
          v-model:selectedKeys="currentMenu"
          :items="menuItems"
        />
      </Flex>
      <Dropdown>
        <a class="ant-dropdown-link">
          <UserOutlined
            style="font-size: 18px; margin: 0 10px;"
            class="mx-10"
          />
          <DownOutlined />
        </a>
        <template #overlay>
          <Menu
            style="width: 250px;"
            theme="light"
            mode="vertical"
            :items="userMenu"
            @click="handleMenuSelect"
          ></Menu>
        </template>
      </Dropdown>
    </Flex>
  </Header>
</template>

<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router';
import { DownOutlined, UserOutlined } from '@ant-design/icons-vue';
import { useI18n } from 'vue-i18n';
import { Layout, Menu, Flex, Dropdown } from 'ant-design-vue';
import type { MenuProps } from 'ant-design-vue';
import { ref, reactive, watch } from 'vue';

const { Header } = Layout;
const { t } = useI18n();
const i18n = useI18n();
const router = useRouter();

const currentMenu = ref<string[]>(['home']);
const currentUserMenu = ref<string[]>(['dashboard']);


const handleMenuSelect = ({ key }) => {
  currentUserMenu.value = [key]; // Set the selected menu item
  const selectedItem = userMenu.find(item => item?.key === key);
  if (selectedItem && selectedItem.route) {
    router.push({ path: selectedItem.route });
  }
};

const menuItems = reactive([
  { key: 'home', label: t('home'),route: '/', },
  { key: 'aboutus', label: t('aboutus') ,route: '/aboutus',},
  { key: 'contactus', label: t('contactus'),route: '/contactus', },
]);

const userMenu = reactive([
  { key: 'dashboard', label: t('dashboard'),route: '/dashboard' },
  { key: 'todo', label: t('todo') ,route: '/todo'},
  { key: 'weather', label: t('weather') ,route: '/weather'},
  { key: 'profile', label: t('profile'),route: '/profile', },
]);



watch(
  () => i18n.locale.value,
  () => {
    // Update the labels of menuItems
    menuItems.forEach(item => {
      item.label = t(item.key);
    });
     // Update the labels of userMenu
    userMenu.forEach(item => {
      item.label = t(item.key);
    });
  }
);
</script>