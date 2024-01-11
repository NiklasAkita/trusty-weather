<script>
	import NavBar from '$lib/components/NavBar.svelte';
	import { WeatherHandler } from '$lib/utils/WeatherHandler';
	import { onMount } from 'svelte';
	import '../styles/styles.scss';

	onMount(() => {
		const hej = new WeatherHandler();
		hej.updateWeatherData();
	});
</script>

<div class="app">
	<!-- this is only to limit the assignment and have a somewhat pretty app, then to focus on mobile first -->
	<div class="limiter">
		<slot />

		<NavBar />
	</div>
</div>

<style lang="scss">
	.app {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.limiter {
		width: 100%;
		max-width: 600px;
		position: relative;
	}
</style>
