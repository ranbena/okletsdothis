import moment from 'moment';
import { RRule } from 'rrule';
import { CalendarConfigType } from 'components/CalendarConfig/types';

export const defaultCalendarConfig: CalendarConfigType = {
  days: [RRule.SU, RRule.TU, RRule.WE],
  startDate: moment('08:00', 'HH:mm'),
  ordered: true,
};
