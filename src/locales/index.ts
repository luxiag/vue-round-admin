import { createI18n } from 'vue-i18n';
import type { I18nOptions } from 'vue-i18n';
import type { App } from 'vue';
import { useLocaleStore } from '@/store/modules/locale';
import { setHtmlPageLang, setLoadLocalePool } from './helper';
import { LocaleType } from './config';
// import { localeMap } from './config';

export let i18n: ReturnType<typeof createI18n>;

async function createI18nOptions(): Promise<I18nOptions> {
  // 获取语言设置
  const localeStore = useLocaleStore();
  const locale = localeStore.getLocale;
  // 获取语言目录
  const defaultMessage = await import(`./lang/${locale}.ts`);
  const message = defaultMessage.default?.message ?? {};

  setHtmlPageLang(locale);
  setLoadLocalePool((loadLocalePool) => {
    loadLocalePool.push(locale);
  });
  console.log(message, locale, 'message');
  return {
    locale,
    messages: {
      [locale]: message,
    },
    // https://vue-i18n.intlify.dev/api/general.html#i18nadditionaloptions
    globalInjection: true,
    silentTranslationWarn: true, // true - warning off
    missingWarn: false,
    silentFallbackWarn: true,
  };
}

export function changeLang(locale: LocaleType) {
  const localeStore = useLocaleStore();
  i18n.global.locale = locale;
  localeStore.setLocale(locale);
  console.log(i18n, 'i18n');
}

export async function setupI18n(app: App) {
  const options = await createI18nOptions();
  i18n = createI18n(options);
  console.log(i18n, 'createI18n');

  app.use(i18n);
}
