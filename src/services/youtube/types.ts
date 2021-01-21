type Thumbnails = Record<
  'default' | 'medium' | 'high' | 'standard' | 'maxres',
  {
    url: string;
    width: number;
    height: number;
  }
>;

export type APIVideo = {
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

export type APIPlaylistItemsResponse = {
  items: APIVideo[];
  nextPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};

export type APIPlaylist = {
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

export type APIPlaylistDetailsResponse = {
  items: APIPlaylist[];
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};
