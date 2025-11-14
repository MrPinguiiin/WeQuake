// Earthquake data types with full type safety
export interface EarthquakeDetail {
	Tanggal: string;
	Jam: string;
	DateTime: string;
	Coordinates: string;
	Lintang: string;
	Bujur: string;
	Magnitude: string;
	Kedalaman: string;
	Wilayah: string;
	Potensi: string;
	Dirasakan: string;
	Shakemap: string;
}

export interface EarthquakeData {
	gempa: EarthquakeDetail;
}

export interface EarthquakeResponse {
	Infogempa: EarthquakeData;
}

// Generic API response type
export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	error?: string;
}
