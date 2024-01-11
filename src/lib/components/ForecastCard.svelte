<script lang="ts">
	import type { WeatherEntryType } from '$lib/utils/WeatherHandler';
	import HourlyWeatherEntry from './HourlyWeatherEntry.svelte';
	export let data: WeatherEntryType[];
</script>

<div>
	{#each data as entry}
		<HourlyWeatherEntry data={entry}></HourlyWeatherEntry>
	{/each}
</div>
