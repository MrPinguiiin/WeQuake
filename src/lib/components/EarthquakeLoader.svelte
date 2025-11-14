<script lang="ts">
	import { AlertCircle, Loader } from '@lucide/svelte';

	interface Props {
		isLoading?: boolean;
		error?: string | null;
	}

	let { isLoading = false, error = null }: Props = $props();
</script>

{#if isLoading}
	<div class="flex h-96 items-center justify-center">
		<div class="text-center">
			<Loader class="mx-auto h-12 w-12 animate-spin text-blue-600" />
			<p class="mt-4 text-lg font-semibold text-gray-700">Memuat data gempa...</p>
		</div>
	</div>
{:else if error}
	<div
		class="rounded-lg border border-red-200 bg-red-50 p-6 flex items-center gap-4"
		role="alert"
	>
		<AlertCircle class="h-8 w-8 flex-shrink-0 text-red-600" />
		<div>
			<h3 class="font-semibold text-red-900">Error Memuat Data</h3>
			<p class="mt-1 text-sm text-red-700">{error}</p>
		</div>
	</div>
{/if}
