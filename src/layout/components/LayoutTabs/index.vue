<template>
  <div class="layout-sider">
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane
        v-for="tab in tabsList"
        :key="tab.path"
        :closable="!tab.meta?.affix"
        :tab="tab.meta?.title"
      ></a-tab-pane>
    </a-tabs>
  </div>
</template>
<script setup lang="ts">
  import { Tabs as ATabs, TabPane as ATabPane } from 'ant-design-vue';
  import { useRoute } from 'vue-router';
  import { ref, watch, computed } from 'vue';
  import { useTabStore } from '@/store/modules/tabs';
  const tabStore = useTabStore();
  const route = useRoute();
  const activeKey = ref(route.path);
  const tabsList = computed(() => {
    // 过滤掉 hideTab 的路由
    return tabStore.getTabList?.filter((item) => !item.meta?.hideTab);
  });

  // 监听路由变化 生成 tab
  watch(
    () => route.path,
    () => {
      console.log(route, 'route');
      tabStore.addTabs(route);
      activeKey.value = route.path;
    },
    {
      immediate: true,
    },
  );
</script>
<style lang="less" scoped>
  .layout-sider {
  }
</style>
