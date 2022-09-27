import type { RouteRecordRaw } from 'vue-router';

export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: async () => await import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
  meta: {},
};

// 从 modules目录动态获取路由
export const asyncRoutes: RouteRecordRaw[] = [];
// https://cn.vitejs.dev/guide/features.html#json

const modules = import.meta.glob('./modules/**/*.ts');
// eslint-disable-next-line @typescript-eslint/no-misused-promises
Object.keys(modules).forEach(async (key) => {
  // 获取 modules目录下的各文件 default对象
  // const mod = (modules[key] as any).default || {};
  const mod = ((await modules[key]()) as any).default;
  console.log(mod, 'mod');
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  asyncRoutes.push(...modList);
  console.log(asyncRoutes, 'asyncRoutes push');
});
console.log(asyncRoutes, 'asyncRoutes');

export const basicRoutes = [LoginRoute];
