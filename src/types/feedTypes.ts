// src/types/feedTypes.ts
export type FeedItem = {
    uri: string;
    cid: string;
    did: string;
    avatar?: string;
    creator: {
      did: string;
      handle: string;
      displayName?: string; // Make this optional
    };
    description: string;
    displayName: string;
    indexedAt: string;
    labels: string[];
    likeCount: number;
  };
  
  
  export type FeedData = {
    feeds: FeedItem[];  // Array of FeedItem
    cursor: string;      // Cursor for pagination
  };
  
  export type FeedProps = {
    feedItems: FeedData; // Expecting FeedData type, which includes feeds and cursor
  };
  
  export type FeedsProps = {
    feedItems: FeedItem[]; // Just the array of FeedItem
  };
  
  export type Getter = {
    [key: string]: string; // Define getter logic (headers)
  };
  
  export type FeedResponse = {
    data: FeedData; // The response should contain the data as FeedData
    success: boolean;
    headers: Getter; // Optional: refine this based on actual header structure
  };
  