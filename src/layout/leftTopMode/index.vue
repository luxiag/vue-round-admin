<template>
  <layout class="left-top-mode">
    <LayoutSider />
    <layout>
      <LayoutHeader />
      <LayoutTabs />
      <LayoutMain />
      <LayoutFooter />
    </layout>
  </layout>
</template>
<script setup lang="ts">
  import { Layout } from 'ant-design-vue';
  import LayoutSider from '../components/LayoutSider/index.vue';
  import LayoutHeader from '../components/LayoutHeader/index.vue';
  import LayoutMain from '../components/LayoutMain/index.vue';
  import LayoutFooter from '../components/LayoutFooter/index.vue';
  import LayoutTabs from '../components/LayoutTabs/index.vue';
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
