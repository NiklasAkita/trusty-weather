<script lang="ts">
	import ForecastCard from '$lib/components/ForecastCard.svelte';
	import { hourlyWeatherStore } from '$lib/utils/WeatherHandler';
	import type { WeatherEntryType } from '$lib/utils/WeatherHandler';

	$: organizedData = organizeByDay($hourlyWeatherStore);
	// adapted from chatgpt
	function organizeByDay(data: WeatherEntryType[]): WeatherEntryType[][] {
		if (!data) return [];

		// Create a map to store data grouped by day
		const dataByDayMap = new Map<string, WeatherEntryType[]>();

		// Iterate through the input array
		for (const entry of data) {
			// Get the date string in 'YYYY-MM-DD' format
			const dateString = entry.time.toISOString().split('T')[0];

			// If the date key doesn't exist in the map, create a new array for that day
			if (!dataByDayMap.has(dateString)) {
				dataByDayMap.set(dateString, []);
			}

			// Push the current entry to the corresponding day's array
			dataByDayMap.get(dateString)!.push(entry);
		}

		// Convert the map values to an array of arrays
		const organizedData = Array.from(dataByDayMap.values());

		return organizedData;
	}
</script>

<div class="top">
	<h1>7 day forecast</h1>
	<div>Rosenkrantzgade 19B, 8000 Aarhus C</div>
</div>
<div class="list-container">
	{#each organizedData as entry}
		<div class="entry">
			<div class="time">
				{entry[0].time.toLocaleDateString('dk-DK', {
					weekday: 'long',
					month: 'short',
					day: 'numeric'
				})}
			</div>
			<ForecastCard data={entry} />
		</div>
	{/each}
</div>

<style lang="scss">
	.list-container {
		margin: 120px var(--grid-margin);
		display: flex;
		flex-direction: column;
		gap: 60px;
	}
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
	.entry {
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
