import { render, screen } from "@testing-library/react";

import { Home } from "@/components/ui";

test("Home component display next.js logo", () => {
	render(<Home />);

	const heading = screen.getByRole("img", { name: /Next.js Logo/i });

	expect(heading).toBeInTheDocument();
});
