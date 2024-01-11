<script lang="ts">
	import { hourlyWeatherStore } from '$lib/utils/WeatherHandler';
</script>

<h1>Current weather</h1>

{#if $hourlyWeatherStore}
	<div>time: {$hourlyWeatherStore[0].time}</div>
	<div>temp: {$hourlyWeatherStore[0].temperature2m}</div>
	<div>code: {$hourlyWeatherStore[0].weatherCode}</div>
	<div>nedbør: {$hourlyWeatherStore[0].precipitation}</div>
	<div>windspeed: {$hourlyWeatherStore[0].windSpeed10m}</div>
	<div>winddir: {$hourlyWeatherStore[0].windDirection10m}</div>
{:else}
	<div>No weather data currently</div>
{/if}
