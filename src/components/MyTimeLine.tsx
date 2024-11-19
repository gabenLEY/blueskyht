"use client";

import React, { useState, useEffect } from "react";
//import { IoMdHeart } from "react-icons/io";
import { BiRepost } from "react-icons/bi";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { IMAGES } from "../constants/images";
import { FeedsProps, Post } from "~/types/feed";
import Image from "next/image";
import Link from "next/link";
import SkeletonFeed from "./utils/SkeletonFeed";

// Skeleton Loader Component
// const SkeletonFeed = () => (
//   <div className="bg-white shadow-lg p-6 border-t animate-pulse">
//     <div className="flex items-center gap-4">
//       <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
//       <div>
//         <div className="w-32 h-4 bg-gray-300 rounded-md"></div>
//         <div className="w-24 h-3 bg-gray-200 rounded-md mt-2"></div>
//       </div>
//     </div>
//     <div className="w-full h-16 bg-gray-200 rounded-md mt-4"></div>
//     <div className="flex gap-8 items-center mt-4">
//       <div className="w-10 h-10 bg-gray-200 rounded-md"></div>
//       <div className="w-10 h-10 bg-gray-200 rounded-md"></div>
//     </div>
//   </div>
// );

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

  const like_feeds = async (uriFeed : string, cidFeed : string) => {
    try {
      const response = await fetch(`/api/feeds/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uri : uriFeed, cid : cidFeed }), // Sending feedId as an argument
      });

      if (!response.ok) {
        throw new Error('Failed to like feed');
      }

      const data = await response.json();
      console.log(data); // Handle response from the backend (e.g., updated feed info)
      //setLikedFeeds((prev) => [...prev, data]); // Add liked feed to state
    } catch (error) {
      console.error('Error liking feed:', error);
    }
  };

  const un_like_feeds = async function(uri_feed : string){
   
  }

  const handleLike = (cid: string, uri : string) => {
    //console.log(`Liked post: ${id}`);
    like_feeds(cid, uri);
  };

  const handunleLike = (cid: string) => {
    //console.log(`Liked post: ${id}`);
    un_like_feeds(cid);
  };

  const handleComment = (id: string) => {
    console.log(`Commented on post: ${id}`);
  };

  const skeletonData = new Array(30).fill(null);

  const isDataValid = visibleFeeds.length > 0;



  return (
      <div className="max-w-xl mx-auto">
        <div>
          {!isDataValid ? (
            skeletonData.map((_, index) => (
              <SkeletonFeed key={index} />
            ))
          ) : (visibleFeeds.map((item , index) => {
              const { post } : any = item;
              return (
                <div key={index} className="bg-white shadow-lg p-6 border-t">
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
                      <IoIosHeartEmpty
                        className="text-2xl text-gray-700 cursor-pointer"
                        //onClick={() => handunleLike(post.uri)}
                        onClick={() => {handleLike(post.uri, post.cid)}}
                      />
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
                      <BiRepost
                        className="text-3xl text-gray-700 cursor-pointer"
                        //onClick={() => handleComment(post.uri)}
                      />
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