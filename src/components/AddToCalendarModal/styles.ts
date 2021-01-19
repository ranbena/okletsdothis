import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
`;

export const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const ListItem = styled.li`
  padding: 0;
  margin: 0;
  cursor: pointer;
  line-height: 40px;

  &:hover {
    background-color: lightgray;
  }
`;
