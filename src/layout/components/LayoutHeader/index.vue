<template>
  <layout-header style="background: #fff" class="layout-header">
    <div class="header_left">
      <div class="header-menu__fold" @click="switchCollapse">
        <menu-unfold-outlined v-if="isCollapse" class="trigger" />
        <menu-fold-outlined v-else class="trigger" />
      </div>

      <Breadcrumb />
    </div>

    <div class="header_right">
      <SwitchLangVue />
      <User />
    </div>
  </layout-header>
</template>
<script setup lang="ts">
  import { LayoutHeader } from 'ant-design-vue';
  import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
  import { useMenuStore } from '@/store/modules/menu';
  import { storeToRefs } from 'pinia';
  import Breadcrumb from './components/Breadcrumb.vue';
  import User from './components/User.vue';
  import SwitchLangVue from './components/SwitchLang.vue';
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
    justify-content: space-between;
    padding: 0px 15px;
    height: revert;
    line-height: revert;
    border-bottom: 1px solid #f6ecec;
    .header-menu__fold {
      font-size: 18px;
      margin-right: 18px;
    }
    .header_left,
    .header_right {
      display: flex;
      align-items: center;
    }
    .header_right {
      cursor: pointer;
      .detail {
        padding: 10px 15px;
        .user_avatar {
          margin-right: 10px;
        }
      }
      .detail:hover {
        background-color: #f3f3f3;
      }
    }
  }
</style>
