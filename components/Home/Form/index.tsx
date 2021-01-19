import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import Router from 'next/router';
import { Button } from 'antd';

import { Wrapper, Input, Error, Form } from './styles';
import { placeholder } from 'utils/constants';

const extractPlaylistId = (url: string): { playlistId?: string; error?: string } => {
  if (!url.trim()) {
    return {};
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch {
    return { error: 'Must be a full youtube playlist url' };
  }

  const { hostname, pathname, searchParams } = parsedUrl;

  if (!hostname.endsWith('youtube.com')) {
    return { error: 'Must be a youtube playlist url' };
  }

  const playlistId = searchParams.get('list');
  if (pathname !== '/playlist' || !playlistId) {
    return { error: 'The playlist url is invalid' };
  }

  return { playlistId };
};

const FormComponent: FC = () => {
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { playlistId, error } = extractPlaylistId(playlistUrl);

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    Router.push(`/playlist/${playlistId}`);
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => setPlaylistUrl(e.target.value);

  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        <Input size="large" placeholder={placeholder} onChange={onChange} value={playlistUrl} />
        <Button
          htmlType="submit"
          danger={!!error}
          type="primary"
          size="large"
          disabled={!playlistId}
          loading={loading}>
          Go
        </Button>
        <Error>{error}</Error>
      </Form>
    </Wrapper>
  );
};

export default FormComponent;
