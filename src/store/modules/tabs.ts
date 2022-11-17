import piniaPersistConfig from '@/config/piniaPersist';
import { defineStore } from 'pinia';
import { RouteLocationNormalized } from 'vue-router';

interface tabState {
  tabsList: RouteLocationNormalized[];
}

export const useTabStore = defineStore({
  id: 'MenuStore',
  state: (): tabState => ({
    tabsList: [],
  }),
  getters: {
    getTabList(): RouteLocationNormalized[] {
      return this.tabsList;
    },
  },
  actions: {
    async addTabs(tabItem: RouteLocationNormalized) {
      if (this.tabsList.every((item) => item.path !== tabItem.path)) {
        this.tabsList.push(tabItem);
      }
    },
  },
  persist: piniaPersistConfig('TabsStore'),
});
