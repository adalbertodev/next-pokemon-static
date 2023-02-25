import { render, screen } from "@testing-library/react";

import { Navbar } from "@/components/ui/organisms/Navbar";
import { config } from "@/config";

test("Home component display next.js logo", () => {
	render(<Navbar />);

	const heading = screen.getByRole("heading", { name: new RegExp(`${config.pageName}`) });

	expect(heading).toBeInTheDocument();
});
