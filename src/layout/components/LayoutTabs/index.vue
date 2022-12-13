<template>
  <div class="layout-sider">
    <a-tabs :active-key="activeKey" type="editable-card" hide-add @change="handleChange">
      <template v-for="tab in tabsList" :key="tab.path">
        <a-tab-pane :closable="!tab.meta?.affix" :tab="tab.meta?.title"></a-tab-pane>
      </template>
    </a-tabs>
  </div>
</template>
<script setup lang="ts">
  import { Tabs as ATabs, TabPane as ATabPane } from 'ant-design-vue';
  import { useRoute, useRouter } from 'vue-router';
  import { ref, watch, computed } from 'vue';
  import { useTabStore } from '@/store/modules/tabs';

  const tabStore = useTabStore();
  const route = useRoute();
  const router = useRouter();
  const activeKey = ref(route.path);
  const tabsList = computed(() => {
    // 过滤掉 hideTab 的路由
    return tabStore.getTabList?.filter((item) => !item.meta?.hideTab);
  });

  // 监听路由变化 生成 tab
  watch(
    () => route.path,
    async () => {
      // 浅拷贝
      const addRoute = Object.assign({}, route);
      tabStore.addTabs(addRoute);
      activeKey.value = route.path;
    },
    {
      immediate: true,
    },
  );

  const handleChange = (key: any) => {
    activeKey.value = key;
    router.push({ path: key });
  };
</script>
<style lang="less" scoped>
  .layout-sider {
    background-color: #fff;
    // height: 32px;
    padding: 10px;
    :deep(.ant-tabs-nav) {
      margin: 0;
      ::before {
        // border: none;
      }

      .ant-tabs-tab {
        padding: 4px 8px;
        background: #fff;
      }
      .ant-tabs-tab-remove {
        display: none;
        margin: 0;
        padding-right: 0;
      }
      :hover {
        .ant-tabs-tab-remove {
          display: revert;
          transition: all 2s;
        }
      }
      .ant-tabs-tab-active {
        .ant-tabs-tab-remove {
          display: revert;
        }
      }
    }
  }
</style>
