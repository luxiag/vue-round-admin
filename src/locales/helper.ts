import { set } from 'lodash-es';
import { LocaleType } from './config';

export function setHtmlPageLang(locale: LocaleType) {
  document.querySelector('html')?.setAttribute('lang', locale);
}

export const loadLocalePool: LocaleType[] = [];

export function setLoadLocalePool(cb: (loadLocalePool: LocaleType[]) => void) {
  cb(loadLocalePool);
}

export async function genMessage(langs: Record<string, any>, prefix = 'lang') {
  const obj: Recordable = {};
  const keys = Object.keys(langs);
  for (const key of keys) {
    const langFileModule = await langs[key]();
    console.log(langFileModule.default, key);
    let fileName = key.replace(`./${prefix}/`, '').replace(/^\.\//, '');
    const lastIndex = fileName.lastIndexOf('.');
    fileName = fileName.substring(0, lastIndex);
    const keyList = fileName.split('/');
    const moduleName = keyList.shift();
    const objKey = keyList.join('.');

    if (moduleName) {
      if (objKey) {
        set(obj, moduleName, obj[moduleName] || {});
        set(obj[moduleName], objKey, langFileModule.default);
        console.log(obj, langFileModule.default, 'set');
      } else {
        set(obj, moduleName, langFileModule.default || {});
      }
    }
  }
  return obj;
}
