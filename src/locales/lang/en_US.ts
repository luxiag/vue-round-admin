import antdLocale from 'ant-design-vue/es/locale/en_US';
import { genMessage } from '../helper';

const modulesFiles = import.meta.glob('./en-US/**/*.ts');
export default {
  message: {
    ...(await genMessage(modulesFiles, 'en-US')),
    antdLocale,
  },
  dateLocale: null,
  dateLocaleName: 'en-US',
};
