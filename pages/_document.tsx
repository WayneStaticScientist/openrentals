import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="https://fonts.googleapis.com/css?family=Nunito:300,400,600,700,800&amp;display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800&amp;display=swap" rel="stylesheet" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
        <Script src="scripts/jquery-3.3.1.min.js"></Script>
        <Script src="scripts/bootstrap.min.js"></Script>
        <Script src="scripts/chosen.min.js"></Script>
        <Script src="scripts/magnific-popup.min.js"></Script>
        <Script src="scripts/owl.carousel.min.js"></Script>
        <Script src="scripts/rangeSlider.js"></Script>
        <Script src="scripts/sticky-kit.min.js"></Script>
        <Script src="scripts/slick.min.js"></Script>
        <Script src="scripts/mmenu.min.js"></Script>
        <Script src="scripts/tooltips.min.js"></Script>
        <Script src="scripts/masonry.min.js"></Script>
        <Script src="scripts/custom_jquery.js"></Script>
      </body>
    </Html>
  );
}
