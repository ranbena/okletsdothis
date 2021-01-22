import {
  APIVideo,
  APIPlaylist,
  APIPlaylistDetailsResponse,
  APIPlaylistItemsResponse,
} from './types';

export const getPlaylistItems = (playlistId: string): Promise<APIVideo[]> => {
  const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
  url.searchParams.append('key', process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string);
  url.searchParams.append('playlistId', playlistId);
  url.searchParams.append('part', 'snippet');
  url.searchParams.append('maxResults', '50'); // TODO: allow more than 50 with paging

  return fetch(url.href)
    .then((response) => response.json())
    .then((data: APIPlaylistItemsResponse) => {
      return data.items;
    });
};

export const getVideoUrl = (id: string, playlistId?: string) => {
  const url = new URL(`https://youtu.be/${id}`);
  playlistId && url.searchParams.append('list', playlistId);

  return url.href;
};

export const getPlaylistDetails = (playlistId: string): Promise<APIPlaylist> => {
  const url = new URL('https://www.googleapis.com/youtube/v3/playlists');
  url.searchParams.append('key', process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string);
  url.searchParams.append('id', playlistId);
  url.searchParams.append('part', 'snippet');

  return fetch(url.href)
    .then((response) => response.json())
    .then((data: APIPlaylistDetailsResponse) => {
      return data.items[0];
    });
};
