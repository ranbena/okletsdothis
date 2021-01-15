import type { NextApiRequest, NextApiResponse } from 'next';
import admin from 'services/auth/firebase-admin';
import { google } from 'googleapis';

import { CalendarEvent } from 'components/CalendarConfig/types';

const decodeFirebaseToken = (idToken: string): Promise<admin.auth.DecodedIdToken> => {
  return admin
    .auth()
    .verifyIdToken(idToken)
    .catch(() => {
      throw new Error('Unauthorized 401');
    });
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const accessToken = req.headers['access-token'] as string;
  const authToken = req.headers['auth-token'] as string;

  if (!accessToken || !authToken) {
    return res.status(401).json({ msg: 'authentication failed' });
  }

  // TODO: is this really necessary?
  try {
    await decodeFirebaseToken(authToken);
  } catch (err) {
    return res.status(401).json({ msg: 'token decoding failed' });
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  const events: CalendarEvent[] = req.body;

  events.forEach((event) => {
    calendar.events.insert(
      {
        calendarId: 'primary',
        requestBody: {
          summary: event.title,
          description: event.videoTitle + '\n\n' + event.videoUrl,
          start: {
            dateTime: (event.startDate as unknown) as string,
            timeZone: 'utc',
          },
          end: {
            dateTime: (event.endDate as unknown) as string,
            timeZone: 'utc',
          },
          creator: {
            displayName: 'Youtube Engage',
          },
          organizer: {
            displayName: 'Youtube Engage',
          },
        },
      },
      (err, res) => {
        if (err) {
          console.log('We had an issue ' + err);
        } else if (res) {
          console.log('We got back from calendar ' + res.data);
        }
      },
    );
  });

  res.status(200).json({ status: 'ok' });
};
