import { FC, useState } from 'react';
import { Button, Alert } from 'antd';
import { SaveOutlined, CheckOutlined } from '@ant-design/icons';

import { save } from 'services/calendar/gcal';
import { useAuth } from 'services/auth';

import { Wrapper } from './styles';
import { CalendarEvent } from 'components/CalendarConfig/types';

interface IProps {
  events: CalendarEvent[];
}

const Component: FC<IProps> = ({ events }) => {
  const [success, setSuccess] = useState<boolean>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const { user, signinWithGoogle, loading: signingIn, signout } = useAuth()!;
  const icon = success ? <CheckOutlined /> : <SaveOutlined />;

  const _save = async () => {
    setLoading(true);
    const result = await save(user!, events);
    switch (result) {
      case 'ok':
        setSuccess(true);
        break;
      case 'auth_error':
        signout();
        setError('Your login session has expired. Please login again.');
        break;
      case 'fetch_error':
        setError('Server could not be reached. Please check your interenet connection.');
        break;
      case 'server_error':
        setError('An error occurred. Please try again later.');
    }
    setLoading(false);
  };

  return (
    <Wrapper>
      <Button onClick={_save} loading={loading} disabled={!user} icon={icon} type="primary">
        Save to Calendar
      </Button>
      {error && <Alert message={error} type="error" />}

      {user ? (
        <Button onClick={signout}>Sign out</Button>
      ) : (
        <Button onClick={signinWithGoogle} loading={signingIn}>
          Login to Google
        </Button>
      )}
    </Wrapper>
  );
};

export default Component;
