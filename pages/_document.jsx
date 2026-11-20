import { Html, Head, Main, NextScript } from "next/document";
export default function Document(props) {
  return (
    <Html lang={props.__NEXT_DATA__?.props?.pageProps?.bm ? "ms-MY" : "en-MY"}>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48 64x64" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

