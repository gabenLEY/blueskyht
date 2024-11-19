type Author = {
    did: string;
    avatar: string;
    handle: string;
    displayName: string;
  };

  type AspectRatio = {
    height : number,
    width : number,
  };

  type Images = {
    thumb : string,
    fullzise : string,
    alt : string,
    aspectRatio : AspectRatio;
  }

  
  
  type Embed = {
    "$type": string;
    external: object;
    images : Images[]
  };
  
  type PostRecord = {
    "$type": string;
    createdAt: string;
    text: string;
  };
  
  type Viewer = {
    like: string;
    threadMuted: boolean;
    embeddingDisabled: boolean;
  };
  
  export type Post = {
    uri: string;
    cid: string;
    replyCount: number;
    likeCount: number;
    quoteCount: number;
    repostCount: number;
    author: Author;
    embed: Embed;
    indexedAt: string;
    labels: string[]; // Assuming this is an array of strings, can adjust if needed
    record: PostRecord;
    viewer: Viewer;
  };
  
  export type Feed = {
    post: Post;
  };

  export type FeedResponse = {
    feed: Post[];
  };

  export type FeedsProps = {
    postItems: Post[]; 
  };

  