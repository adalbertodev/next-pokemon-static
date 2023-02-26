import "@/assets/styles/index.css";

import { NextUIProvider } from "@nextui-org/react";
import type { AppProps } from "next/app";

import { darkTheme } from "@/assets/themes";
import { RepositoriesProvider } from "@/context/RepositoriesContext";

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<NextUIProvider theme={darkTheme}>
			<RepositoriesProvider>
				<Component {...pageProps} />
			</RepositoriesProvider>
		</NextUIProvider>
	);
};

export default App;
