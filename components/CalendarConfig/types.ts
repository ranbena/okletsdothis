import { Moment } from 'moment';
import { Weekday } from 'rrule';

export type CalendarConfigType = {
  days: Weekday[];
  startDate: Moment;
  ordered: boolean;
};

export type CalendarEvent = {
  title: string;
  videoImage: string;
  videoUrl: string;
  startDate: Moment;
  endDate: Moment;
};
