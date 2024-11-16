// src/types/feedTypes.ts
export type FeedItem = {
    uri: string;
    cid: string;
    did: string;
    avatar: string;
    creator: {
      did: string;
      handle: string;
      displayName: string;
    };
    description: string;
    displayName: string;
    indexedAt: string;
    labels: any[]; // Can be refined if the structure of labels is known
    likeCount: number;
  };
  
  export type FeedData = {
    feeds: FeedItem[];  // Array of FeedItem
    cursor: string;      // Cursor for pagination or tracking
  };

  export type FeedProps = {
    feedItems: FeedData; // Expecting FeedData type here, not just FeedItem[]
  };

  export type FeedsProps = {
    feedItems: FeedItem[];
  };

  export type feedDataType = {
    data: any;
  }
  