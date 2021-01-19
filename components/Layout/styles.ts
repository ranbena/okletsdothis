import styled from 'styled-components';
import { ForwardOutlined } from '@ant-design/icons';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Header = styled.div`
  height: 94px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;

  nav a {
    margin-left: 10px;
  }
`;

export const Heading = styled.h1`
  font-family: Carter One;
  font-size: 24px;
  margin-bottom: 0;
`;

export const Logo = styled(ForwardOutlined)`
  margin-right: 3px;
`;

export const Content = styled.div`
  flex: 1;
`;

export const Footer = styled.div`
  height: 100px;
  background: black;
  color: white;
  display: flex;
  align-items: center;
  justify-items: center;
`;
