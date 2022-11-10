<template>
  <a-breadcrumb :routes="routes">
    <a-breadcrumb-item>Home</a-breadcrumb-item>
    <a-breadcrumb-item><a href="">Application Center</a></a-breadcrumb-item>
    <a-breadcrumb-item><a href="">Application List</a></a-breadcrumb-item>
    <a-breadcrumb-item>An Application</a-breadcrumb-item>
  </a-breadcrumb>
</template>
<script lang="ts" setup>
  import { Breadcrumb as ABreadcrumb, BreadcrumbItem as ABreadcrumbItem } from 'ant-design-vue';
  import { RouteRecordRaw, useRoute } from 'vue-router';
  import { ref, onMounted } from 'vue';
  const routes = ref<RouteRecordRaw[]>([]);
  const route = useRoute();

  onMounted(() => {
    console.log(route, 'route');
  });
</script>
<style lang="less" scoped></style>
