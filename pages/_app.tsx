import 'katex/dist/katex.min.css';
import 'nextra-theme-docs/style.css';
import './styles.css';

import { AppProps } from 'next/app';
import { BibProvider } from '@/contexts/BibContext';
import Script from 'next/script';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-HW5TTHYY04"
        strategy="afterInteractive"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-HW5TTHYY04');
        `}
      </Script>

      <BibProvider>
        <Component {...pageProps} />
      </BibProvider>
    </>
  );
}