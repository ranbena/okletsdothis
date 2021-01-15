import { saveAs } from 'file-saver';
import { DateArray, EventAttributes } from 'ics';
import { Moment } from 'moment';

import firebase from 'services/auth/firebase';
import { CalendarEvent } from 'components/CalendarConfig/types';

const ics = require('ics'); // doesn't work as esm
const toDateArray = (val: Moment) => {
  const ret = val.toArray().slice(0, 5);
  ret[1]++; // expects month 1-12 (not 0-11)
  return ret as DateArray;
};

type Time = 'local' | 'utc';
const LOCAL: Time = 'local';

export const downloadICSFile = (playlistTitle: string, events: CalendarEvent[]) => {
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
    throw new Error(error);
  }

  var blob = new Blob([value], {
    type: 'text/calendar',
  });

  saveAs(blob, `${playlistTitle}.ics`);
};

export const saveToGoogleCalendar = async (user: firebase.User, events: CalendarEvent[]) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  const accessToken = window.localStorage.getItem('token');
  if (accessToken) {
    headers.append('access-token', accessToken);
  }

  const authToken = await user.getIdToken();
  if (authToken) {
    headers.append('auth-token', authToken);
  }

  const body = JSON.stringify(events);

  return fetch('/api/gcal', {
    method: 'POST',
    headers,
    body,
  });
};
