import { FC, useState } from 'react';
import { useRouter } from 'next/router';

import Layout from 'src/components/Layout';
import Search from 'src/components/Search';
import Suggestions from 'src/components/Suggestions';
import Skeleton from 'src/components/PlaylistDetails/skeleton';

const transitionDelay = 2000; // ms

const HomePage: FC = () => {
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [transition, setTransition] = useState(false);
  const router = useRouter();

  const onSubmit = (playlistId: string) => {
    setLoading(true);
    setTimeout(() => {
      setTransition(true);
      router.push(`/playlist/${playlistId}`);
    }, transitionDelay);
  };

  return (
    <Layout>
      {!transition ? (
        <>
          <Search
            onSubmit={onSubmit}
            playlistUrl={playlistUrl}
            setPlaylistUrl={setPlaylistUrl}
            loading={loading}
          />
          <Suggestions setPlaylistUrl={setPlaylistUrl} />
        </>
      ) : (
        <Skeleton />
      )}
    </Layout>
  );
};

export default HomePage;
