import { FC } from 'react';
import type { AppProps } from 'next/app';

import 'antd/dist/antd.css';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
