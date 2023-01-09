import { unref, computed, Ref } from 'vue';
import { loadLocalePool, setHtmlPageLang } from './helper';
import { i18n } from './';
import type { LocaleType } from './config';

import { useLocaleStore } from '@/store/modules/locale';

interface LangModule {
  message: Recordable;
  dateLocale: Recordable;
  dateLocaleName: string;
}

function setI18nLanguage(locale: LocaleType) {
  const localeStore = useLocaleStore();

  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale;
  } else {
    (i18n.global.locale as Ref).value = locale;
  }
  localeStore.setLocale(locale);
  setHtmlPageLang(locale);
}

export function useLocale() {
  const localeStore = useLocaleStore();
  const getLocale = computed(() => localeStore.getLocale);
  //   todo i18n returnType 失效 ？？
  const getAntdLocale = computed(() => {
    return (i18n as any).global.getLocaleMessage(unref(getLocale))?.antdLocale ?? {};
  });

  async function changeLocale(locale: LocaleType) {
    const globalI18n = i18n.global;
    const currentLocale = unref(globalI18n.locale);
    if (currentLocale === locale) {
      return locale;
    }
    if (loadLocalePool.includes(locale)) {
      setI18nLanguage(locale);
      return locale;
    }
    console.log(locale, 'locale');
    const langModule = (await import(`./lang/${locale}.ts`)).default as LangModule;
    if (!langModule) return;
    const { message } = langModule;
    globalI18n.setLocaleMessage(locale, message);
    loadLocalePool.push(locale);

    setI18nLanguage(locale);
    console.log(i18n, 'i18n');
    return locale;
  }
  return {
    getLocale,
    changeLocale,
    getAntdLocale,
  };
}
