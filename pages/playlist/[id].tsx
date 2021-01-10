import { FC } from 'react';
import { GetServerSideProps } from 'next';

import PlaylistItems from 'components/PlaylistItems';
import CalendarConfig from 'components/CalendarConfig';
import Calendar from 'components/Calendar';

import { getPlaylistItems } from 'services/youtube';
import { YoutubeAPIPlaylistItem } from 'services/youtube/types';
import { CalendarConfigType, CalendarEvent } from 'components/CalendarConfig/types';

interface IProps {
  items: YoutubeAPIPlaylistItem[];
}

const Page: FC<IProps> = ({ items }) => {
  return (
    <div>
      <PlaylistItems items={items} />
      <CalendarConfig items={items}>
        {(events: CalendarEvent[]) => <Calendar events={events} />}
      </CalendarConfig>
    </div>
  );
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
