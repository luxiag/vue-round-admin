import { createI18n } from 'vue-i18n';
import type { App } from 'vue';
import { useLocaleStore } from '@/store/modules/locale';
// import { localeMap } from './config';

async function createI18nOptions() {
  // 获取语言设置
  const localeStore = useLocaleStore();
  const locale = localeStore.getLocale;

  const defaultMessage = await import(`./lang/${locale}.ts`);
  const message = defaultMessage.default?.message ?? {};

  return {
    locale,
    message: {
      [locale]: message as { [key: string]: string },
    },
    // https://vue-i18n.intlify.dev/api/general.html#i18nadditionaloptions
    globalInjection: true,
    silentTranslationWarn: true, // true - warning off
    missingWarn: false,
    silentFallbackWarn: true,
  };
}

const options = await createI18nOptions();

export const i18n: ReturnType<typeof createI18n> = createI18n(options);

export async function setupI18n(app: App) {
  app.use(i18n);
}
