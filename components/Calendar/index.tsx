import { FC } from 'react';
import { Calendar } from 'antd';
import { CalendarEvent } from 'components/CalendarConfig/types';

interface IProps {
  events: CalendarEvent[];
}

const Component: FC<IProps> = ({ events }) => (
  <>
    <div>
      {events.map(({ title }) => (
        <div>{title}</div>
      ))}
    </div>
    <Calendar />
  </>
);

export default Component;