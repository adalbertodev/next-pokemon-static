import { appFetch } from "@/utils";

import { PokeApiName } from "../PokeApi";

export const translateName = async (url: string, language: string): Promise<string | undefined> => {
	const { names } = await appFetch<{ names: PokeApiName[] }>(url);

	return names.find((name) => name.language.name === language)?.name;
};
