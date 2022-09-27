import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import { setupAntd } from '@/plugins';
const app = createApp(App);

async function setupApp(): Promise<void> {
  setupAntd(app);
  await setupRouter(app);
  app.mount('#app');
}
void setupApp();
