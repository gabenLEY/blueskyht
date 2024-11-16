import { agent } from "~/lib/api";
import Home from "~/components/Home";
import { FeedData, FeedItem, FeedResponse } from "~/types/feedTypes"; // Import the types

export default async function Homepage() {
  // Correctly type the response as FeedResponse
  const response: FeedResponse = await agent.app.bsky.unspecced.getPopularFeedGenerators({
    limit: 100,
  });

  // Map the GeneratorView[] to FeedItem[] with proper handling for optional fields
  const feeds: FeedItem[] = response.data.feeds.map((generatorView) => {
    return {
      uri: generatorView.uri,
      cid: generatorView.cid,
      did: generatorView.did,
      avatar: generatorView.avatar,
      creator: {
        did: generatorView.creator.did,
        handle: generatorView.creator.handle,
        displayName: generatorView.creator.displayName ?? "", // Default to empty string if undefined
      },
      description: generatorView.description ?? "", // Default to empty string if undefined
      displayName: generatorView.displayName ?? "", // Default to empty string if undefined
      indexedAt: generatorView.indexedAt,
      labels: generatorView.labels || [], // Default to empty array if undefined
      likeCount: generatorView.likeCount,
    };
  });

  // Construct FeedData with feeds and cursor
  const feedData: FeedData = {
    feeds: feeds,
    cursor: response.data.cursor, // Assuming cursor is part of the response
  };

  return (
    <div className="">
      <Home feedItems={feedData} />
    </div>
  );
}
