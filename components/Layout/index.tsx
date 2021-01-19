import { FC, PropsWithChildren } from 'react';
import { Wrapper, Header, Title, Subtitle, Content, Footer } from './styles';

interface IProps {
  expandedHeader?: boolean;
}

const Layout: FC<PropsWithChildren<IProps>> = ({ expandedHeader = false, children }) => {
  return (
    <Wrapper>
      <Header expanded={expandedHeader}>
        <Title>Youtube Engage</Title>
        <Subtitle>Make a calendar schedule from Youtube playlists</Subtitle>
      </Header>
      <Content>{children}</Content>
      <Footer>All right reserved Github link</Footer>
    </Wrapper>
  );
};

export default Layout;
