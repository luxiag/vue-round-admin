<template>
  <a-layout-sider v-model:collapsed="isCollapse" collapsible class="layout-sider">
    <div class="logo" />
    <a-menu mode="inline" theme="dark" @click="handleClick">
      <template v-for="item in menuList" :key="item.path">
        <template v-if="!item.children">
          <a-menu-item :key="item.path">
            <template #icon>
              <PieChartOutlined />
            </template>
            {{ item.meta.title }}
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :key="item.path" :menu-info="item" />
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>
<script setup lang="ts">
  import {
    Menu as AMenu,
    MenuItem as AMenuItem,
    LayoutSider as ALayoutSider,
  } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import { useMenuStore } from '@/store/modules/menu';
  import subMenu from './subMenu.vue';
  import { PieChartOutlined } from '@ant-design/icons-vue';
  import { storeToRefs } from 'pinia';
  import { MenuInfo } from 'ant-design-vue/lib/menu/src/interface';
  const menu = useMenuStore();
  const menuList = menu.getMenuList;
  const { isCollapse } = storeToRefs(menu);
  const router = useRouter();
  const handleClick = ({ key }: MenuInfo) => {
    // console.log(key, 'key');
    router.push({ path: key as string });
  };
</script>
<style lang="less">
  .layout-sider {
    .logo {
      height: 32px;
      background: rgba(255, 255, 255, 0.2);
      margin: 16px;
    }
  }
</style>
