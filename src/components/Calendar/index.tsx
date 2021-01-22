import { FC, ReactNode, memo, useRef } from 'react';
import moment, { Moment } from 'moment';
import { CalendarEvent } from 'src/components/CalendarConfig/types';
import { HeaderRender } from 'antd/lib/calendar/generateCalendar';
import { last } from 'src/utils/helpers';
import Popover, { PopoverPortal } from './Popover';

import { Wrapper, CarouselWrapper, Carousel, Cell, Calendar, Header } from './styles';

const sig = (event: CalendarEvent) => event.startDate.format('MY'); // get month + year signature
const byMonth = (events: CalendarEvent[]) => {
  const arr = [[events[0]]];
  events.reduce((previous, current) => {
    if (sig(previous) !== sig(current)) {
      arr.push([current]);
    } else {
      last(arr).push(current);
    }
    return current;
  }, events[0]);
  return arr;
};

interface IProps {
  events: CalendarEvent[];
}

const CalendarComponent: FC<IProps> = ({ events }) => {
  const portalRef = useRef<HTMLDivElement>(null);

  const dateCellRender = (date: Moment): ReactNode => {
    const day = date.get('date');
    const event = events.find(({ startDate }) => startDate.isSame(date, 'day'));
    const key = date.format('MY');
    const cell = (
      <Cell key={key} data-has-event={!!event}>
        {day}
      </Cell>
    );

    if (event) {
      return (
        <Popover
          key={key}
          event={event}
          getPopupContainer={() => portalRef?.current as HTMLElement}>
          {cell}
        </Popover>
      );
    }

    return cell;
  };

  const headerRender: HeaderRender<Moment> = ({ value }) => {
    return <Header>{value.format('MMMM YYYY')}</Header>;
  };

  const byMonthEvents = byMonth(events);

  return (
    <Wrapper>
      <PopoverPortal ref={portalRef} />
      <CarouselWrapper>
        <Carousel>
          {byMonthEvents.map((_events, idx) => {
            const firstDate = _events[0].startDate;
            const lastDate = last(_events).startDate;
            const startRange = idx === 0 ? moment() : firstDate.clone().startOf('month');
            const endRange = lastDate.clone().endOf('month');
            const validRange = [startRange, endRange] as [Moment, Moment];
            return (
              <div key={idx}>
                <Calendar
                  value={firstDate}
                  fullscreen={false}
                  validRange={validRange}
                  headerRender={headerRender}
                  dateFullCellRender={dateCellRender}
                />
              </div>
            );
          })}
        </Carousel>
      </CarouselWrapper>
    </Wrapper>
  );
};

export default memo(CalendarComponent);
