"use client";

import React, { useState, useEffect } from "react";
import { BiLike } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import { IMAGES } from "../constants/images";
import { FeedsProps, FeedItem } from "~/types/feedTypes";

const Feeds: React.FC<FeedsProps> = ({ feedItems }) => {
  const [visibleFeeds, setVisibleFeeds] = useState<FeedItem[]>([]); // Currently visible feeds
  const [feedCount, setFeedCount] = useState(10); // Number of feeds to display initially
  const [hasMore, setHasMore] = useState(true); // Track if more data can be loaded

  useEffect(() => {
    // Load initial feeds
    if (feedItems) {
      setVisibleFeeds(feedItems.slice(0, feedCount));
    }
  }, [feedItems, feedCount]);

  const handleScroll = () => {
    const bottomReached =
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 200;

    if (bottomReached && hasMore) {
      loadMoreFeeds();
    }
  };

  const loadMoreFeeds = () => {
    const newCount = feedCount + 10;
    if (newCount >= feedItems.length) {
      setHasMore(false);
    }
    setFeedCount(newCount);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, feedCount]);

  const handleLike = (id: string) => {
    console.log(`Liked post: ${id}`);
  };

  const handleComment = (id: string) => {
    console.log(`Comment on post: ${id}`);
  };

  return (
    <div className="bg-blue-50 min-h-screen pt-2">
      <div className="max-w-xl mx-auto">
        <div>
          {visibleFeeds.map((item) => (
            <div
              key={item.uri}
              className="bg-white shadow-lg p-6 border-t mb-4"
            >
              {/* Header with profile info */}
              <div className="flex items-center gap-4">
                <img
                  src={item.avatar || IMAGES.AVATAR}
                  alt={item.creator.displayName}
                  className="w-12 h-12 rounded-full border"
                />
                <div>
                  <p className="font-bold text-blue-600">{item.creator.displayName}</p>
                  <p className="text-sm text-gray-500">{item.creator.handle}</p>
                </div>
              </div>
              {/* Description */}
              <p className="text-gray-700 mt-4">{item.description}</p>
              {/* Buttons */}
              <div className="flex gap-8 items-center mt-4">
                <div className="flex items-center">
                  <BiLike
                    className="text-2xl text-gray-700 cursor-pointer"
                    onClick={() => handleLike(item.uri)}
                  />
                  <p className="text-gray-700 ml-2">{item.likeCount}</p>
                </div>
                <div className="flex items-center">
                  <FaRegCommentAlt
                    className="text-xl text-gray-700 cursor-pointer"
                    onClick={() => handleComment(item.uri)}
                  />
                </div>
              </div>
            </div>
          ))}
          {hasMore ? (
            <p className="text-center text-gray-600 mt-4">Loading more feeds...</p>
          ) : (
            <p className="text-center text-gray-600 mt-4">No more feeds to load</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feeds;