<template>
  <div class="logo" />
  <a-menu theme="dark" mode="inline" class="sider-menu">
    <a-menu-item v-for="menu in menuList" :key="menu">
      <user-outlined />
      <span>nav 1</span>
    </a-menu-item>
  </a-menu>
</template>
<script setup lang="ts">
  import { useMenuStore } from '@/store/modules/menu';
  const menuStore = useMenuStore();
  const menuList = menuStore.getMenuList;
</script>
<style>
  .sider-menu {
    max-width: 210px;
    min-width: 210px;
  }
</style>
