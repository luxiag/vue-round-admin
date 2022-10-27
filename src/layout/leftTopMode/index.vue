<template>
  <layout class="left-top-mode">
    <layout-sider v-model:collapsed="isCollapse" collapsible>
      <Sider />
    </layout-sider>
    <layout>
      <layout-header style="background: #fff; padding: 0"> <Header /></layout-header>
      <layout-content><Main /></layout-content>
      <layout-footer><Footer /></layout-footer>
    </layout>
  </layout>
</template>
<script setup lang="ts">
  import { Layout, LayoutSider, LayoutHeader, LayoutContent, LayoutFooter } from 'ant-design-vue';
  import Sider from '../components/Sider/index.vue';
  import Header from '../components/Header/index.vue';
  import Main from '../components/Main/index.vue';
  import Footer from '../components/Footer/index.vue';
  import { useMenuStore } from '@/store/modules/menu';
  import { storeToRefs } from 'pinia';
  import { watch } from 'vue';
  const menuStore = useMenuStore();
  const { isCollapse } = storeToRefs(menuStore);
  watch(isCollapse, () => {
    console.log(isCollapse, 'isCollapse');
  });

  // 菜单折叠
</script>
<style lang="less">
  .ant-layout {
    height: 100%;
    width: 100%;
  }
  .ant-layout-content {
    height: 100%;
  }
  .ant-layout-sider {
    overflow: hidden;
  }
</style>
