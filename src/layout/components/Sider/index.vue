<template>
  <div class="logo" />
  <a-menu theme="dark" mode="inline" class="sider-menu" :inline-collapsed="props.collapsed">
    <template v-for="menu in menuList" :key="menu.path">
      <a-sub-menu v-if="menu.children && menu.children.length > 0">
        <template #icon>
          <IconFont :type="menu.icon" />
        </template>
        <template #title>{{ menu.name }}</template>
        <a-menu-item v-for="subMenu in menu.children" :key="subMenu.path">
          <template #icon>
            <IconFont :type="subMenu.icon" />
          </template>
          {{ subMenu.name }}
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item v-if="!menu.children || menu.children.length === 0">
        <template #icon>
          <IconFont :type="menu.icon" />
        </template>
        <template #title>{{ menu.name }}</template>
      </a-menu-item>
    </template>
  </a-menu>
</template>
<script setup lang="ts">
  import { IconFont } from '@/components/IconFont';
  import { useMenuStore } from '@/store/modules/menu';

  const props = defineProps({
    collapsed: {
      type: Boolean,
      default: false,
    },
  });

  const menuStore = useMenuStore();
  const menuList = menuStore.getMenuList;
</script>
<style>
  .sider-menu {
    max-width: 210px;
    min-width: 210px;
  }
</style>
