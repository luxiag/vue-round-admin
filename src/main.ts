import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
const app = createApp(App);

async function setupApp(): Promise<void> {
  await setupRouter(app);
  app.mount('#app');
}
void setupApp();
