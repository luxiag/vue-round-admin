import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import { setupAntd } from '@/plugins';
import { setupRouterGuard } from '@/router/guard';
import { setupStore } from '@/store';
import { setupI18n } from '@/locales';
import '@/styles/index.less';

import { router } from '@/router';
const app = createApp(App);

async function setupApp(): Promise<void> {
  setupAntd(app);
  setupRouterGuard(router);
  await setupI18n(app);
  await setupRouter(app);
  await setupStore(app);

  app.mount('#app');
}
void setupApp();
