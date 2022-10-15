import { defineStore } from 'pinia';
import { UserInfo } from '@/types/user';
import user from '@/api/user';
import { LoginParams } from '@/api/model/userModel';
import { router } from '@/router';
import { store } from '..';

interface UserState {
  // Constructs a type by excluding null and undefined from Type.
  userInfo: Nullable<UserInfo>;
  token?: string;
}
export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
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
      this.token = info ?? '';
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
        await router.push(userInfo?.homePath ?? '/');
      }
      return userInfo;
    },
  },
});

export default useUserStore(store);
