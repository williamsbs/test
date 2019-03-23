import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/Home/content';
import Annuler_Res from './components/Annuler_Res';

Vue.use( VueRouter );

const routes = [
	{ path: '/', component: Home },
	{ path: '/annuler', component: Annuler_Res },
];

export default new VueRouter( {
	mode: 'history',
	routes,
	scrollBehavior( from, to, savedPosition ) {
		return { x: 0, y: 0 }
	}
} )
