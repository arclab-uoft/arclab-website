import 'katex/dist/katex.min.css';
import 'nextra-theme-docs/style.css';
import './styles.css';

import { AppProps } from 'next/app';
import { BibProvider } from '@/contexts/BibContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BibProvider>
      <Component {...pageProps} />
    </BibProvider>
  );
}