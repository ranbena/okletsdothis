import { FC, useState } from 'react';
import moment, { Moment } from 'moment';
import { RRule, Weekday } from 'rrule';

import { getVideoUrl } from 'services/youtube';
import { YoutubeAPIPlaylistVideo } from 'services/youtube/types';
import { CalendarConfigType, CalendarEvent } from './types';
import { defaultCalendarConfig } from 'utils/constants';
import { ValueOf } from 'utils/types';
import DaysSelection from './DaysSelection';
import TimeSelection from './TimeSelection';
import OrderSelection from './OrderSelection';

import { Wrapper, Settings, Setting, Label, Calendar } from './styles';

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
  playlistTitle: string;
  items: YoutubeAPIPlaylistVideo[];
  children(events: CalendarEvent[]): JSX.Element;
}

const Component: FC<IProps> = ({ playlistId, playlistTitle, items, children }) => {
  const [config, setConfig] = useState<CalendarConfigType>(defaultCalendarConfig);

  const createEvent = (date: Date, idx: number): CalendarEvent => {
    const { snippet } = items[idx];

    const videoImage = snippet.thumbnails.default?.url; // TODO: fallback image url

    // merge date with config time
    const startDate = moment(config.startDate).set({
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
    });
    return {
      title: `#${idx + 1} ${playlistTitle}`,
      videoTitle: snippet.title,
      videoImage,
      videoUrl: getVideoUrl(snippet.resourceId.videoId, playlistId),
      startDate,
      endDate: moment(startDate).add(30, 'minutes'), // TODO: set video length instead
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
    <Wrapper>
      <Settings>
        <Setting>
          <Label>Days:</Label>
          <DaysSelection value={config.days} onChange={onChange('days')} />
        </Setting>
        <Setting>
          <Label>Time:</Label>
          <TimeSelection value={config.startDate} onChange={onChange('startDate')} />
        </Setting>
        <Setting>
          <Label>Order:</Label>
          <OrderSelection value={config.ordered} onChange={onChange('ordered')} />
        </Setting>
      </Settings>
      <Calendar>{children(events)}</Calendar>
    </Wrapper>
  );
};

export default Component;
