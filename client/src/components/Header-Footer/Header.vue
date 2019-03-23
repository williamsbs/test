<template>
	<header>
		<div class="header_container">
			<div class="logo">
				<router-link to="/">Réservation</router-link>
			</div>
			<!--je ne pouvais pas utiliser les composant "button" car sur firefox il ne fonctionne pas avec VUE JS-->
			<div class="button">
				<strong>
					<router-link to="/annuler">ANNULER MA RESERVATION</router-link>
				</strong>
			</div>
		</div>
	</header>
</template>

<script>
	export default {}
</script>

<style scoped>
	.logo {
		padding: 20px;
	}

	.v-btn {
		text-decoration: none;
	}

	a {
		text-decoration: none;
		color: white;
	}

	.button {
		background-color: #EF5350;
		position: relative;
		padding: 10px;
		border-radius: 4px;
		font-size: 15px;
		height: 40px;
		top: 6px;
		margin-right: 20px;
	}

	@media screen and (max-width: 460px){
		.button {
			height: 55px;
		}
	}
</style>
