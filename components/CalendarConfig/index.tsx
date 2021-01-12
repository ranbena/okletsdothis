import { FC, useState } from 'react';
import moment, { Moment } from 'moment';
import { RRule, Weekday } from 'rrule';

import { getVideoUrl } from 'services/youtube';
import { YoutubeAPIPlaylistItem } from 'services/youtube/types';
import { CalendarConfigType, CalendarEvent } from './types';
import { defaultCalendarConfig } from 'utils/constants';
import { ValueOf } from 'utils/types';
import DaysSelection from './DaysSelection';
import TimeSelection from './TimeSelection';
import OrderSelection from './OrderSelection';

const getFirstDate = (startDate: Moment, days: Weekday[]): Moment => {
  const nowDay = startDate.day();
  let diff;
  for (let i = nowDay; i < days.length; i++) {
    if (days[i]) {
      diff = i - nowDay;
      break;
    }
  }
  if (diff === undefined) {
    throw new Error('Day not found'); // improbable
  }
  return startDate.add(diff, 'day');
};

interface IProps {
  playlistId: string;
  items: YoutubeAPIPlaylistItem[];
  children(events: CalendarEvent[]): JSX.Element;
}

const Component: FC<IProps> = ({ playlistId, items, children }) => {
  const [config, setConfig] = useState<CalendarConfigType>(defaultCalendarConfig);

  const createEvent = (date: Date, idx: number): CalendarEvent => {
    const { snippet } = items[idx];
    const startDate = moment(date);
    return {
      title: `${snippet.title} (${idx + 1}/${items.length})`,
      videoImage: snippet.thumbnails.default.url,
      videoUrl: getVideoUrl(snippet.resourceId.videoId, playlistId),
      startDate,
      endDate: startDate.add(30, 'minutes'),
    };
  };

  const getEvents = (): CalendarEvent[] => {
    const weekCount = Math.ceil(items.length / config.days.length);

    // calc calendar event distribution
    const dates = new RRule({
      freq: RRule.WEEKLY,
      interval: 1,
      byweekday: config.days,
      dtstart: new Date(),
      until: moment().add(weekCount, 'weeks').toDate(),
    }).all();

    return items.map((_, idx) => createEvent(dates[idx], idx));
  };

  const onChange = (key: keyof CalendarConfigType) => (value: ValueOf<CalendarConfigType>) => {
    const newConfig = { ...config, ...{ [key]: value } } as CalendarConfigType;
    setConfig(newConfig);
  };

  const events = getEvents(); // TODO: useMemo

  return (
    <>
      <div>
        Days: <DaysSelection value={config.days} onChange={onChange('days')} />
        <br />
        Time: <TimeSelection value={config.startDate} onChange={onChange('startDate')} />
        <br />
        Order: <OrderSelection value={config.ordered} onChange={onChange('ordered')} />
      </div>
      {children(events)}
    </>
  );
};

export default Component;
