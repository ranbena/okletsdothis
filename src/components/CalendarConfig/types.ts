import { Moment } from 'moment';

export type CalendarEvent = {
  title: string;
  videoTitle: string;
  videoImage: string;
  videoUrl: string;
  startDate: Moment;
  endDate: Moment;
};
