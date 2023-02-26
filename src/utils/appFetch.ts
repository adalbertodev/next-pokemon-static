export async function appFetch<T>(url: string): Promise<T>;
export async function appFetch<T>(url: string, nullable: boolean): Promise<T | null>;

export async function appFetch<T>(url: string, nullable?: boolean): Promise<T | null> {
	const response = await fetch(url);

	if (nullable && response.status !== 200) {
		return null;
	}

	return (await response.json()) as T;
}

// export const appFetch = async <T>(url: string, nullable?: boolean): Promise<T | null> => {
// 	const response = await fetch(url);

// 	if (nullable && response.status !== 200) {
// 		return null;
// 	}

// 	return (await response.json()) as T;
// };
