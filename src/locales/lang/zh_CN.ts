import antdLocale from 'ant-design-vue/es/locale/zh_CN';
import { genMessage } from '../helper';

const modulesFiles = import.meta.glob('./zh-CN/**/**.ts');

export default {
  message: {
    ...(await genMessage(modulesFiles, 'zh-CN')),
    antdLocale,
  },
};
