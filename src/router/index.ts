import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { basicRoutes } from './routes';
export const router = createRouter({
  routes: basicRoutes,
  history: createWebHashHistory(),
});

export async function setupRouter(app: App): Promise<void> {
  app.use(router);

  await router.isReady();
}

export default router;
