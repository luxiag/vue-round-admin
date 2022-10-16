<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <component :is="LayoutComponent[layout]" />
</template>
<script setup lang="ts">
  import { useAppStore } from '@/store/modules/app';
  import leftTopMode from './leftTopMode/index.vue';
  import topLeftMode from './topLeftMode/index.vue';
  import topMode from './topMode/index.vue';
  // @ts-ignore
  import leftMode from './leftMode/index.vue';

  const appStore = useAppStore();
  const layout = appStore.getLayout;
  //  todo 定义？
  const LayoutComponent: any = {
    leftTopMode,
    topLeftMode,
    topMode,
    leftMode,
  };
</script>
