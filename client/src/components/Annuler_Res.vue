<template>
	<div class="annuler">
		<div>
			<v-form ref="form" v-model="valid" lazy-validation>
				<v-text-field
						v-model="Id_Res"
						label="Id_Res"
						required
				></v-text-field>

				<v-text-field
						v-model="email"
						:rules="emailRules"
						label="E-mail"
						required
				></v-text-field>

				<div v-if="Id_Res !== '' && email !== ''">
					<v-btn :disabled="!valid" color="green" @click="validate" dark>
						Annuler ma réservation
					</v-btn>
				</div>

			</v-form>
			<v-snackbar
					v-model="snackbar"
					:color="sb.color"
					:timeout="2000">
				{{sb.msg}}
			</v-snackbar>
		</div>
	</div>
</template>

<script>

	import axios from 'axios'

	export default {
		data() {
			return {
				valid: false,
				Id_Res: '',
				email: '',
				emailRules: [
					v => !!v || 'E-mail is required',
					v => /.+@.+/.test( v ) || 'E-mail must be valid'
				],
				sb: {
					color: "success",
					msg: ""
				},
				snackbar: false,
			}
		},
		methods: {
			validate() {
				this.$store.dispatch( 'Annuler_Res', { email: this.email, Id_Res: this.Id_Res } )
					.then( res => {
						this.snackbar = false;
						setTimeout( () => {
							this.sb.color = this.$store.getters[ 'sb_color' ];
							this.sb.msg = this.$store.getters[ 'sb_msg' ];
							if ( this.sb.msg.length > 0 )
								this.snackbar = true
						}, 100 )
					} )
			},
		}
	}
</script>

<style scoped>
	.annuler {
		margin: 25%;
		background-color: #fff;
		border-radius: 10px;
	}

	.v-form {
		padding: 20px;
	}
</style>
