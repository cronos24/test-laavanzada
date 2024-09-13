import { createApp } from 'vue'
import './style.css'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css'
import App from './App.vue';
import ToastService from 'primevue/toastservice';
import 'primeflex/primeflex.css';

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.use(ToastService);
app.mount('#app');
