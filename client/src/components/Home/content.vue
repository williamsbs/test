<template>
	<div class="container">
		<div class="selector">
			<div>
				<v-date-picker
						v-model="date"
						width="250"
						class="mt-3"
						color="green lighten-2"
						@change="Search"
						style="border-radius: 15px;"
				></v-date-picker>
			</div>

			<div @click="Search" class="time-picker">
				<v-time-picker v-model="time"
				               width="250"
				               color="green lighten-2"
				               format="24hr"
				               :allowed-minutes="(m) =>  0"
				               class="select">

				</v-time-picker>
			</div>
		</div>
			<v-toolbar style="margin-bottom: 20px">
				<v-checkbox v-model="equipement" label="TV" value="TV" @change="Search"></v-checkbox>
				<v-checkbox v-model="equipement" label="Retro Projecteur" value="Retro Projecteur" @change="Search"></v-checkbox>
				<div>
					<span class="nb_pers">Nombres de personnes: </span>
					<select v-model="nb_personne" @change="Search">
						<option value="5">5+</option>
						<option value="10">10+</option>
						<option value="20">20+</option>
					</select>
				</div>
			</v-toolbar>
		<div class="home_container">
			<div class="room_items">
				<div class="grid">
					<v-card v-for="(room, index) in Rooms" :key="index" class="card" color="green lighten-2" dark
					        max-width="500px">

						<v-responsive md-ratio="16:9">
							<img :src="imgs[index]"/>
						</v-responsive>

						<div class="card-content">
							<v-card-title>
								<div><h1 class="title">{{room.name}}</h1></div>
								<div style="line-height: 25px"><strong>Capacité:</strong> {{room.capacity}} personnes
								</div>
								<div v-if="room.equipements == '' ">Aucun équipement disponible</div>
								<div v-else>
									<strong>Equipement:</strong>
									<ul v-for="(equipement, index) in room.equipements" :key="index">
										<li>{{equipement.name}}</li>
									</ul>
								</div>
							</v-card-title>
						</div>

						<v-card-actions>
							<v-btn @click=dialog(room.name) class="select" light>Reserver</v-btn>
						</v-card-actions>

					</v-card>

					<v-snackbar
							v-model="snackbar"
							:color="sb.color"
							:timeout="2000">
						{{sb.msg}}
					</v-snackbar>

					<div>
						<md-dialog :md-active.sync="active" >
							<md-dialog-title>{{roomName}}</md-dialog-title>
							<v-form ref="form" v-model="valid" lazy-validation @submit.prevent="">
								<v-text-field v-model="email" :rules="emailRules" label="Votre Email..."
								              required></v-text-field>
							</v-form>
							<md-dialog-actions>
								<div v-if="email !== ''" class="button">
									<v-btn :disabled="!valid" color="green" @click.prevent="reserver" dark>
										Réserver
									</v-btn>
								</div>
							</md-dialog-actions>
						</md-dialog>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import img1 from '../../assets/images/salle1.jpg'
	import img2 from '../../assets/images/salle2.jpg'
	import img3 from '../../assets/images/salle3.png'
	import img4 from '../../assets/images/salle4.png'
	import img5 from '../../assets/images/salle5.jpg'

	export default {
		data() {
			return {
				imgs: [ img1, img2, img3, img4, img5 ],
				Rooms: [],
				equipement: [],
				valid: false,
				active: false,
				email: '',
				roomName: null,
				selectedDate: null,
				time: '12:00',
				date: new Date().toISOString().substr( 0, 10 ),
				emailRules: [
					v => !!v || 'E-mail is required',
					v => /.+@.+/.test( v ) || 'E-mail must be valid'
				],
				sb: {
					color: "success",
					msg: ""
				},
				snackbar: false,
				nb_personne: '5'
			}
		},
		methods: {
			dialog( roomName ) {
				this.roomName = roomName;
				this.active = !this.active;
			},
			display_snackbar() {
				this.snackbar = false;
				setTimeout( () => {
					this.sb.color = this.$store.getters[ 'sb_color' ];
					this.sb.msg = this.$store.getters[ 'sb_msg' ];
					if ( this.sb.msg.length > 0 )
						this.snackbar = true
				}, 100 )
			},
			async reserver() {
				if ( this.email !== null ) {
					let payload = {
						email: this.email,
						room: this.roomName,
						date: this.date,
						time: this.time
					};
					this.$store.dispatch( 'Reserver', payload )
						.then( () => {
							this.display_snackbar();
							this.active = !this.active;
							this.email = '';
							this.Search()

						} )
						.catch( e => {
							console.log( e )
						} )
				}
			},
			async Search() {
				if ( this.date !== undefined ) {
					this.$store.dispatch( 'GetRooms', {
						date: this.date,
						time: this.time,
						equipement: this.equipement,
						nb_pers: this.nb_personne
					} )
						.then( () => {
							this.Rooms = this.$store.getters[ 'GetRooms' ];
						} )
						.catch( e => {
							console.log( e )
						} )
				}
			}
		},
		created() {
			this.Search()
		}
	}
</script>

<style scoped>
	.md-dialog {
		background-color: white;
	}

	.container {
		margin-top: 7%;
	}

	.selector {
		display: flex;
		justify-content: space-evenly;
		margin-bottom: 20px;
	}

	.grid {
		display: grid;
		grid-template-columns: 50% 50%;
	}

	.room_items {
		display: flex;
		flex-wrap: wrap;
		margin: 0 0 30px 0
	}

	.card {
		margin: 0 0 30px 30px;
		height: 97%;
		/*background: linear-gradient(#6C1E1E, #340101);*/
		border-radius: 10px;
		box-shadow: 10px 5px 10px #202020;
	}

	.v-card__title {
		margin: 0 20px 20px 20px;
		display: grid;
		grid-template-rows: 30% 30%;
		font-size: 17px;
		line-height: 24px;
	}

	.v-card__actions {
		width: 100%;
		position: absolute;
		bottom: 0px;
	}

	.select {
		border-radius: 15px;
	}

	.time-picker {
		bottom: 0;
	}

	.v-btn {
		width: 100%;
	}

	.card-content {
		display: block;
		margin-bottom: 50px;
	}

	h1 {
		padding: 20px 0 20px 0;
		font-size: 26px !important;
	}

	.time-picker {
		position: relative;
		bottom: -28px;
	}

	.md-dialog-title {
		padding-bottom: 20px;
		background: #81C784;
		color: white;
	}

	.md-dialog {
		width: 50%;
	}

	.v-form {
		padding: 0 20px 0 20px;
	}

	@media screen and (min-width: 1900px) {
		.md-dialog {
			width: 35%;
		}
	}

	.button {
		margin-right: 20px;
	}

	.v-toolbar {
		width: 97%;
		border-radius: 15px;
	}

	.v-toolbar__content {
		float: right;
	}

	.v-toolbar .v-input {
		width: 0px;
		position: relative;
		top: 10px;
		left: 150px;
	}

	@media screen and (min-width: 1905px) {
		.grid {
			display: grid;
			grid-template-columns: 33% 33% 33%;
		}

		.v-toolbar {
			width: 93%;
			border-radius: 15px;
		}

		.v-toolbar .v-input {
			width: 0px;
			position: relative;
			top: 10px;
			left: 256px;
		}
	}

	select {
		margin: 3px;
		color: #585858;

	}

	.nb_pers {
		color: #585858;
		font-size: 16px
	}

	@media screen and (max-width: 1260px) {

		.v-toolbar {
			width: 103%;
			border-radius: 15px;
		}

		.v-toolbar .v-input {
			width: 0px;
			position: relative;
			top: 10px;
			left: 40px;
		}

	}

	@media screen and (max-width: 770px) {

		.v-toolbar .v-input {
			width: 0px;
			position: relative;
			top: 10px;
			left: 25px;
		}

	}

</style>
