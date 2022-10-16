import { defineStore } from 'pinia';
import { ThemeEnum, LayoutEnum } from '@/enums/appEnum';

interface AppState {
  colorMode?: ThemeEnum;
  themeColor: string;
  layout: LayoutEnum;
  language: string;
  showLogo: boolean;
  showFooter: boolean;
  showFullScreen: boolean;
  showBreadcrumb: boolean;
  showTabs: boolean;
}

export const useAppStore = defineStore({
  id: 'AppStore',
  state: (): AppState => ({
    colorMode: ThemeEnum.light,
    themeColor: '#1E88E5',
    layout: LayoutEnum.default,
    language: '',
    showLogo: true,
    showFooter: true,
    showFullScreen: true,
    showBreadcrumb: true,
    showTabs: true,
  }),
  getters: {
    getLayout(): LayoutEnum {
      return this.layout;
    },
  },
});
