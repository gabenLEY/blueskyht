"use client";

import React, { useState, useEffect } from "react";
import { BiRepost } from "react-icons/bi";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { IMAGES } from "../constants/images";
import { FeedsProps, Post } from "~/types/feed";
import Image from "next/image";
import Link from "next/link";
import SkeletonFeed from "./utils/SkeletonFeed";


const timeAgo = (isoString: string): string => {
  const date = new Date(isoString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, 'seconds');
  } else if (diffInSeconds < 3600) {
    return rtf.format(-Math.floor(diffInSeconds / 60), 'minutes');
  } else if (diffInSeconds < 86400) {
    return rtf.format(-Math.floor(diffInSeconds / 3600), 'hours');
  } else {
    return rtf.format(-Math.floor(diffInSeconds / 86400), 'days');
  }
};

const Feeds: React.FC<FeedsProps> = ({ postItems }) => {
  const [visibleFeeds, setVisibleFeeds] = useState<Post[]>([]);
  const [feedCount, setFeedCount] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [likeSet, setLikeSet] = useState();

  useEffect(() => {
    if (!postItems || postItems.length === 0) {
      console.log("No posts available.");
      return;
    }

    setVisibleFeeds(postItems); // Update visible feeds state
  }, [postItems, feedCount]);

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
    setFeedCount(newCount);
    if (newCount >= postItems.length) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, feedCount]);

  const like = async (uriFeed : string, cidFeed : string) => {
    try {
      const response = await fetch(`/api/feeds/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uri : uriFeed, cid : cidFeed }), // Sending feedId as an argument
      });

      await response.json();

      return;
      //console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const unlike = async (uriFeed : string) => {
    try {
      const response = await fetch(`/api/feeds/un-like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uri : uriFeed}), // Sending feedId as an argument
      });

      // if (!response.ok) {
      //   throw new Error('Failed to like feed');
      // }

      await response.json();

      return;
      //console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const rePost = async (uriFeed : string, cidFeed : string) => {
    try {
      const response = await fetch(`/api/feeds/repost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uri : uriFeed, cid : cidFeed }), // Sending feedId as an argument
      });

      await response.json();

      return;
      //console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = (cid: string, uri : string) => {
    like(cid, uri);
  };

  const skeletonData = new Array(30).fill(null);

  const isDataValid = visibleFeeds.length > 0;

// if(isDataValid){
//   console.log(visibleFeeds)
// }
  
  return (
      <div className="max-w-xl mx-auto">
        <div>
          {!isDataValid ? (
            skeletonData.map((_, index) => (
              <SkeletonFeed key={index} />
            ))
          ) : (visibleFeeds.map((item , index) => {
            /* eslint-disable @typescript-eslint/no-explicit-any */
              const { post } : any = item;
              const { reason } : any = item;
              /* eslint-disable @typescript-eslint/no-explicit-any */
              return (
                <div key={index} className="bg-white shadow-lg p-6 border-t">
                  <div className="mb-2">
                  {reason && (
                        <div className="flex gap-2 items-center">
                          <BiRepost
                            className="text-lg text-green-500 cursor-pointer"
                            onClick={() => rePost(post.uri, post.cid)}
                           /> <p className="text-sm">Reposted by {reason.by.displayName === post.author.displayName ? "you" : reason.by.displayName}</p>
                        </div>
                      )}
                  </div>
                  <div className="flex justify-between">
                   
                  <Link href="/home">
                    <div className="flex items-center gap-4">
                    <Image
                      src={post.author.avatar || IMAGES.AVATAR}
                      alt={post.author.displayName || "Anonymous"}
                      className="w-12 h-12 rounded-full border"
                      width={48}
                      height={48}
                    />
                    <div>
                      <p className="font-bold text-blue-600">
                        {post.author.displayName || "Anonymous"}
                      </p>
                      <p className="text-sm text-gray-500">{post.author.handle || "@"}</p>
                    </div>
                     </div>
                  </Link>
                  <div>
                    <p className="text-md text-gray-500">{timeAgo(post.indexedAt)}</p>
                  </div>
                  </div>
                 

                  <p className="text-gray-700 mt-4">{post.record?.text || "No description available."}</p>
                  {post.embed && post.embed.images && Array.isArray(post.embed.images) && post.embed.images[0] && (
                     <div className="mt-2">
                       <Image
                         src={post.embed.images[0].fullsize}
                         alt={post.author.displayName || "Anonymous"}
                         className="rounded-xl"
                         width={post.embed.images[0].aspectRatio.width}
                         height={post.embed.images[0].aspectRatio.height}
                       />
                     </div>
                   )}

                  <div className="flex gap-[80px] items-center mt-4">
                    <div className="flex gap-1 items-center">
                      {post.viewer.like === undefined ? (
                        <IoIosHeartEmpty
                        className="text-2xl text-gray-700 cursor-pointer"
                        onClick={() => {handleLike(post.uri, post.cid)}}
                      />
                        ) : (
                          <FaHeart
                        className="text-2xl text-red-500 cursor-pointer"
                        onClick={() => {unlike(post.uri)}}
                      />
                        )}
                      <p className="text-gray-700">{post.likeCount || 0}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaRegComment
                        className="text-xl text-gray-700 cursor-pointer"
                        //onClick={() => handleComment(post.uri)}
                      />
                      <p className="text-gray-700">{post.replyCount}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {reason !== undefined ? (
                        <BiRepost
                        className="text-3xl text-green-500 cursor-pointer"
                        onClick={() => rePost(post.uri, post.cid)}
                      />
                      ):(<BiRepost
                        className="text-3xl text-gray-700 cursor-pointer"
                        onClick={() => rePost(post.uri, post.cid)}
                      />)}
                      <p className="text-gray-700">{post.repostCount}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
  );
};

export default Feeds;