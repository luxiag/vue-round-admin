<template>
  <a-sub-menu :key="menuInfo.path">
    <template #icon> <icon-font type="icon-shouye" /></template>
    <template #title>{{ $t('routes.menu.' + menuInfo.meta.title) }}</template>
    <template v-for="item in menuInfo.children" :key="item.path">
      <template v-if="!item.children">
        <a-menu-item :key="item.path">
          <template #icon>
            <!-- <PieChartOutlined /> -->
            <icon-font :type="item.meta?.icon" />
          </template>
          {{ $t('routes.menu.' + item.meta.title) }}
        </a-menu-item>
      </template>
      <template v-else>
        <sub-menu :key="item.path" :menu-info="item" />
      </template>
    </template>
  </a-sub-menu>
</template>
<script setup lang="ts">
  import IconFont from '@/components/IconFont/IconFont.vue';
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
