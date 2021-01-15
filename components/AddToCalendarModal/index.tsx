import React, { FC, useState } from 'react';
import { Modal, Button } from 'antd';

import { Wrapper, List, ListItem } from './styles';
import { CalendarEvent } from 'components/CalendarConfig/types';

import GoogleCalendar from './GoogleCalendar';
import ICSFile from './ICSFile';

type Method = 'gcal' | 'ics';

interface IProps {
  playlistTitle: string;
  events: CalendarEvent[];
}

const Component: FC<IProps> = ({ playlistTitle, events }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [method, setMethod] = useState<Method | null>(null);

  const onClose = () => {
    setModalVisible(false);
    setMethod(null);
  };

  return (
    <Wrapper>
      <button onClick={() => setModalVisible(true)}>Add to Calendar</button>
      <Modal footer={null} title="Add to Calendar" visible={modalVisible} onCancel={onClose}>
        {!method ? (
          <List>
            <ListItem onClick={() => setMethod('ics')}>Outlook Calendar</ListItem>
            <ListItem onClick={() => setMethod('gcal')}>Google Calendar</ListItem>
            <ListItem onClick={() => setMethod('ics')}>Apple Calendar</ListItem>
          </List>
        ) : (
          <>
            <button onClick={() => setMethod(null)}>back</button>
            {method === 'ics' && <ICSFile events={events} title={playlistTitle} />}
            {method === 'gcal' && <GoogleCalendar events={events} />}
          </>
        )}
      </Modal>
    </Wrapper>
  );
};

export default Component;
