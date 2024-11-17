import { agent } from "~/lib/api";
import Home from "~/components/Home";
import { FeedData, FeedItem, FeedResponse } from "~/types/feedTypes"; // Import the types

type Getter = { [key: string]: string };

function isHeaders(headers: unknown): headers is Getter {
  return (
    typeof headers === "object" &&
    headers !== null &&
    Object.entries(headers).every(
      ([key, value]) => typeof key === "string" && typeof value === "string"
    )
  );
}

function isFeedData(data: unknown): data is FeedData {
  return (
    typeof data === "object" &&
    data !== null &&
    Array.isArray((data as FeedData).feeds) &&
    (data as FeedData).feeds.every((feed) => typeof feed === "object") &&
    typeof (data as FeedData).cursor === "string"
  );
}

function isFeedResponse(response: unknown): response is FeedResponse {
  return (
    typeof response === "object" &&
    response !== null &&
    isFeedData((response as FeedResponse).data) &&
    typeof (response as FeedResponse).success === "boolean" &&
    isHeaders((response as FeedResponse).headers)
  );
}

export default async function Homepage() {
  // Fetch the response from the API
  const response = await agent.app.bsky.unspecced.getPopularFeedGenerators({
    limit: 100,
  });

  console.log(response)

  // Check if the response is valid and conforms to FeedResponse
  if (!isFeedResponse(response)) {
    console.error("Invalid response format");
    return <div>Error: Invalid response format Response</div>; // Handle invalid response gracefully
  }
  if(!isFeedData(response.data)){
    console.error("Invalid response format Feeddata");
    return <div>Error: Invalid response format FeedData</div>; // Handle invalid response gracefully
  }

  return (
    <div className="">
      <Home feedItems={response.data} />
    </div>
  );
}
