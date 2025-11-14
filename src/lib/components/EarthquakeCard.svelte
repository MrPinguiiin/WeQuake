<script lang="ts">
	import type { EarthquakeDetail } from '$lib/types/earthquake.js';
	import { Calendar, Clock, MapPin, Zap, AlertCircle, Wind } from '@lucide/svelte';
    
	interface Props {
		earthquake: EarthquakeDetail;
	}

	let { earthquake }: Props = $props();

	// Helper function to determine severity color
	const getMagnitudeColor = (magnitude: string): string => {
		const mag = parseFloat(magnitude);
		if (mag >= 7) return 'text-red-600';
		if (mag >= 5) return 'text-orange-600';
		if (mag >= 3) return 'text-yellow-600';
		return 'text-green-600';
	};

	// Helper function to determine severity background
	const getMagnitudeBgColor = (magnitude: string): string => {
		const mag = parseFloat(magnitude);
		if (mag >= 7) return 'bg-red-100';
		if (mag >= 5) return 'bg-orange-100';
		if (mag >= 3) return 'bg-yellow-100';
		return 'bg-green-100';
	};
</script>

<div class="rounded-lg border border-gray-200 bg-white p-6 shadow-lg hover:shadow-xl transition-shadow">
	<!-- Header with Magnitude -->
	<div class="mb-6 flex items-start justify-between">
		<div>
			<h2 class="text-2xl font-bold text-gray-900">Gempa Bumi</h2>
			<p class="mt-1 text-sm text-gray-600">{earthquake.Tanggal}</p>
		</div>
		<div class={`rounded-lg ${getMagnitudeBgColor(earthquake.Magnitude)} p-3`}>
			<p class={`text-3xl font-bold ${getMagnitudeColor(earthquake.Magnitude)}`}>
				{earthquake.Magnitude}
			</p>
			<p class="text-xs font-semibold text-gray-700">SR</p>
		</div>
	</div>

	<!-- Grid of information -->
	<div class="space-y-4">
		<!-- Waktu -->
		<div class="flex items-center gap-3 border-b pb-3">
			<Clock class="h-5 w-5 text-blue-600" />
			<div>
				<p class="text-sm text-gray-600">Waktu</p>
				<p class="font-semibold text-gray-900">{earthquake.Jam}</p>
			</div>
		</div>

		<!-- Koordinat dan Kedalaman -->
		<div class="grid grid-cols-2 gap-4 border-b pb-3">
			<div class="flex items-start gap-3">
				<MapPin class="h-5 w-5 text-green-600 mt-1" />
				<div>
					<p class="text-sm text-gray-600">Lintang</p>
					<p class="font-semibold text-gray-900">{earthquake.Lintang}</p>
				</div>
			</div>
			<div class="flex items-start gap-3">
				<Zap class="h-5 w-5 text-yellow-600 mt-1" />
				<div>
					<p class="text-sm text-gray-600">Bujur</p>
					<p class="font-semibold text-gray-900">{earthquake.Bujur}</p>
				</div>
			</div>
		</div>

		<!-- Kedalaman -->
		<div class="flex items-center gap-3 border-b pb-3">
			<Wind class="h-5 w-5 text-purple-600" />
			<div>
				<p class="text-sm text-gray-600">Kedalaman</p>
				<p class="font-semibold text-gray-900">{earthquake.Kedalaman}</p>
			</div>
		</div>

		<!-- Wilayah -->
		<div class="space-y-2 border-b pb-3">
			<div class="flex items-center gap-2">
				<Calendar class="h-5 w-5 text-indigo-600" />
				<p class="text-sm text-gray-600">Pusat Gempa</p>
			</div>
			<p class="ml-7 font-semibold text-gray-900">{earthquake.Wilayah}</p>
		</div>

		<!-- Potensi -->
		<div class="space-y-2 border-b pb-3">
			<div class="flex items-center gap-2">
				<AlertCircle class="h-5 w-5 text-red-600" />
				<p class="text-sm text-gray-600">Potensi</p>
			</div>
			<p class="ml-7 font-semibold text-gray-900">{earthquake.Potensi}</p>
		</div>

		<!-- Dirasakan -->
		<div class="space-y-2">
			<p class="text-sm font-semibold text-gray-900">Area yang Dirasakan</p>
			<p class="rounded bg-gray-100 p-3 text-sm text-gray-700">{earthquake.Dirasakan}</p>
		</div>

		<!-- Shakemap -->
		{#if earthquake.Shakemap}
			<div class="space-y-2">
				<p class="text-sm font-semibold text-gray-900">Shakemap</p>
				<img
					src={`https://data.bmkg.go.id/DataMKG/TEWS/${earthquake.Shakemap}`}
					alt="Shakemap"
					class="h-auto w-full rounded border border-gray-200"
				/>
			</div>
		{/if}
	</div>
</div>
