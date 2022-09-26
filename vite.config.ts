import type { UserConfig, ConfigEnv } from 'vite';

import vue from '@vitejs/plugin-vue';
import viteEslint from 'vite-plugin-eslint';
import { resolve } from 'path';

const pathResolve = (dir: string): any => {
  return resolve(__dirname, '.', dir);
};

const viteConfig = ({ mode }: ConfigEnv): UserConfig => {
  const alias: Record<string, string> = {
    '@': pathResolve('src'),
  };
  return {
    plugins: [vue(), viteEslint()],
    root: process.cwd(),
    resolve: {
      alias,
    },
  };
};

// https://vitejs.dev/config/
export default viteConfig;
