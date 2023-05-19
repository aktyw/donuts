import './assets/styles/main.css';

import { createPinia } from 'pinia';
import { createApp, markRaw } from 'vue';
import { VueFire, VueFireAuth } from 'vuefire';

import { firebaseApp } from '@/firebase/config';

import App from './App.vue';
import router from './router';

const app = createApp(App);
const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
});

app.use(pinia);

app.use(router);

app.mount('#app');
