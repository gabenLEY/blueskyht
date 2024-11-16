import { agent } from "~/lib/api";
import Home from "~/components/Home";
export * from '../types/feedTypes';


export default async function Homepage() {
  const feeds: any = await agent.app.bsky.unspecced.getPopularFeedGenerators({
    limit: 100,
  });
  return (
    <div className="">
      <Home feedItems={feeds.data} />
    </div>
  );
}
