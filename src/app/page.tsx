import { agent } from "~/lib/api";
import Feeds from "~/components/Feed";
import Home from "~/components/Home";
export * from '../types/feedTypes';

type feedDataType = {
  data : any
}


export default async function Homepage() {
  const feeds: feedDataType = await agent.app.bsky.unspecced.getPopularFeedGenerators({
    limit: 100,
  });
  console.log(feeds.data)
  return (
    <div className="">
      <Home feedItems={feeds.data} />
    </div>
  );
}
