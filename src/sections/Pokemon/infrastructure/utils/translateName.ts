import { appFetch } from "@/utils";

import { PokeApiName } from "../PokeApi";

export async function translateName(url: string, language: string): Promise<string | undefined>;
export async function translateName(
	names: PokeApiName[],
	language: string
): Promise<string | undefined>;

export async function translateName(
	urlOrNames: unknown,
	language: string
): Promise<string | undefined> {
	let names: PokeApiName[] | undefined = undefined;

	if (typeof urlOrNames === "string") {
		const response = await appFetch<{ names: PokeApiName[] }>(urlOrNames);

		names = response.names;
	}

	names = names === undefined ? (urlOrNames as PokeApiName[]) : names;

	return (
		names.find((name) => name.language.name === language)?.name ??
		names.find((name) => name.language.name === "en")?.name
	);
}
