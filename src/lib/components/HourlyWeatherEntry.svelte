<script lang="ts">
	import ArrowIcon from '$lib/icons/ArrowIcon.svelte';
	import RainIcon from '$lib/icons/RainIcon.svelte';
	import SnowIcon from '$lib/icons/SnowIcon.svelte';
	import SunIcon from '$lib/icons/SunIcon.svelte';
	import { findWeatherType } from '$lib/utils/WeatherCodeHelper';
	import type { WeatherEntryType } from '$lib/utils/WeatherHandler';
	import ForecastCard from './ForecastCard.svelte';
	export let data: WeatherEntryType;

	$: icon = findIcon(data.weatherCode);
	function findIcon(code: number) {
		const type = findWeatherType(code);

		if (type === 'sun') {
			return SunIcon;
		} else if (type === 'rain') {
			return RainIcon;
		} else if (type === 'snow') {
			return SnowIcon;
		}
	}
</script>

<div class="container">
	<div class="left">
		<div>{data.time.toLocaleTimeString('dk-DK', { hour: 'numeric' })}</div>
		<div class="icon">
			<svelte:component this={icon}></svelte:component>
			{data.precipitation.toPrecision(2)}
		</div>
		<div class="temp">{data.temperature2m.toPrecision(1)}°</div>
	</div>
	<div class="right">
		<div class="icon" style={`transform: rotateZ(${data.windDirection10m.toPrecision(1)}deg)`}>
			<ArrowIcon />
		</div>
		{data.windSpeed10m.toPrecision(1)}ms
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		justify-content: space-between;
		height: 80px;
		border-top: 2px solid var(--color-text);
	}
	.left {
		display: flex;
		gap: 50px;
		align-items: center;

		// background-color:;
	}
	.right {
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		align-items: center;
	}
	.icon {
		width: 24px;
		transform-origin: center;
	}
	.time {
	}
	.temp {
		text-align: right;
		width: 50px;
	}
</style>
