import { defineStore } from 'pinia';
import { UserInfo } from '@/types/user';

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
  },
});
