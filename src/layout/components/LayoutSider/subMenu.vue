<template>
  <a-sub-menu :key="menuInfo.path">
    <template #icon> <PieChartOutlined /></template>
    <template #title>{{ menuInfo.meta.title }}</template>
    <template v-for="item in menuInfo.children" :key="item.path">
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
  </a-sub-menu>
</template>
<script setup lang="ts">
  import { PieChartOutlined } from '@ant-design/icons-vue';

  import { SubMenu as ASubMenu, MenuItem as AMenuItem } from 'ant-design-vue';
  import { defineProps, toRefs, type PropType } from 'vue';
  const props = defineProps({
    menuInfo: {
      type: Object as PropType<Menu.MenuOptions>,
      default: () => ({}),
    },
  });
  const { menuInfo } = toRefs(props);
</script>
<style lang="less" scoped></style>
