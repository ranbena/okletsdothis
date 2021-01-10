import moment from 'moment';

export type Days = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type CalendarConfigType = {
  days: Days[];
  startTime: string;
  ordered: boolean;
};

export type CalendarEvent = {
  title: string;
  videoUrl: string;
  startDate: moment.Moment;
  endDate: moment.Moment;
};
