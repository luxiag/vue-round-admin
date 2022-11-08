<template>
  <div class="layout-sider">
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane key="1" tab="Tab 1">Content of Tab Pane 1</a-tab-pane>
      <a-tab-pane key="2" tab="Tab 2">Content of Tab Pane 2</a-tab-pane>
      <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
    </a-tabs>
  </div>
</template>
<script setup lang="ts">
  import { Tabs as ATabs, TabPane as ATabPane } from 'ant-design-vue';
  import { ref } from 'vue';
  const activeKey = ref('1');
</script>
<style lang="less" scoped>
  .layout-sider {
  }
</style>
