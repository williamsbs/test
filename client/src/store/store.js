import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../routes';

Vue.use( Vuex );

export default new Vuex.Store( {
	state: {
		sb_color: '',
		sb_msg: '',
		Rooms: '',
	},
	getters: {
		sb_color( state ) {
			return state.sb_color
		},
		sb_msg( state ) {
			return state.sb_msg
		},
		GetRooms( state ) {
			return state.Rooms
		},
	},
	mutations: {
		snackbar( state, sb ) {
			state.sb_color = sb.color
			state.sb_msg = sb.msg
		},
		GetRooms( state, Rooms ) {
			state.Rooms = Rooms.Rooms
		},
	},
	actions: {
		async Reserver( { commit }, payload ) {
			return await axios.post( 'https://station-f-test.herokuapp.com/reservation', { payload } )
				.then( res => {
					if ( res.data.success === false ) {
						commit( 'snackbar', {
							color: "red",
							msg: res.data.msg
						} )
					} else if ( res.data.success === true ) {
						commit( 'snackbar', {
							color: "green",
							msg: res.data.msg
						} )
					}
				} )
				.catch( e => {
					console.log( e )
				} )
		},
		async GetRooms( { commit }, payload ) {
			await axios.get( `https://station-f-test.herokuapp.com/api/getrooms/${payload.date}/${payload.time}?equipement=${payload.equipement}&nb_pers=${payload.nb_pers}` )
				.then( res => {
					if ( res.data.success === true ) {
						commit( 'GetRooms', {
							Rooms: res.data.rooms,
						} )
					} else if ( res.data.success === false ) {
						commit( 'snackbar', {
							color: "red",
							msg: res.data.msg
						} )
					}
				} )
		},
		async Annuler_Res( { commit }, payload ) {
			return await axios.post( 'https://station-f-test.herokuapp.com/annuler', { email: payload.email, Id_Res: payload.Id_Res } )
				.then( res => {
					if ( res.data.success === true ) {
						commit( 'snackbar', {
							color: "green",
							msg: res.data.msg
						} )
						setTimeout( () => {
							router.push( '/' )
						}, 1500 )
					} else if ( res.data.success === false ) {
						commit( 'snackbar', {
							color: "red",
							msg: res.data.msg
						} )
					}
				} )
		}
	}
} )
