import styled, { keyframes, css } from 'styled-components';
import { Popover as AntPopover } from 'antd';

const transformIn = css`
  transform: scale(1) rotateX(0.2deg) rotateY(-0.8deg);
`;
const transformOut = css`
  transform: scale(0.8) rotateX(0.2deg) rotateY(-0.8deg);
`;

const antZoomBigIn = keyframes`
  from {
    opacity: 0;
     ${transformOut}
  }
  to {
    opacity: 1;
    ${transformIn}
  }
`;

const antZoomBigOut = keyframes`
  from {
    opacity: 1;
    ${transformIn}
  }
  to {
    opacity: 0;
    ${transformOut}
  }
`;

export const PopoverPortal = styled.div`
  .ant-popover {
    transform-origin: right bottom !important;
    ${transformIn}

    &.zoom-big-appear.zoom-big-appear-active,
    &.zoom-big-enter.zoom-big-enter-active {
      animation-name: ${antZoomBigIn};
    }

    &.zoom-big-leave.zoom-big-leave-active {
      animation-name: ${antZoomBigOut};
    }
  }
`;

export const Wrapper = styled.div`
  display: flex;
  width: 250px;
  height: 90px;
`;

export const Popover = styled(AntPopover).attrs({
  destroyTooltipOnHide: false,
})``;

export const Title = styled.div`
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  display: -webkit-box;
`;

export const Thumbnail = styled.img`
  margin-right: 10px;
  width: 120px;
  height: 68px;
  background-color: black;
  padding: 11px 0;
  box-sizing: content-box;
`;
