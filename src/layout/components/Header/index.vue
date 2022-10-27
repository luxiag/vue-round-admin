<template>
  <menu-unfold-outlined v-if="isCollapse" class="trigger" @click="menuStore.setCollapse()" />
  <menu-fold-outlined v-else class="trigger" @click="menuStore.setCollapse()" />
</template>
<script setup lang="ts">
  import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
  import { useMenuStore } from '@/store/modules/menu';

  const menuStore = useMenuStore();
  const isCollapse = menuStore.getCollapse;
</script>
