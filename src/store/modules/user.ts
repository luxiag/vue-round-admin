import { defineStore } from 'pinia';
import { UserInfo } from '@/types/user';
import user from '@/api/user';
import { LoginParams } from '@/api/model/userModel';
import { router } from '@/router';
import { store } from '..';
import { routeEnum } from '@/enums/routeEnum';
import { useAuthStore } from './auth';
interface UserState {
  // 用户信息
  userInfo: Nullable<UserInfo>;
  // 用户  token
  token?: string;
  // 最近登录时间
  lastUpdateTime: number;
}

export const useUserStore = defineStore({
  id: 'UserStore',
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): Nullable<UserInfo> {
      return this.userInfo;
    },
    getToken(): string | undefined {
      return this.token;
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info;
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
    },
    async login(param: LoginParams) {
      const userInfo = await user.loginApi(param);
      const { token } = userInfo;
      if (userInfo) {
        this.setUserInfo(userInfo);
        this.setToken(token);
        const auth = useAuthStore();
        this.lastUpdateTime = new Date().getTime();
        await auth.setAuthOperateFromUserInfo(userInfo.roles);
        await auth.getAuthRoutesFromApi();
        console.log(userInfo, 'userInfo');
        await router.push(userInfo?.homePath);
      }

      return userInfo;
    },
    async logout() {
      this.setToken(undefined);
      this.setUserInfo(null);
      void router.push(routeEnum.Login);
    },
  },
});

export default useUserStore(store);
