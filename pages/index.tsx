import Router from 'next/router';
import { FormEventHandler, useState } from 'react';

const extractPlaylistId = (url: string): { playlistId?: string; error?: string } => {
  if (!url.trim()) {
    return {};
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch {
    return { error: 'Must be a full youtube playlist url' };
  }

  const { hostname, pathname, searchParams } = parsedUrl;

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
