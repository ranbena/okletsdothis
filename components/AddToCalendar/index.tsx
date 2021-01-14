import React, { FC, useState, useRef } from 'react';
import { Modal } from 'antd';

import { Wrapper } from './styles';
import { downloadICSFile } from 'services/ics';
import { CalendarEvent } from 'components/CalendarConfig/types';

interface IProps {
  playlistTitle: string;
  events: CalendarEvent[];
}

const Component: FC<IProps> = ({ playlistTitle, events }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const _downloadICSFile = () => downloadICSFile(playlistTitle, events);

  return (
    <Wrapper>
      <button onClick={() => setModalVisible(true)}>Add to Calendar</button>
      <Modal
        footer={null}
        title="Add to Calendar"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}>
        <button onClick={_downloadICSFile}>Outlook Calendar</button>
        <button onClick={_downloadICSFile}>Google Calendar</button>
        <button onClick={_downloadICSFile}>Apple Calendar</button>
      </Modal>
    </Wrapper>
  );
};

export default Component;
