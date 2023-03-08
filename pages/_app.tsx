/* eslint-disable react/jsx-props-no-spreading */

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'styles/GlobalStyle';
import theme from 'styles/theme';

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
