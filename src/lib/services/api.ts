import type { ApiResponse } from '../types/earthquake.js';

/**
 * Generic fetch function with type safety
 * @template T - The expected response type
 * @param url - API endpoint URL
 * @returns Promise with typed response
 */
export async function fetchApi<T>(url: string): Promise<ApiResponse<T>> {
	try {
		const response = await fetch(url);

		if (!response.ok) {
			return {
				success: false,
				error: `HTTP Error: ${response.status}`,
			};
		}

		const data: T = await response.json();

		return {
			success: true,
			data,
		};
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

		return {
			success: false,
			error: errorMessage,
		};
	}
}
