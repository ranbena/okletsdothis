import styled from 'styled-components';

export const Wrapper = styled.ul`
  padding: 0;
  margin: 0;
`;

export const Event = styled.li`
  display: flex;
  flex-direction: column;
  list-style: none;
`;

export const Title = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
`;
