import firebase from 'src/services/auth/firebase';
import { CalendarEvent } from 'src/components/CalendarConfig/types';

export type Result = 'ok' | 'auth_error' | 'fetch_error' | 'server_error';

export const save = async (user: firebase.User, events: CalendarEvent[]): Promise<Result> => {
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
  })
    .then(({ status }) => {
      if (status === 200) {
        return 'ok';
      }
      if (status === 401) {
        return 'auth_error';
      }
      return 'server_error';
    })
    .catch(() => 'fetch_error');
};
