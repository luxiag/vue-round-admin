<template>
  <a-breadcrumb :routes="routes">
    <template #itemRender="{ route, paths }">
      <!-- 最后一个不跳转 -->
      <span v-if="routes.indexOf(route) === routes.length - 1">
        {{ route.breadcrumbName }}
      </span>
      <router-link v-else to="" @click="toRoute(paths)">
        {{ route.breadcrumbName }}
        <!-- {{ paths.join('/') }} -->
      </router-link>
    </template>
  </a-breadcrumb>
</template>
<script lang="ts" setup>
  import { Breadcrumb as ABreadcrumb } from 'ant-design-vue';
  import { useRoute, RouteRecordRaw } from 'vue-router';
  import { ref, onMounted, watchEffect } from 'vue';
  import { useMenuStore } from '@/store/modules/menu';

  const menuStore = useMenuStore();
  const routes = ref([
    {
      path: 'index',
      breadcrumbName: 'home',
    },
    {
      path: 'first',
      breadcrumbName: 'first',
      children: [
        {
          path: '/general',
          breadcrumbName: 'General',
        },
        {
          path: '/layout',
          breadcrumbName: 'Layout',
        },
        {
          path: '/navigation',
          breadcrumbName: 'Navigation',
        },
      ],
    },
    {
      path: 'second',
      breadcrumbName: 'second',
    },
  ]);

  const route = useRoute();
  const menus = menuStore.getMenuList;

  const getAllMenus = (menus: Menu.MenuOptions[]) => {
    const list: Menu.MenuOptions[] = [];
    menus.forEach((ite) => {
      if (!ite.meta?.hideBreadcrumb) {
        list.push(ite);
      }
      if (ite.children) {
        const childList = getAllMenus(ite.children);
        list.push(...childList);
      }
    });
    return list;
  };
  const toRoute = (paths: any) => {
    console.log(paths, 'paths');
  };

  const getRoutesBread = (menus: Menu.MenuOptions[], paths: string[]) => {
    if (paths.length === 0) return [];

    const list: Menu.MenuOptions[] = [];
    menus.forEach((menu) => {
      if (paths[0] === menu.path) {
        list.push(menu);
        const parentPath = paths.shift();
        if (paths.length >= 0) {
          paths.map((ite) => ite.repeat(parentPath, ''));
        }
      }
    });
  };
  watchEffect(() => {
    // 过滤掉隐藏的bread
    const matched = route.matched.filter((ite) => !ite.meta?.hideBreadcrumb).map((ite) => ite.path);

    // const allMenus = getAllMenus(menus).filter((ite) => matched.includes(ite.path));
    // console.log(allMenus, matched, 'allMenus');
    // const matchedList = matched.map((ite) => {
    //   console.log(ite, 'ite');
    //   // if (allMenus.includes(ite as unknown as Menu.MenuOptions)) {
    //   // }
    //   return null;
    // });
  });
  onMounted(() => {
    console.log(menus, route, 'route');
  });
</script>
<style lang="less" scoped></style>
