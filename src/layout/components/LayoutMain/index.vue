<template>
  <a-layout-content
    :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
  >
    <router-view></router-view>
  </a-layout-content>
</template>
<script setup lang="ts">
  import { LayoutContent as ALayoutContent } from 'ant-design-vue';
</script>
