import Head from "next/head";
import React from "react";
import { CreateNewPost } from "./homebar/post/CreateNewPost";
import { Navbar } from "./partials/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { HomeBarAlign } from "./homebar";

export const Home = () => {
  const reduxData = useSelector((state) => state.dataStore);
  return (
    <>
      <Head>
        <title>Instagram 2.0 - Next of BJR</title>
        <link rel="icon" href="/images/logo.jpg" />
      </Head>
      {/* here start our apps  */}
      <Navbar />
      {reduxData.isCreatePost ? <CreateNewPost /> : ""}
      <div className="mainContainer mt-20 bg-[#fafafa]">
        <HomeBarAlign />
      </div>
    </>
  );
};
export default Home;
