export const decimalToFraction = (decimal: number): string => {
	let fraction = "";

	let numerator = 1;
	let denominator = 1;
	let fractionResult = numerator / denominator;

	while (fractionResult !== decimal) {
		fractionResult = numerator / denominator;

		if (fractionResult === decimal) {
			fraction = `${numerator}/${denominator}`;
			break;
		}

		if (fractionResult < decimal) {
			numerator++;
			continue;
		}

		numerator--;
		denominator++;
	}

	return fraction;
};
