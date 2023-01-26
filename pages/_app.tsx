import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/GlobalStyle';
import theme from '../styles/theme';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const route = useRouter();

  useEffect(() => {
    if (route.pathname === '/') {
      route.push('/Main');
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
