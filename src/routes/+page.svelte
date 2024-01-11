<script lang="ts">
	import HourlyWeatherEntry from '$lib/components/HourlyWeatherEntry.svelte';
	import { hourlyWeatherStore } from '$lib/utils/WeatherHandler';
	// the API also has a current day call which could be used instead to save on data cost
	$: current =
		$hourlyWeatherStore && $hourlyWeatherStore.find((e) => e.time.getTime() > Date.now());
</script>

<div class="top">
	<h1>Current weather</h1>
	<div>Rosenkrantzgade 19B, 8000 Aarhus C</div>
</div>
<div class="container">
	{#if current}
		<div class="time">
			{current.time.toLocaleDateString('dk-DK', {
				weekday: 'long',
				month: 'short',
				day: 'numeric'
			})}
		</div>
		<HourlyWeatherEntry data={current} />
	{:else}
		<div>No weather data currently</div>
	{/if}
</div>

<style lang="scss">
	.top {
		padding: var(--grid-margin);
		position: fixed;
		top: 0;
		left: 0;
		background-color: var(--color-bg-1);
		width: 100%;
		border-bottom: 1px solid var(--color-text);
		z-index: 1;
	}
	.container {
		margin: 120px var(--grid-margin);
		background-color: var(--color-bg-1);
		border-radius: 10px;
		padding: 16px;
	}
	.time {
		margin-top: 16px;
		height: 35px;
		font-size: 20px;
		font-weight: 700;
		text-transform: capitalize;
	}
</style>
