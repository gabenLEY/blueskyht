"use client";
import React, { useEffect, useState } from "react";
import Feeds from "./Feeds";
import { FeedData, FeedProps, FeedItem } from "~/types/feedTypes";

const Feed: React.FC<FeedProps> = ({ feedItems }) => {
  const [feedsItem, setFeedsItem] = useState<FeedItem[]>([]);
  const [feed, setFeed] = useState<FeedData>({
    feeds: [],
    cursor: "",
  });

  useEffect(() => {
    setFeedsItem(feedItems.feeds); // feedItems is now a FeedData object
    setFeed(feedItems);
  }, [feedItems]);

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-800">Feeds</h1>
      {/* Render the feeds using the feedsItem state */}
      {feedsItem.length > 0 ? (
        <div>
          <Feeds feedItems={feedsItem} /> {/* Pass FeedItem[] to Feeds */}
        </div>
      ) : (
        <p className="text-2xl text-center">No feeds available</p>
      )}
    </div>
  );
};

export default Feed;
