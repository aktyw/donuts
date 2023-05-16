import './assets/styles/main.css';

import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

(async () => {
  try {
    await router.isReady();
    app.mount('#app');
  } catch (error) {
    console.log(error);
  }
})();
