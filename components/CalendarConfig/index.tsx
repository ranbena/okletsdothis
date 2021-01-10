import { FC, useState } from 'react';
import moment from 'moment';

import { YoutubeAPIPlaylistItem } from 'services/youtube/types';
import { CalendarConfigType, CalendarEvent, Days } from './types';
import { defaultCalendarConfig } from 'utils/constants';
import DaysSelection from './DaysSelection';
import TimeSelection from './TimeSelection';
import OrderSelection from './OrderSelection';

const convertItemsToEvents = (
  items: YoutubeAPIPlaylistItem[],
  config: CalendarConfigType,
): CalendarEvent[] => {
  return [
    {
      title: 'YAY',
      videoUrl: 'https://youtube.com',
      startDate: moment(),
      endDate: moment().add(30, 'minutes'),
    },
    {
      title: 'YAY2',
      videoUrl: 'https://youtube.com',
      startDate: moment().add(1, 'day'),
      endDate: moment().add(1, 'day').add(30, 'minutes'),
    },
  ];
};

interface IProps {
  items: YoutubeAPIPlaylistItem[];
  children(events: CalendarEvent[]): JSX.Element;
}

const Component: FC<IProps> = ({ items, children }) => {
  const [config, setConfig] = useState(defaultCalendarConfig);

  const events = convertItemsToEvents(items, config);

  const onDayChange = (days: Days[]) => {
    const newConfig = { ...config, days };
    setConfig(newConfig);
  };

  const onStartTimeChange = (startTime: string) => {
    const newConfig = { ...config, startTime };
    setConfig(newConfig);
  };

  const onOrderChange = (ordered: boolean) => {
    const newConfig = { ...config, ordered };
    setConfig(newConfig);
  };

  return (
    <>
      <div>
        Days: <DaysSelection value={config.days} onChange={onDayChange} />
        <br />
        Time: <TimeSelection value={config.startTime} onChange={onStartTimeChange} />
        <br />
        Order: <OrderSelection value={config.ordered} onChange={onOrderChange} />
      </div>
      {children(events)}
    </>
  );
};

export default Component;
