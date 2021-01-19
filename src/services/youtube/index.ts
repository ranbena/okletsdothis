import {
  YoutubeAPIPlaylistVideo,
  YoutubeAPIPlaylist,
  YoutubeAPIPlaylistDetailsResponse,
  YoutubeAPIPlaylistItemsResponse,
} from './types';

export const getPlaylistItems = (playlistId: string): Promise<YoutubeAPIPlaylistVideo[]> => {
  const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
  url.searchParams.append('key', process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string);
  url.searchParams.append('playlistId', playlistId);
  url.searchParams.append('part', 'snippet');
  url.searchParams.append('maxResults', '50');

  return fetch(url.href)
    .then((response) => response.json())
    .then((data: YoutubeAPIPlaylistItemsResponse) => {
      return data.items;
    });
};

export const getVideoUrl = (id: string, playlistId?: string) => {
  const url = new URL(`https://youtu.be/${id}`);
  playlistId && url.searchParams.append('list', playlistId);

  return url.href;
};

export const getPlaylistDetails = (playlistId: string): Promise<YoutubeAPIPlaylist> => {
  const url = new URL('https://www.googleapis.com/youtube/v3/playlists');
  url.searchParams.append('key', process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string);
  url.searchParams.append('id', playlistId);
  url.searchParams.append('part', 'snippet');

  return fetch(url.href)
    .then((response) => response.json())
    .then((data: YoutubeAPIPlaylistDetailsResponse) => {
      return data.items[0];
    });
};
