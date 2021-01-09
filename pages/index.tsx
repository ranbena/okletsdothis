import Router from 'next/router';
import { FormEventHandler, useState } from 'react';
import Search from '../components/Search';

const extractPlaylistId = (url: string): { playlistId?: string; error?: string } => {
  if (!url.trim()) {
    return {};
  }

  const { hostname, pathname, searchParams } = new URL(url);

  if (!hostname.endsWith('youtube.com')) {
    return { error: 'Must be a youtube playlist url' };
  }

  const playlistId = searchParams.get('list');
  if (pathname !== '/playlist' || !playlistId) {
    return { error: 'The playlist url is invalid' };
  }

  return { playlistId };
};

export default function Home() {
  const [playlistUrl, setPlaylistUrl] = useState(
    'https://youtube.com/playlist?list=PLui6Eyny-UzwfYsbU4iBdXHorpVjkLx4d',
  );
  const { playlistId, error } = extractPlaylistId(playlistUrl);

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (playlistId) {
      Router.push(`/playlist/${playlistId}`);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" onChange={(e) => setPlaylistUrl(e.target.value)} value={playlistUrl} />
      <div>{error}</div>
      <button disabled={!playlistId}>Go</button>
    </form>
  );
}
