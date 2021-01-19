import { FC } from 'react';

import { Wrapper, Header, Heading, Logo, Content, Footer, GithubIcon } from './styles';

const Layout: FC = ({ children }) => {
  return (
    <Wrapper>
      <Header>
        <Heading>
          <Logo />
          OK LET'S DO THIS!
        </Heading>
        <nav>
          <a href="#what">What is it</a>
          <a href="#how">How it works</a>
        </nav>
        <a href="https://github.com/ranbena/okletsdothis" target="_blank">
          <GithubIcon />
        </a>
      </Header>
      <Content>{children}</Content>
      <Footer>All right reserved Github link</Footer>
    </Wrapper>
  );
};

export default Layout;
