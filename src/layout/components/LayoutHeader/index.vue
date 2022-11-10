<template>
  <layout-header style="background: #fff" class="layout-header">
    <menu-unfold-outlined v-if="isCollapse" class="trigger" />
    <menu-fold-outlined v-else class="trigger" />
    <Breadcrumb />
  </layout-header>
</template>
<script setup lang="ts">
  import { LayoutHeader } from 'ant-design-vue';
  import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
  import { ref } from 'vue';
  import Breadcrumb from './Breadcrumb.vue';
  const isCollapse = ref(false);
</script>
<style lang="less">
  .layout-header {
    display: flex;
    align-items: center;
    padding: 15px;
  }
</style>
