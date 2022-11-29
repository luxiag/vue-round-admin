// import piniaPersistConfig from '@/config/piniaPersist';
import { defineStore } from 'pinia';
import { RouteLocationNormalized } from 'vue-router';
import { basicRoutes } from '@/router/routes';

interface tabState {
  tabsList: RouteLocationNormalized[];
}

export const useTabStore = defineStore({
  id: 'TabsStore',
  state: (): tabState => ({
    tabsList: [],
  }),
  getters: {
    getTabList(): RouteLocationNormalized[] {
      return this.tabsList;
    },
  },
  actions: {
    addTabs(tabItem: RouteLocationNormalized) {
      // 基础路由不添加 如 login
      if (basicRoutes.some((ite) => ite.path === tabItem.path)) return;
      console.log(this.tabsList, tabItem, tabItem.path, 'addTabs');
      if (this.tabsList.every((item) => item.path !== tabItem.path)) {
        console.log('addItem', tabItem);
        this.tabsList.push(tabItem);
      }
    },
    resetTabs() {
      this.tabsList = [];
    },
  },
  // persist: piniaPersistConfig('TabsStore'),
});
