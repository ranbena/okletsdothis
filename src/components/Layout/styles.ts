import styled from 'styled-components';
import { ForwardOutlined, GithubOutlined } from '@ant-design/icons';
import { ColoredIcon } from 'src/styles/common';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.text};
`;

export const Header = styled.div`
  height: 94px;
  display: flex;
  align-items: center;
  padding: 0 50px;

  nav {
    flex: 1;

    a {
      margin-left: 40px;
      font-size: 15px;
    }
  }
`;

export const Heading = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-family: Carter One;
  font-size: 24px;
  margin-bottom: 0;
`;

export const Logo = styled(ForwardOutlined)`
  margin-right: 3px;
`;

export const GithubIcon = styled(GithubOutlined)`
  font-size: 25px;
`;

export const Content = styled.div`
  flex: 1;
  padding: 62px 20px;
`;

export const ContentInner = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
`;

export const Footer = styled.div`
  height: 100px;
  background-color: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.light};
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    color: ${({ theme }) => theme.colors.bg};

    &:hover {
      color: ${({ theme }) => theme.colors.light};
      text-decoration: underline;
    }
  }
`;
