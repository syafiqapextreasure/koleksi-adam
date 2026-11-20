import { Html, Head, Main, NextScript } from "next/document";
export default function Document(props) {
  return (
    <Html lang={props.__NEXT_DATA__?.props?.pageProps?.bm ? "ms-MY" : "en-MY"}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

