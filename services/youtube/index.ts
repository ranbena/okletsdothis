import { YoutubeAPIPlaylistItem } from './types';

export const getPlaylistItems = (playlistId: string): Promise<YoutubeAPIPlaylistItem[]> => {
  const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
  url.searchParams.append('part', 'snippet');
  url.searchParams.append('maxResults', '50');
  url.searchParams.append('key', process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string);
  url.searchParams.append('playlistId', playlistId);

  return fetch(url.href)
    .then((response) => response.json())
    .then((data) => {
      return data.items as YoutubeAPIPlaylistItem[];
    });
};

export const getVideoUrl = (id: string, playlistId?: string) => {
  const url = new URL('https://www.youtube.com/watch');
  url.searchParams.append('v', id);
  playlistId && url.searchParams.append('list', playlistId);

  return url.href;
};
