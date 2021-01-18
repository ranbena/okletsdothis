import type { NextApiRequest, NextApiResponse } from 'next';
import admin from 'services/auth/firebase-admin';
import { calendar_v3, google } from 'googleapis';

import { CalendarEvent } from 'components/CalendarConfig/types';

const API_ERROR_MESSAGES = {
  INVALID_CREDS: 'Invalid Credentials',
};

class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

const verifyAuthToken = (idToken: string): Promise<admin.auth.DecodedIdToken> => {
  return admin
    .auth()
    .verifyIdToken(idToken)
    .catch(() => {
      throw new Error('Unauthorized 401');
    });
};

const saveEvent = (calendar: calendar_v3.Calendar, event: CalendarEvent) => {
  return calendar.events.insert({
    calendarId: 'primary', // TODO: create a dedicated calendar for this
    requestBody: {
      // id: generateUUID(), // TODO: generate unique id to avoid duplicate events in calendar. If `events.insert` results in status 409 - run `events.update` instead.
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
  });
};

const verifyTokens = async (authToken?: string, accessToken?: string): Promise<string> => {
  if (!accessToken) {
    throw new AuthError('Access token missing from request header');
  }

  if (!authToken) {
    throw new AuthError('Auth token missing from request header');
  }

  try {
    await verifyAuthToken(authToken); // TODO: is this really necessary?
  } catch (err) {
    throw new AuthError('Auth token verification failed');
  }

  return accessToken;
};

const saveToGoogleCalendar = async (accessToken: string, events: CalendarEvent[]) => {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  try {
    await Promise.all(events.map((event) => saveEvent(calendar, event)));
  } catch (err) {
    if (err.message === API_ERROR_MESSAGES.INVALID_CREDS) {
      throw new AuthError('Google api error:' + err);
    }
    throw new Error('Google api error:' + err);
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const accessToken = req.headers['access-token'] as string;
  const authToken = req.headers['auth-token'] as string;
  const events: CalendarEvent[] = req.body;

  try {
    await verifyTokens(authToken, accessToken);
    await saveToGoogleCalendar(accessToken, events);
  } catch (error) {
    const status = error instanceof AuthError ? 401 : 500;
    return res.status(status).json({ error });
  }

  res.status(200).json({ status: 'ok' });
};
