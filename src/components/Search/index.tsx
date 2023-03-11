import { ChangeEventHandler, FC, FormEventHandler, useEffect, useRef, useState } from 'react';
import { InputRef } from 'antd';

import {
  Wrapper,
  Input,
  Hint,
  ErrorIcon,
  Form,
  SubmitButton,
  ClearIcon,
  Placeholder,
} from './styles';
import Step from 'src/components/Step';
import {
  EXTRACT_ERROR as ERROR,
  extractIdFromYoutubePlaylistUrl as extract,
} from 'src/utils/helpers';
import { placeholder } from 'src/utils/constants';

const ERROR_MSG: Record<ERROR, string> = {
  [ERROR.OK]: '',
  [ERROR.EMPTY]: 'Please enter a youtube playlist url',
  [ERROR.NOT_URL]: 'Must be a full youtube playlist url',
  [ERROR.NOT_YOUTUBE]: 'Must be a youtube playlist url',
  [ERROR.INCOMPLETE]: 'The playlist url is invalid',
};

interface IProps {
  playlistUrl: string;
  setPlaylistUrl: (playlistUrl: string) => void;
  loading: boolean;
  onSubmit: (playlistId: string) => void;
}

const FormComponent: FC<IProps> = ({ playlistUrl, setPlaylistUrl, loading, onSubmit }) => {
  const [error, setError] = useState<ERROR>(ERROR.OK);
  const inputRef = useRef<InputRef>(null);

  const hasError = error !== ERROR.OK;

  useEffect(() => {
    inputRef.current!.focus();
  });

  const _onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    const { playlistId, error } = extract(playlistUrl || '');
    setError(error);

    if (!hasError && playlistId) {
      onSubmit(playlistId);
    }
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setError(ERROR.OK);
    setPlaylistUrl(e.target.value);
  };

  return (
    <Wrapper>
      <div>
        <Step count={1} title="Pick a playlist on YouTube, copy the url">
          <Form onSubmit={_onSubmit}>
            <Input
              ref={inputRef}
              placeholder="Paste it here and smash GO!"
              onChange={onChange}
              value={playlistUrl}
            />
            <SubmitButton loading={loading}>GO!</SubmitButton>
          </Form>
          <Hint $error={hasError}>
            {hasError ? (
              <>
                <ErrorIcon />
                {ERROR_MSG[error]} <ClearIcon onClick={() => setError(ERROR.OK)} />
              </>
            ) : (
              <>
                e.g.{' '}
                <Placeholder onClick={() => setPlaylistUrl(placeholder)}>{placeholder}</Placeholder>
              </>
            )}
          </Hint>
        </Step>
      </div>
    </Wrapper>
  );
};

export default FormComponent;
