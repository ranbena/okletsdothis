import { APIVideo } from 'src/services/youtube/types';

type ValueArray<T> = (T | null)[];
type ReturnValue<T> = ValueArray<T>[];

export function chunkArray<T>(
  array: ValueArray<T>,
  size: number,
  fillNull: boolean = false,
): ReturnValue<T> {
  const result: ReturnValue<T> = [];

  // chunk
  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);
    result.push(chunk);
  }

  if (fillNull) {
    // fill remaining with nulls
    const lastChunk = result[result.length - 1];
    const left = size - lastChunk.length;
    for (let i = 0; i < left; i++) {
      lastChunk.push(null);
    }
  }

  return result;
}

// construct https://youtube.com/playlist?list=id
export function constructYoutubePlaylistUrl(playlistId: string) {
  return `https://youtube.com/playlist?list=${playlistId}`;
}

export enum EXTRACT_ERROR {
  OK,
  EMPTY,
  NOT_URL,
  NOT_YOUTUBE,
  INCOMPLETE,
}

// extract id from https://youtube.com/playlist?list=id
export function extractIdFromYoutubePlaylistUrl(
  url: string,
): { playlistId?: string; error: EXTRACT_ERROR } {
  if (!url.trim()) {
    return { error: EXTRACT_ERROR.EMPTY };
  }

  // URL constructor requirement
  if (!url.startsWith('http')) {
    url = `https://${url}`;
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch {
    return { error: EXTRACT_ERROR.NOT_URL };
  }

  const { hostname, pathname, searchParams } = parsedUrl;

  if (!hostname.endsWith('youtube.com')) {
    return { error: EXTRACT_ERROR.NOT_YOUTUBE };
  }

  const playlistId = searchParams.get('list');
  if (pathname !== '/playlist' || !playlistId) {
    return { error: EXTRACT_ERROR.INCOMPLETE };
  }

  return { playlistId, error: EXTRACT_ERROR.OK };
}

// extract playlist id from site playlist page
const playlistPageRegex = /\/playlist\/(?<playlistId>.*)/;
export function extractPlaylistIdFromPlaylistPageUrl(url: string): string | undefined {
  if (!url) {
    return undefined;
  }

  try {
    const parsed = new URL(url);
    const match = parsed.pathname.match(playlistPageRegex);
    if (match?.groups) {
      const { playlistId } = match.groups;
      return constructYoutubePlaylistUrl(playlistId);
    }
  } catch (err) {}

  return undefined;
}

// extract deleted items from youtube playlist's videos
// there's no explicit way to determine a deleted video (apart for an api request which is costly)
export function extractDeletedVideos(items: APIVideo[]): [APIVideo[], APIVideo[]] {
  const rest: APIVideo[] = [];
  const deleted: APIVideo[] = [];

  const determine = (item: APIVideo) => {
    if (item.snippet.title === 'Deleted video') {
      deleted.push(item);
    } else {
      rest.push(item);
    }
  };

  items.forEach(determine);

  return [deleted, rest];
}

export function last<T>(arr: T[]) {
  return arr[arr.length - 1];
}
