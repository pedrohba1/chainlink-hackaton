import Head from 'next/head';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from 'styled-components';
import { QueryClientProvider } from 'react-query';
import queryClient from '@api/queryClient';
import MainLayout from '@layouts/MainLayout';

import GlobalStyle from '@styles/global';
import theme from '../theme';

function MyApp({ Component, pageProps }) {
  const BuildLayout = () => {
    return (
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    );
  };

  return (
    <>
      <Head>
        <title>Dashboard Thermofisher</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,800;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>

      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
            <BuildLayout />
          </SnackbarProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
