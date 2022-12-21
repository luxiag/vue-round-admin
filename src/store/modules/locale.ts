import { defineStore } from 'pinia';
import { LocaleType } from '@/locales/config';
import { WebStorage } from '@/utils/cache';
import { LOCALE_KEY } from '@/enums/cacheEnum';
import piniaPersistConfig from '@/config/piniaPersist';

interface LocaleState {
  locale: LocaleType;
}

export const useLocaleStore = defineStore({
  id: 'LocaleStore',
  state: (): LocaleState => ({
    locale: WebStorage.get(LOCALE_KEY, 'zh_CN'),
  }),
  getters: {
    getLocale(): LocaleType {
      return this.locale ?? 'zh_CN';
    },
  },
  actions: {
    setLocale(locale: LocaleType) {
      this.locale = locale;
    },
  },
  persist: piniaPersistConfig('LocaleStore'),
});
