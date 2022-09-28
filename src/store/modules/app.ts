import { defineStore } from 'pinia';
import { ThemeEnum } from '@/enums/appEnum';

interface AppState {
  darkMode?: ThemeEnum;
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({}),
});
