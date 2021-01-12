import { FC } from 'react';
import type { AppProps } from 'next/app';

import { GlobalStyle } from 'styles/global';
import 'antd/dist/antd.css';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
