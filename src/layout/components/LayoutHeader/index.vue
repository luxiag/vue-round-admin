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
      <a-dropdown>
        <span class="user_detail">
          <span class="user_avatar"
            ><a-avatar size="small" src="https://joeschmoe.io/api/v1/random"
          /></span>
          <span class="user_name">
            {{ userStore.getUserInfo?.username }}
          </span>
        </span>
        <template #overlay>
          <a-menu @click="handleMenuClick">
            <a-menu-item>
              <a href="javascript:;">1st menu item</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">2nd menu item</a>
            </a-menu-item>
            <a-menu-item key="logout">
              <span>{{ $t('layout.header.dropdown') }}</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </layout-header>
</template>
<script setup lang="ts">
  import {
    LayoutHeader,
    Dropdown as ADropdown,
    Menu as AMenu,
    MenuItem as AMenuItem,
    Avatar as AAvatar,
  } from 'ant-design-vue';
  import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
  import { useMenuStore } from '@/store/modules/menu';
  import { storeToRefs } from 'pinia';
  import Breadcrumb from './Breadcrumb.vue';
  import { useUserStore } from '@/store/modules/user';
  import { MenuInfo } from 'ant-design-vue/lib/menu/src/interface';
  import { useConfirm } from '@/hooks/useMessage';
  const userStore = useUserStore();
  const menuStore = useMenuStore();
  const { isCollapse } = storeToRefs(menuStore);
  // 切换菜单状态
  const switchCollapse = () => {
    menuStore.setCollapse();
  };
  type MenuEvent = 'logout' | 'lock';

  const handleMenuClick = (e: MenuInfo) => {
    switch (e.key as MenuEvent) {
      case 'logout':
        handleLogout();
        break;
    }
  };
  const handleLogout = () => {
    useConfirm({
      content: '确认退出吗？',
      async onOk() {
        userStore.logout();
      },
    });
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
      .user_detail {
        padding: 10px 15px;
        .user_avatar {
          margin-right: 10px;
        }
      }
      .user_detail:hover {
        background-color: #f3f3f3;
      }
    }
  }
</style>
