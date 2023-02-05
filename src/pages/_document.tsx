import { CssBaseline } from "@nextui-org/react";
import { NextPageContext } from "next";
import Document, {
	DocumentContext,
	DocumentInitialProps,
	Head,
	Html,
	Main,
	NextScript,
} from "next/document";
import React, { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal } from "react";

interface Props extends NextPageContext {
	styles?: (
		| string
		| number
		| ReactElement<unknown, string | JSXElementConstructor<unknown>>
		| ReactFragment
		| ReactPortal
	)[];
}

class MyDocument extends Document<Props> {
	static async getInitialProps(context: DocumentContext): Promise<DocumentInitialProps> {
		const initialProps = await Document.getInitialProps(context);

		return {
			...initialProps,
			styles: React.Children.toArray([initialProps.styles]),
		};
	}

	render() {
		return (
			<Html lang="es">
				<Head>{CssBaseline.flush()}</Head>

				<body>
					<Main />

					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
