// Reexport your entry components here

// Types
export type {
	EarthquakeDetail,
	EarthquakeData,
	EarthquakeResponse,
	ApiResponse,
} from './types/earthquake.js';

// Services
export { fetchApi } from './services/api.js';

// Components
export { default as EarthquakeCard } from './components/EarthquakeCard.svelte';
export { default as EarthquakeLoader } from './components/EarthquakeLoader.svelte';
