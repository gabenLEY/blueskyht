"use client";
import React, { useEffect, useState } from "react";
import MyTimeLine from "./MyTimeLine";
import { Post } from "~/types/feed";
//import SearchBar from "./SearchBar";
import { useSession } from 'next-auth/react';
import DisplayLayout from "./layout/DisplayLayout";
import Feeds from "./includs/Feeds";

const TimeLineContainer: React.FC = () => {

  const { data: session, status } = useSession()
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [btnPopular, setBtnPopular] = useState<boolean>(false);
  const [btnFollowing, setBtnFollowing] = useState<boolean>(false);

  const [feeds, setFeeds] = useState<any[]>([]); // State to store feeds
  const [error, setError] = useState<string | null>(null);

  const getMytimeLine = async () => {
    try {
      const response = await fetch("/api/feeds/time-line"); // Call dynamic route with 'feeds'
      const result = await response.json();
       //console.log(result.feed)
      if (result.feed) {
        //setFeeds(result.data); // Set the feeds in state
        setPosts(result.feed); // Set the feeds in state
        //console.log(result)
      } else {
        setError(result.message || "Failed to fetch feeds");
      }
    } catch (err) {
      console.error("Error fetching feeds:", err);
      setError("An unexpected error occurred");
    }
  };

  const getPopularFeeds = async () => {
    try {
      const response = await fetch("/api/feeds/load-popular"); // Call dynamic route with 'feeds'
      const result = await response.json();
       //console.log(result.feeds)
      if (result.feeds) {
        //setFeeds(result.data); // Set the feeds in state
        setPosts(result.feeds); // Set the feeds in state
        console.log(result)
      } else {
        setError(result.message || "Failed to fetch feeds");
      }
    } catch (err) {
      console.error("Error fetching feeds:", err);
      setError("An unexpected error occurred");
    }
  };

  useEffect(() => {
    getMytimeLine();
  }, []);


  const popular = function(){
    setBtnPopular(!btnPopular)
    setBtnFollowing(false)
    //getPopularFeeds()
  }

  const fallowing = function(){
    setBtnFollowing(!btnFollowing)
    setBtnPopular(false)
    getMytimeLine();
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return <div>You are not logged in</div>
  }

  return (
    <div>
     <div>
       <Feeds onClickBtn={(data : any) : any =>{
           console.log(data)
       }} />
     </div>
     <div className="">
      <DisplayLayout>
              <MyTimeLine postItems={posts} />
       </DisplayLayout>
     </div>
    </div>
  );
};

export default TimeLineContainer;
