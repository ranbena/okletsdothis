import { FC } from 'react';
import { Tooltip } from 'antd';
{
  (' ');
}
import { QuestionCircleOutlined } from '@ant-design/icons';

import { APIPlaylist, APIVideo } from 'src/services/youtube/types';
import { extractDeletedVideos } from 'src/utils/helpers';
import { Image, Text, Content, Title, List, ListItem } from './styles';

const deletedPhrase = (count: number) => {
  return count === 1
    ? '1 video from this playlist was omitted because it is no longer available.'
    : `${count} videos from this playlist were omitted because they are no longer available.`;
};

interface IProps {
  items: APIVideo[];
  details: APIPlaylist;
}

const Component: FC<IProps> = ({ items, details }) => {
  const { url } = details.snippet.thumbnails.medium;

  const [deleted, rest] = extractDeletedVideos(items);

  return (
    <>
      <Title>
        {details.snippet.title} <small>by {details.snippet.channelTitle}</small>
      </Title>
      <Content>
        <Image src={url} />
        <Text>
          Found {rest.length} videos:{' '}
          {deleted.length ? (
            <Tooltip title={deletedPhrase(deleted.length)}>
              <QuestionCircleOutlined />
            </Tooltip>
          ) : null}
          <List>
            {rest.map((item) => (
              <ListItem key={item.id}>{item.snippet.title}</ListItem>
            ))}
          </List>
        </Text>
      </Content>
    </>
  );
};

export default Component;
