"use client";
import React from "react";
import Layout from "./layout/Layout";
import Feed from "./Feed";
import { FeedProps } from "~/types/feedTypes";
import SearchBar from "./SearchBar";

const Home: React.FC<FeedProps> = ({ feedItems }) => {
  return (
    <Layout>
      <div className="flex flex-col lg:flex-row gap-4 p-4 max-w-4xl">
        {/* Section for Login */}
        <div className="flex-1 bg-white p-4 rounded shadow-md h-[50vh]">
          {/* <p className="text-lg font-semibold">Login</p> */}
          <SearchBar />
          {/* <input type="text" className="text-lg p-2 border rounded-xl w-full outline-none" /> */}
          {/* Add Login form or content */}
        </div>

        {/* Section for Feeds */}
        <div className="flex-2 ">
          <Feed feedItems={feedItems} />
        </div>

        {/* Section for "Looking for" */}
        {/* <div className="flex-1 bg-white p-4 rounded shadow-md h-30">
          <p className="text-lg font-semibold">Looking for</p>
        </div> */}
      </div>
    </Layout>
  );
};

export default Home;
