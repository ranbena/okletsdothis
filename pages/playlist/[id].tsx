import { FC } from 'react';
import { GetServerSideProps } from 'next';

import Search from '../../components/Search';
import { getPlaylistItems } from '../../services/youtube';
import { YoutubeAPIPlaylistItem } from '../../services/youtube/types';

interface IProps {
  items: YoutubeAPIPlaylistItem[];
}

const Page: FC<IProps> = ({ items }) => {
  return <Search items={items} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const playlistId = context.params?.id;

  if (!playlistId) {
    return {
      notFound: true,
    };
  }

  const items: YoutubeAPIPlaylistItem[] = await getPlaylistItems(playlistId as string);

  if (!items) {
    return {
      notFound: true,
    };
  }

  return {
    props: { items },
  };
};

export default Page;
