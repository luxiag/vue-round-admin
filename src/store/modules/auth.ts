import { defineStore } from 'pinia';
import user from '@/api/user';

interface AuthState {
  // 路由权限列表
  authRoutes: string[];
  // 页面操作权限
  authOperate: {
    [key: string]: any;
  };
}

interface roleState {
  roleName: string;
  value: any;
}

export const useAuth = defineStore({
  id: 'auth',
  state: (): AuthState => ({
    authRoutes: [],
    authOperate: {},
  }),
  getters: {
    getAuthRoutes(): string[] {
      return this.authRoutes;
    },
    getAuthOperate(): Object {
      return this.authOperate;
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
    async getAuthRoutesFromApi() {
      const menu = await user.menuApi();
      console.log(menu);
    },
  },
});
