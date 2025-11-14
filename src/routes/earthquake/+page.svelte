<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import type { EarthquakeResponse } from '$lib/types/earthquake.js';
	import { fetchApi } from '$lib/services/api.js';
	import EarthquakeCard from '$lib/components/EarthquakeCard.svelte';
	import EarthquakeLoader from '$lib/components/EarthquakeLoader.svelte';

	const API_URL = 'https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json';

	// Reactive state using Svelte 5 runes
	let isLoading = $state(true);
	let error = $state<string | null>(null);
	let earthquakeData = $state<EarthquakeResponse | null>(null);
	let lastUpdated = $state<Date | null>(null);

	/**
	 * Fetch earthquake data from BMKG API
	 * Using generic type for type-safe API calls
	 */
	const loadEarthquakeData = async (): Promise<void> => {
		isLoading = true;
		error = null;

		const response = await fetchApi<EarthquakeResponse>(API_URL);

		if (response.success && response.data) {
			earthquakeData = response.data;
			lastUpdated = new Date();
		} else {
			error = response.error || 'Gagal memuat data gempa';
		}

		isLoading = false;
	};

	// Load data on component mount
	if (browser) {
		onMount(() => {
			loadEarthquakeData();

			// Optional: Refresh data every 5 minutes
			const interval = setInterval(loadEarthquakeData, 5 * 60 * 1000);
			return () => clearInterval(interval);
		});
	}

	// Format last updated time
	const formatLastUpdated = (date: Date | null): string => {
		if (!date) return '';
		return new Intl.DateTimeFormat('id-ID', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		}).format(date);
	};
</script>

<svelte:head>
	<title>Gempa Bumi - WeQuake</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
	<div class="mx-auto max-w-4xl">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-4xl font-bold text-gray-900">WeQuake</h1>
			<p class="mt-2 text-lg text-gray-700">Informasi Gempa Bumi Terkini Indonesia</p>
			<p class="mt-1 text-sm text-gray-600">Data dari BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)</p>
		</div>

		<!-- Loading and Error States -->
		<EarthquakeLoader {isLoading} {error} />

		<!-- Earthquake Data Display -->
		{#if !isLoading && !error && earthquakeData}
			<div class="space-y-6">
				<!-- Last Updated -->
				<div class="rounded-lg bg-white p-4 text-center shadow">
					<p class="text-sm text-gray-600">Pembaruan terakhir</p>
					<p class="font-semibold text-gray-900">{formatLastUpdated(lastUpdated)}</p>
				</div>

				<!-- Earthquake Card -->
				<EarthquakeCard earthquake={earthquakeData.Infogempa.gempa} />

				<!-- Refresh Button -->
				<button
					onclick={loadEarthquakeData}
					disabled={isLoading}
					class="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
				>
					{isLoading ? 'Memuat...' : 'Perbarui Data'}
				</button>
			</div>
		{/if}
	</div>
</div>

<style>
	:global(body) {
		font-family: system-ui, -apple-system, sans-serif;
	}
</style>
