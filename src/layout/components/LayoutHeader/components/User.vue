<template>
  <a-dropdown>
    <span class="detail">
      <span class="user_avatar"
        ><a-avatar size="small" src="https://joeschmoe.io/api/v1/random"
      /></span>
      <span class="user_name">
        {{ userStore.getUserInfo?.username }}
      </span>
    </span>
    <template #overlay>
      <a-menu @click="handleMenuClick">
        <a-menu-item key="logout">
          <span>{{ $t('layout.header.dropdown') }}</span>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script setup lang="ts">
  import {
    Dropdown as ADropdown,
    Menu as AMenu,
    MenuItem as AMenuItem,
    Avatar as AAvatar,
  } from 'ant-design-vue';
  import { MenuInfo } from 'ant-design-vue/lib/menu/src/interface';
  import { useConfirm } from '@/hooks/useMessage';
  import { useUserStore } from '@/store/modules/user';

  const userStore = useUserStore();
  type MenuEvent = 'logout' | 'lock';
  const handleMenuClick = (e: MenuInfo) => {
    switch (e.key as MenuEvent) {
      case 'logout':
        handleLogout();
        break;
    }
  };
  const handleLogout = () => {
    useConfirm({
      content: '确认退出吗？',
      async onOk() {
        userStore.logout();
      },
    });
  };
</script>
