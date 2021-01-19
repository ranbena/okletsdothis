type Thumbnails = Record<
  'default' | 'medium' | 'high' | 'standard' | 'maxres',
  {
    url: string;
    width: number;
    height: number;
  }
>;

export type YoutubeAPIPlaylistVideo = {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: Thumbnails;
    channelTitle: string;
    position: number;
    resourceId: {
      kind: string;
      videoId: string;
    };
  };
};

export type YoutubeAPIPlaylistItemsResponse = {
  items: YoutubeAPIPlaylistVideo[];
  nextPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};

export type YoutubeAPIPlaylist = {
  id: string;
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    channelTitle: string;
    channelId: string;
    thumbnails: Thumbnails;
    localized: {
      title: string;
      description: string;
    };
  };
};

export type YoutubeAPIPlaylistDetailsResponse = {
  items: YoutubeAPIPlaylist[];
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};
