import { defineStore } from 'pinia';
import user from '@/api/user';
import type { RouteRecordRaw } from 'vue-router';
import { asyncImportRoute } from '@/utils/routeHelper';
import { useMenuStore } from '@/store/modules/menu';

// const layout = async () => await import('@/layout/index.vue');
interface AuthState {
  // 路由权限列表
  authRoutes: RouteRecordRaw[];
  // 页面操作权限
  authOperate: {
    [key: string]: any;
  };
  // 是否添加了动态路由
  IsAddRoutes: boolean;
}

interface roleState {
  roleName: string;
  value: any;
}

export const useAuthStore = defineStore({
  id: 'AuthStore',
  state: (): AuthState => ({
    authRoutes: [],
    authOperate: {},
    IsAddRoutes: false,
  }),
  getters: {
    getAuthRoutes(): RouteRecordRaw[] {
      return this.authRoutes;
    },
    getAuthOperate(): Object {
      return this.authOperate;
    },
    getIsAddRoutes(): Boolean {
      return this.IsAddRoutes;
    },
  },
  actions: {
    async setAuthOperateFromUserInfo(roles: roleState[]) {
      const newRoles: { [key: string]: any } = {};
      roles.forEach((role) => {
        newRoles[role.roleName] = role.value;
      });
      this.authOperate = newRoles;
    },
    // 更具后端接口动态引入路由
    async getAuthRoutesFromApi() {
      const routes = await user.menuApi();

      //   路由动态引入
      this.authRoutes = asyncImportRoute(routes);
      // 获取菜单页面
      const menuStore = useMenuStore();
      // 设置路由菜单
      menuStore.setMenuList(routes);
    },
    setIsAddRoutes(added: boolean) {
      this.IsAddRoutes = added;
    },
  },
});
