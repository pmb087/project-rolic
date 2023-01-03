import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { SWRConfig } from 'swr';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/GlobalStyle';
import theme from '../styles/theme';
import client from '../utils/CustomAxios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const route = useRouter();

  useEffect(() => {
    if (route.pathname === '/') {
      route.push('/Main');
    }
  }, []);

  return (
    <RecoilRoot>
      <SWRConfig
        value={{
          refreshInterval: 5000,
          fetcher: (url: string) => client.get(url).then((res) => res.data)
        }}
      >
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </SWRConfig>
    </RecoilRoot>
  );
}

export default MyApp;
