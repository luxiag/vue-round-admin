<template>
  <a-breadcrumb :routes="(routes as [])">
    <template #itemRender="{ route: bread, paths }">
      <!-- 最后一个不跳转 -->
      <span v-if="routes.indexOf(bread) === routes.length - 1">
        {{ $t('routes.menu.' + bread.meta?.title) }}
      </span>
      <router-link v-else :to="`/${paths.join('/')}`">
        {{ $t('routes.menu.' + bread.meta?.title) }}
      </router-link>
    </template>
  </a-breadcrumb>
</template>
<script lang="ts" setup>
  import { Breadcrumb as ABreadcrumb } from 'ant-design-vue';
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';
  import { useMenuStore } from '@/store/modules/menu';

  const menuStore = useMenuStore();

  const route = useRoute();
  const menus = menuStore.getMenuList;

  const getRoutesBread = (menus: Menu.MenuOptions[], paths: string[]) => {
    if (paths.length === 0 || menus.length === 0) return [];
    const parent = paths[0];
    const list: Menu.MenuOptions[] = [];
    for (let i = 0; i < menus.length; i++) {
      const menu = menus[i];
      // 匹配父元素和子元素
      if (
        menu.path === parent ||
        parent.lastIndexOf(menu.path) === parent.length - menu.path.length
      ) {
        list.push(menu);
        if (menu.children) {
          const childPaths = paths;
          childPaths.shift();
          list.push(...getRoutesBread(menu.children, childPaths));
        }
        break;
      }
    }
    return list;
  };

  const routes = computed(() => {
    const matched = route.matched.filter((ite) => !ite.meta?.hideBreadcrumb).map((ite) => ite.path);
    const breads = getRoutesBread(menus, matched);
    return [
      {
        meta: {
          title: 'home',
        },
        path: '/',
        children: menus,
      },
      ...breads,
    ];
  });
</script>
<style lang="less" scoped></style>
