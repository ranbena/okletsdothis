import moment from 'moment';
import { RRule } from 'rrule';
import { CalendarConfigType } from 'src/components/CalendarConfig/types';

export const defaultCalendarConfig: CalendarConfigType = {
  days: [RRule.SU, RRule.TU, RRule.WE],
  startDate: moment('08:00', 'HH:mm'),
  ordered: true,
};

export const eventSaveBatchSize = 5;

// yoga with adriene
export const placeholder = 'https://youtube.com/playlist?list=PLui6Eyny-UzwfYsbU4iBdXHorpVjkLx4d';
