import { FC } from 'react';

import { Wrapper, Header, Heading, Logo, Content, Footer } from './styles';

const Layout: FC = ({ children }) => {
  return (
    <Wrapper>
      <Header>
        <Heading>
          <Logo />
          OK LET'S DO THIS!
        </Heading>
        <nav>
          <a href="whatever">What is it</a>
          <a href="whatever">How it works</a>
        </nav>
      </Header>
      <Content>{children}</Content>
      <Footer>All right reserved Github link</Footer>
    </Wrapper>
  );
};

export default Layout;
