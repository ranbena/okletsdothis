import { FC } from 'react';
import type { AppProps } from 'next/app';

import { AuthProvider } from 'src/services/auth';

import GlobalStyle from 'src/styles/global';
import 'antd/dist/antd.css';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default MyApp;
