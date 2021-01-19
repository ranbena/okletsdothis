import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Header = styled.div<{ expanded?: boolean }>`
  height: ${(p) => (p.expanded ? 200 : 100)}px;
  text-align: center;
  padding: 30px 0;
`;

export const Title = styled.h1`
  font-size: 50px;
  margin-bottom: 0;
`;

export const Subtitle = styled.h2`
  font-weight: normal;
  font-size: 20px;
  color: #999;
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
