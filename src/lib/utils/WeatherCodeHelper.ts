// https://open-meteo.com/en/docs#latitude=56.1567&longitude=10.2108&current=&hourly=temperature_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m&timezone=Europe%2FBerlin
// Code	Description
// 0	Clear sky
// 1, 2, 3	Mainly clear, partly cloudy, and overcast
// 45, 48	Fog and depositing rime fog
// 51, 53, 55	Drizzle: Light, moderate, and dense intensity
// 56, 57	Freezing Drizzle: Light and dense intensity
// 61, 63, 65	Rain: Slight, moderate and heavy intensity
// 66, 67	Freezing Rain: Light and heavy intensity
// 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
// 77	Snow grains
// 80, 81, 82	Rain showers: Slight, moderate, and violent
// 85, 86	Snow showers slight and heavy
// 95 *	Thunderstorm: Slight or moderate
// 96, 99 *	Thunderstorm with slight and heavy hail

import type RainIcon from '$lib/icons/RainIcon.svelte';

export type weatherType = 'sun' | 'rain' | 'snow';

export function findWeatherType(code: number): weatherType {
	switch (code) {
		case 51 || 53 || 55 || 56 || 57 || 61 || 63 || 65 || 66 || 67 || 80 || 81 || 82:
			return 'rain';
		case 71 || 73 || 75 || 77 || 85 || 86:
			return 'snow';
		default:
			return 'sun';
	}
}
