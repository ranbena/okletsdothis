import { FC } from 'react';
import type { AppProps } from 'next/app';

import { ScheduleProvider } from 'src/contexts/schedule';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from 'src/styles/global';
import theme from 'src/styles/theme';
import 'antd/dist/antd.css';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ScheduleProvider>
        <Component {...pageProps} />
      </ScheduleProvider>
    </ThemeProvider>
  );
};

export default MyApp;
