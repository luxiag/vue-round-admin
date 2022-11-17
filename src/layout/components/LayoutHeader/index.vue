<template>
  <layout-header style="background: #fff" class="layout-header">
    <div class="header-menu__fold" @click="switchCollapse">
      <menu-unfold-outlined v-if="isCollapse" class="trigger" />
      <menu-fold-outlined v-else class="trigger" />
    </div>

    <Breadcrumb />
  </layout-header>
</template>
<script setup lang="ts">
  import { LayoutHeader } from 'ant-design-vue';
  import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
  import { useMenuStore } from '@/store/modules/menu';
  import { storeToRefs } from 'pinia';
  import Breadcrumb from './Breadcrumb.vue';
  const menuStore = useMenuStore();
  const { isCollapse } = storeToRefs(menuStore);
  // 切换菜单状态
  const switchCollapse = () => {
    menuStore.setCollapse();
  };
</script>
<style lang="less">
  .layout-header {
    display: flex;
    align-items: center;
    padding: 15px;
    .header-menu__fold {
      font-size: 18px;
      margin-right: 10px;
    }
  }
</style>
