"use client";
import React, { useEffect, useState } from "react";
import MyTimeLine from "./MyTimeLine";
import { Post } from "~/types/feed";
import toast, { Toaster } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import DisplayLayout from "./layout/DisplayLayout";
import Feeds from "./includs/Feeds";

const TimeLineContainer: React.FC = () => {

  const { data: session, status } = useSession()
  const [posts, setPosts] = useState<Post[]>([]);

  const getMytimeLine = async () => {
    try {
      const response = await fetch("/api/feeds/time-line");
      const result = await response.json();
      if (result.feed) {
        setPosts(result.feed);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      console.error("Error fetching feeds:", err);
      toast.error("An unexpected error occurred");
    }
  };


  useEffect(() => {
    getMytimeLine();
  }, []);

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return <div>You are not logged in</div>
  }

  return (
    <div>
     <div>
       <Feeds onClickBtn={(data) =>{
           console.log(data)
       }} />
     </div>
     <div className="">
      <DisplayLayout>
              <MyTimeLine postItems={posts} />
       </DisplayLayout>
     </div>
     <Toaster />
    </div>
  );
};

export default TimeLineContainer;
