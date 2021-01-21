import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-areas:
    'count title'
    '..... content';
  grid-template-columns: auto auto;
  grid-column-gap: 10px;
`;

export const Count = styled.h2`
  grid-area: count;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 0;
`;

export const Title = styled.h2`
  grid-area: title;
  font-size: 30px;
  margin-bottom: 0;
`;

export const Content = styled.div`
  grid-area: content;
  margin-top: 20px;
`;
