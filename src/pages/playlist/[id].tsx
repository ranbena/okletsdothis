import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Button } from 'antd';
import { LeftOutlined, DownOutlined } from '@ant-design/icons';
import moment from 'moment';
import { RRule } from 'rrule';

import { useSchedule } from 'src/contexts/schedule';

import Layout from 'src/components/Layout';
import PlaylistDetails from 'src/components/PlaylistDetails';
import Calendar from 'src/components/Calendar';
import AddToCalendar from 'src/components/AddToCalendarModal';
import { getVideoUrl } from 'src/services/youtube';
import { AuthProvider } from 'src/services/auth';
import { getPlaylistDetails, getPlaylistItems } from 'src/services/youtube';
import { APIVideo, APIPlaylist } from 'src/services/youtube/types';
import { CalendarEvent } from 'src/components/CalendarConfig/types';
import { fallbackVideoImage } from 'src/utils/constants';

import { Step, Back, Continue } from 'src/styles/common';

interface IProps {
  playlistId: string;
  details: APIPlaylist;
  items: APIVideo[];
}

const PlaylistPage: FC<IProps> = ({ playlistId, details, items }) => {
  const [step, setStep] = useState(1);
  const playlistTitle = details.snippet.title;
  const { schedule } = useSchedule();
  const { back } = useRouter();
  const step2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (step === 2) {
      step2Ref.current!.scrollIntoView();
    }
  }, [step]);

  const createEvent = useCallback(
    (item: APIVideo, date: Date, idx: number): CalendarEvent => {
      const { title, thumbnails, resourceId } = item.snippet;

      // merge date with config time
      const startDate = schedule.startDate.clone().set({
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
      });

      return {
        title: `#${idx + 1} ${playlistTitle}`,
        videoTitle: title,
        videoImage: thumbnails.medium?.url || fallbackVideoImage, // for private videos,
        videoUrl: getVideoUrl(resourceId.videoId, playlistId),
        startDate,
        endDate: startDate.clone().add(30, 'minutes'), // TODO: set video length instead
      };
    },
    [schedule],
  );

  const events = useMemo(() => {
    const weekCount = Math.ceil(items.length / schedule.days.length);

    // calc calendar event distribution
    const dates = new RRule({
      freq: RRule.WEEKLY,
      interval: 1,
      byweekday: schedule.days,
      dtstart: new Date(),
      until: moment().add(weekCount, 'weeks').toDate(),
    }).all();

    return items.map((_, idx) => createEvent(items[idx], dates[idx], idx));
  }, [playlistId]);

  const showCalendar = () => {
    setStep(2);
  };

  return (
    <Layout>
      <Step>
        <Back onClick={back}>
          <LeftOutlined />
          Back
        </Back>
        <PlaylistDetails items={items} details={details} />

        <Continue ref={step2Ref} onClick={step === 1 ? showCalendar : undefined}>
          Step 2: Customize My Schedule
          <DownOutlined />
        </Continue>
      </Step>

      {step > 1 && <Calendar events={events} />}
      {step > 2 && (
        <AuthProvider>
          <AddToCalendar playlistTitle={playlistTitle} events={events} />
        </AuthProvider>
      )}
    </Layout>
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

export default PlaylistPage;
