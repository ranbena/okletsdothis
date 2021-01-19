import { FC } from 'react';
import { YoutubeAPIPlaylist } from 'src/services/youtube/types';

interface IProps {
  items: number;
  details: YoutubeAPIPlaylist;
}

const Component: FC<IProps> = ({ items, details }) => {
  const { width, height, url } = details.snippet.thumbnails.medium;
  return (
    <div>
      <h3>Found {items} videos</h3>
      <img src={url} height={height} width={width} /> {details.snippet.title}
    </div>
  );
};

export default Component;
