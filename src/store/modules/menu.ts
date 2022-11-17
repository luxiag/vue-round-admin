import piniaPersistConfig from '@/config/piniaPersist';
import { defineStore } from 'pinia';

interface MenuState {
  //  菜单是否折叠
  isCollapse: boolean;
  //   菜单列表
  menuList: Menu.MenuOptions[];
}

export const useMenuStore = defineStore({
  id: 'MenuStore',
  state: (): MenuState => ({
    isCollapse: false,
    menuList: [],
  }),
  getters: {
    getCollapse(): boolean {
      return this.isCollapse;
    },
    getMenuList(): Menu.MenuOptions[] {
      return this.menuList;
    },
  },
  actions: {
    setCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    setMenuList(menuList: Menu.MenuOptions[]) {
      this.menuList = menuList;
    },
  },
  persist: piniaPersistConfig('MenuStore'),
});
