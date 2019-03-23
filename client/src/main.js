import Vue from 'vue'
import App from './App.vue'
import router from './routes';
import store from './store/store';
import { MdDialog, MdDialogPrompt, } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use( Vuetify );
Vue.use( MdDialog );
Vue.use( MdDialogPrompt );

new Vue( {
	router,
	store,
	render: h => h( App ),
} ).$mount( '#app' );
