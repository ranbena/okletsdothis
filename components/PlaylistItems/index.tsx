import { FC } from 'react';
import { YoutubeAPIPlaylistItem } from 'services/youtube/types';

interface IProps {
  items: YoutubeAPIPlaylistItem[];
}

const Component: FC<IProps> = ({ items }) => {
  return (
    <div>
      <h3>Found {items.length} videos</h3>
      {items.map((item: YoutubeAPIPlaylistItem) => {
        const { width, height, url } = item.snippet.thumbnails.default;
        return (
          <span key={item.id}>
            <img src={url} height={height / 2} width={width / 2} />{' '}
          </span>
        );
      })}
    </div>
  );
};

export default Component;
