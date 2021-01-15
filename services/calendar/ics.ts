import { saveAs } from 'file-saver';
import { DateArray, EventAttributes } from 'ics';
import { Moment } from 'moment';

import { CalendarEvent } from 'components/CalendarConfig/types';

const ics = require('ics'); // doesn't work as esm
const toDateArray = (val: Moment) => {
  const ret = val.toArray().slice(0, 5);
  ret[1]++; // expects month 1-12 (not 0-11)
  return ret as DateArray;
};

type Time = 'local' | 'utc';
const LOCAL: Time = 'local';

export type Result = 'ok' | 'events_error' | 'browser_support_error' | 'save_error';

export const download = (playlistTitle: string, events: CalendarEvent[]): Result => {
  const icsEvents: EventAttributes[] = events.map((event) => ({
    title: event.title,
    description: event.videoTitle,
    start: toDateArray(event.startDate),
    startInputType: LOCAL,
    startOutputType: LOCAL,
    end: toDateArray(event.endDate),
    endInputType: LOCAL,
    endOutputType: LOCAL,
    url: event.videoUrl,
    calName: playlistTitle,
    organizer: {
      name: 'Youtube Engage',
    },
  }));

  const { error, value } = ics.createEvents(icsEvents);

  if (!value || error) {
    return 'events_error';
  }

  if (!new Blob()) {
    return 'browser_support_error';
  }

  var blob = new Blob([value], {
    type: 'text/calendar',
  });

  try {
    saveAs(blob, `${playlistTitle}.ics`);
  } catch (err) {
    return 'save_error';
  }

  return 'ok';
};
