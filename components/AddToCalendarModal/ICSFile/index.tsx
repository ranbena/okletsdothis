import { FC, useState } from 'react';
import { Button, Alert } from 'antd';
import { CloudDownloadOutlined, CheckOutlined } from '@ant-design/icons';

import { download } from 'services/calendar/ics';
import { CalendarEvent } from 'components/CalendarConfig/types';
import { Wrapper } from './styles';

interface IProps {
  title: string;
  events: CalendarEvent[];
}

const Component: FC<IProps> = ({ title, events }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const icon = success ? <CheckOutlined /> : <CloudDownloadOutlined />;

  const _download = () => {
    setError('');
    setSuccess(false);

    const result = download(title, events);
    switch (result) {
      case 'ok':
        setLoading(true);
        setTimeout(() => {
          setSuccess(true);
          setLoading(false);
        }, 1000);
        break;
      case 'save_error':
      case 'events_error':
        setError('An error occurred. Please try again later.');
        break;
      case 'browser_support_error':
        setError('Your browser does not support this action. Please use a more modern browser.');
    }
  };

  return (
    <Wrapper>
      <Button onClick={_download} icon={icon} loading={loading} type="primary">
        Download
      </Button>
      {error && <Alert message={error} type="error" />}
    </Wrapper>
  );
};

export default Component;
