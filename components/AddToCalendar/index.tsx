import React, { FC, useState } from 'react';
import { Modal, Button } from 'antd';

import { Wrapper } from './styles';
import { downloadICSFile as ics, saveToGoogleCalendar as save } from 'services/calendar';
import { CalendarEvent } from 'components/CalendarConfig/types';
import { useAuth } from 'services/auth';

type CalendarMethod = 'gcal' | 'ics';

interface IProps {
  playlistTitle: string;
  events: CalendarEvent[];
}

const Component: FC<IProps> = ({ playlistTitle, events }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [calendarMethod, setCalendarMethod] = useState<CalendarMethod | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean>();
  const { user, signinWithGoogle, loading: signingIn, signout } = useAuth()!;

  const saveToGoogleCalendar = () => {
    setLoading(true);
    save(user!, events)
      .then(() => setSuccess(true))
      .catch(() => setSuccess(false))
      .finally(() => setLoading(false));
  };

  const onClose = () => {
    setModalVisible(false);
    setCalendarMethod(null);
  };

  return (
    <Wrapper>
      <button onClick={() => setModalVisible(true)}>Add to Calendar</button>
      <Modal footer={null} title="Add to Calendar" visible={modalVisible} onCancel={onClose}>
        {!calendarMethod ? (
          <>
            <button onClick={() => setCalendarMethod('ics')}>Outlook Calendar</button>
            <button onClick={() => setCalendarMethod('gcal')}>Google Calendar</button>
            <button onClick={() => setCalendarMethod('ics')}>Apple Calendar</button>
          </>
        ) : (
          <button onClick={() => setCalendarMethod(null)}>back</button>
        )}
        {calendarMethod === 'ics' && (
          <>
            <Button onClick={() => ics(playlistTitle, events)}>Download</Button>
          </>
        )}
        {calendarMethod === 'gcal' &&
          (user ? (
            <>
              <Button onClick={saveToGoogleCalendar} loading={loading}>
                Save to Calendar
              </Button>
              <Button onClick={signout}>Sign out</Button>
            </>
          ) : (
            <Button onClick={signinWithGoogle} loading={signingIn}>
              Login to Google
            </Button>
          ))}
      </Modal>
    </Wrapper>
  );
};

export default Component;
