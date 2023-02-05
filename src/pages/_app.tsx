import "@/assets/styles/index.css";

import { NextUIProvider } from "@nextui-org/react";
import type { AppProps } from "next/app";

import { darkTheme } from "@/assets/themes";

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<NextUIProvider theme={darkTheme}>
			<Component {...pageProps} />
		</NextUIProvider>
	);
};

export default App;
