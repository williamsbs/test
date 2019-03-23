<template>
	<div id="app">
		<div>
			<C_Header/>
			<router-view/>
			<C_Footer/>
		</div>
	</div>
</template>

<script>
	import C_Header from './components/Header-Footer/Header'
	import C_Footer from './components/Header-Footer/Footer'

	export default {
		components: {
			C_Header,
			C_Footer
		},
	}
</script>

<style>
	@import './assets/style.css';
</style>
