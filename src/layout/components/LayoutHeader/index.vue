<template>
  <layout-header style="background: #fff" class="layout-header">
    <menu-unfold-outlined v-if="isCollapse" class="trigger" />
    <menu-fold-outlined v-else class="trigger" />
    <a-breadcrumb>
      <a-breadcrumb-item>Home</a-breadcrumb-item>
      <a-breadcrumb-item><a href="">Application Center</a></a-breadcrumb-item>
      <a-breadcrumb-item><a href="">Application List</a></a-breadcrumb-item>
      <a-breadcrumb-item>An Application</a-breadcrumb-item>
    </a-breadcrumb>
  </layout-header>
</template>
<script setup lang="ts">
  import {
    LayoutHeader,
    Breadcrumb as ABreadcrumb,
    BreadcrumbItem as ABreadcrumbItem,
  } from 'ant-design-vue';
  import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
  import { ref } from 'vue';
  const isCollapse = ref(false);
</script>
<style lang="less">
  .layout-header {
    display: flex;
    align-items: center;
    padding: 15px;
  }
</style>
