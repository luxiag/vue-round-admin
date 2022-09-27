import type { App } from 'vue';
import type { RouteRecordRaw, RouteRecordName } from 'vue-router';

import { createRouter, createWebHashHistory } from 'vue-router';
import { basicRoutes } from './routes';

// 白名单
const WHITE_NAME_LIST: RouteRecordName[] = [];

const getWhiteRoute = (array: RouteRecordRaw[]) => {
  array.forEach((ite) => {
    ite.name && WHITE_NAME_LIST.push(ite.name);
  });
};
// 获取路由白名单
getWhiteRoute(basicRoutes);

export const router = createRouter({
  routes: basicRoutes,
  history: createWebHashHistory(),
});

export async function setupRouter(app: App): Promise<void> {
  app.use(router);

  await router.isReady();
}

export default router;
