import React, { FC } from 'react';
import Link from 'next/link';
import { useTheme } from 'styled-components';

import {
  Wrapper,
  Header,
  Heading,
  Logo,
  Content,
  ContentInner,
  Footer,
  GithubIcon,
} from './styles';
import { ColoredIcon } from 'src/styles/common';

const Layout: FC = ({ children }) => {
  const theme = useTheme();

  return (
    <Wrapper>
      <Header>
        <Link href="/" passHref>
          <Heading>
            <Logo />
            OK LET'S DO THIS!
          </Heading>
        </Link>
        <nav>
          <a href="#what">What is it</a>
          <a href="#how">How it works</a>
        </nav>
        <a href="https://github.com/ranbena/okletsdothis" target="_blank">
          <GithubIcon />
        </a>
      </Header>
      <Content>
        <ContentInner>{children}</ContentInner>
      </Content>
      <Footer>
        Made with&nbsp;
        <ColoredIcon color={theme.colors.bg}>💓</ColoredIcon>
        &nbsp; by&nbsp;<a href="https://github.com/ranbena">Ran Byron</a>
      </Footer>
    </Wrapper>
  );
};

export default Layout;
