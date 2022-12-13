import type { UserConfig, ConfigEnv } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vue from '@vitejs/plugin-vue';
import viteEslint from 'vite-plugin-eslint';
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
    plugins: [
      vue(),
      vueJsx(),
      viteEslint(),
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
  };
};

// https://vitejs.dev/config/
export default viteConfig;
