import { FC } from 'react';
import { GetServerSideProps } from 'next';

import PlaylistDetails from 'src/components/PlaylistDetails';
import CalendarConfig from 'src/components/CalendarConfig';
import Calendar from 'src/components/Calendar';
import AddToCalendar from 'src/components/AddToCalendarModal';

import { getPlaylistDetails, getPlaylistItems } from 'src/services/youtube';
import { YoutubeAPIPlaylistVideo, YoutubeAPIPlaylist } from 'src/services/youtube/types';
import { CalendarEvent } from 'src/components/CalendarConfig/types';

interface IProps {
  playlistId: string;
  details: YoutubeAPIPlaylist;
  items: YoutubeAPIPlaylistVideo[];
}

const Page: FC<IProps> = ({ playlistId, details, items }) => {
  const playlistTitle = details.snippet.title;
  console.log(items);

  return (
    <div>
      <PlaylistDetails items={items.length} details={details} />
      <hr />
      <CalendarConfig playlistId={playlistId} playlistTitle={playlistTitle} items={items}>
        {(events: CalendarEvent[]) => (
          <>
            <Calendar events={events} />
            <AddToCalendar playlistTitle={playlistTitle} events={events} />
          </>
        )}
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
      notFound: true, // TODO: special page for private playlists (by result.status.privacyStatus)
    };
  }

  return {
    props: { playlistId, details, items },
  };
};

export default Page;
