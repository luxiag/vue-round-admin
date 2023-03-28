import type { UserConfig, ConfigEnv } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vue from '@vitejs/plugin-vue';
import viteEslint from 'vite-plugin-eslint';
import DefineOptions from 'unplugin-vue-define-options/vite';
// mock 数据模拟
import { viteMockServe } from 'vite-plugin-mock';
import { resolve } from 'path';

const pathResolve = (dir: string): any => {
  return resolve(__dirname, '.', dir);
};

const viteConfig = ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build';
  const alias: Record<string, string> = {
    '@': pathResolve('src'),
  };
  return {
    base: '/vue-round-admin/',
    plugins: [
      vue(),
      vueJsx(),
      viteEslint(),
      DefineOptions(),
      viteMockServe({
        ignore: /^_/,
        mockPath: 'mock',
        localEnabled: !isBuild,
        prodEnabled: isBuild,
        logger: true,
        injectCode: `
        import { setupProdMockServer } from '../mock/_createProductionServer';
        setupProdMockServer();
        `,
      }),
    ],
    root: process.cwd(),
    resolve: {
      alias,
    },
    build: {
      target: 'esnext',
      rollupOptions: {
        output: {
          sanitizeFileName,
        },
      },
    },
  };
};
// 重写rollup打包方法，解决GitHub Pages 404 问题
// Issue: https://github.com/vitejs/vite/issues/9119
// eslint-disable-next-line no-control-regex
const INVALID_CHAR_REGEX = /[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g;
const DRIVE_LETTER_REGEX = /^[a-z]:/i;

export function sanitizeFileName(name: string): string {
  const match = DRIVE_LETTER_REGEX.exec(name);
  const driveLetter = match ? match[0] : '';

  // A `:` is only allowed as part of a windows drive letter (ex: C:\foo)
  // Otherwise, avoid them because they can refer to NTFS alternate data streams.
  return driveLetter + name.substring(driveLetter.length).replace(INVALID_CHAR_REGEX, '');
}
// https://vitejs.dev/config/
export default viteConfig;
