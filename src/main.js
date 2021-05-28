import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import PrimeVue from 'primevue/config'
// import 'primevue/resources/themes/saga-orange/theme.css'    
import './assets/scss/_theme.scss'                          //theme
import 'primevue/resources/primevue.css'                    //core css
import 'primeicons/primeicons.css'                          //icons
import 'primeflex/primeflex.css';                           //primeflex

//Prime Components Global
import Card from "primevue/card";
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';

import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Slider from 'primevue/slider';
import Ripple from 'primevue/ripple';
import Toast from 'primevue/toast';
import Avatar from 'primevue/avatar';

import DataView from 'primevue/dataview';
import MultiSelect from 'primevue/multiselect';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';


import ConfirmDialog from 'primevue/confirmdialog';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';

//Custom Components
import SidebarWrapper from './components/UI/SidebarWrapper.vue';
import BaseCard from './components/Base/BaseCard.vue';
// import InfoCard from './components/Other/InfoCard.vue';
// import BaseBadge from './components/Base/BaseBadge.vue';

const InfoCard = defineAsyncComponent(() => import('./components/Other/InfoCard.vue'))
const BaseBadge = defineAsyncComponent(() => import('./components/Base/BaseBadge.vue'))

const app = createApp(App)

//Prime UI
app.use(PrimeVue, { ripple: true })
app.use(ToastService)
app.use(ConfirmationService)

app.component('Card', Card)
app.component('InputText', InputText)
app.component('Textarea', Textarea)

app.component('Button', Button)
app.component('Calendar', Calendar)
app.component('SidebarWrapper', SidebarWrapper)
app.component('BaseCard', BaseCard)
app.component('InfoCard', InfoCard)
app.component('BaseBadge', BaseBadge)
app.component('Toast', Toast)
app.component('Slider', Slider)
app.component('Avatar', Avatar)
app.component('DataView', DataView)
app.component('DataViewLayoutOptions', DataViewLayoutOptions)
app.component('ConfirmDialog', ConfirmDialog)
app.component('TabView', TabView)
app.component('TabPanel', TabPanel)
app.component('MultiSelect', MultiSelect)

app.directive('ripple', Ripple)


app.use(router)
app.use(store)

router.isReady().then(function () {
    app.mount('#app');
});
