"use client";
import React from "react";
import Layout from "./layout/Layout";
import { useSession } from "next-auth/react";
import TimeLineContainer from "./TimeLineContainer";

const Home: React.FC = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <Layout><div>Loading...</div></Layout>
  }

  if (!session) {
    return <Layout><div>You are not logged in</div></Layout>
  }

  return (
    <Layout>
      <div className="flex justify-center mt-[70px]">
          <TimeLineContainer />
        </div>
    </Layout>
  );
};

export default Home;
