<template>
    <Header theme="dark" class="header">
      <Flex horizontal align="center" justify="space-between">
        <div class="mobile-nav">
          <MenuOutlined 
          :style="{ fontSize: '18px' }"
          :class="showMobileMenu ? 'hide' : 'show'" 
          @click="toggleMobileMenu" />
          <CloseOutlined 
          :style="{ fontSize: '18px' }" 
          :class="showMobileMenu ? 'show' : 'hide'"
           @click="toggleMobileMenu" />
          <RouterLink 
          :style="{ fontSize: '18px' }"
          class="logo mx-10" 
          to="/">logo</RouterLink>
        </div>
        <UserOutlined 
        :style="{ fontSize: '18px' }" 
        class="mx-10"
        @click="toggleUserMenu"/>
      </Flex>
      <Menu
        v-if="showMobileMenu"
        theme="dark"
        mode="vertical"
        v-model:selectedKeys="currentMenu"
        :items="menuItems"
        :class="{ 'mobile-menu': showMobileMenu }"
      />  
      <Menu
        v-if="showUserMenu"
        theme="dark"
        mode="vertical"
        :items="userMenu"
        :class="{ 'mobile-menu': showUserMenu }"
        @select="handleMenuSelect"
      > 
    </Menu>
    </Header>
  </template>
  
  <script setup lang="ts">
  import { useRouter , RouterLink} from 'vue-router';
  import { MenuOutlined , CloseOutlined ,UserOutlined} from '@ant-design/icons-vue';
  import { useI18n } from 'vue-i18n';
  import { Layout, Menu ,Flex } from 'ant-design-vue';
  import type { MenuProps } from 'ant-design-vue';
  import { ref ,reactive, watch} from 'vue';

  const router = useRouter();
  const { Header } = Layout;
  const { t } = useI18n();
  const i18n = useI18n();

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

  const currentMenu = ref<string[]>(['home']);
  const currentUserMenu = ref<string[]>(['dashboard']);
  const showMobileMenu = ref<boolean>(false);
  const showUserMenu = ref<boolean>(false);
  const componentName = ref<string>('');
  
  const toggleMobileMenu = () => {
    showMobileMenu.value = !showMobileMenu.value;
    showUserMenu.value = false;
  };

  const toggleUserMenu = () => {
    showUserMenu.value = !showUserMenu.value;
    showMobileMenu.value = false;
  }

  const handleMenuSelect = ({ key }) => {
    currentUserMenu.value = [key]; // Set the selected menu item
    const selectedItem = userMenu.find(item => item?.key === key);
    if (selectedItem && selectedItem.route) {
      router.push({ path: selectedItem.route });
    }
    showUserMenu.value = !showUserMenu.value;
  };
  

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
  
  <style scoped>
 
  .mobile-nav{
    padding:10px;
    display:flex;
  }
  .mx-10{
    margin:0 10px;
  }
  /* Example: Hide the horizontal menu when showMobileMenu is true */
  .mobile-menu {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .show{
    display:block;
  }
  .hide{
    display:none;
  }
  
  /* Example: Show the horizontal menu when showMobileMenu is false */
  .horizontal-menu {
    display: none;
  }
  </style>
  