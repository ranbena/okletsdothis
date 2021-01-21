import styled, { css } from 'styled-components';
import Skeleton from 'react-loading-skeleton';

export const Title = styled.h2`
  font-size: 30px;
  line-height: 32px;

  small {
    font-weight: 300;
    display: inline-block;
  }
`;

const imageAttrs = {
  width: 278,
  height: 156,
};
const imageStyle = css`
  margin-right: 20px;
`;

export const Image = styled.img.attrs(imageAttrs)`
  ${imageStyle}
`;

export const SkeletonImage = styled(Skeleton).attrs(imageAttrs)`
  ${imageStyle}
`;

export const Content = styled.div`
  display: flex;
`;

export const Text = styled.div`
  position: relative;
  flex: 1;
`;

export const List = styled.ol`
  list-style: decimal;
  list-style-position: inside;
  padding-left: 0;
  margin: 0;
  overflow: scroll;
  position: absolute;
  top: 30px;
  bottom: 0;
  right: 0;
  left: 0;
`;

export const ListItem = styled.li`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
