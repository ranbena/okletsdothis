import { FC, ReactNode, memo } from 'react';
import moment, { Moment } from 'moment';
import { CalendarEvent } from 'src/components/CalendarConfig/types';
import { HeaderRender } from 'antd/lib/calendar/generateCalendar';
import { last } from 'src/utils/helpers';

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
  const dateCellRender = (date: Moment): ReactNode => {
    const day = date.get('date');
    const event = events.find(({ startDate }) => startDate.isSame(date, 'day'));
    return (
      <Cell key={day} data-has-event={!!event}>
        {day}
      </Cell>
    );
  };

  const headerRender: HeaderRender<Moment> = ({ value }) => {
    return <Header>{value.format('MMMM YYYY')}</Header>;
  };

  const byMonthEvents = byMonth(events);

  return (
    <Wrapper>
      <CarouselWrapper>
        <Carousel>
          {byMonthEvents.map((_events, idx) => {
            const firstDate = _events[0].startDate;
            const lastDate = last(_events).startDate;
            const startRange = idx === 0 ? moment() : firstDate.clone().startOf('month');
            const endRange =
              idx === byMonthEvents.length - 1 ? lastDate : lastDate.clone().endOf('month');
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
