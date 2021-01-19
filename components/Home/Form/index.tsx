import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import Router from 'next/router';

import { Wrapper, Input, Error, ErrorIcon, Form, SubmitButton, Spinner, Content } from './styles';
import { placeholder } from 'utils/constants';

enum ERROR {
  OK = '',
  EMPTY = 'Please enter a youtube playlist url',
  NOT_URL = 'Must be a full youtube playlist url',
  NOT_YOUTUBE = 'Must be a youtube playlist url',
  INCOMPLETE = 'The playlist url is invalid',
}

const extractPlaylistId = (url: string): { playlistId?: string; error?: ERROR } => {
  if (!url.trim()) {
    return { error: ERROR.EMPTY };
  }

  // needed for URL constructor
  if (!url.startsWith('http')) {
    url = `https://${url}`;
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch {
    return { error: ERROR.NOT_URL };
  }

  const { hostname, pathname, searchParams } = parsedUrl;

  if (!hostname.endsWith('youtube.com')) {
    return { error: ERROR.NOT_YOUTUBE };
  }

  const playlistId = searchParams.get('list');
  if (pathname !== '/playlist' || !playlistId) {
    return { error: ERROR.INCOMPLETE };
  }

  return { playlistId, error: ERROR.OK };
};

const FormComponent: FC = () => {
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<ERROR | undefined>();

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    const { playlistId, error } = extractPlaylistId(playlistUrl);
    setError(error);

    if (error === ERROR.OK) {
      setSubmitting(true);
      Router.push(`/playlist/${playlistId}`);
    }
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setError(ERROR.OK);
    setPlaylistUrl(e.target.value);
  };

  return (
    <Wrapper>
      <Content $submitting={submitting}>
        Paste a Youtube playlist address
        <Form onSubmit={onSubmit}>
          <Input size="large" placeholder={placeholder} onChange={onChange} value={playlistUrl} />
          <SubmitButton>Go</SubmitButton>
          <Error>
            {error && <ErrorIcon />}
            {error}
          </Error>
        </Form>
      </Content>
      {submitting && <Spinner />}
    </Wrapper>
  );
};

export default FormComponent;
