import { FC, useState } from 'react';
import { Button, Alert, Progress } from 'antd';
import { ProgressProps } from 'antd/lib/progress';
import { SaveOutlined, CheckOutlined } from '@ant-design/icons';

import { save, Result } from 'src/services/calendar/gcal';
import { useAuth } from 'src/services/auth';

import { Wrapper } from './styles';
import { CalendarEvent } from 'src/components/CalendarConfig/types';
import { eventSaveBatchSize as size } from 'src/utils/constants';
import { chunkArray } from 'src/utils/helpers';

type ProgressStatuses = ProgressProps['status'];

interface IProps {
  events: CalendarEvent[];
}

const Component: FC<IProps> = ({ events }) => {
  const [success, setSuccess] = useState<boolean>();
  const [error, setError] = useState<string>();
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [status, setStatus] = useState<ProgressStatuses>('normal');
  const { user, signinWithGoogle, loading: signingIn, signout } = useAuth()!;
  const icon = success ? <CheckOutlined /> : <SaveOutlined />;

  const saveAll = async () => {
    const chunks = chunkArray(events, size);

    setSaving(true);
    setStatus('active');

    let iterations = 1;
    let result: Result = 'ok';
    for (const chunk of chunks) {
      setProgress(iterations / chunks.length);
      result = await save(user!, chunk as CalendarEvent[]);
      if (result !== 'ok') {
        setStatus('exception');
        break;
      }
      iterations++;
    }

    switch (result) {
      case 'ok':
        setSuccess(true);
        break;
      case 'auth_error':
        setError('Your login session has expired. Please login again.');
        break;
      case 'fetch_error':
        setError('Server could not be reached. Please check your interenet connection.');
        break;
      case 'server_error':
        setError('An error occurred. Please try again later.');
    }

    setStatus('success');
    setSaving(false);
  };

  return (
    <Wrapper>
      <Button onClick={saveAll} loading={saving} disabled={!user} icon={icon} type="primary">
        Save to Calendar
      </Button>
      {saving && <Progress percent={Math.ceil(progress * 100)} size="small" status={status} />}

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
