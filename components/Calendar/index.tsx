import { FC, ReactNode } from 'react';
import { Calendar } from 'antd';
import { Moment } from 'moment';
import { CalendarEvent } from 'components/CalendarConfig/types';

import { Wrapper, Event, Title, Image } from './styles';

interface IProps {
  events: CalendarEvent[];
}

const Component: FC<IProps> = ({ events }) => {
  const dateCellRender = (date: Moment): ReactNode => (
    <Wrapper>
      {events
        .filter(({ startDate }) => startDate.isSame(date, 'day'))
        .map(({ title, videoImage }) => (
          <Event key={title}>
            <Title>{title}</Title> <Image src={videoImage} />
          </Event>
        ))}
    </Wrapper>
  );
  return (
    <>
      <Calendar dateCellRender={dateCellRender} />
    </>
  );
};

export default Component;
