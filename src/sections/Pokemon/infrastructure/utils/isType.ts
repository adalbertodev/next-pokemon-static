import { Type, TypeValues } from "../../domain";

export const isType = (type: string): type is Type => {
	return TypeValues.includes(type as Type);
};
