import { FC } from 'react';
import { suggestions } from 'src/utils/constants';
import { constructYoutubePlaylistUrl } from 'src/utils/helpers';

import { Wrapper, Title, List, ListItem } from './styles';

interface IProps {
  setPlaylistUrl: (playlistUrl: string) => void;
}

const Suggestions: FC<IProps> = ({ setPlaylistUrl }) => {
  const onItemClick = (id: string) => () => {
    const playlistUrl = constructYoutubePlaylistUrl(id);
    setPlaylistUrl(playlistUrl);
    window.scrollTo(0, 0);
  };

  return (
    <Wrapper>
      <Title>Here's some suggesions for ya:</Title>
      <List>
        {suggestions.map(({ id, title, suggestion }) => (
          <ListItem key={id} onClick={onItemClick(id)}>
            {suggestion} ({title})
          </ListItem>
        ))}
      </List>
    </Wrapper>
  );
};

export default Suggestions;
