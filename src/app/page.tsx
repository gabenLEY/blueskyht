import { agent } from "~/lib/api";
import Feeds from "~/components/Feed";
import Home from "~/components/Home";
export * from '../types/feedTypes';
import { feedDataType } from "~/types/feedTypes";


export default async function Homepage() {
  const feeds: feedDataType = await agent.app.bsky.unspecced.getPopularFeedGenerators({
    limit: 100,
  });
  return (
    <div className="">
      <Home feedItems={feeds.data} />
    </div>
  );
}