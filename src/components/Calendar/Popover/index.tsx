import React, { FC, PropsWithChildren } from 'react';
import { CalendarEvent } from 'src/components/CalendarConfig/types';
import { Wrapper, Popover, Title, Thumbnail } from './styles';
export { PopoverPortal } from './styles';

interface IProps {
  event: CalendarEvent;
  getPopupContainer: () => HTMLElement;
}

const Component: FC<PropsWithChildren<IProps>> = ({ event, getPopupContainer, children }) => {
  return (
    <Popover
      content={
        <Wrapper>
          <Thumbnail src={event.videoImage} />
          <Title>{event.title}</Title>
        </Wrapper>
      }
      getPopupContainer={getPopupContainer}>
      {children}
    </Popover>
  );
};

export default Component;
