<script lang="ts">
	import type { PageData } from './$types.js';
	import EarthquakeCard from '$lib/components/EarthquakeCard.svelte';
	import { formatLastUpdated } from '@/lib/helper/function/fomat-date.ts';

	let { data }: { data: PageData } = $props();


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
		{#if data.error}
			<div class="rounded-lg border border-red-200 bg-red-50 p-6 flex items-center gap-4" role="alert">
				<span class="h-8 w-8 flex-shrink-0 text-2xl">🚨</span>
				<div>
					<h3 class="font-semibold text-red-900">Error Memuat Data</h3>
					<p class="mt-1 text-sm text-red-700">{data.error}</p>
				</div>
			</div>
		{:else if data.earthquakeData}
			<div class="space-y-6">
				<!-- Last Updated -->
				<div class="rounded-lg bg-white p-4 text-center shadow">
					<p class="text-sm text-gray-600">Pembaruan terakhir</p>
					<p class="font-semibold text-gray-900">{formatLastUpdated(new Date())}</p>
				</div>

				<!-- Earthquake Card -->
				<EarthquakeCard earthquake={data.earthquakeData.Infogempa.gempa} />

				<!-- Refresh Button -->
				<button
					disabled={false}
					class="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
				>
					Perbarui Data
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
