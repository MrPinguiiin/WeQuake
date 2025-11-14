import type { PageServerLoad } from './$types.js';
import type { EarthquakeResponse } from '$lib/types/earthquake.js';
import { fetchApi } from '$lib/services/api.js';
import { API_URL } from '$env/static/private';

export const load: PageServerLoad = async () => {
	const response = await fetchApi<EarthquakeResponse>(API_URL);

	if (response.success && response.data) {
		return {
			earthquakeData: response.data,
			error: null,
		};
	}

	return {
		earthquakeData: null,
		error: response.error || 'Gagal memuat data gempa',
	};
};
