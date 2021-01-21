import styled from 'styled-components';
import { Calendar as AntCalendar, Carousel as AntCarousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

export const CarouselWrapper = styled.div``;

export const Calendar = styled(AntCalendar)`
  width: 273px;
  background: transparent;
  padding-bottom: 10px;

  .ant-picker-content th {
    color: ${({ theme }) => theme.colors.link};
  }

  // disable interactivity
  .ant-picker-cell {
    pointer-events: none;

    .ant-picker-cell-inner {
      color: ${({ theme }) => theme.colors.link};
    }

    &.ant-picker-cell-disabled .ant-picker-cell-inner {
      opacity: 0.25;
    }
  }

  .ant-picker-cell-today .ant-picker-cell-inner::before {
    border: 0;
  }

  // disable selected style
  .ant-picker-cell-selected .ant-picker-cell-inner {
    color: unset;
    background: unset;
  }

  .ant-picker-panel {
    border-top: 0;
  }

  .ant-picker-cell-disabled::before {
    background-color: transparent;
  }
`;

export const Header = styled.div`
  color: ${({ theme }) => theme.colors.link};
  margin-bottom: 7px;
  text-align: center;
`;

export const Cell = styled.div.attrs({
  className: 'ant-picker-cell-inner ant-picker-calendar-date',
})`
  &[data-has-event='true'] {
    background-color: ${({ theme }) => theme.colors.bg} !important;
    color: ${({ theme }) => theme.colors.light} !important;
  }
  .ant-picker-cell-disabled:not(.ant-picker-cell-in-view) & {
    display: none;
  }
`;

export const Wrapper = styled.div`
  width: 590px;

  /* START perspective effect */

  perspective: 108px;

  ${CarouselWrapper} {
    transform: rotateY(-0.8deg) rotateX(0.2deg) rotateZ(0);
    transform-origin: right bottom;
  }

  .ant-picker-panel {
    border-radius: 2px;
    box-shadow: 5px 3px 0 0px #5c9e7d, 5px 3px 4px 0px #191818,
      5px 3px 22px 2px rgb(0 224 183 / 44%);
  }

  /* END perspective effect */

  /* START cell hover effect */

  .ant-picker-content tr {
    perspective-origin: 150%;
    perspective: 141px;
  }

  .ant-picker-cell-in-view {
    transform-style: preserve-3d;
    perspective: 900px;

    ${Cell}[data-has-event="true"] {
      transform: translate3d(1px, -1px, 2px);
      box-shadow: 2px 1px 1px 0px rgb(92 159 125);
    }
  }

  /* END cell hover effect */

  /* START dot effect */
  .ant-picker-cell-disabled:not(.ant-picker-cell-in-view):before {
    background-color: rgb(56 149 131 / 11%);
    box-shadow: inset 1px 1px 0 0 rgba(0 0 0 / 11%);
    top: calc(50% - 1px);
    right: calc(50% - 2px);
    left: auto;
    width: 7px;
    border-radius: 50%;
    height: 7px;
  }
`;

export const Carousel = styled(AntCarousel).attrs({
  slidesToShow: 2,
  slidesToScroll: 2,
  arrows: true,
  infinite: false,
  prevArrow: <LeftOutlined />,
  nextArrow: <RightOutlined />,
})`
  .slick-list {
    margin-bottom: 40px;
  }

  .slick-dots-bottom {
    bottom: -40px;
  }

  .slick-prev,
  .slick-next {
    color: ${({ theme }) => theme.colors.light};
    filter: drop-shadow(2px 1px 0.4px #5c9e7d);
    font-size: 30px;
    width: 30px;
    height: 30px;
    transform: scale(1, 1.5); // TODO: swap for actual wider button
  }

  .slick-prev {
    left: -30px;
    transform: scale(0.8, 1.5); // TODO: swap for actual wider button
  }
`;
