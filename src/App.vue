<template>
  <a-config-provider :locale="getAntdLocale">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </a-config-provider>
</template>
<script setup lang="ts">
  import { ConfigProvider as AConfigProvider } from 'ant-design-vue';
  import { useLocale } from '@/locales/useLocale';
  const { getAntdLocale } = useLocale();
</script>
