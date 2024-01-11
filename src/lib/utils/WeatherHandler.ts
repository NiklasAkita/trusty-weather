import { fetchWeatherApi } from 'openmeteo';
import { writable } from 'svelte/store';

export const hourlyWeatherStore = writable<WeatherEntryType[]>();

type WeatherDataType = {
	hourly: {
		time: Date[];
		temperature2m: Float32Array;
		precipitation: Float32Array;
		weatherCode: Float32Array;
		windSpeed10m: Float32Array;
		windDirection10m: Float32Array;
	};
};

export type WeatherEntryType = {
	time: Date;
	temperature2m: number;
	precipitation: number;
	weatherCode: number;
	windSpeed10m: number;
	windDirection10m: number;
};

// this class is based on open meteo TS scripts
// https://open-meteo.com/en/docs#latitude=56.1567&longitude=10.2108&current=&hourly=temperature_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m&timezone=Europe%2FBerlin

export class WeatherHandler {
	private params = {
		latitude: 56.1567,
		longitude: 10.2108,
		hourly: [
			'temperature_2m',
			'precipitation',
			'weather_code',
			'wind_speed_10m',
			'wind_direction_10m'
		],
		timezone: 'Europe/Berlin',
		wind_speed_unit: 'ms'
	};
	private url = 'https://api.open-meteo.com/v1/forecast';

	constructor() {}

	// could allow input to change coords, in case other locations should be added.
	public async updateWeatherData() {
		const responses = await fetchWeatherApi(this.url, this.params);

		// Process first location. Add a for-loop for multiple locations or weather models
		const response = responses[0];

		// Attributes for timezone and location
		const utcOffsetSeconds = response.utcOffsetSeconds();
		const timezone = response.timezone();
		const timezoneAbbreviation = response.timezoneAbbreviation();
		const latitude = response.latitude();
		const longitude = response.longitude();

		const hourly = response.hourly()!;

		// Note: The order of weather variables in the URL query and the indices below need to match!
		const weatherData: WeatherDataType = {
			hourly: {
				time: this.range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
					(t) => new Date((t + utcOffsetSeconds) * 1000)
				),
				temperature2m: hourly.variables(0)!.valuesArray()!,
				precipitation: hourly.variables(1)!.valuesArray()!,
				weatherCode: hourly.variables(2)!.valuesArray()!,
				windSpeed10m: hourly.variables(3)!.valuesArray()!,
				windDirection10m: hourly.variables(4)!.valuesArray()!
			}
		};

		// weatherStore.set(weatherData);
		let cleanWeatherData: WeatherEntryType[] = [];
		// `weatherData` now contains a simple structure with arrays for datetime and weather data
		for (let i = 0; i < weatherData.hourly.time.length; i++) {
			const entry: WeatherEntryType = {
				time: weatherData.hourly.time[i],
				temperature2m: weatherData.hourly.temperature2m[i],
				precipitation: weatherData.hourly.precipitation[i],
				weatherCode: weatherData.hourly.weatherCode[i],
				windSpeed10m: weatherData.hourly.windSpeed10m[i],
				windDirection10m: weatherData.hourly.windDirection10m[i]
			};
			cleanWeatherData.push(entry);

			console.log(
				weatherData.hourly.time[i].toISOString(),
				weatherData.hourly.temperature2m[i],
				weatherData.hourly.precipitation[i],
				weatherData.hourly.weatherCode[i],
				weatherData.hourly.windSpeed10m[i],
				weatherData.hourly.windDirection10m[i]
			);
		}
		hourlyWeatherStore.set(cleanWeatherData);
	}

	// Helper function to form time ranges
	private range(start: number, stop: number, step: number) {
		return Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
	}
}
