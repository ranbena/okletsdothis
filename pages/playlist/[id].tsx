import { FC } from 'react';
import { GetServerSideProps } from 'next';

import PlaylistDetails from 'components/PlaylistDetails';
import CalendarConfig from 'components/CalendarConfig';
import Calendar from 'components/Calendar';

import { getPlaylistDetails, getPlaylistItems } from 'services/youtube';
import { YoutubeAPIPlaylistVideo, YoutubeAPIPlaylist } from 'services/youtube/types';
import { CalendarEvent } from 'components/CalendarConfig/types';

interface IProps {
  playlistId: string;
  details: YoutubeAPIPlaylist;
  items: YoutubeAPIPlaylistVideo[];
}

const Page: FC<IProps> = ({ playlistId, details, items }) => {
  return (
    <div>
      <PlaylistDetails items={items.length} details={details} />
      <hr />
      <CalendarConfig playlistId={playlistId} playlistTitle={details.snippet.title} items={items}>
        {(events: CalendarEvent[]) => <Calendar events={events} />}
      </CalendarConfig>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const playlistId = context.params?.id as string;

  if (!playlistId) {
    return {
      notFound: true,
    };
  }

  const [items, details] = await Promise.all([
    getPlaylistItems(playlistId),
    getPlaylistDetails(playlistId),
  ]);

  if (!details) {
    return {
      notFound: true,
    };
  }

  return {
    props: { playlistId, details, items },
  };
};

export default Page;
