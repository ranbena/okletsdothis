export type YoutubeAPIPlaylistItem = {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: Record<
      'default' | 'medium' | 'high' | 'standard' | 'maxres',
      {
        url: string;
        width: number;
        height: number;
      }
    >;
    channelTitle: string;
    position: number;
    resourceId: {
      kind: string;
      videoId: string;
    };
  };
};

export type YoutubeAPIPlaylistResponse = {
  nextPageToken: string;
  items: YoutubeAPIPlaylistItem[];
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};